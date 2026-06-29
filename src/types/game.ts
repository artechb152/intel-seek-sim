import type { Post, Platform } from "./index";

/**
 * Filter state for the game page
 */
export interface FilterState {
  searchKeywords: string;
  selectedLocation: string;
  selectedPlatform: "all" | Platform;
  fromDate: string;
  toDate: string;
  fromTime: string;
  toTime: string;
  showSavedOnly: boolean;
}

/**
 * Props for PostCard component
 */
export interface PostCardProps {
  post: Post;
  isSelected: boolean;
  isSaved: boolean;
  onSelect: () => void;
  onSave: (e: React.MouseEvent) => void;
  onEnlarge: () => void;
}

/**
 * Props for EnlargedPostDialog component
 */
export interface EnlargedPostDialogProps {
  post: Post | null;
  isSelected: boolean;
  onClose: () => void;
  onToggleSelect: () => void;
}

/**
 * Props for PlatformTabs component
 */
export interface PlatformTabsProps {
  selectedPlatform: "all" | Platform;
  onPlatformChange: (platform: "all" | Platform) => void;
}

/**
 * Props for FiltersSidebar component
 */
export interface FiltersSidebarProps {
  // Location
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  
  // Date/Time
  fromDate: string;
  toDate: string;
  fromTime: string;
  toTime: string;
  onFromDateChange: (date: string) => void;
  onToDateChange: (date: string) => void;
  onFromTimeChange: (time: string) => void;
  onToTimeChange: (time: string) => void;
  
  // Keywords
  searchKeywords: string;
  onSearchKeywordsChange: (keywords: string) => void;
  
  // Saved
  showSavedOnly: boolean;
  savedCount: number;
  onShowSavedOnlyChange: (show: boolean) => void;
  
  // Actions
  onReset: () => void;
  onApply: () => void;
  isFiltering: boolean;
  resultsCount: number;
}

/**
 * Props for GameHeader component
 */
export interface GameHeaderProps {
  selectedCount: number;
  totalCount: number;
  timeRemaining: number;
  formattedTime: string;
  onSubmit: () => void;
}

/**
 * Props for PostGrid component
 */
export interface PostGridProps {
  posts: Post[];
  selectedPosts: string[];
  savedPosts: string[];
  onTogglePost: (id: string) => void;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onEnlargePost: (post: Post) => void;
}
