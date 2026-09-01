"use client";

import { useEffect, useRef } from "react";
import type { LinkItem } from "@/lib/types";
import { useLinks } from "@/lib/link-store";

export default function DeleteLinkModal({
  link,
  onClose,
}: {
  link: LinkItem;
  onClose: () => void;
}) {
  const { deleteLink } = useLinks();
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
    deleteLink(link.id);
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
        aria-labelledby="delete-link-title"
        className="modal-panel w-full max-w-sm rounded-2xl p-6"
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h2
              id="delete-link-title"
              className="text-[20px] font-semibold tracking-tight text-[var(--text)]"
            >
              링크 삭제
            </h2>
            <p className="text-sm text-[var(--text-sub)]">
              &apos;{link.title}&apos; 링크를 삭제하시겠어요? 이 작업은
              되돌릴 수 없습니다.
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
