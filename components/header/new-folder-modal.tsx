"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useFolders } from "@/lib/folder-store";

export default function NewFolderModal({ onClose }: { onClose: () => void }) {
  const { addFolder } = useFolders();
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
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
    const trimmed = name.trim();
    if (!trimmed) return;
    addFolder(trimmed);
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
        aria-labelledby="new-folder-title"
        className="modal-panel w-full max-w-sm rounded-2xl p-6"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <h2
            id="new-folder-title"
            className="text-[20px] font-semibold tracking-tight text-[var(--text)]"
          >
            새 폴더 만들기
          </h2>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="new-folder-name"
              className="text-sm font-medium text-[var(--text)]"
            >
              폴더 이름
            </label>
            <input
              ref={inputRef}
              id="new-folder-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="폴더 이름을 입력하세요"
              className="input-field h-11 w-full rounded-[10px] px-4 text-[15px]"
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
              disabled={!name.trim()}
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
