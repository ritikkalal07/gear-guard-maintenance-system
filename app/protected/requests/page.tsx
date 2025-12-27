import { createClient } from "@/lib/supabase/server"
import { Plus, Search, Filter, Clock, CheckCircle2, AlertTriangle, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Suspense } from "react"

export default function MaintenanceRequestsPage() {
  return (
    <Suspense fallback={null}>
      <MaintenanceRequestsList />
    </Suspense>
  )
}

async function MaintenanceRequestsList() {
  const supabase = await createClient()

  // Fetch requests with equipment and profiles info
  const { data: requests, error } = await supabase
    .from("maintenance_requests")
    .select(`
      *,
      equipment:equipment_id(name),
      requested_by_profile:requested_by(full_name),
      assigned_to_profile:assigned_to(full_name)
    `)
    .order("created_at", { ascending: false })

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "critical":
        return (
          <Badge variant="destructive" className="bg-red-500/10 text-red-600 border-red-200">
            Critical
          </Badge>
        )
      case "high":
        return <Badge className="bg-orange-500/10 text-orange-600 border-orange-200">High</Badge>
      case "medium":
        return <Badge className="bg-blue-500/10 text-blue-600 border-blue-200">Medium</Badge>
      default:
        return <Badge variant="outline">Low</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "in_progress":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Maintenance Requests</h1>
          <p className="text-muted-foreground">Manage active work orders and service requests.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Request
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search requests..." className="pl-8" />
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Request</TableHead>
              <TableHead>Asset</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Requested By</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests && requests.length > 0 ? (
              requests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{req.title}</span>
                      <span className="text-xs text-muted-foreground truncate max-w-[200px]">{req.description}</span>
                    </div>
                  </TableCell>
                  <TableCell>{req.equipment?.name || "Unknown Asset"}</TableCell>
                  <TableCell>{getPriorityBadge(req.priority)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(req.status)}
                      <span className="capitalize text-sm">{req.status.replace("_", " ")}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-3 w-3" />
                      <span className="text-sm">{(req.requested_by_profile as any)?.full_name || "System"}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{(req.assigned_to_profile as any)?.full_name || "Unassigned"}</span>
                  </TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground">
                    {new Date(req.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                  No maintenance requests found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
