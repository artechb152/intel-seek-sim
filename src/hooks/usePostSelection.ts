import { useState, useCallback, useMemo } from "react";
import type { Post } from "@/types";
import type { SaveBucket } from "@/constants/missions";

interface UsePostSelectionReturn {
  selectedPosts: string[];
  savedPosts: string[];
  savedPostMissions: Record<string, SaveBucket[]>;
  togglePost: (id: string) => void;
  toggleSavePost: (id: string, mission: SaveBucket, e?: React.MouseEvent) => void;
  isSelected: (id: string) => boolean;
  isSaved: (id: string) => boolean;
  isSavedForMission: (id: string, mission: SaveBucket) => boolean;
  correctCount: number;
  wrongCount: number;
  clearSelection: () => void;
}

/**
 * Hook for managing post selection and saving state
 */
export const usePostSelection = (posts: Post[]): UsePostSelectionReturn => {
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [savedPostMissions, setSavedPostMissions] = useState<
    Record<string, SaveBucket[]>
  >({});

  const savedPosts = useMemo(
    () => Object.keys(savedPostMissions),
    [savedPostMissions]
  );

  const togglePost = useCallback((id: string) => {
    setSelectedPosts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }, []);

  const toggleSavePost = useCallback(
    (id: string, mission: SaveBucket, e?: React.MouseEvent) => {
      e?.stopPropagation();
      setSavedPostMissions((prev) => {
        const current = prev[id] ?? [];
        // Toggle this specific mission for the post, keeping any others intact
        if (current.includes(mission)) {
          const remaining = current.filter((m) => m !== mission);
          const next = { ...prev };
          if (remaining.length === 0) {
            delete next[id];
          } else {
            next[id] = remaining;
          }
          return next;
        }
        return { ...prev, [id]: [...current, mission] };
      });
    },
    []
  );

  const isSelected = useCallback(
    (id: string) => selectedPosts.includes(id),
    [selectedPosts]
  );

  const isSaved = useCallback(
    (id: string) => id in savedPostMissions,
    [savedPostMissions]
  );

  const isSavedForMission = useCallback(
    (id: string, mission: SaveBucket) =>
      savedPostMissions[id]?.includes(mission) ?? false,
    [savedPostMissions]
  );

  const correctCount = useMemo(
    () =>
      selectedPosts.filter((id) => posts.find((p) => p.id === id)?.isRelevant)
        .length,
    [selectedPosts, posts]
  );

  const wrongCount = useMemo(
    () =>
      selectedPosts.filter((id) => !posts.find((p) => p.id === id)?.isRelevant)
        .length,
    [selectedPosts, posts]
  );

  const clearSelection = useCallback(() => {
    setSelectedPosts([]);
  }, []);

  return {
    selectedPosts,
    savedPosts,
    savedPostMissions,
    togglePost,
    toggleSavePost,
    isSelected,
    isSaved,
    isSavedForMission,
    correctCount,
    wrongCount,
    clearSelection,
  };
};
