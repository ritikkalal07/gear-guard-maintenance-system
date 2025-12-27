import type React from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ShieldCheck, LayoutDashboard, Wrench, Users, LogOut, Package } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="w-64 bg-background border-r hidden md:flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">GearGuard</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/protected"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors text-sm font-medium"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/protected/equipment"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors text-sm font-medium"
          >
            <Package className="h-4 w-4" />
            Equipment
          </Link>
          <Link
            href="/protected/requests"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors text-sm font-medium"
          >
            <Wrench className="h-4 w-4" />
            Requests
          </Link>
          <Link
            href="/protected/requests/kanban"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors text-sm font-medium ml-4 border-l pl-4"
          >
            <LayoutDashboard className="h-4 w-4" />
            Board
          </Link>
          <Link
            href="/protected/teams"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors text-sm font-medium"
          >
            <Users className="h-4 w-4" />
            Teams
          </Link>
        </nav>
        <div className="p-4 border-t space-y-4">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-bold">{user.email?.[0].toUpperCase()}</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-medium truncate">{user.email}</p>
              <p className="text-[10px] text-muted-foreground uppercase">{user.user_metadata?.role || "Technician"}</p>
            </div>
          </div>
          <form action="/auth/sign-out" method="POST">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 bg-background border-b flex items-center justify-between px-8 md:hidden">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">GearGuard</span>
          {/* Mobile menu would go here */}
        </header>
        <div className="p-8 max-w-7xl mx-auto w-full">{children}</div>
      </main>
    </div>
  )
}
