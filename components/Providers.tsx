"use client";

import { HeroUIProvider } from "@heroui/system";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <HeroUIProvider
        disableAnimation={false}
        skipFramerMotionAnimations={false}
        reducedMotion="never"
      >
        {children}
      </HeroUIProvider>
    </SessionProvider>
  );
}
