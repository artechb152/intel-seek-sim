/**
 * Image URL generators for consistent military-themed images across the app
 * Uses external services for placeholder images that are deterministic
 */

// Military-themed image seeds for consistent, themed content
const militarySeeds = [
  "military_base_aerial",
  "soldiers_patrol",
  "army_barracks",
  "military_equipment",
  "combat_training",
  "army_checkpoint",
  "military_vehicles",
  "soldiers_formation",
  "tactical_operations",
  "army_camp",
  "military_guard_post",
  "soldiers_briefing",
  "army_logistics",
  "military_drill",
  "combat_gear",
  "army_transport",
  "military_outpost",
  "soldiers_march",
  "tactical_gear",
  "army_command",
  "military_exercise",
  "soldiers_training",
  "army_defense",
  "military_supplies",
  "combat_readiness",
  "army_security",
  "military_personnel",
  "soldiers_equipment",
  "tactical_base",
  "army_operations",
  "military_grounds",
  "soldiers_duty",
  "army_perimeter",
  "military_watchtower",
  "combat_unit",
  "army_headquarters",
  "military_convoy",
  "soldiers_guard",
  "tactical_position",
  "army_facility",
  "military_station",
  "soldiers_post",
  "army_compound",
  "military_sector",
  "combat_zone",
  "army_installation",
  "military_area",
  "soldiers_shift",
  "tactical_unit",
  "army_detail"
];

/**
 * Generate a military-themed post image URL based on post ID
 * Uses Picsum with military-themed seeds for consistent, unique images per post
 */
export const getPostImage = (postId: string | number, size: number = 400): string => {
  const index = typeof postId === 'string' ? parseInt(postId, 10) : postId;
  const seed = militarySeeds[(index - 1) % militarySeeds.length];
  return `https://picsum.photos/seed/${seed}_${postId}/${size}/${size}`;
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
  return `https://picsum.photos/seed/military_${category}/${size}/${size}`;
};

/**
 * Generate a feed-specific image for phone mockups
 */
export const getFeedImage = (platform: string, index: number, size: number = 400): string => {
  const seed = militarySeeds[index % militarySeeds.length];
  return `https://picsum.photos/seed/${platform}_${seed}/${size}/${size}`;
};

/**
 * Generate a story/avatar for feed users
 */
export const getFeedAvatar = (platform: string, username: string, size: number = 50): string => {
  return `https://i.pravatar.cc/${size}?u=${platform}_${encodeURIComponent(username)}`;
};

/**
 * Generate base structure images for quiz
 */
export const getBaseStructureImage = (index: number, size: number = 300): string => {
  const baseSeeds = ["military_base_layout_correct", "military_base_layout_wrong"];
  return `https://picsum.photos/seed/${baseSeeds[index]}/${size}/${size}`;
};
