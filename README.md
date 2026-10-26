# Kori

一个以中文长文阅读为中心的个人博客。Astro 在构建阶段生成静态 HTML，页面默认不加载前端框架。

## 本地运行

```powershell
npm install
npm run dev
```

生产构建：

```powershell
npm run build
npm run preview
```

## 新建文章

```powershell
npm run new -- "文章标题" "article-slug"
```

脚本会在 `src/content/posts/` 中创建：

```text
2026-10-26-article-slug.md
2026-10-26-article-slug-assets/
```

文章默认是草稿。写作完成后，把 frontmatter 里的 `draft` 改成 `false`。

## Frontmatter

```yaml
title: 文章标题
description: 一句话摘要
published: 2026-10-26
updated: 2026-10-27
tags:
  - 写作
cover: ./2026-10-26-article-slug-assets/cover.jpg
coverAlt: 封面图片描述
featured: false
draft: true
```

`description`、`updated`、`tags`、`cover` 和 `coverAlt` 都是可选项。没有封面时，文章页不会显示图片占位。

## 文章图片

把图片放进文章对应的 assets 目录，然后使用普通 Markdown：

```md
![图片描述](./2026-10-26-article-slug-assets/figure.png)
```

构建时会生成 WebP/AVIF 和响应式尺寸。图片只在该文章实际引用时才会加载。

## 目录

```text
src/
  components/       展示组件
  content/posts/    Markdown 文章
  layouts/          页面骨架
  lib/              内容查询与格式化
  pages/            页面和 RSS
  styles/           全局排版与文章样式
```

## 部署

推送到 `main` 后，GitHub Actions 会构建并部署 `dist/` 到 GitHub Pages。仓库的 Pages Source 需要设置为 `GitHub Actions`。

代码使用 MIT License。站点中的文章内容保留所有权利。
