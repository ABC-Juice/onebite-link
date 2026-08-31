import Logo from "./logo";
import NewFolderButton from "./new-folder-button";
import NewLinkButton from "./new-link-button";

export default function Header() {
  return (
    <header className="nav-blur sticky top-0 z-10 flex h-14 shrink-0 items-center justify-between border-b border-[var(--divider)] px-6">
      <Logo />
      <div className="flex items-center gap-2">
        <NewFolderButton />
        <NewLinkButton />
      </div>
    </header>
  );
}
