import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/header/header";
import { FolderProvider } from "@/lib/folder-store";
import { LinkProvider } from "@/lib/link-store";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "한입 링크",
  description: "한입 크기로 모아보는 북마크 서비스",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex h-full flex-col bg-[var(--background)] text-[var(--text)]">
        <FolderProvider>
          <LinkProvider>
            <Header />
            <div className="flex flex-1 overflow-hidden">{children}</div>
          </LinkProvider>
        </FolderProvider>
      </body>
    </html>
  );
}
