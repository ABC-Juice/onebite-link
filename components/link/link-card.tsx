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
      className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
    >
      <div className="flex aspect-video items-center justify-center bg-zinc-100 text-3xl dark:bg-zinc-900">
        🔖
      </div>
      <div className="flex flex-col gap-1 p-4">
        <h3 className="line-clamp-1 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          {link.title}
        </h3>
        <p className="line-clamp-2 text-xs text-zinc-500 dark:text-zinc-400">
          {link.description}
        </p>
        <span className="mt-1 truncate text-xs text-zinc-400 dark:text-zinc-500">
          {getHostname(link.url)}
        </span>
      </div>
    </a>
  );
}
