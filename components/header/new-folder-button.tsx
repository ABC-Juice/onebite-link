"use client";

import { useState } from "react";
import NewFolderModal from "./new-folder-modal";

export default function NewFolderButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="btn-outline flex h-9 items-center gap-1 rounded-full px-4 text-[14px] font-medium"
      >
        <span className="text-base leading-none" aria-hidden>
          +
        </span>
        새 폴더
      </button>
      {isOpen && <NewFolderModal onClose={() => setIsOpen(false)} />}
    </>
  );
}
