import { useState, useMemo, useCallback } from "react";
import type { Post, Platform } from "@/types";
import { regionCities } from "@/constants/locations";

interface UsePostFiltersOptions {
  posts: Post[];
}

interface UsePostFiltersReturn {
  // Filter values
  searchKeywords: string;
  selectedLocation: string;
  selectedPlatform: "all" | Platform;
  fromDate: string;
  toDate: string;
  fromTime: string;
  toTime: string;
  showSavedOnly: boolean;
  savedPosts: string[];
  
  // Setters
  setSearchKeywords: (value: string) => void;
  setSelectedLocation: (value: string) => void;
  setSelectedPlatform: (value: "all" | Platform) => void;
  setFromDate: (value: string) => void;
  setToDate: (value: string) => void;
  setFromTime: (value: string) => void;
  setToTime: (value: string) => void;
  setShowSavedOnly: (value: boolean) => void;
  toggleSavePost: (id: string) => void;
  
  // Results
  filteredPosts: Post[];
  
  // Actions
  resetFilters: () => void;
}

/**
 * Custom hook for managing post filtering logic
 */
export const usePostFilters = ({ posts }: UsePostFiltersOptions): UsePostFiltersReturn => {
  // Filter state
  const [searchKeywords, setSearchKeywords] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<"all" | Platform>("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [savedPosts, setSavedPosts] = useState<string[]>([]);

  // Toggle save post
  const toggleSavePost = useCallback((id: string) => {
    setSavedPosts(prev => 
      prev.includes(id) 
        ? prev.filter(p => p !== id)
        : [...prev, id]
    );
  }, []);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setSearchKeywords("");
    setSelectedLocation("");
    setSelectedPlatform("all");
    setFromDate("");
    setToDate("");
    setFromTime("");
    setToTime("");
    setShowSavedOnly(false);
  }, []);

  // Dynamic filtering
  const filteredPosts = useMemo(() => {
    let filtered = posts;
    
    // Show only saved posts if filter is active
    if (showSavedOnly) {
      filtered = filtered.filter(post => savedPosts.includes(post.id));
    }
    
    return filtered.filter(post => {
      // Platform filter
      if (selectedPlatform !== "all" && post.platform !== selectedPlatform) {
        return false;
      }
      
      // Location filter (by region or direct match)
      if (selectedLocation) {
        const cities = regionCities[selectedLocation];
        if (cities) {
          if (!cities.includes(post.location)) return false;
        } else if (!post.location.includes(selectedLocation)) {
          return false;
        }
      }
      
      // Keywords filter
      if (searchKeywords) {
        const keywords = searchKeywords.split(",").map(k => k.trim().toLowerCase());
        const postKeywords = post.keywords.map(k => k.toLowerCase());
        const hasMatch = keywords.some(kw => 
          postKeywords.some(pk => pk.includes(kw)) || 
          post.user.toLowerCase().includes(kw)
        );
        if (!hasMatch) return false;
      }
      
      // Date filter
      if (fromDate && post.date < fromDate) {
        return false;
      }
      if (toDate && post.date > toDate) {
        return false;
      }
      
      // Time filter
      if (fromTime && post.timestamp < fromTime) {
        return false;
      }
      if (toTime && post.timestamp > toTime) {
        return false;
      }
      
      return true;
    });
  }, [posts, selectedPlatform, selectedLocation, searchKeywords, fromDate, toDate, fromTime, toTime, showSavedOnly, savedPosts]);

  return {
    // Filter values
    searchKeywords,
    selectedLocation,
    selectedPlatform,
    fromDate,
    toDate,
    fromTime,
    toTime,
    showSavedOnly,
    savedPosts,
    
    // Setters
    setSearchKeywords,
    setSelectedLocation,
    setSelectedPlatform,
    setFromDate,
    setToDate,
    setFromTime,
    setToTime,
    setShowSavedOnly,
    toggleSavePost,
    
    // Results
    filteredPosts,
    
    // Actions
    resetFilters,
  };
};
