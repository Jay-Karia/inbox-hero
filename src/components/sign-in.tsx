import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

export default function SignIn(props: {
  className?: string;
} = {}
) {
  return (
    <div>
      <SignedOut>
        <SignInButton mode="modal" className={props.className}>
          <Button variant={"outline"}>Sign In</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
