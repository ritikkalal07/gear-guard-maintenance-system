import { createClient } from "@/lib/supabase/server"
import { Activity, AlertTriangle, CheckCircle2, Clock, Package, TrendingUp, Users, Wrench, MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default async function DashboardPage() {
  const supabase = await createClient()

  // Fetch all necessary data
  const { data: equipment } = await supabase.from("equipment").select("*")
  const { data: requests } = await supabase.from("maintenance_requests").select(`
      *,
      equipment:equipment_id(name)
    `)
  const { data: teams } = await supabase.from("teams").select("*")

  // Calculate statistics
  const totalEquipment = equipment?.length || 0
  const operationalEquipment = equipment?.filter((e) => e.status === "operational").length || 0
  const repairEquipment = equipment?.filter((e) => e.status === "repair").length || 0
  const maintenanceEquipment = equipment?.filter((e) => e.status === "maintenance").length || 0

  const totalRequests = requests?.length || 0
  const pendingRequests = requests?.filter((r) => r.status === "pending").length || 0
  const inProgressRequests = requests?.filter((r) => r.status === "in_progress").length || 0
  const completedRequests = requests?.filter((r) => r.status === "completed").length || 0

  const operationalRate = totalEquipment > 0 ? Math.round((operationalEquipment / totalEquipment) * 100) : 0
  const completionRate = totalRequests > 0 ? Math.round((completedRequests / totalRequests) * 100) : 0

  // Get recent requests
  const recentRequests = requests?.slice(0, 5) || []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your maintenance operations and system health.</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Equipment</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEquipment}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 font-medium">{operationalEquipment} operational</span> • {repairEquipment}{" "}
              needs repair
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRequests}</div>
            <p className="text-xs text-muted-foreground">
              {inProgressRequests} in progress • {pendingRequests} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Operational Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{operationalRate}%</div>
            <Progress value={operationalRate} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Service Teams</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teams?.length || 0}</div>
            <p className="text-xs text-muted-foreground">Managing {totalEquipment} assets</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Activity Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Request Status Breakdown */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Request Status Overview</CardTitle>
            <CardDescription>Current distribution of maintenance work orders</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">Pending</span>
                </div>
                <span className="text-sm font-bold">{pendingRequests}</span>
              </div>
              <Progress value={(pendingRequests / totalRequests) * 100} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">In Progress</span>
                </div>
                <span className="text-sm font-bold">{inProgressRequests}</span>
              </div>
              <Progress value={(inProgressRequests / totalRequests) * 100} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Completed</span>
                </div>
                <span className="text-sm font-bold">{completedRequests}</span>
              </div>
              <Progress value={(completedRequests / totalRequests) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Equipment status distribution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Operational</p>
                <p className="text-2xl font-bold text-green-600">{operationalEquipment}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Under Maintenance</p>
                <p className="text-2xl font-bold text-yellow-600">{maintenanceEquipment}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Needs Repair</p>
                <p className="text-2xl font-bold text-red-600">{repairEquipment}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Maintenance Requests</CardTitle>
          <CardDescription>Latest work orders and service tickets</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request</TableHead>
                <TableHead>Asset</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentRequests.length > 0 ? (
                recentRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.title}</TableCell>
                    <TableCell>{request.equipment?.name || "Unknown"}</TableCell>
                    <TableCell>
                      <Badge
                        variant={request.priority === "critical" || request.priority === "high" ? "destructive" : "secondary"}
                      >
                        {request.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="capitalize">{request.status.replace("_", " ")}</TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground">
                      {new Date(request.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    No recent maintenance requests.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
