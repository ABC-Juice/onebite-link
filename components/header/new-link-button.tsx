import Link from "next/link";

export default function NewLinkButton() {
  return (
    <Link
      href="/new"
      className="btn-primary flex h-9 items-center gap-1 rounded-full px-4 text-[14px] font-medium"
    >
      <span className="text-base leading-none" aria-hidden>
        +
      </span>
      새 링크
    </Link>
  );
}
