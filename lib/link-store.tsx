"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { LinkItem } from "@/lib/types";
import { links as initialLinks } from "@/lib/mock-data";
import { useFolders } from "@/lib/folder-store";

type NewLinkInput = {
  url: string;
  title: string;
  description: string;
  thumbnail?: string;
  folderId: string;
};

type LinkUpdateInput = {
  title: string;
  description: string;
  folderId: string;
};

type LinkContextValue = {
  links: LinkItem[];
  addLink: (input: NewLinkInput) => void;
  updateLink: (id: string, updates: LinkUpdateInput) => void;
  deleteLink: (id: string) => void;
};

const LinkContext = createContext<LinkContextValue | null>(null);

export function LinkProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<LinkItem[]>(initialLinks);
  const { incrementLinkCount, decrementLinkCount } = useFolders();

  const addLink = useCallback(
    (input: NewLinkInput) => {
      const newLink: LinkItem = {
        id: crypto.randomUUID(),
        title: input.title,
        url: input.url,
        description: input.description,
        thumbnail: input.thumbnail,
        folderId: input.folderId,
      };

      setLinks((prev) => [newLink, ...prev]);
      incrementLinkCount(input.folderId);
    },
    [incrementLinkCount],
  );

  const updateLink = useCallback(
    (id: string, updates: LinkUpdateInput) => {
      const target = links.find((link) => link.id === id);
      if (!target) return;

      setLinks((prev) =>
        prev.map((link) => (link.id === id ? { ...link, ...updates } : link)),
      );

      if (updates.folderId !== target.folderId) {
        incrementLinkCount(updates.folderId);
        decrementLinkCount(target.folderId);
      }
    },
    [links, incrementLinkCount, decrementLinkCount],
  );

  const deleteLink = useCallback(
    (id: string) => {
      const target = links.find((link) => link.id === id);
      if (!target) return;

      setLinks((prev) => prev.filter((link) => link.id !== id));
      decrementLinkCount(target.folderId);
    },
    [links, decrementLinkCount],
  );

  return (
    <LinkContext.Provider value={{ links, addLink, updateLink, deleteLink }}>
      {children}
    </LinkContext.Provider>
  );
}

export function useLinks() {
  const context = useContext(LinkContext);
  if (!context) {
    throw new Error("useLinks must be used within a LinkProvider");
  }
  return context;
}
