/**
 * Instagram feed types
 */
export interface InstagramPost {
  id: number;
  user: string;
  location: string;
  likes: string;
  imageId: number;
}

export interface InstagramStory {
  name: string;
  hasNew: boolean;
  avatarId: string;
}

/**
 * Facebook feed types
 */
export interface FacebookPost {
  id: number;
  user: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
  imageId?: number;
}

/**
 * TikTok feed types
 */
export interface TikTokVideo {
  id: number;
  user: string;
  description: string;
  song: string;
  likes: string;
  comments: string;
  shares: string;
}

/**
 * X (Twitter) feed types
 */
export interface Tweet {
  id: number;
  user: string;
  handle: string;
  content: string;
  time: string;
  likes: string;
  retweets: string;
  replies: string;
}

/**
 * Snapchat feed types
 */
export interface SnapchatStory {
  id: number;
  user: string;
  time: string;
  isNew: boolean;
}

export interface SnapchatChat {
  id: number;
  user: string;
  lastMessage: string;
  time: string;
  unread: boolean;
}

/**
 * Security camera feed types
 */
export interface SecurityCamera {
  id: string;
  name: string;
  location: string;
  status: "online" | "offline" | "recording";
}

/**
 * Radio listening types
 */
export interface RadioChannel {
  id: string;
  name: string;
  frequency: string;
  isActive: boolean;
}
