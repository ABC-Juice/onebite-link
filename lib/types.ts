export type Folder = {
  id: string;
  name: string;
  linkCount: number;
};

export type LinkItem = {
  id: string;
  title: string;
  url: string;
  description: string;
  thumbnail?: string;
  folderId: string;
};
