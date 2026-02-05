import { MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getPlatformColor } from "@/lib/platform-helpers";
import type { Post } from "@/types";

interface EnlargedPostDialogProps {
  post: Post | null;
  isSelected: boolean;
  onClose: () => void;
  onToggleSelect: () => void;
}

export const EnlargedPostDialog = ({
  post,
  isSelected,
  onClose,
  onToggleSelect,
}: EnlargedPostDialogProps) => {
  if (!post) return null;

  const handleToggleAndClose = () => {
    onToggleSelect();
    onClose();
  };

  return (
    <Dialog open={!!post} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>@{post.user}</span>
            <Badge className={getPlatformColor(post.platform)}>
              {post.platform}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="aspect-square bg-secondary rounded-lg overflow-hidden">
            <img
              src={post.image}
              alt={`פוסט של ${post.user}`}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{post.timestamp}</span>
            </div>
          
          <p className="text-foreground text-sm">{post.content}</p>

          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{post.location}</span>
          </div>

            <div className="flex flex-wrap gap-2">
              {post.keywords.map((kw, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="text-primary border-primary/50"
                >
                  {kw}
                </Badge>
              ))}
            </div>
          </div>

          <Button
            variant={isSelected ? "tactical" : "tacticalOutline"}
            className="w-full"
            onClick={handleToggleAndClose}
          >
            {isSelected ? "הסר מהבחירה" : "בחר פוסט זה"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
