import { createClient } from "@/lib/supabase/server"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, CheckCircle2, MoreHorizontal, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function KanbanPage() {
  const supabase = await createClient()

  const { data: requests } = await supabase.from("maintenance_requests").select(`
      *,
      equipment:equipment_id(name),
      requested_by_profile:requested_by(full_name),
      assigned_to_profile:assigned_to(full_name)
    `)

  const columns = [
    { id: "pending", title: "Pending", icon: <Clock className="h-4 w-4 text-yellow-500" /> },
    { id: "approved", title: "Approved", icon: <CheckCircle2 className="h-4 w-4 text-blue-500" /> },
    { id: "in_progress", title: "In Progress", icon: <Clock className="h-4 w-4 text-primary" /> },
    { id: "completed", title: "Completed", icon: <CheckCircle2 className="h-4 w-4 text-green-500" /> },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-blue-500"
      default:
        return "bg-slate-400"
    }
  }

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Maintenance Board</h1>
          <p className="text-muted-foreground">Visual workflow of all active maintenance requests.</p>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-6 h-full min-w-[1000px]">
          {columns.map((column) => (
            <div key={column.id} className="flex-1 flex flex-col gap-4 min-w-[250px]">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  {column.icon}
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                    {column.title}
                  </h3>
                  <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                    {requests?.filter((r) => r.status === column.id).length || 0}
                  </Badge>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1 bg-muted/30 rounded-xl p-3 space-y-3">
                {requests
                  ?.filter((r) => r.status === column.id)
                  .map((request) => (
                    <Card
                      key={request.id}
                      className="cursor-grab active:cursor-grabbing hover:ring-2 ring-primary/20 transition-all"
                    >
                      <CardHeader className="p-3 pb-0 space-y-1">
                        <div className="flex items-start justify-between">
                          <div className={`h-1.5 w-8 rounded-full ${getPriorityColor(request.priority)}`} />
                          <Badge variant="outline" className="text-[10px] font-normal uppercase">
                            {request.equipment?.name}
                          </Badge>
                        </div>
                        <CardTitle className="text-sm font-bold leading-tight mt-2">{request.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-3 pt-2 space-y-3">
                        <p className="text-xs text-muted-foreground line-clamp-2">{request.description}</p>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-1.5">
                            <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                              <User className="h-3 w-3 text-primary" />
                            </div>
                            <span className="text-[10px] font-medium">
                              {(request.assigned_to_profile as any)?.full_name || "Unassigned"}
                            </span>
                          </div>
                          <div className="flex items-center text-[10px] text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            {new Date(request.created_at).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
