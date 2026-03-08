"use client";

import { SignInButton } from "@clerk/nextjs";

import { cn } from "@/lib/utils";

export default function SignInClient({ className }: { className?: string }) {
  return (
    <SignInButton mode="modal">
      <button
        type="button"
        className={cn(
          "rounded-full border border-shop_light_green/30 bg-white/90 px-3 py-1.5 text-sm font-semibold text-lightColor shadow-[0_10px_24px_-20px_rgba(22,46,110,0.9)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-shop_light_green/70 hover:text-shop_dark_green",
          className
        )}
      >
        Connexion
      </button>
    </SignInButton>
  );
}
