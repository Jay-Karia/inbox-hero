"use client";

import { sessionActiveAtom } from "@/atoms";
import Logo from "./logo";
import SignIn from "./sign-in";
import DailyGoalButton from "./ui/daily-goal";
import {
  ResizableNavbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
  NavbarButton,
} from "@/components/ui/resizable-navbar";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { GoHeartFill } from "react-icons/go";
import { SignedIn } from "@clerk/nextjs"; // Import SignedIn to conditionally show the daily goal button

export default function Navbar() {
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Dashboard",
      link: "dashboard",
    },
    {
      name: "Triage",
      link: "triage",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Remove navbar when session is active
  const isSessionActive = useAtomValue(sessionActiveAtom);
  if (isSessionActive) return;

  return (
    <div className="relative w-full">
      <ResizableNavbar>
        {/* Desktop Navigation */}
        <NavBody>
          <Logo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-2">
            {/* Daily Goal Button - only show when signed in */}
            <SignedIn>
              <DailyGoalButton />
            </SignedIn>

            <NavbarButton variant="secondary">
              <SignIn />
            </NavbarButton>
            <NavbarButton variant="donate" className="flex items-center">
              <GoHeartFill className="inline mr-1" />
              Donate
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <Logo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              {/* Add Daily Goal option to mobile menu too */}
              <SignedIn>
                <div className="flex items-center justify-between p-2 border rounded-md">
                  <span>Daily Goal</span>
                  <DailyGoalButton />
                </div>
              </SignedIn>

              <SignIn className="w-full" />
              <NavbarButton variant="donate">
                <GoHeartFill className="inline mr-1" />
                Donate
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </ResizableNavbar>
    </div>
  );
}
