export default function SaveButton({ pending = false }: { pending?: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary mt-2 h-12 rounded-full text-[15px] font-medium"
    >
      {pending ? "링크 정보를 가져오는 중..." : "확인"}
    </button>
  );
}
