import { Instagram, Facebook, MessageCircle, Twitter, Camera, Radio, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialMenuItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  active?: boolean;
}

interface SocialMenuProps {
  activePlatform: string;
  onPlatformChange: (platform: string) => void;
}

const socialItems: SocialMenuItem[] = [
  { id: "instagram", name: "אינסטגרם", icon: <Instagram className="w-5 h-5" /> },
  { id: "facebook", name: "פייסבוק", icon: <Facebook className="w-5 h-5" /> },
  { id: "tiktok", name: "טיקטוק", icon: <Camera className="w-5 h-5" /> },
  { id: "snapchat", name: "סנאפצ'אט", icon: <MessageCircle className="w-5 h-5" /> },
  { id: "twitter", name: "טוויטר", icon: <Twitter className="w-5 h-5" /> },
  { id: "telegram", name: "האזנה", icon: <Radio className="w-5 h-5" /> },
  { id: "photos", name: "תצלומות", icon: <Camera className="w-5 h-5" /> },
  { id: "connections", name: "תקשורת", icon: <Radio className="w-5 h-5" /> },
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
          ז על השכל הזאת להיכנס לעמוד הפקודות, בעמודים אלה יראה לך כל הפקודות שאנחנו מציעים
        </p>
      </div>

      {/* Image Placeholder */}
      <div className="mt-4 h-20 bg-secondary rounded-xl flex items-center justify-center">
        <Camera className="w-8 h-8 text-muted-foreground" />
      </div>

      {/* Logout */}
      <button className="mt-4 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors px-4 py-2">
        <LogOut className="w-4 h-4" />
        <span>התנתק</span>
      </button>
    </div>
  );
};
