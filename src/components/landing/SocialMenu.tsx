import { Instagram, Facebook, MessageCircle, Camera, Radio, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { XIcon } from '@/components/common/icons/XIcon';

interface SocialMenuItem {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface SocialMenuProps {
  activePlatform: string;
  onPlatformChange: (platform: string) => void;
}

const socialItems: SocialMenuItem[] = [
  { id: 'instagram', name: 'אינסטגרם', icon: <Instagram className="w-4 h-4" /> }, // אייקון קטן יותר (4)
  { id: 'facebook', name: 'פייסבוק', icon: <Facebook className="w-4 h-4" /> },
  { id: 'x', name: 'X', icon: <XIcon className="w-4 h-4" /> },
  { id: 'tiktok', name: 'טיקטוק', icon: <Camera className="w-4 h-4" /> },
  { id: 'snapchat', name: "סנאפצ'אט", icon: <MessageCircle className="w-4 h-4" /> },
  { id: 'listening', name: 'האזנה', icon: <Radio className="w-4 h-4" /> },
  { id: 'cameras', name: 'מצלמות אבטחה', icon: <Camera className="w-4 h-4" /> },
];

export const SocialMenu = ({ activePlatform, onPlatformChange }: SocialMenuProps) => {
  return (
    // justify-between: מבטיח שהחלקים יתפרסו מקצה לקצה בלי לחפוף
    <div className="glass-panel rounded-2xl p-3 h-full flex flex-col justify-between overflow-hidden">
      {/* 1. Header */}
      <div className="text-center pb-2 border-b border-border/50 flex-shrink-0">
        <h2 className="text-xl font-bold text-gradient-tactical">SOCIAL</h2>
        <h2 className="text-xl font-bold text-foreground">INTEL SIM</h2>
      </div>

      {/* 2. Menu Items - דחוסים יותר */}
      <nav className="flex flex-col justify-center gap-1 w-full py-2">
        {socialItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPlatformChange(item.id)}
            // py-2: גובה מינימלי לכפתור כדי לחסוך מקום
            className={cn('w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 text-right', activePlatform === item.id ? 'bg-primary/20 text-primary tactical-border glow-green' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50')}
          >
            <span className="flex-shrink-0 opacity-80">{item.icon}</span>
            <span className="font-medium text-sm">{item.name}</span>
          </button>
        ))}
      </nav>

      {/* 3. Bottom Section - קופקטי */}
      <div className="flex flex-col gap-2 flex-shrink-0">
        {/* Info Box - טקסט קטן יותר ומרווחים קטנים יותר */}
        <div className="p-2.5 bg-secondary/50 rounded-lg text-xs text-muted-foreground leading-tight">
          <p>المدينة هادئة، لكن الأحاديث لا تتوقف. في الشوارع كرامة… وفي الظلال أسرار. شبكة الظلال تواصل الإصغاء.</p>
        </div>

        {/* Logout */}
        <div className="border-t border-border/50 pt-2">
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-300 text-right">
            <LogOut className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium text-sm">התנתק</span>
          </button>
        </div>
      </div>
    </div>
  );
};
