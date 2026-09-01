import Sidebar from "@/components/sidebar/sidebar";
import NewLinkForm from "@/components/link/new-link-form";

export default function NewLinkPage() {
  return (
    <>
      <Sidebar />
      <main className="flex-1 overflow-y-auto px-8 py-10">
        <NewLinkForm />
      </main>
    </>
  );
}
