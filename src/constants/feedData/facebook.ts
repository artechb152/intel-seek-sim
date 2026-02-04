import type { FacebookPost } from "@/types/feeds";
import { getPostImage, getAvatarImage } from "../images";

/**
 * Facebook posts data
 */
export const facebookPosts: FacebookPost[] = [
  {
    id: 1,
    user: "John Smith",
    time: "2 hours ago",
    content: "Just had an amazing day at the beach! 🏖️ The weather was perfect and the sunset was absolutely breathtaking. Can't wait to go back!",
    likes: 156,
    comments: 23,
    shares: 5,
    imageId: 201,
  },
  {
    id: 2,
    user: "Sarah Johnson",
    time: "5 hours ago",
    content: "Excited to announce that I just got promoted! 🎉 Thank you to everyone who supported me on this journey. Hard work really does pay off!",
    likes: 342,
    comments: 67,
    shares: 12,
  },
  {
    id: 3,
    user: "Tech News Daily",
    time: "1 day ago",
    content: "Breaking: New smartphone release sets record sales in first week. Read more about the features that made it a success.",
    likes: 1205,
    comments: 234,
    shares: 89,
    imageId: 202,
  },
];

/**
 * Get Facebook post with full image URL
 */
export const getFacebookPost = (post: FacebookPost) => ({
  ...post,
  image: post.imageId ? getPostImage(post.imageId) : undefined,
  avatar: getAvatarImage(post.user.toLowerCase().replace(" ", "_")),
});
