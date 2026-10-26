import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const [rawTitle = "", slugArgument = ""] = process.argv.slice(2);
const title = rawTitle.trim();

if (!title) {
  console.error('用法: npm run new -- "文章标题" [英文-slug]');
  process.exit(1);
}

const now = new Date();
const date = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Shanghai",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(now);

const requestedSlug = slugArgument.trim().toLowerCase();
const fallbackSlug = `note-${date.replaceAll("-", "")}`;
const slug = (requestedSlug || fallbackSlug)
  .replace(/[^a-z0-9-]+/g, "-")
  .replace(/^-+|-+$/g, "");

const baseName = `${date}-${slug}`;
const postsDir = path.join(root, "src", "content", "posts");
const assetsDir = path.join(postsDir, `${baseName}-assets`);
const postPath = path.join(postsDir, `${baseName}.md`);

const escapedTitle = title.replaceAll('"', '\\"');
const content = `---
title: "${escapedTitle}"
description: ""
published: ${date}
tags: []
draft: true
featured: false
---

从这里开始写。
`;

await mkdir(assetsDir, { recursive: true });
await writeFile(path.join(assetsDir, ".gitkeep"), "", { flag: "wx" });
await writeFile(postPath, content, { flag: "wx" });

console.log(`已创建: ${path.relative(root, postPath)}`);
console.log(`图片目录: ${path.relative(root, assetsDir)}`);
