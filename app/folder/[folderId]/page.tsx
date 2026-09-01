import Sidebar from "@/components/sidebar/sidebar";
import FolderLinkGrid from "@/components/link/folder-link-grid";

export default async function FolderPage(
  props: PageProps<"/folder/[folderId]">,
) {
  const { folderId } = await props.params;

  return (
    <>
      <Sidebar />
      <main className="flex-1 overflow-y-auto px-8 py-10">
        <FolderLinkGrid folderId={folderId} />
      </main>
    </>
  );
}
