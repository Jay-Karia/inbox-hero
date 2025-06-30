"use client";

import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface SignInProps {
  className?: string;
}

export default function SignIn({ className }: SignInProps) {
  const { isSignedIn, isLoaded, user } = useUser();

  // Loading skeleton
  if (!isLoaded) {
    return (
      <div className={cn("flex items-center", className)}>
        <div className="bg-gray-700 rounded-full animate-pulse h-8 w-8"></div>
      </div>
    );
  }

  // User is signed in - show user button
  if (isSignedIn) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <UserButton
          appearance={{
            elements: {
              avatarBox: "h-8 w-8",
            },
          }}
        />
        <span className="text-sm text-gray-300 hidden sm:block">
          {user?.firstName}
        </span>
      </div>
    );
  }

  // User is not signed in - show sign in button
  return (
    <SignInButton mode="modal">
      <Button variant="secondary" className={className}>
        Sign In
      </Button>
    </SignInButton>
  );
}
