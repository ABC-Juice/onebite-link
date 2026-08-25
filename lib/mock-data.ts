import type { Folder, LinkItem } from "./types";

const folderMeta: Omit<Folder, "linkCount">[] = [
  { id: "dev", name: "개발" },
  { id: "design", name: "디자인" },
  { id: "reading", name: "읽을거리" },
  { id: "etc", name: "기타" },
];

export const links: LinkItem[] = [
  {
    id: "1",
    title: "Next.js Documentation",
    url: "https://nextjs.org/docs",
    description: "Next.js 공식 문서에서 App Router와 최신 기능을 확인해요.",
    folderId: "dev",
  },
  {
    id: "2",
    title: "MDN Web Docs",
    url: "https://developer.mozilla.org",
    description: "웹 표준과 브라우저 API를 찾아볼 때 가장 먼저 여는 곳.",
    folderId: "dev",
  },
  {
    id: "3",
    title: "TypeScript Handbook",
    url: "https://www.typescriptlang.org/docs/handbook/intro.html",
    description: "타입스크립트 문법과 개념을 정리한 공식 핸드북.",
    folderId: "dev",
  },
  {
    id: "4",
    title: "Refactoring UI",
    url: "https://www.refactoringui.com",
    description: "개발자를 위한 실전 UI 디자인 팁 모음.",
    folderId: "design",
  },
  {
    id: "5",
    title: "Coolors",
    url: "https://coolors.co",
    description: "빠르게 색상 팔레트를 만들고 조합해볼 수 있는 도구.",
    folderId: "design",
  },
  {
    id: "6",
    title: "한입 크기로 읽는 아티클",
    url: "https://example.com/articles",
    description: "출퇴근길에 부담 없이 읽기 좋은 짧은 글 모음.",
    folderId: "reading",
  },
  {
    id: "7",
    title: "이번 주 뉴스레터",
    url: "https://example.com/newsletter",
    description: "이번 주에 놓치면 안 될 소식을 한 번에 정리했어요.",
    folderId: "reading",
  },
  {
    id: "8",
    title: "GitHub",
    url: "https://github.com",
    description: "코드를 올리고 협업하는 곳.",
    folderId: "etc",
  },
];

export const folders: Folder[] = folderMeta.map((folder) => ({
  ...folder,
  linkCount: links.filter((link) => link.folderId === folder.id).length,
}));
