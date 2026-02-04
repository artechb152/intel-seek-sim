import { Facebook, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";
import { XIcon } from "@/components/common/icons/XIcon";
import type { Platform } from "@/types";

interface PlatformTabsProps {
  selectedPlatform: "all" | Platform;
  onPlatformChange: (platform: "all" | Platform) => void;
}

const platformConfig = [
  {
    id: "all" as const,
    label: "הכל",
    icon: null,
    activeClass: "bg-primary text-primary-foreground",
  },
  {
    id: "facebook" as const,
    label: "Facebook",
    icon: Facebook,
    activeClass: "bg-[#1877f2] text-white",
  },
  {
    id: "instagram" as const,
    label: "Instagram",
    icon: Instagram,
    activeClass: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
  },
  {
    id: "x" as const,
    label: "X",
    icon: XIcon,
    activeClass: "bg-foreground text-background border border-border",
  },
] as const;

export const PlatformTabs = ({
  selectedPlatform,
  onPlatformChange,
}: PlatformTabsProps) => {
  return (
    <div className="flex gap-2 mb-4 border-b border-border pb-4">
      {platformConfig.map((platform) => {
        const Icon = platform.icon;
        const isActive = selectedPlatform === platform.id;

        return (
          <button
            key={platform.id}
            onClick={() => onPlatformChange(platform.id)}
            className={cn(
              "px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2",
              isActive
                ? platform.activeClass
                : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
            )}
          >
            {Icon && <Icon className="w-4 h-4" />}
            {platform.label}
          </button>
        );
      })}
    </div>
  );
};
