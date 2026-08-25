import type { Folder } from "@/lib/types";
import AllButton from "./all-button";
import FolderList from "./folder-list";

export default function Sidebar({ folders }: { folders: Folder[] }) {
  return (
    <aside className="flex w-60 shrink-0 flex-col overflow-y-auto border-r border-zinc-200 bg-white px-3 py-4 dark:border-zinc-800 dark:bg-black">
      <AllButton />
      <FolderList folders={folders} />
    </aside>
  );
}
