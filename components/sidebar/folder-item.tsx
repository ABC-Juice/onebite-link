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
      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
        isActive
          ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50"
          : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
      }`}
    >
      <span className="truncate">{folder.name}</span>
      <span className="text-xs text-zinc-400 dark:text-zinc-500">
        {folder.linkCount}
      </span>
    </Link>
  );
}
