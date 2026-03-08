import type { SnapchatStory, SnapchatChat } from "@/types/feeds";
import { getAvatarImage } from "../images";

/**
 * Snapchat stories data
 */
export const snapchatStories: SnapchatStory[] = [
  { id: 1, user: "best_friend", time: "2h ago", isNew: true },
  { id: 2, user: "travel_buddy", time: "4h ago", isNew: true },
  { id: 3, user: "college_squad", time: "6h ago", isNew: false },
  { id: 4, user: "work_friend", time: "1d ago", isNew: false },
];

/**
 * Snapchat chats data
 */
export const snapchatChats: SnapchatChat[] = [
  { id: 1, user: "Alex", lastMessage: "Opened 2m ago", time: "2m", unread: false },
  { id: 2, user: "Jordan", lastMessage: "New Snap!", time: "15m", unread: true },
  { id: 3, user: "Taylor", lastMessage: "Typing...", time: "1h", unread: true },
  { id: 4, user: "Casey", lastMessage: "Screenshot!", time: "3h", unread: false },
];

/**
 * Get Snapchat story with avatar URL
 */
export const getSnapchatStory = (story: SnapchatStory) => ({
  ...story,
  avatar: getAvatarImage(story.user),
});

/**
 * Get Snapchat chat with avatar URL
 */
export const getSnapchatChat = (chat: SnapchatChat) => ({
  ...chat,
  avatar: getAvatarImage(chat.user.toLowerCase()),
});
