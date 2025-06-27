import { SignedIn, SignedOut, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

export default function SignUp(
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
        <SignUpButton mode="modal">
          <Button
            className={props.className}
            variant={props.variant ? props.variant : "outline"}
          >
            Sign Up
          </Button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
