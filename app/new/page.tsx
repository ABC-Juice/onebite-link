import Sidebar from "@/components/sidebar/sidebar";
import NewLinkForm from "@/components/link/new-link-form";
import { folders } from "@/lib/mock-data";

export default function NewLinkPage() {
  return (
    <>
      <Sidebar folders={folders} />
      <main className="flex-1 overflow-y-auto px-8 py-10">
        <NewLinkForm folders={folders} />
      </main>
    </>
  );
}
