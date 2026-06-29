import { cn } from "@/lib/utils";
import { missions } from "@/constants/missions";
import type { Mission } from "@/constants/missions";

interface MissionSelectTabsProps {
  selectedMission: Mission | null;
  onSelectMission: (mission: Mission | null) => void;
}

export const MissionSelectTabs = ({
  selectedMission,
  onSelectMission,
}: MissionSelectTabsProps) => {
  return (
    <div className="flex justify-center gap-2 mb-4 border-b border-border pb-4 flex-wrap items-center">
      <button
        onClick={() => onSelectMission(null)}
        className={cn(
          "flex-1 whitespace-nowrap px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2",
          selectedMission === null
            ? "bg-primary text-primary-foreground"
            : "bg-white/10 text-foreground hover:bg-white/20"
        )}
      >
        הכל
      </button>

      {missions.map((mission) => {
        const isActive = selectedMission === mission;

        return (
          <button
            key={mission}
            onClick={() => onSelectMission(mission)}
            className={cn(
              "flex-1 whitespace-nowrap px-4 py-2 rounded-lg border font-medium transition-all flex items-center justify-center gap-2",
              isActive
                ? "border-blue-500 bg-blue-500 text-white shadow-[0_0_12px_rgba(59,130,246,0.5)]"
                : "border-white bg-white/10 text-foreground hover:bg-white/20"
            )}
          >
            {mission}
          </button>
        );
      })}
    </div>
  );
};
