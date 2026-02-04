import { useState, useCallback, useMemo } from "react";
import type { Post } from "@/types";

interface UsePostSelectionReturn {
  selectedPosts: string[];
  savedPosts: string[];
  togglePost: (id: string) => void;
  toggleSavePost: (id: string, e: React.MouseEvent) => void;
  isSelected: (id: string) => boolean;
  isSaved: (id: string) => boolean;
  correctCount: number;
  wrongCount: number;
  clearSelection: () => void;
}

/**
 * Hook for managing post selection and saving state
 */
export const usePostSelection = (posts: Post[]): UsePostSelectionReturn => {
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [savedPosts, setSavedPosts] = useState<string[]>([]);

  const togglePost = useCallback((id: string) => {
    setSelectedPosts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }, []);

  const toggleSavePost = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedPosts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }, []);

  const isSelected = useCallback(
    (id: string) => selectedPosts.includes(id),
    [selectedPosts]
  );

  const isSaved = useCallback(
    (id: string) => savedPosts.includes(id),
    [savedPosts]
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
    togglePost,
    toggleSavePost,
    isSelected,
    isSaved,
    correctCount,
    wrongCount,
    clearSelection,
  };
};
