export default function LinkUrlInput() {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor="link-url"
        className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
      >
        링크 주소
      </label>
      <input
        id="link-url"
        name="url"
        type="url"
        placeholder="https://example.com"
        className="h-11 rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-600 dark:focus:border-zinc-600"
      />
    </div>
  );
}
