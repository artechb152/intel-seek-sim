import { Search } from 'lucide-react';
import { PostCard } from './PostCard';
import type { Post } from '@/types';

interface PostGridProps {
  posts: Post[];
  selectedPosts: string[];
  savedPosts: string[];
  onTogglePost: (id: string) => void;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onEnlargePost: (post: Post) => void;
}

export const PostGrid = ({ posts, selectedPosts, savedPosts, onTogglePost, onToggleSave, onEnlargePost }: PostGridProps) => {
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
        <Search className="w-12 h-12 mb-4 opacity-50" />
        <p className="text-lg font-medium">לא נמצאו תוצאות</p>
        <p className="text-sm">נסה לשנות את הפילטרים</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} isSelected={selectedPosts.includes(post.id)} isSaved={savedPosts.includes(post.id)} onSelect={() => onTogglePost(post.id)} onSave={(e) => onToggleSave(post.id, e)} onEnlarge={() => onEnlargePost(post)} />
      ))}
    </div>
  );
};
