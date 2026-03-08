import { Search } from 'lucide-react';
import { PostCard } from './PostCard';
import type { Post } from '@/types';

interface PostGridProps {
  posts: Post[];
  savedPosts: string[];
  onToggleSave: (id: string, e?: React.MouseEvent) => void;
  onEnlargePost: (post: Post) => void;
}

export const PostGrid = ({ posts, savedPosts, onToggleSave, onEnlargePost }: PostGridProps) => {
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
    <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 2xl:gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} isSaved={savedPosts.includes(post.id)} onSave={(e) => onToggleSave(post.id, e)} onEnlarge={() => onEnlargePost(post)} />
      ))}
    </div>
  );
};
