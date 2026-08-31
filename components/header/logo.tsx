import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-1.5 text-[17px] font-semibold tracking-tight text-[var(--text)]"
    >
      <span className="text-lg" aria-hidden>
        🔗
      </span>
      한입 링크
    </Link>
  );
}
