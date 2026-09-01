"use client";

import { useLinks } from "@/lib/link-store";
import LinkGrid from "./link-grid";

export default function FolderLinkGrid({ folderId }: { folderId: string }) {
  const { links } = useLinks();
  const folderLinks = links.filter((link) => link.folderId === folderId);

  return <LinkGrid links={folderLinks} />;
}
