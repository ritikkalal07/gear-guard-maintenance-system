import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/server"
import { Plus, Users, Shield, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default async function TeamsPage() {
  const supabase = await createClient()

  // Fetch teams with members info
  const { data: teams, error: teamsError } = await supabase.from("teams").select(`
      *,
      members:team_members(
        user:user_id(
          id,
          full_name,
          email,
          role
        )
      )
    `)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Maintenance Teams</h1>
          <p className="text-muted-foreground">Manage service groups and personnel assignments.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Team
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teams && teams.length > 0 ? (
          teams.map((team) => (
            <Card key={team.id} className="overflow-hidden">
              <CardHeader className="bg-muted/30">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <Badge variant="outline">{team.members?.length || 0} Members</Badge>
                </div>
                <CardTitle className="mt-4">{team.name}</CardTitle>
                <CardDescription>{team.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Team Members</h4>
                  <div className="space-y-3">
                    {(team.members as any[])?.map((member: any) => (
                      <div key={member.user.id} className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-[10px] bg-primary/5">
                            {member.user.full_name?.[0]?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 overflow-hidden">
                          <p className="text-sm font-medium truncate">{member.user.full_name}</p>
                          <p className="text-[10px] text-muted-foreground capitalize">{member.user.role}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Mail className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                    {(!team.members || team.members.length === 0) && (
                      <p className="text-sm text-muted-foreground italic">No members assigned.</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-12 flex flex-col items-center justify-center border-2 border-dashed rounded-xl text-center space-y-3">
            <div className="p-4 bg-muted rounded-full">
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <p className="font-medium text-lg">No teams created</p>
              <p className="text-sm text-muted-foreground max-w-[300px]">
                Create your first maintenance team to start organizing work groups.
              </p>
            </div>
            <Button variant="outline" size="sm">
              Add Team
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
