import type { Folder } from "@/lib/types";

export default function FolderSelect({ folders }: { folders: Folder[] }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor="folder"
        className="text-sm font-medium text-[var(--text)]"
      >
        폴더
      </label>
      <div className="relative">
        <select
          id="folder"
          name="folderId"
          defaultValue=""
          className="input-field h-11 w-full appearance-none rounded-[10px] px-4 pr-9 text-[15px]"
        >
          <option value="" disabled>
            폴더를 선택하세요
          </option>
          {folders.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
        <span
          className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-[var(--text-sub)]"
          aria-hidden
        >
          ▾
        </span>
      </div>
    </div>
  );
}
