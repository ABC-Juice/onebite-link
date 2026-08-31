import type { Folder } from "@/lib/types";
import AllButton from "./all-button";
import FolderList from "./folder-list";

export default function Sidebar({ folders }: { folders: Folder[] }) {
  return (
    <aside className="flex w-60 shrink-0 flex-col overflow-y-auto border-r border-[var(--divider)] bg-[var(--background)] px-4 py-6">
      <AllButton />
      <FolderList folders={folders} />
    </aside>
  );
}
