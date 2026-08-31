"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Folder } from "@/lib/types";

export default function FolderItem({ folder }: { folder: Folder }) {
  const pathname = usePathname();
  const isActive = pathname === `/folder/${folder.id}`;

  return (
    <Link
      href={`/folder/${folder.id}`}
      aria-current={isActive ? "true" : undefined}
      className={`nav-item flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm ${
        isActive ? "nav-item-active" : ""
      }`}
    >
      <span className="truncate">{folder.name}</span>
      <span className="badge rounded-full px-2 py-0.5 text-[11px] leading-none">
        {folder.linkCount}
      </span>
    </Link>
  );
}
