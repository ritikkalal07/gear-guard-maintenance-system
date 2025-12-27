import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Mail } from "lucide-react"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-100 p-4">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
          <CardDescription>We&apos;ve sent a verification link to your email address.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Mail className="h-5 w-5" />
            <span>Please click the link in the email to confirm your account.</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Once confirmed, you will be able to sign in and access the dashboard.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center border-t bg-muted/50 py-4">
          <Button asChild variant="outline">
            <Link href="/auth/login">Return to Sign In</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
