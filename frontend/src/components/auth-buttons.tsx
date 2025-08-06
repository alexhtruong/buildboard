import { SignInButton, SignOutButton, SignUpButton } from "@clerk/nextjs";
import { auth } from '@clerk/nextjs/server'
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default async function AuthButtons() {
    const { userId } = await auth();
    console.log(userId);

    return (
        <>
            {!userId ? (
                <>
                    <SignInButton mode="redirect">
                        <Button variant="ghost" size="sm">
                            Sign In
                        </Button>
                    </SignInButton>
                    <SignUpButton mode="redirect">
                        <Button size="sm">
                            Get Started
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </SignUpButton>
                </>
            ) : (
                <>
                    <SignOutButton redirectUrl="/">
                        <Button variant="outline" size="sm">
                            Sign Out
                        </Button>
                    </SignOutButton>
                </>
            )}
        </>
    )
}