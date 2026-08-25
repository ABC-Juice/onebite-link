"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AllButton() {
  const pathname = usePathname();
  const isActive = pathname === "/";

  return (
    <Link
      href="/"
      aria-current={isActive ? "true" : undefined}
      className={`flex w-full items-center rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
        isActive
          ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
          : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
      }`}
    >
      ALL
    </Link>
  );
}
