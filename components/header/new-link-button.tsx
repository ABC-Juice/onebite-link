import Link from "next/link";

export default function NewLinkButton() {
  return (
    <Link
      href="/new"
      className="flex h-10 items-center gap-1.5 rounded-full bg-zinc-900 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
    >
      <span className="text-base leading-none" aria-hidden>
        +
      </span>
      새 링크
    </Link>
  );
}
