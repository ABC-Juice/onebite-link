"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Folder } from "@/lib/types";
import TrashIcon from "@/components/icons/trash-icon";
import EditFolderModal from "./edit-folder-modal";
import DeleteFolderModal from "./delete-folder-modal";

export default function FolderItem({ folder }: { folder: Folder }) {
  const pathname = usePathname();
  const isActive = pathname === `/folder/${folder.id}`;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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
      <div className="absolute top-1/2 right-1.5 flex -translate-y-1/2 items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            setIsEditModalOpen(true);
          }}
          aria-label={`${folder.name} 폴더 수정`}
          className={`edit-folder-btn rounded-md p-1 ${
            isActive ? "edit-folder-btn-active" : ""
          }`}
        >
          <PencilIcon />
        </button>
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            setIsDeleteModalOpen(true);
          }}
          aria-label={`${folder.name} 폴더 삭제`}
          className={`delete-folder-btn rounded-md p-1 ${
            isActive ? "delete-folder-btn-active" : ""
          }`}
        >
          <TrashIcon />
        </button>
      </div>
      {isEditModalOpen && (
        <EditFolderModal
          folder={folder}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteFolderModal
          folder={folder}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
}

function PencilIcon() {
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
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}
