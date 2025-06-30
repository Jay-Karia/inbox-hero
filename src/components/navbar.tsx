"use client";

import Logo from "./logo";
import SignIn from "./sign-in";
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
import { useState } from "react";
import { GoHeartFill } from "react-icons/go";
import { useUser } from "@clerk/nextjs";

export default function Navbar() {
  const { isLoaded } = useUser(); // Track loading state
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
      name: "Clean Up",
      link: "clean",
    },
    {
      name: "Triage",
      link: "triage",
    }
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Skeleton component for loading state
  const AuthSkeleton = ({ mobile = false }) => (
    <div className={`${mobile ? 'w-full' : ''} flex items-center gap-2`}>
      <div className={`bg-gray-700 rounded-md animate-pulse h-9 ${mobile ? 'w-full' : 'w-20'}`}></div>
      {!mobile && (
        <div className="bg-gray-700 rounded-md animate-pulse h-9 w-24"></div>
      )}
    </div>
  );

  return (
    <div className="relative w-full">
      <ResizableNavbar>
        {/* Desktop Navigation */}
        <NavBody>
          <Logo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-2">
            {!isLoaded ? (
              <AuthSkeleton />
            ) : (
              <>
                <NavbarButton variant="secondary">
                  <SignIn />
                </NavbarButton>
                <NavbarButton variant="donate" className="flex items-center">
                  <GoHeartFill className="inline mr-1" />
                  Donate
                </NavbarButton>
              </>
            )}
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
              {!isLoaded ? (
                <AuthSkeleton mobile={true} />
              ) : (
                <>
                  <SignIn className="w-full" />
                  <NavbarButton variant="donate">
                    <GoHeartFill className="inline mr-1" />
                    Donate
                  </NavbarButton>
                </>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </ResizableNavbar>
    </div>
  );
}
