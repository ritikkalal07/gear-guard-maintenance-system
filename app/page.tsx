import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShieldCheck, ArrowRight, Settings, Wrench, BarChart3, Users } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span className="ml-2 text-xl font-bold">GearGuard</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/auth/login">
            Login
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Predictive Maintenance for Modern Industry
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  GearGuard helps you manage equipment, track maintenance requests, and optimize your facility's uptime
                  with intelligent data.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild size="lg">
                  <Link href="/auth/sign-up">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/auth/login">Sign In</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center space-y-2 border p-6 rounded-xl">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Asset Tracking</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Maintain a complete inventory of all machinery and critical infrastructure.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border p-6 rounded-xl">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Wrench className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Maintenance Logs</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Automate work orders and track maintenance history for every piece of gear.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border p-6 rounded-xl">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Team Management</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Coordinate technicians and managers across different facility zones.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border p-6 rounded-xl">
                <div className="p-3 bg-primary/10 rounded-full">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Smart Reporting</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Visualize uptime, failure rates, and maintenance costs with detailed analytics.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2025 GearGuard Maintenance Systems. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
