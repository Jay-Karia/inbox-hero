import Demo from "@/components/demo";
import SignUp from "@/components/sign-up";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";

export default function Home() {
  return (
    <>
      <SignedOut>
        <div className="p-4 flex items-center flex-col gap-8 h-max">
          <h1 className="scroll-m-20 text-center text-5xl/16 font-extrabold tracking-tighter text-balance mt-18 animate-fade-in-up text-zinc-200">
            Clean your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-600 animate-bounce">
              inbox
            </span>{" "}
            faster.
            <br />
            With{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-600 animate-bounce">
              zero
            </span>{" "}
            stress.
          </h1>
          <p className="text-center flex-wrap text-muted-foreground text-md w-1/3 z-10 max-w-[600px]">
            Inbox Hero turns email overload into a fast-paced, focused mission.
            Triage one email at a time with a timer, and make quick decisions.
          </p>

          {/* Position relative container for buttons and background */}
          <div className="relative w-full flex justify-center mt-4">
            {/* Background gradient positioned behind buttons */}
            <div className="absolute inset-0 -z-10 h-40 -mt-10 overflow-visible">
              <BackgroundGradient />
            </div>

            {/* Buttons with higher z-index */}
            <div className="flex gap-4 z-10 overflow-visible">
              <Button variant="default" asChild>
                <Link
                  href="https://github.com/Jay-Karia/inbox-hero"
                  target="_blank"
                >
                  <FaGithub className="inline" />
                  GitHub
                </Link>
              </Button>
              <SignUp variant="glass" />
            </div>
          </div>
          <div className="border border-gray-700 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-xl shadow-2xl min-w-[700px] max-w-[1000px] w-1/2 min-h-[200px] md:max-h-[350px] lg:max-h-[600px] h-[400px] backdrop-blur-sm ring-1 ring-white/10 p-6 flex flex-col justify-center items-center">
            <Demo />
          </div>
        </div>
      </SignedOut>
      <SignedIn>Hello there!</SignedIn>
    </>
  );
}
