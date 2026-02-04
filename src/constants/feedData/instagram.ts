import type { InstagramPost, InstagramStory } from "@/types/feeds";
import { getPostImage, getAvatarImage } from "../images";

/**
 * Instagram stories data
 */
export const instagramStories: InstagramStory[] = [
  { name: "Your Story", hasNew: false, avatarId: "you" },
  { name: "dave_wilson", hasNew: true, avatarId: "dave" },
  { name: "jessica_m", hasNew: true, avatarId: "jessica" },
  { name: "travel_pics", hasNew: true, avatarId: "travel" },
  { name: "foodie_world", hasNew: false, avatarId: "food" },
];

/**
 * Instagram posts data
 */
export const instagramPosts: InstagramPost[] = [
  { id: 1, user: "joshua_l", location: "Tokyo, Japan", likes: "44,686", imageId: 101 },
  { id: 2, user: "nature_lover", location: "Swiss Alps", likes: "23,451", imageId: 102 },
  { id: 3, user: "city_explorer", location: "New York, NY", likes: "18,922", imageId: 103 },
];

/**
 * Get Instagram post with full image URL
 */
export const getInstagramPost = (post: InstagramPost) => ({
  ...post,
  image: getPostImage(post.imageId),
  avatar: getAvatarImage(post.user),
});

/**
 * Get Instagram story with avatar URL
 */
export const getInstagramStory = (story: InstagramStory) => ({
  ...story,
  avatar: getAvatarImage(story.avatarId),
});
