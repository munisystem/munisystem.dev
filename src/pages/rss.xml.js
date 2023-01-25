import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function get(context) {
  const posts = await getCollection('posts');
  return rss({
    title: 'munisystem.dev',
    description: "munisystem's blog",
    site: context.site,
    items: posts.map((post) => ({
      link: `/posts/${post.slug}`,
      title: post.data.title,
      pubDate: post.data.date,
    })),
  });
}
