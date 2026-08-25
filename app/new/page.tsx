import Sidebar from "@/components/sidebar/sidebar";
import NewLinkForm from "@/components/link/new-link-form";
import { folders } from "@/lib/mock-data";

export default function NewLinkPage() {
  return (
    <>
      <Sidebar folders={folders} />
      <main className="flex-1 overflow-y-auto p-6">
        <NewLinkForm folders={folders} />
      </main>
    </>
  );
}
