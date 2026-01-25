import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Target } from "lucide-react";

interface MissionPopupProps {
  open: boolean;
  onClose: () => void;
  onStart: () => void;
}

export const MissionPopup = ({ open, onClose, onStart }: MissionPopupProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass-panel border-primary/30 max-w-lg" dir="rtl">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                <Target className="w-8 h-8 text-primary animate-pulse" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive animate-ping" />
            </div>
          </div>
          
          <DialogTitle className="text-2xl font-bold text-center text-foreground">
            משימה חדשה
          </DialogTitle>
        </DialogHeader>
        
        {/* Video Container */}
        <div className="aspect-video bg-secondary rounded-lg overflow-hidden border border-border">
          <div className="w-full h-full flex items-center justify-center">
            <video 
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
              <div className="flex flex-col items-center justify-center text-muted-foreground">
                <Target className="w-12 h-12 mb-2" />
                <span>תצוגת משימה</span>
              </div>
            </video>
          </div>
        </div>
        
        {/* Mission Title Below Video */}
        <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/30">
          <p className="text-lg font-bold text-foreground">
            אסוף מידע וניתוח שטח בסיס גלילות
          </p>
        </div>
        
        <div className="flex gap-3 mt-4">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="flex-1 border-muted-foreground/30 hover:bg-muted"
          >
            ביטול
          </Button>
          <Button 
            variant="tactical" 
            onClick={onStart}
            className="flex-1 animate-pulse-glow"
          >
            התחל משימה
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
