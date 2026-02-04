/**
 * Image URL generators for consistent image handling across the app
 * Uses external services for placeholder images that are deterministic
 */

/**
 * Generate a post image URL based on post ID
 * Uses Picsum with a seed for consistent, unique images per post
 */
export const getPostImage = (postId: string | number, size: number = 400): string => {
  return `https://picsum.photos/seed/post_${postId}/${size}/${size}`;
};

/**
 * Generate an avatar image URL based on username
 * Uses Pravatar for consistent avatar images per user
 */
export const getAvatarImage = (username: string, size: number = 150): string => {
  return `https://i.pravatar.cc/${size}?u=${encodeURIComponent(username)}`;
};

/**
 * Generate a category-based image URL
 * Uses Picsum with category-based seeds
 */
export const getCategoryImage = (category: string, size: number = 400): string => {
  return `https://picsum.photos/seed/${category}/${size}/${size}`;
};

/**
 * Generate a feed-specific image for phone mockups
 */
export const getFeedImage = (platform: string, index: number, size: number = 400): string => {
  return `https://picsum.photos/seed/${platform}_${index}/${size}/${size}`;
};

/**
 * Generate a story/avatar for feed users
 */
export const getFeedAvatar = (platform: string, username: string, size: number = 50): string => {
  return `https://i.pravatar.cc/${size}?u=${platform}_${encodeURIComponent(username)}`;
};
