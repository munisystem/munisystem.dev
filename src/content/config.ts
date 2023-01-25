import { z, defineCollection } from 'astro:content';
// 2. Define a schema for each collection you'd like to validate.
const postsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    coverImage: z.string().optional(),
    description: z.string().optional(),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  posts: postsCollection,
};
