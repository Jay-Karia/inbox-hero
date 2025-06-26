import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

export default function SignIn(
  props: {
    className?: string;
    variant?:
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost"
      | "link"
      | "glass";
  } = {}
) {
  return (
    <div>
      <SignedOut>
        <SignInButton mode="modal">
          <Button
            className={props.className}
            variant={props.variant ? props.variant : "outline"}
          >
            Sign In
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
