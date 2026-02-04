import type { Tweet } from "@/types/feeds";
import { getAvatarImage } from "../images";

/**
 * X (Twitter) tweets data
 */
export const tweets: Tweet[] = [
  {
    id: 1,
    user: "Tech Insider",
    handle: "@techinsider",
    content: "🚀 Breaking: AI startup raises $100M in Series B funding. The future of technology is here and it's moving faster than ever.",
    time: "2h",
    likes: "12.4K",
    retweets: "3.2K",
    replies: "892",
  },
  {
    id: 2,
    user: "World News",
    handle: "@worldnews",
    content: "Global leaders meet to discuss climate change initiatives. Historic agreement expected by end of summit. 🌍",
    time: "4h",
    likes: "8.9K",
    retweets: "5.1K",
    replies: "1.2K",
  },
  {
    id: 3,
    user: "Sports Update",
    handle: "@sportsupdate",
    content: "⚽ GOAL! What an incredible match this has been. The underdog team takes the lead in the 89th minute!",
    time: "1h",
    likes: "45.2K",
    retweets: "12.8K",
    replies: "3.4K",
  },
];

/**
 * Get tweet with avatar URL
 */
export const getTweet = (tweet: Tweet) => ({
  ...tweet,
  avatar: getAvatarImage(tweet.handle.replace("@", "")),
});
