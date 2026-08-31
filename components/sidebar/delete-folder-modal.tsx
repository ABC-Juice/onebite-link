"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Folder } from "@/lib/types";
import { useFolders } from "@/lib/folder-store";

export default function DeleteFolderModal({
  folder,
  onClose,
}: {
  folder: Folder;
  onClose: () => void;
}) {
  const { deleteFolder } = useFolders();
  const pathname = usePathname();
  const router = useRouter();
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    confirmButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleDelete = () => {
    deleteFolder(folder.id);
    if (pathname === `/folder/${folder.id}`) {
      router.push("/");
    }
    onClose();
  };

  return (
    <div
      className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-folder-title"
        className="modal-panel w-full max-w-sm rounded-2xl p-6"
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h2
              id="delete-folder-title"
              className="text-[20px] font-semibold tracking-tight text-[var(--text)]"
            >
              폴더 삭제
            </h2>
            <p className="text-sm text-[var(--text-sub)]">
              &apos;{folder.name}&apos; 폴더를 삭제하시겠어요? 폴더 안의
              링크도 함께 삭제되며, 이 작업은 되돌릴 수 없습니다.
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn-outline h-11 rounded-full px-5 text-[15px] font-medium"
            >
              취소
            </button>
            <button
              type="button"
              ref={confirmButtonRef}
              onClick={handleDelete}
              className="btn-danger h-11 rounded-full px-5 text-[15px] font-medium"
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
