import { cn } from "@/lib/utils";
import {
  missions,
  GENERAL_MISSION,
  type SaveBucket,
} from "@/constants/missions";

interface MissionTabsProps {
  selectedMissionFilter: "all" | SaveBucket;
  onMissionFilterChange: (mission: "all" | SaveBucket) => void;
  counts: Record<string, number>;
}

export const MissionTabs = ({
  selectedMissionFilter,
  onMissionFilterChange,
  counts,
}: MissionTabsProps) => {
  const tabs = ["all" as const, ...missions, GENERAL_MISSION];

  return (
    <div className="flex justify-center gap-2 mb-4 border-b border-border pb-4 flex-wrap">
      {tabs.map((tab) => {
        const isActive = selectedMissionFilter === tab;
        const label = tab === "all" ? "הכל" : tab;
        const count = tab === "all" ? undefined : counts[tab] ?? 0;

        return (
          <button
            key={tab}
            onClick={() => onMissionFilterChange(tab)}
            className={cn(
              "flex-1 whitespace-nowrap px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2",
              isActive
                ? "bg-blue-500 text-white"
                : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
            )}
          >
            {label}
            {count !== undefined && (
              <span className="font-mono text-xs opacity-80">{count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
};
