import type { Folder } from "@/lib/types";
import FolderItem from "./folder-item";

export default function FolderList({ folders }: { folders: Folder[] }) {
  return (
    <ul className="mt-4 flex flex-col gap-1">
      {folders.map((folder) => (
        <li key={folder.id}>
          <FolderItem folder={folder} />
        </li>
      ))}
    </ul>
  );
}
