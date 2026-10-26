export const SITE = {
  title: "Kori",
  tagline: "关于技术、写作与日常观察",
  description: "Kori 的个人博客。写技术，也写那些值得慢慢想清楚的事。",
  author: "KoriIku",
  url: "https://koriiku.github.io",
  github: "https://github.com/KoriIku",
  language: "zh-CN",
} as const;

export const NAV_ITEMS = [
  { label: "文章", href: "/archive/" },
  { label: "关于", href: "/about/" },
  { label: "RSS", href: "/rss.xml" },
] as const;
