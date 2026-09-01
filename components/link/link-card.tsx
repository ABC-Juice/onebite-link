"use client";

import { useState } from "react";
import type { LinkItem } from "@/lib/types";
import TrashIcon from "@/components/icons/trash-icon";
import DeleteLinkModal from "./delete-link-modal";

function getHostname(url: string) {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

export default function LinkCard({ link }: { link: LinkItem }) {
  const [thumbnailFailed, setThumbnailFailed] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const showThumbnail = Boolean(link.thumbnail) && !thumbnailFailed;

  return (
    <div className="group relative">
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="card-surface flex flex-col overflow-hidden rounded-xl"
      >
        <div className="flex aspect-video items-center justify-center overflow-hidden bg-[var(--divider)] text-3xl">
          {showThumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element -- thumbnails come from arbitrary external sites, so they can't go through next/image's remotePatterns allowlist.
            <img
              src={link.thumbnail}
              alt=""
              loading="lazy"
              onError={() => setThumbnailFailed(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            <span aria-hidden>🔖</span>
          )}
        </div>
        <div className="flex flex-col gap-1 p-4">
          <h3 className="line-clamp-1 text-[15px] font-semibold text-[var(--text)]">
            {link.title}
          </h3>
          <p className="line-clamp-2 text-[13px] text-[var(--text-sub)]">
            {link.description}
          </p>
          <span className="mt-1 truncate text-[12px] text-[var(--placeholder)]">
            {getHostname(link.url)}
          </span>
        </div>
      </a>
      <button
        type="button"
        onClick={() => setIsDeleteModalOpen(true)}
        aria-label={`${link.title} 링크 삭제`}
        className="delete-link-btn absolute top-2 right-2 rounded-full p-1.5 opacity-0 transition-opacity group-hover:opacity-100"
      >
        <TrashIcon />
      </button>
      {isDeleteModalOpen && (
        <DeleteLinkModal
          link={link}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
}
