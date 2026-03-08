import { Instagram, Facebook } from "lucide-react";
import { XIcon } from "@/components/common/icons/XIcon";
import type { Platform } from "@/types";

/**
 * Get platform-specific icon component
 */
export const getPlatformIcon = (platform: Platform | string, className: string = "w-4 h-4") => {
  switch (platform) {
    case "instagram": 
      return <Instagram className={className} />;
    case "x": 
      return <XIcon className={className} />;
    case "facebook": 
      return <Facebook className={className} />;
    default: 
      return null;
  }
};

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
