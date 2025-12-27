import { createClient } from "@/lib/supabase/server"
import { Plus, Search, Filter, MoreHorizontal, AlertCircle, CheckCircle2, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default async function EquipmentPage() {
  const supabase = await createClient()
  const { data: equipment, error } = await supabase
    .from("equipment")
    .select("*")
    .order("created_at", { ascending: false })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "operational":
        return <Badge className="bg-green-500/10 text-green-600 border-green-200">Operational</Badge>
      case "maintenance":
        return <Badge variant="secondary">Maintenance</Badge>
      case "repair":
        return (
          <Badge variant="destructive" className="bg-red-500/10 text-red-600 border-red-200">
            Repair Required
          </Badge>
        )
      case "offline":
        return <Badge variant="outline">Offline</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Equipment Inventory</h1>
          <p className="text-muted-foreground">Manage and track all facility assets and machinery.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Equipment
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{equipment?.length || 0}</div>
            <p className="text-xs text-muted-foreground">+2 since last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Operational</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{equipment?.filter((e) => e.status === "operational").length || 0}</div>
            <p className="text-xs text-muted-foreground">94% of total inventory</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Repair</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{equipment?.filter((e) => e.status === "repair").length || 0}</div>
            <p className="text-xs text-muted-foreground">Requires immediate attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due for Service</CardTitle>
            <Wrench className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Within the next 7 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search equipment..." className="pl-8" />
        </div>
        <Button variant="outline" className="gap-2 ml-auto bg-transparent">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Maint.</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {equipment && equipment.length > 0 ? (
              equipment.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="capitalize">{item.category}</TableCell>
                  <TableCell>{item.location || "N/A"}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>
                    {item.last_maintenance ? new Date(item.last_maintenance).toLocaleDateString() : "Never"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No equipment found. Add your first asset to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}

function Package(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.14 4.8 7a7 7 0 0 1-12.8 11Z" />
      <path d="M9 10a.5.5 0 0 1 1 0v1a.5.5 0 0 1-1 0v-1Z" />
      <path d="M14 10a.5.5 0 0 1 1 0v1a.5.5 0 0 1-1 0v-1Z" />
    </svg>
  )
}
