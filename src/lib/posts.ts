import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"posts">;

export async function getPosts(includeDrafts = false): Promise<Post[]> {
  const posts = await getCollection("posts", ({ data }) => {
    return includeDrafts || !data.draft || import.meta.env.DEV;
  });

  return posts.sort(
    (a, b) => b.data.published.getTime() - a.data.published.getTime(),
  );
}

export function postHref(post: Post): string {
  return `/posts/${post.id}/`;
}

export function formatDate(date: Date, style: "long" | "short" = "long"): string {
  if (style === "short") {
    return new Intl.DateTimeFormat("zh-CN", {
      month: "2-digit",
      day: "2-digit",
      timeZone: "Asia/Shanghai",
    })
      .format(date)
      .replace("/", ".");
  }

  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Shanghai",
  })
    .format(date)
    .replaceAll("/", ".");
}

export function readingTime(post: Post): number {
  const characters = post.body?.replace(/\s+/g, "").length ?? 0;
  return Math.max(2, Math.ceil(characters / 480));
}

export function excerpt(post: Post, limit = 96): string {
  if (post.data.description) return post.data.description;

  const plain = (post.body ?? "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return plain.length > limit ? `${plain.slice(0, limit)}...` : plain;
}

export function groupByYear(posts: Post[]): Array<[string, Post[]]> {
  const groups = new Map<string, Post[]>();

  for (const post of posts) {
    const year = new Intl.DateTimeFormat("zh-CN", {
      year: "numeric",
      timeZone: "Asia/Shanghai",
    }).format(post.data.published);
    const yearPosts = groups.get(year) ?? [];
    yearPosts.push(post);
    groups.set(year, yearPosts);
  }

  return [...groups.entries()];
}
