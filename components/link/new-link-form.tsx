import type { Folder } from "@/lib/types";
import LinkUrlInput from "./link-url-input";
import FolderSelect from "./folder-select";
import SaveButton from "./save-button";

export default function NewLinkForm({ folders }: { folders: Folder[] }) {
  return (
    <form className="mx-auto flex w-full max-w-lg flex-col gap-5">
      <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        새 링크 추가
      </h1>
      <LinkUrlInput />
      <FolderSelect folders={folders} />
      <SaveButton />
    </form>
  );
}
