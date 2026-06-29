import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Target, Maximize2, Minimize2, Play, Pause, Clock, AlertTriangle } from "lucide-react";
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

  const TOTAL_PAGES = 4;

  const handleNext = () => {
    if (currentPage < TOTAL_PAGES - 1) {
      setCurrentPage(currentPage + 1);
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
      <DialogContent className={`glass-panel border-primary/30 [&>button.absolute]:hidden ${currentPage === 3 ? 'sm:max-w-lg p-3 data-[state=open]:animate-none data-[state=open]:zoom-in-100 data-[state=open]:slide-in-from-left-0 data-[state=open]:slide-in-from-top-0' : currentPage === 1 ? '!w-auto max-w-[95vw] max-h-[95vh] p-0 gap-3 overflow-hidden !flex flex-col justify-start !border-0 !shadow-none !bg-transparent !backdrop-blur-none' : 'sm:max-w-xl'}`} dir="rtl" onPointerDownOutside={(e) => e.preventDefault()} onInteractOutside={(e) => e.preventDefault()}>
        {/* Preload image */}
        <img src={popUp3} alt="" className="hidden" />

        {currentPage === 0 && (
          <>
            <DialogHeader className="space-y-4">
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                    <AlertTriangle className="w-8 h-8 text-primary animate-pulse" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive animate-ping" />
                </div>
              </div>

              <DialogTitle className="text-2xl font-bold text-center mb-1">
                <span className="text-gradient-tactical">ברוכים הבאים</span>
                <br />
                <span className="text-foreground text-3xl">לסימולטור איסוף מודיעין</span>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-2 text-right">
              <p className="text-foreground leading-relaxed">
                האויב אוסף עליכם מידע ממגוון רחב של רשתות ומקורות גלויים וסמויים, במטרה לבנות תמונה מלאה עליכם ועל הארגון: מי אתם, מה התפקיד שלכם, עם מי אתם עובדים, היכן אתם נמצאים, ומהם דפוסי הפעילות שלכם.
              </p>
              <p className="text-white font-medium leading-relaxed">
                איסוף המידע מתבצע לעיתים בלי שתשימו לב — דרך פרטים קטנים שמופיעים ברשתות חברתיות, אתרי אינטרנט, קבצים ציבוריים, תמונות, תגובות, מיקומים, ושיתופים שונים.
              </p>
            </div>
          </>
        )}

        {currentPage === 1 && (
          <>
            {/* Video Container */}
            <div className="relative w-fit max-w-full mx-auto rounded-lg overflow-hidden group">
              <video
                ref={videoRef}
                onClick={togglePlayPause}
                className="max-h-[70vh] w-auto max-w-full object-contain cursor-pointer"
                autoPlay
                loop
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src={`${import.meta.env.BASE_URL}${encodeURIComponent("סימולטור במ.mp4")}`} type="video/mp4" />
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <Target className="w-12 h-12 mb-2" />
                  <span>תצוגת משימה</span>
                </div>
              </video>

              {/* Center Play Button */}
              {!isPlaying && (
                <button
                  onClick={togglePlayPause}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-lg hover:bg-primary transition-colors">
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  </div>
                </button>
              )}

              {/* Video Controls Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div
                  dir="ltr"
                  className="h-1 bg-white/30 rounded-full mb-3 cursor-pointer"
                  onClick={handleProgressClick}
                >
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between">
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
                </div>
              </div>
            </div>

            {/* Mission Title Below Video */}
            <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/30 max-w-3xl mx-auto">
              <p className="text-2xl font-bold text-foreground">
                איסוף מידע לכיבוש בסיס ירקון - 1-5.10.2023
              </p>
              <p className="text-lg text-white font-medium mt-2">
                איספו מידע ובצעו ניתוח שטח של בסיס ירקון, כולל מבנה הבסיס, התנהלות השמירות, כמות החיילים, רמת הכוננות ונוכחות בכירים בבסיס.
              </p>
            </div>
          </>
        )}

        {currentPage === 2 && (
          <>
            <DialogHeader className="space-y-4">
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-primary/30 flex items-center justify-center border-2 border-primary shadow-[0_0_25px_rgba(59,130,246,0.5)]">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                </div>
              </div>

              <DialogTitle className="text-2xl font-bold text-center text-primary">
                פרטי המשימה
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/40">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-foreground text-base leading-relaxed font-medium">
                    איספו מידע ובצעו ניתוח של בסיס ירקון לפי
                  </p>
                </div>
                <div className="mt-3 grid grid-cols-6 gap-2 text-right">
                  {[
                    'מבנה הבסיס',
                    'רמת הכוננות',
                    'כמות החיילים',
                    'התנהלות השמירות',
                    'נוכחות בכירים בבסיס',
                  ].map((item, i) => (
                    <div
                      key={item}
                      className={`p-3 rounded-lg border-2 border-white bg-white/10 text-center ${
                        i < 3 ? 'col-span-2' : 'col-span-3'
                      }`}
                    >
                      <p className="font-bold text-foreground text-sm">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 p-3 rounded-lg border-2 border-destructive bg-destructive/10 text-center">
                  <p className="font-bold text-foreground">על מנת להתמקד, בחרו בכל פעם משימה אחת מהתפריט העליון.
                    פוסטים שתסמנו או תשמרו יכנסו באופן אוטומטי לקטגוריה של המשימה שבחרתם.                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white font-medium">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>זמן: 15 דקות</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-secondary/50 border border-border">
                <p className="text-sm text-white font-medium leading-relaxed">
                  השתמשו בפילטרים לסינון לפי מיקום, תאריך ומילות מפתח. בחרו את
                  הפוסטים הרלוונטיים למשימה ולחץ על "סיים בדיקה" בסיום.
                </p>
              </div>
            </div>
          </>
        )}

        {currentPage === 3 && (
          <div className="space-y-1 py-0 text-right">
            <p className="text-lg md:text-xl font-bold text-foreground text-center">
              לדוגמה: פרטים שניתן להוציא מהתמונה
            </p>
            <img src={popUp3} alt="דוגמה לפרטים שניתן להוציא מתמונה" className="w-full max-h-[62vh] object-contain rounded-lg border border-border/50" />
          </div>
        )}

        {/* Page indicators */}
        <div className="flex items-center justify-center gap-2 pt-1">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === currentPage ? 'bg-primary w-4' : 'bg-muted-foreground/30 w-2'
              }`}
            />
          ))}
        </div>

        <Button
          variant="tactical"
          onClick={handleNext}
          size={currentPage === 3 ? 'lg' : 'default'}
          className={`animate-pulse-glow ${currentPage === 1 ? 'w-auto px-8 mx-auto' : 'w-full'}`}
        >
          {currentPage === 3 ? 'הבנתי, בואו נתחיל!' : 'המשך'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
