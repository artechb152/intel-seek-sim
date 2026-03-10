import { MapPin, Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getPlatformColor, getPlatformIcon } from '@/lib/platform-helpers';
import type { Post } from '@/types';

interface PostCardProps {
  post: Post;
  isSaved: boolean;
  onSave: (e: React.MouseEvent) => void;
  onEnlarge: () => void;
}

export const PostCard = ({ post, isSaved, onSave, onEnlarge }: PostCardProps) => {
  return (
    <div className="relative rounded-xl overflow-hidden transition-all duration-300 group hover:ring-1 hover:ring-primary/50 px-1">
      {/* Clickable Image Area */}
      <div className="aspect-square bg-secondary cursor-pointer overflow-hidden" onClick={onEnlarge}>
        <img src={post.image} alt="Post" /* alt={`Post by ${post.user}`} */ className="w-full h-full object-cover" loading="lazy" />
      </div>

      {/* Platform Badge */}
      <div className={cn('absolute top-2 right-2 px-2 py-0.5 rounded text-white text-[10px] font-medium flex items-center gap-1', getPlatformColor(post.platform))}>
        {getPlatformIcon(post.platform)}
      </div>

      {/* Save Button */}
      <button onClick={onSave} className={cn('absolute top-2 left-2 w-7 h-7 rounded-full flex items-center justify-center transition-all', isSaved ? 'bg-primary text-primary-foreground' : 'bg-background/50 text-foreground hover:bg-background/70')}>
        <Bookmark className={cn('w-4 h-4', isSaved && 'fill-current')} />
      </button>

      {/* Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/60 to-transparent p-3 pt-8">
        <div className="flex items-center justify-between text-foreground text-xs mb-1">
          {/* <span className="font-medium">@{post.user}</span> */}
          <span className="font-medium"></span>
        </div>

        <p className="text-foreground/90 text-[10px] mb-1 line-clamp-1">{post.content}</p>

        {/* Date and Location row */}
        <div className="flex items-center justify-between text-foreground/70 text-[10px] mb-2" dir="ltr">
          <span>
            {post.timestamp} - {post.date}
          </span>
          <div className="flex items-center gap-1" dir="rtl">
            <MapPin className="w-3 h-3" />
            <span>{post.location}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {post.keywords.slice(0, 2).map((kw, i) => (
            <span key={i} className="px-1.5 py-0.5 bg-foreground/20 rounded text-[9px] text-foreground">
              {kw}
            </span>
          ))}
        </div>
      </div>

      {/* Selection Radio - Commented out 
      <div
        className="absolute bottom-3 left-3 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        <div className={cn('w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all', isSelected ? 'border-primary bg-primary' : 'border-foreground/70 bg-background/30')}>{isSelected && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}</div>
      </div>
      */}
    </div>
  );
};
