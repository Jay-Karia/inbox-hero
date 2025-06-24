import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";
import {Button} from "./ui/button";

export default function SignIn() {
  return <>
  <SignedOut>
  <SignInButton mode="modal">
      <Button variant={"outline"}>
        Sign In
      </Button>
    </SignInButton>
  </SignedOut>
  <SignedIn>
    <UserButton />
  </SignedIn>
  </>
}
