export default function LinkUrlInput() {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor="link-url"
        className="text-sm font-medium text-[var(--text)]"
      >
        링크 주소
      </label>
      <input
        id="link-url"
        name="url"
        type="url"
        placeholder="https://example.com"
        className="input-field h-11 rounded-[10px] px-4 text-[15px]"
      />
    </div>
  );
}
