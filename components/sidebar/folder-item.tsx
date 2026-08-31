"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Folder } from "@/lib/types";
import DeleteFolderModal from "./delete-folder-modal";

export default function FolderItem({ folder }: { folder: Folder }) {
  const pathname = usePathname();
  const isActive = pathname === `/folder/${folder.id}`;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div className="group relative">
      <Link
        href={`/folder/${folder.id}`}
        aria-current={isActive ? "true" : undefined}
        className={`nav-item flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm ${
          isActive ? "nav-item-active" : ""
        }`}
      >
        <span className="truncate pr-2">{folder.name}</span>
        <span className="badge rounded-full px-2 py-0.5 text-[11px] leading-none transition-opacity group-hover:opacity-0">
          {folder.linkCount}
        </span>
      </Link>
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          setIsDeleteModalOpen(true);
        }}
        aria-label={`${folder.name} 폴더 삭제`}
        className={`delete-folder-btn absolute top-1/2 right-1.5 -translate-y-1/2 rounded-md p-1 opacity-0 transition-opacity group-hover:opacity-100 ${
          isActive ? "delete-folder-btn-active" : ""
        }`}
      >
        <TrashIcon />
      </button>
      {isDeleteModalOpen && (
        <DeleteFolderModal
          folder={folder}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
}

function TrashIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden
    >
      <path d="M4 7h16" />
      <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
      <path d="M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  );
}
