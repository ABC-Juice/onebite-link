import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-1.5 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50"
    >
      <span className="text-2xl" aria-hidden>
        🔗
      </span>
      한입 링크
    </Link>
  );
}
