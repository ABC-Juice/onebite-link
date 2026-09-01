import { NextRequest, NextResponse } from "next/server";

export type LinkPreview = {
  url: string;
  title: string;
  description: string;
  thumbnail: string;
};

export async function GET(request: NextRequest) {
  const rawUrl = request.nextUrl.searchParams.get("url");

  if (!rawUrl) {
    return NextResponse.json(
      { error: "url 파라미터가 필요해요." },
      { status: 400 },
    );
  }

  let targetUrl: URL;
  try {
    targetUrl = new URL(rawUrl);
    if (targetUrl.protocol !== "http:" && targetUrl.protocol !== "https:") {
      throw new Error("unsupported protocol");
    }
  } catch {
    return NextResponse.json(
      { error: "올바른 링크 주소를 입력해주세요." },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; OnebiteLinkBot/1.0; +https://onebite.link)",
        Accept: "text/html,application/xhtml+xml",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "링크 정보를 가져오지 못했어요." },
        { status: 502 },
      );
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("text/html")) {
      const preview: LinkPreview = {
        url: targetUrl.toString(),
        title: targetUrl.hostname,
        description: "",
        thumbnail: "",
      };
      return NextResponse.json(preview);
    }

    const html = await response.text();
    const meta = extractOpenGraph(html);

    const preview: LinkPreview = {
      url: targetUrl.toString(),
      title: meta.title || targetUrl.hostname,
      description: meta.description || "",
      thumbnail: resolveUrl(meta.image, targetUrl),
    };

    return NextResponse.json(preview);
  } catch {
    return NextResponse.json(
      { error: "링크 정보를 가져오지 못했어요." },
      { status: 502 },
    );
  }
}

function extractOpenGraph(html: string) {
  const meta = parseMetaTags(html);

  const title =
    meta.get("og:title") || meta.get("twitter:title") || extractTitleTag(html);
  const description =
    meta.get("og:description") ||
    meta.get("twitter:description") ||
    meta.get("description");
  const image = meta.get("og:image") || meta.get("twitter:image");

  return { title, description, image };
}

function parseMetaTags(html: string): Map<string, string> {
  const metaMap = new Map<string, string>();
  const metaTagPattern = /<meta\b[^>]*>/gi;
  const attrPattern = /([a-zA-Z-:]+)\s*=\s*("([^"]*)"|'([^']*)')/g;

  const tags = html.match(metaTagPattern) ?? [];
  for (const tag of tags) {
    const attrs: Record<string, string> = {};
    let attrMatch: RegExpExecArray | null;
    attrPattern.lastIndex = 0;
    while ((attrMatch = attrPattern.exec(tag))) {
      const name = attrMatch[1].toLowerCase();
      attrs[name] = attrMatch[3] ?? attrMatch[4] ?? "";
    }

    const key = (attrs.property || attrs.name || "").toLowerCase();
    if (key && attrs.content !== undefined && !metaMap.has(key)) {
      metaMap.set(key, decodeHtmlEntities(attrs.content));
    }
  }

  return metaMap;
}

function extractTitleTag(html: string): string | undefined {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match?.[1] ? decodeHtmlEntities(match[1].trim()) : undefined;
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#0*39;/g, "'")
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCodePoint(parseInt(hex, 16)),
    )
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .trim();
}

function resolveUrl(value: string | undefined, base: URL): string {
  if (!value) return "";
  try {
    return new URL(value, base).toString();
  } catch {
    return "";
  }
}
