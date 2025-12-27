-- initial schema for GearGuard

-- Profiles table to store user roles and info
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role text check (role in ('admin', 'manager', 'technician')) default 'technician',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by everyone." on public.profiles
  for select using (true);

create policy "Users can update own profile." on public.profiles
  for update using (auth.uid() = id);

-- Equipment table
create table if not exists public.equipment (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  status text check (status in ('operational', 'maintenance', 'repair', 'offline')) default 'operational',
  location text,
  purchase_date date,
  last_maintenance timestamp with time zone,
  next_maintenance timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_by uuid references auth.users(id)
);

alter table public.equipment enable row level security;

create policy "Equipment is viewable by authenticated users." on public.equipment
  for select using (auth.role() = 'authenticated');

create policy "Managers and Admins can manage equipment." on public.equipment
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin', 'manager')
    )
  );

-- Maintenance Requests
create table if not exists public.maintenance_requests (
  id uuid primary key default gen_random_uuid(),
  equipment_id uuid references public.equipment(id) on delete cascade not null,
  title text not null,
  description text,
  priority text check (priority in ('low', 'medium', 'high', 'critical')) default 'medium',
  status text check (status in ('pending', 'approved', 'in_progress', 'completed', 'cancelled')) default 'pending',
  requested_by uuid references auth.users(id) not null,
  assigned_to uuid references auth.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.maintenance_requests enable row level security;

create policy "Requests are viewable by authenticated users." on public.maintenance_requests
  for select using (auth.role() = 'authenticated');

create policy "Users can create requests." on public.maintenance_requests
  for insert with check (auth.uid() = requested_by);

create policy "Managers can update status and assignment." on public.maintenance_requests
  for update using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin', 'manager')
    )
  );

-- Maintenance Teams
create table if not exists public.teams (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.teams enable row level security;

create policy "Teams are viewable by authenticated users." on public.teams
  for select using (auth.role() = 'authenticated');

-- Team Members
create table if not exists public.team_members (
  team_id uuid references public.teams(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  primary key (team_id, user_id)
);

alter table public.team_members enable row level security;

create policy "Team members are viewable by authenticated users." on public.team_members
  for select using (auth.role() = 'authenticated');

-- Trigger to create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    coalesce(new.raw_user_meta_data ->> 'role', 'technician')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
