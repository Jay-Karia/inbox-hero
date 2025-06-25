import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { PROTECTED_ROUTES } from "./routes";

// Use proper typing for the middleware function
export default clerkMiddleware(async (auth, req) => {
  const path = req.nextUrl.pathname;
  const { userId } = await auth();

  // Check if the path is a protected route and user is not authenticated
  if (
    PROTECTED_ROUTES.some((route) => path.startsWith(route)) &&
    userId === null
  ) {
    // Create the login URL with proper typing
    const loginUrl = new URL("/", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
