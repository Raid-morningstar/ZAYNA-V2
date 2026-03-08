"use client";

import { useHydrated } from "@/hooks";
import { cn } from "@/lib/utils";
import SignInClient from "./SignInClient";

const SignIn = ({ className }: { className?: string }) => {
  const mounted = useHydrated();

  if (!mounted) {
    return (
      <button
        type="button"
        disabled
        className={cn(
          "rounded-full border border-shop_light_green/30 bg-white/90 px-3 py-1.5 text-sm font-semibold text-lightColor/70 shadow-[0_10px_24px_-20px_rgba(22,46,110,0.9)]",
          className
        )}
      >
        Connexion
      </button>
    );
  }

  return <SignInClient className={className} />;
};

export default SignIn;
