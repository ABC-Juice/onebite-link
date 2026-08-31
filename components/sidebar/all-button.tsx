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
      className={`nav-item flex w-full items-center rounded-lg px-3 py-2 text-sm font-semibold ${
        isActive ? "nav-item-active" : ""
      }`}
    >
      ALL
    </Link>
  );
}
