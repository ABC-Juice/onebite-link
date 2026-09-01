"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { Folder } from "@/lib/types";
import { folders as initialFolders } from "@/lib/mock-data";

type FolderContextValue = {
  folders: Folder[];
  addFolder: (name: string) => void;
  renameFolder: (id: string, name: string) => void;
  deleteFolder: (id: string) => void;
  incrementLinkCount: (id: string) => void;
  decrementLinkCount: (id: string) => void;
};

const FolderContext = createContext<FolderContextValue | null>(null);

export function FolderProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);

  const addFolder = useCallback((name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;

    setFolders((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: trimmed, linkCount: 0 },
    ]);
  }, []);

  const renameFolder = useCallback((id: string, name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;

    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === id ? { ...folder, name: trimmed } : folder,
      ),
    );
  }, []);

  const deleteFolder = useCallback((id: string) => {
    setFolders((prev) => prev.filter((folder) => folder.id !== id));
  }, []);

  const incrementLinkCount = useCallback((id: string) => {
    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === id
          ? { ...folder, linkCount: folder.linkCount + 1 }
          : folder,
      ),
    );
  }, []);

  const decrementLinkCount = useCallback((id: string) => {
    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === id
          ? { ...folder, linkCount: Math.max(0, folder.linkCount - 1) }
          : folder,
      ),
    );
  }, []);

  return (
    <FolderContext.Provider
      value={{
        folders,
        addFolder,
        renameFolder,
        deleteFolder,
        incrementLinkCount,
        decrementLinkCount,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
}

export function useFolders() {
  const context = useContext(FolderContext);
  if (!context) {
    throw new Error("useFolders must be used within a FolderProvider");
  }
  return context;
}
