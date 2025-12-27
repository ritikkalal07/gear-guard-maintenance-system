import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-destructive/10 p-4">
              <AlertCircle className="h-10 w-10 text-destructive" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Authentication Error</CardTitle>
          <CardDescription>There was a problem authenticating your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            The link might be expired or invalid. Please try signing in again or contact support if the problem
            persists.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center border-t bg-muted/50 py-4">
          <Button asChild>
            <Link href="/auth/login">Back to Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
