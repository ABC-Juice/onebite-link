"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useFolders } from "@/lib/folder-store";
import { useLinks } from "@/lib/link-store";
import type { LinkPreview } from "@/app/api/link-preview/route";
import LinkUrlInput from "./link-url-input";
import FolderSelect from "./folder-select";
import SaveButton from "./save-button";

export default function NewLinkForm() {
  const router = useRouter();
  const { folders } = useFolders();
  const { addLink } = useLinks();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const url = String(formData.get("url") ?? "").trim();
    const folderId = String(formData.get("folderId") ?? "");

    if (!url) {
      setError("링크 주소를 입력해주세요.");
      return;
    }
    if (!folderId) {
      setError("폴더를 선택해주세요.");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `/api/link-preview?url=${encodeURIComponent(url)}`,
      );
      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "링크 정보를 가져오지 못했어요.");
        return;
      }

      const preview = data as LinkPreview;

      addLink({
        url: preview.url,
        title: preview.title,
        description: preview.description,
        thumbnail: preview.thumbnail,
        folderId,
      });

      router.push(`/folder/${folderId}`);
    } catch {
      setError("링크 정보를 가져오지 못했어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-md flex-col gap-5 pt-6"
    >
      <h1 className="text-[22px] font-semibold tracking-tight text-[var(--text)]">
        새 링크 추가
      </h1>
      <LinkUrlInput />
      <FolderSelect folders={folders} />
      {error && (
        <p role="alert" className="text-sm text-[var(--error)]">
          {error}
        </p>
      )}
      <SaveButton pending={isSubmitting} />
    </form>
  );
}
