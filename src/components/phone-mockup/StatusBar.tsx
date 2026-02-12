/**
 * iOS-style status bar component for phone mockup
 */
export const StatusBar = () => (
  <div className="flex-shrink-0 flex items-center justify-between px-4 py-1 text-xs">
    <span className="font-semibold">9:41</span>
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">
        <div className="w-1 h-1 bg-current rounded-full"></div>
        <div className="w-1 h-1 bg-current rounded-full"></div>
        <div className="w-1 h-1 bg-current rounded-full"></div>
        <div className="w-1 h-1 bg-current rounded-full"></div>
      </div>
      <span>5G</span>
      <div className="w-6 h-3 border border-current rounded-sm relative">
        <div className="absolute inset-0.5 bg-current rounded-sm" style={{ width: "80%" }}></div>
      </div>
    </div>
  </div>
);
