import { Instagram, Facebook, MessageCircle, Camera, Radio, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { XIcon } from "@/components/common/icons/XIcon";

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
  { id: "instagram", name: "אינסטגרם", icon: <Instagram className="w-5 h-5" /> },
  { id: "facebook", name: "פייסבוק", icon: <Facebook className="w-5 h-5" /> },
  { id: "x", name: "X", icon: <XIcon className="w-5 h-5" /> },
  { id: "tiktok", name: "טיקטוק", icon: <Camera className="w-5 h-5" /> },
  { id: "snapchat", name: "סנאפצ'אט", icon: <MessageCircle className="w-5 h-5" /> },
  { id: "listening", name: "האזנה", icon: <Radio className="w-5 h-5" /> },
  { id: "cameras", name: "מצלמות אבטחה", icon: <Camera className="w-5 h-5" /> },
];

export const SocialMenu = ({ activePlatform, onPlatformChange }: SocialMenuProps) => {
  return (
    <div className="glass-panel rounded-2xl p-4 h-full flex flex-col">
      {/* Logo */}
      <div className="text-center mb-6 pb-4 border-b border-border/50">
        <h2 className="text-2xl font-bold text-gradient-tactical">SOCIAL</h2>
        <h2 className="text-2xl font-bold text-foreground">INTEL SIM</h2>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 space-y-2">
        {socialItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPlatformChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-right",
              activePlatform === item.id
                ? "bg-primary/20 text-primary tactical-border glow-green"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            )}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </button>
        ))}
      </nav>

      {/* Info Box */}
      <div className="mt-4 p-4 bg-secondary/50 rounded-xl text-sm text-muted-foreground leading-relaxed">
        <p>
          المدينة هادئة، لكن الأحاديث لا تتوقف. في الشوارع كرامة… وفي الظلال أسرار. شبكة الظلال تواصل الإصغاء.
        </p>
      </div>

      {/* Logout */}
      <div className="mt-auto pt-4 border-t border-border/50">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-300 text-right">
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span className="font-medium">התנתק</span>
        </button>
      </div>
    </div>
  );
};
