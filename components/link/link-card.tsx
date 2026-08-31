import type { LinkItem } from "@/lib/types";

function getHostname(url: string) {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

export default function LinkCard({ link }: { link: LinkItem }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-surface group flex flex-col overflow-hidden rounded-xl"
    >
      <div className="flex aspect-video items-center justify-center bg-[var(--divider)] text-3xl">
        🔖
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
  );
}
