import SignIn from "@/components/sign-in";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";

export default function Home() {
  return (
    <div className="p-4 flex justify-center items-center flex-col gap-8">
      <h1 className="scroll-m-20 text-center text-5xl/16 font-extrabold tracking-tighter text-balance mt-18 animate-fade-in-up text-zinc-200">
        Conquer your{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-600 animate-none">
          inbox
        </span>
        .
        <br />
        Become the{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-600 animate-none">
          hero
        </span>{" "}
        of your day.
      </h1>
      <p className="text-center text-muted-foreground text-md w-1/3">
        Inbox Hero turns email overload into a fast-paced, focused mission.
        Triage one email at a time with a timer, and make quick decisions.
      </p>
        <div className="flex gap-4 mt-4">
          <Button variant="default" asChild>
            <Link
              href="https://github.com/Jay-Karia/inbox-hero"
              target="_blank"
            >
              <FaGithub className="inline" />
              GitHub
            </Link>
          </Button>
          <SignIn variant="glass" />
        </div>
        <BackgroundGradient className="flex justify-center items-center">
          <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center">
            <div className="border bg-gray-300 rounded-lg w-[45%] h-2/3 absolute bottom-0"></div>
          </div>
        </BackgroundGradient>
    </div>
  );
}
