import type { TikTokVideo } from "@/types/feeds";
import { getAvatarImage } from "../images";

/**
 * TikTok videos data
 */
export const tiktokVideos: TikTokVideo[] = [
  {
    id: 1,
    user: "dance_queen",
    description: "New dance challenge! Can you do it? 💃 #dancechallenge #viral #fyp",
    song: "Trending Song - Popular Artist",
    likes: "1.2M",
    comments: "45.3K",
    shares: "23.1K",
  },
  {
    id: 2,
    user: "cooking_master",
    description: "60 second recipe for the perfect pasta 🍝 #cooking #recipe #food",
    song: "Cooking Vibes - Chef Mix",
    likes: "856K",
    comments: "12.4K",
    shares: "8.9K",
  },
  {
    id: 3,
    user: "comedy_central",
    description: "When your mom calls you by your full name 😂 #comedy #relatable",
    song: "Original Sound",
    likes: "2.1M",
    comments: "89.2K",
    shares: "156K",
  },
];

/**
 * Get TikTok video with avatar URL
 */
export const getTikTokVideo = (video: TikTokVideo) => ({
  ...video,
  avatar: getAvatarImage(video.user),
});
