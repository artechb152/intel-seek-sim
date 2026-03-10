import { MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { getPlatformColor, getPlatformIcon } from '@/lib/platform-helpers';
import type { Post } from '@/types';

interface EnlargedPostDialogProps {
  post: Post | null;
  isSaved: boolean;
  onClose: () => void;
  onToggleSave: (e?: React.MouseEvent) => void;
}

export const EnlargedPostDialog = ({ post, isSaved, onClose, onToggleSave }: EnlargedPostDialogProps) => {
  if (!post) return null;

  const visibleKeywords = post.keywords?.slice(0, 6) ?? [];
  const extraCount = Math.max(0, (post.keywords?.length ?? 0) - visibleKeywords.length);

  return (
    <Dialog open={!!post} onOpenChange={onClose}>
      <DialogContent className="w-[min(92vw,26rem)] max-h-[90vh] overflow-hidden px-2 py-4">
        <div className="flex h-full flex-col gap-3" dir="rtl">
          <DialogHeader className="space-y-0 px-1">
            <DialogTitle className="flex items-center justify-between gap-2">
              <Badge className={`${getPlatformColor(post.platform)} flex items-center gap-1`}>{getPlatformIcon(post.platform)}</Badge>
              <span className="text-sm font-medium truncate"></span>
            </DialogTitle>
          </DialogHeader>

          <div className="w-full flex justify-center">
            <div className="w-full aspect-square rounded-lg overflow-hidden bg-background">
              <img src={post.image} alt="Post" className="w-full h-full object-contain" />
            </div>
          </div>

          <div className="flex flex-col gap-2 min-h-0 px-1">
            <div className="flex items-center gap-2 text-muted-foreground text-sm" dir="ltr">
              <Clock className="w-4 h-4" />
              <span className="truncate">
                {post.date} · {post.timestamp}
              </span>
            </div>

            <p className="text-foreground text-sm line-clamp-4 sm:line-clamp-6 break-words">{post.content}</p>

            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <MapPin className="w-4 h-4" />
              <span className="truncate">{post.location}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {visibleKeywords.map((kw, i) => (
                <Badge key={`${kw}-${i}`} variant="outline" className="text-primary border-primary/50">
                  {kw}
                </Badge>
              ))}
              {extraCount > 0 && (
                <Badge variant="outline" className="text-muted-foreground border-border">
                  +{extraCount}
                </Badge>
              )}
            </div>
          </div>

          <Button variant={isSaved ? 'tactical' : 'tacticalOutline'} className="w-full mt-auto mx-1" onClick={(e) => onToggleSave(e)}>
            {isSaved ? 'הסר משמירה' : 'שמור פוסט'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
