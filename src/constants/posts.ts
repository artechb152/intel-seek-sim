import type { Post, Platform } from "@/types";
import { getPostImage, getAvatarImage } from "./images";

const platforms: Platform[] = ["instagram", "x", "facebook"];

const locations = [
  "תל אביב", "חיפה", "ירושלים", "באר שבע", "אילת", 
  "נתניה", "רמת גן", "צפת", "אשדוד", "פתח תקווה", 
  "ראשון לציון", "חולון", "הרצליה", "כפר סבא", "רעננה", "מודיעין"
];

const users = [
  "soldier_123", "army_life", "beach_vibes", "military_fan", "travel_il",
  "idf_proud", "daily_post", "reserve_unit", "combat_ready", "base_life",
  "training_day", "weekend_warrior", "patrol_unit", "field_ops", "recon_team",
  "night_watch", "desert_fox", "eagle_eye", "shadow_ops", "swift_blade"
];

const keywordSets = [
  ["כומתה אדומה", "צנחנים"],
  ["אימון", "יחידה 669"],
  ["חופש", "ים"],
  ["כומתה ירוקה", "גולני"],
  ["טיול", "נגב"],
  ["דרגת סרן", "מפקד"],
  ["בוקר טוב"],
  ["מילואים", "יחידה 8200"],
  ["כומתה שחורה", "שריון"],
  ["תרגיל", "חי״ר"],
  ["סיור", "גבול"],
  ["מסע", "טירונות"],
  ["קורס קצינים", "בה״ד 1"],
  ["חיילים", "בסיס"],
  ["נשק", "מטווח"],
  ["ג׳יפ", "שטח"],
];

const contentTexts = [
  "יום אימונים מטורף עם הצוות 💪🔥",
  "סוף סוף חופש אחרי שבועות! 🌊",
  "בוקר טוב מהבסיס ☀️",
  "מסיימים תרגיל ארוך 🎯",
  "עוד יום עוד דולר 😅",
  "הנוף מכאן פשוט מדהים 🏔️",
  "טירונות זה לא בדיחה 😤",
  "סוף שבוע מגיע! 🎉",
  "אחרי מסע כיף לנוח 🛌",
  "יום רגיל בשגרה 📸",
  "חזרתי מהקורס! סוף סוף 🙌",
  "עם החברים הכי טובים 👊",
  "סיור לילה היה שווה את זה 🌙",
  "תמונה מהתרגול אתמול 🎖️",
  "מילואים זה הבית השני שלי 🏠",
  "ממש גאה ביחידה שלנו! 💚",
];

const times = [
  "08:00", "09:15", "10:30", "11:45", "12:00", 
  "13:15", "14:30", "15:45", "16:20", "17:00", 
  "18:30", "19:45", "20:15", "21:30", "22:00"
];

const dates = [
  "2023-04-05", "2023-04-18", "2023-05-02", "2023-05-20", 
  "2023-06-10", "2023-06-25", "2023-07-08", "2023-07-22", 
  "2023-08-05", "2023-08-20", "2023-09-01", "2023-09-15", "2023-09-28"
];

/**
 * Generate mock posts with real images
 */
export const generateMockPosts = (): Post[] => {
  const posts: Post[] = [];
  
  for (let i = 1; i <= 50; i++) {
    const keywordSet = keywordSets[Math.floor(Math.random() * keywordSets.length)];
    const user = users[Math.floor(Math.random() * users.length)] + "_" + i;
    const isMilitary = keywordSet.some(k => 
      k.includes("כומתה") || k.includes("יחידה") || k.includes("דרגת") || 
      k.includes("מילואים") || k.includes("שריון") || k.includes("חי״ר") || 
      k.includes("קורס") || k.includes("נשק") || k.includes("בסיס")
    );
    const content = contentTexts[Math.floor(Math.random() * contentTexts.length)];
    
    posts.push({
      id: i.toString(),
      image: getPostImage(i),
      avatar: getAvatarImage(user),
      platform: platforms[Math.floor(Math.random() * platforms.length)],
      user,
      content,
      location: locations[Math.floor(Math.random() * locations.length)],
      timestamp: times[Math.floor(Math.random() * times.length)],
      date: dates[Math.floor(Math.random() * dates.length)],
      keywords: keywordSet,
      isRelevant: isMilitary,
    });
  }
  
  return posts;
};

export const mockPosts: Post[] = generateMockPosts();
