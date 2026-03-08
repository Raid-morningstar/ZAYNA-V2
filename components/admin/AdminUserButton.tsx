"use client";

import { useHydrated } from "@/hooks";
import { cn } from "@/lib/utils";
import AdminUserButtonClient from "./AdminUserButtonClient";

type AdminUserButtonProps = {
  size?: "sm" | "md";
  className?: string;
};

const sizeClassNames = {
  sm: "h-8 w-8",
  md: "h-9 w-9",
} as const;

export default function AdminUserButton({
  size = "md",
  className,
}: AdminUserButtonProps) {
  const mounted = useHydrated();

  return (
    <div
      className={cn(
        "flex items-center justify-center",
        sizeClassNames[size],
        className
      )}
    >
      {mounted ? (
        <AdminUserButtonClient />
      ) : (
        <div className="h-full w-full rounded-full border border-white/12 bg-white/10" />
      )}
    </div>
  );
}
