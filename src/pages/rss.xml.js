import rss from "@astrojs/rss";
import { SITE } from "../consts";
import { excerpt, getPosts, postHref } from "../lib/posts";

export async function GET(context) {
  const posts = await getPosts();

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: excerpt(post, 160),
      pubDate: post.data.published,
      link: postHref(post),
    })),
    customData: `<language>zh-CN</language>`,
  });
}
