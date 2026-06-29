/**
 * Image URL helpers — fully local / offline.
 *
 * Every image is bundled under `public/images/` and resolved deterministically:
 * the same input always maps to the same local file, so the app needs no network.
 *
 * Pools (see public/images/):
 *   posts/0..23.jpg     – 24 themed post photos
 *   avatars/0..49.jpg   – 50 avatar portraits
 *   quiz/0..3.jpg       – 4 quiz base-structure images
 *   feed-default.png    – default feed avatar
 *
 * To regenerate/extend the pools, see scripts/download-images.sh.
 */

const BASE = import.meta.env.BASE_URL; // respects Vite `base` (default "/")

const POOL = {
  posts: 24,
  avatars: 50,
  quiz: 4,
} as const;

/** Stable string hash (FNV-like) so a given key always picks the same file. */
const hashIndex = (key: string, count: number): number => {
  let h = 0;
  for (let i = 0; i < key.length; i++) {
    h = (h * 31 + key.charCodeAt(i)) >>> 0;
  }
  return h % count;
};

/**
 * Generate a military-themed post image URL based on post ID.
 * (size param kept for API compatibility; local files are pre-sized.)
 */
export const getPostImage = (postId: string | number, _size: number = 400): string => {
  return `${BASE}images/posts/${hashIndex(`post_${postId}`, POOL.posts)}.jpg`;
};

/**
 * Generate an avatar image URL based on username.
 */
export const getAvatarImage = (username: string, _size: number = 150): string => {
  return `${BASE}images/avatars/${hashIndex(username, POOL.avatars)}.jpg`;
};

/**
 * Generate a category-based image URL.
 */
export const getCategoryImage = (category: string, _size: number = 400): string => {
  return `${BASE}images/posts/${hashIndex(`category_${category}`, POOL.posts)}.jpg`;
};

/**
 * Generate a feed-specific image for phone mockups.
 */
export const getFeedImage = (platform: string, index: number, _size: number = 400): string => {
  return `${BASE}images/posts/${hashIndex(`${platform}_${index}`, POOL.posts)}.jpg`;
};

/**
 * Generate a story/avatar for feed users.
 */
export const getFeedAvatar = (_platform: string, _username: string, _size: number = 50): string => {
  return `${BASE}images/feed-default.png`;
};

/**
 * Generate base structure images for quiz.
 */
export const getBaseStructureImage = (index: number, _size: number = 300): string => {
  return `${BASE}images/quiz/${((index % POOL.quiz) + POOL.quiz) % POOL.quiz}.jpg`;
};
