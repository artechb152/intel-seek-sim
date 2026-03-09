import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Target, Maximize2, Minimize2, Play, Pause } from "lucide-react";
import popUp3 from '../../assets/popUp3.png';

interface MissionPopupProps {
  open: boolean;
  onClose: () => void;
  onStart: () => void;
}

export const MissionPopup = ({ open, onClose, onStart }: MissionPopupProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const percent = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(percent);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = percent * videoRef.current.duration;
    }
  };

  const handleNext = () => {
    if (currentPage === 0) {
      setCurrentPage(1);
    } else {
      setCurrentPage(0);
      onStart();
    }
  };

  const handleClose = () => {
    setCurrentPage(0);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className={`glass-panel border-primary/30 ${currentPage === 1 ? 'sm:max-w-lg p-3' : 'sm:max-w-xl'}`} dir="rtl">
        {currentPage === 0 ? (
          <>
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
            <div className="relative aspect-video bg-secondary rounded-lg overflow-hidden border border-border group">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                onTimeUpdate={handleTimeUpdate}
              >
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <Target className="w-12 h-12 mb-2" />
                  <span>תצוגת משימה</span>
                </div>
              </video>

              {/* Video Controls Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                {/* Progress Bar */}
                <div
                  className="h-1 bg-white/30 rounded-full mb-3 cursor-pointer"
                  onClick={handleProgressClick}
                >
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={togglePlayPause}
                    className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 text-white" />
                    ) : (
                      <Play className="w-4 h-4 text-white" />
                    )}
                  </button>

                  <button
                    onClick={toggleFullscreen}
                    className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    {isFullscreen ? (
                      <Minimize2 className="w-4 h-4 text-white" />
                    ) : (
                      <Maximize2 className="w-4 h-4 text-white" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Mission Title Below Video */}
            <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/30">
              <p className="text-lg font-bold text-foreground">
                אסוף מידע וניתוח שטח בסיס ירקון
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                איספו מידע ובצעו ניתוח שטח של בסיס ירקון, כולל מבנה הבסיס, התנהלות השמירות, כמות החיילים, רמת הכוננות ונוכחות בכירים בבסיס.
              </p>
            </div>

            <div className="flex gap-3 mt-4">
              <Button
                variant="outline"
                onClick={handleClose}
                className="flex-1 border-muted-foreground/30 hover:bg-muted hover:text-white"
              >
                ביטול
              </Button>
              <Button
                variant="tactical"
                onClick={handleNext}
                className="flex-1 animate-pulse-glow"
              >
                המשך
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-center mb-0">
                <span className="text-gradient-tactical">ברוך הבא</span>
                <br />
                <span className="text-foreground text-sm">לסימולטור איסוף מודיעין</span>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-1 py-0 text-right">
              <p className="text-xs font-bold text-foreground text-center">
                לדוגמה: פרטים שניתן להוציא מהתמונה
              </p>
              <img src={popUp3} alt="דוגמה לפרטים שניתן להוציא מתמונה" className="w-full max-h-[62vh] object-contain rounded-lg border border-border/50" />
            </div>

            {/* Page indicators */}
            <div className="flex items-center justify-center gap-2 pt-1">
              <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
              <div className="w-4 h-2 rounded-full bg-primary" />
            </div>

            <Button
              variant="tactical"
              onClick={handleNext}
              size="lg"
              className="w-full mt-2 animate-pulse-glow"
            >
              התחל משימה
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
