import type { Platform } from "@/types";

/**
 * Get platform-specific background color class
 */
export const getPlatformColor = (platform: Platform | string): string => {
  switch (platform) {
    case "instagram": 
      return "bg-gradient-to-r from-purple-500 to-pink-500";
    case "x": 
      return "bg-black";
    case "facebook": 
      return "bg-blue-600";
    default: 
      return "bg-gray-500";
  }
};

/**
 * Get platform display name in Hebrew
 */
export const getPlatformName = (platform: Platform | string): string => {
  switch (platform) {
    case "instagram": 
      return "אינסטגרם";
    case "x": 
      return "X";
    case "facebook": 
      return "פייסבוק";
    default: 
      return platform;
  }
};

/**
 * Social menu items configuration
 */
export const socialMenuItems = [
  { id: "instagram", name: "אינסטגרם" },
  { id: "facebook", name: "פייסבוק" },
  { id: "x", name: "X" },
  { id: "tiktok", name: "טיקטוק" },
  { id: "snapchat", name: "סנאפצ'אט" },
  { id: "listening", name: "האזנה" },
  { id: "cameras", name: "מצלמות אבטחה" },
] as const;
