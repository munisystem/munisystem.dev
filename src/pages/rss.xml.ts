import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function get(context: APIContext) {
  const posts = await getCollection('posts');
  const site = context.site ? context.site.toString() : '';
  return rss({
    title: 'munisystem.dev',
    description: "munisystem's blog",
    site: site,
    items: posts.map((post) => ({
      link: `/posts/${post.slug}`,
      title: post.data.title,
      pubDate: post.data.date,
    })),
  });
}
