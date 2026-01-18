import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Target, MapPin, Clock, AlertTriangle } from "lucide-react";

interface MissionPopupProps {
  open: boolean;
  onClose: () => void;
  onStart: () => void;
}

export const MissionPopup = ({ open, onClose, onStart }: MissionPopupProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass-panel border-primary/30 max-w-md" dir="rtl">
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
          
          <div className="glass-panel p-4 rounded-lg border border-primary/20">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <DialogDescription className="text-foreground text-base leading-relaxed text-right">
                אסוף מידע וניתוח שטח בסיס גלילות
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-3 mt-4">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span>מיקום: אזור מרכז</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Clock className="w-4 h-4 text-primary" />
            <span>זמן משוער: 10 דקות</span>
          </div>
        </div>
        
        <div className="flex gap-3 mt-6">
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
