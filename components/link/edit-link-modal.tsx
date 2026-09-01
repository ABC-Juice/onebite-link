"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { LinkItem } from "@/lib/types";
import { useFolders } from "@/lib/folder-store";
import { useLinks } from "@/lib/link-store";

export default function EditLinkModal({
  link,
  onClose,
}: {
  link: LinkItem;
  onClose: () => void;
}) {
  const { folders } = useFolders();
  const { updateLink } = useLinks();
  const [folderId, setFolderId] = useState(link.folderId);
  const [title, setTitle] = useState(link.title);
  const [description, setDescription] = useState(link.description);
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleInputRef.current?.focus();
    titleInputRef.current?.select();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle || !folderId) return;

    updateLink(link.id, {
      title: trimmedTitle,
      description: description.trim(),
      folderId,
    });
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
        aria-labelledby="edit-link-title"
        className="modal-panel w-full max-w-sm rounded-2xl p-6"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <h2
            id="edit-link-title"
            className="text-[20px] font-semibold tracking-tight text-[var(--text)]"
          >
            링크 수정
          </h2>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="edit-link-folder"
              className="text-sm font-medium text-[var(--text)]"
            >
              폴더
            </label>
            <div className="relative">
              <select
                id="edit-link-folder"
                value={folderId}
                onChange={(event) => setFolderId(event.target.value)}
                required
                className="input-field h-11 w-full appearance-none rounded-[10px] px-4 pr-9 text-[15px]"
              >
                {folders.map((folder) => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                ))}
              </select>
              <span
                className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-[var(--text-sub)]"
                aria-hidden
              >
                ▾
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="edit-link-title-input"
              className="text-sm font-medium text-[var(--text)]"
            >
              제목
            </label>
            <input
              ref={titleInputRef}
              id="edit-link-title-input"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="링크 제목을 입력하세요"
              className="input-field h-11 w-full rounded-[10px] px-4 text-[15px]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="edit-link-description"
              className="text-sm font-medium text-[var(--text)]"
            >
              설명
            </label>
            <textarea
              id="edit-link-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="링크 설명을 입력하세요"
              rows={3}
              className="input-field w-full resize-none rounded-[10px] px-4 py-2.5 text-[15px]"
            />
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
              type="submit"
              disabled={!title.trim()}
              className="btn-primary h-11 rounded-full px-5 text-[15px] font-medium"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
