import Sidebar from "@/components/sidebar/sidebar";
import LinkGrid from "@/components/link/link-grid";
import { links } from "@/lib/mock-data";

export default function Home() {
  return (
    <>
      <Sidebar />
      <main className="flex-1 overflow-y-auto px-8 py-10">
        <LinkGrid links={links} />
      </main>
    </>
  );
}
