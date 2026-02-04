import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { 
  MapPin, Calendar, Search, Filter, 
  Clock, Target, ChevronLeft, Loader2,
  Instagram, Facebook, RotateCcw, Bookmark
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MissionDetailsPopup } from "@/components/landing/MissionDetailsPopup";

// Import from new modular structure
import type { Post, Platform } from "@/types";
import { mockPosts } from "@/constants/posts";
import { XIcon } from "@/components/common/icons/XIcon";
import { getPlatformColor, getPlatformIcon } from "@/lib/platform-helpers";
import { useTimer } from "@/hooks/useTimer";

const Game = () => {
  const navigate = useNavigate();
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const [searchKeywords, setSearchKeywords] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<"all" | Platform>("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);
  const [enlargedPost, setEnlargedPost] = useState<Post | null>(null);
  const [showMissionDetails, setShowMissionDetails] = useState(false);
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  // Use custom timer hook
  const { timeRemaining, formattedTime } = useTimer({
    initialSeconds: 10 * 60,
    onTimeUp: () => {
      navigate("/quiz", { 
        state: { correct: correctCount, wrong: wrongCount, total: selectedPosts.length, timedOut: true } 
      });
    }
  });

  // Dynamic filtering
  const filteredPosts = useMemo(() => {
    let posts = mockPosts;
    
    if (showSavedOnly) {
      posts = posts.filter(post => savedPosts.includes(post.id));
    }
    
    return posts.filter(post => {
      if (selectedPlatform !== "all" && post.platform !== selectedPlatform) return false;
      if (selectedLocation && !post.location.includes(selectedLocation)) return false;
      
      if (searchKeywords) {
        const keywords = searchKeywords.split(",").map(k => k.trim().toLowerCase());
        const postKeywords = post.keywords.map(k => k.toLowerCase());
        const hasMatch = keywords.some(kw => 
          postKeywords.some(pk => pk.includes(kw)) || post.user.toLowerCase().includes(kw)
        );
        if (!hasMatch) return false;
      }
      
      if (fromDate && post.date < fromDate) return false;
      if (toDate && post.date > toDate) return false;
      if (fromTime && post.timestamp < fromTime) return false;
      if (toTime && post.timestamp > toTime) return false;
      
      return true;
    });
  }, [selectedPlatform, selectedLocation, searchKeywords, fromDate, toDate, fromTime, toTime, showSavedOnly, savedPosts]);

  const correctCount = selectedPosts.filter(id => 
    mockPosts.find(p => p.id === id)?.isRelevant
  ).length;

  const wrongCount = selectedPosts.filter(id => 
    !mockPosts.find(p => p.id === id)?.isRelevant
  ).length;

  const handleApplyFilters = useCallback(() => {
    setIsFiltering(true);
    setTimeout(() => {
      setIsFiltering(false);
      toast.success("הפילטרים הוחלו בהצלחה", {
        description: `נמצאו ${filteredPosts.length} פוסטים תואמים`,
      });
    }, 800);
  }, [filteredPosts.length]);

  const handleResetFilters = useCallback(() => {
    setSearchKeywords("");
    setSelectedLocation("");
    setSelectedPlatform("all");
    setFromDate("");
    setToDate("");
    setFromTime("");
    setToTime("");
    setShowSavedOnly(false);
    toast.success("הפילטרים אופסו");
  }, []);

  const togglePost = useCallback((id: string) => {
    setSelectedPosts(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  }, []);

  const toggleSavePost = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedPosts(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  }, []);

  const handleSubmit = useCallback(() => {
    navigate("/quiz", { state: { correct: correctCount, wrong: wrongCount, total: selectedPosts.length } });
  }, [navigate, correctCount, wrongCount, selectedPosts.length]);

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <header className="glass-panel rounded-xl p-4 mb-4 flex items-center justify-between flex-wrap gap-4">
        <Button variant="ghost" onClick={() => navigate("/")} className="gap-2">
          <ChevronLeft className="w-4 h-4" />
          חזור
        </Button>
        
        <div className="flex items-center gap-4 flex-wrap">
          <button 
            onClick={() => setShowMissionDetails(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/30 hover:bg-primary/20 transition-all cursor-pointer"
          >
            <Target className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">משימה:</span>
            <span className="font-semibold text-foreground">אסוף מידע וניתוח שטח בסיס גלילות</span>
          </button>
          
          <div className="h-8 w-px bg-border hidden sm:block" />
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">נבחרו:</span>
              <Badge variant="outline" className="font-mono">{selectedPosts.length}/50</Badge>
            </div>
          </div>
          
          <div className="h-8 w-px bg-border" />
          
          <div className={cn(
            "flex items-center gap-2 font-mono text-lg font-bold",
            timeRemaining <= 60 ? "text-destructive animate-pulse" : "text-accent"
          )} style={{ textShadow: timeRemaining <= 60 ? '0 0 10px hsl(var(--destructive) / 0.8)' : '0 0 10px hsl(var(--accent) / 0.6)' }}>
            <Clock className="w-5 h-5" />
            <span>{formattedTime}</span>
          </div>
        </div>
        
        <Button variant="tactical" onClick={handleSubmit} className="animate-pulse-glow">
          סיים בדיקה
        </Button>
      </header>

      <div className="flex gap-4 h-[calc(100vh-140px)]">
        {/* Filters Sidebar */}
        <aside className="w-80 glass-panel rounded-xl p-4 space-y-6 overflow-y-auto scrollbar-tactical">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Filter className="w-5 h-5 text-primary" />
              פילטרים
            </h2>
            <button
              onClick={handleResetFilters}
              className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
              title="איפוס פילטרים"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Saved Filter */}
          <button
            onClick={() => setShowSavedOnly(!showSavedOnly)}
            className={cn(
              "w-full flex items-center gap-2 p-3 rounded-lg border transition-all",
              showSavedOnly
                ? "bg-primary/20 border-primary/50 text-primary"
                : "bg-secondary/50 border-border text-muted-foreground hover:border-primary/30"
            )}
          >
            <Bookmark className={cn("w-4 h-4", showSavedOnly && "fill-current")} />
            <span className="font-medium">שמורים ({savedPosts.length})</span>
          </button>

          {/* Location Filter */}
          <div className="space-y-3">
            <label className="text-sm font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              מיקום
            </label>
            <div className="aspect-[4/3] bg-secondary rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="w-20 h-40 bg-primary/20 rounded-full rotate-12 border border-primary/40" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 bg-primary rounded-full animate-pulse shadow-[0_0_15px_hsl(var(--primary)/0.5)]" />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-2 left-2 right-2">
                <Input 
                  placeholder="הזן עיר או אזור..."
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="bg-background/80 text-xs"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "הכל", value: "" },
                { label: "צפון", value: "צפת" },
                { label: "מרכז", value: "תל אביב" },
                { label: "דרום", value: "באר שבע" },
              ].map((loc) => (
                <Badge 
                  key={loc.label}
                  variant="outline" 
                  className={cn(
                    "cursor-pointer hover:bg-primary/20 hover:border-primary/50",
                    (loc.value === "" ? selectedLocation === "" : selectedLocation.includes(loc.value)) && 
                    "bg-primary/20 border-primary/50"
                  )}
                  onClick={() => setSelectedLocation(selectedLocation === loc.value ? "" : loc.value)}
                >
                  {loc.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Date/Time Filter */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                תאריך ושעה
              </label>
              <button
                onClick={handleResetFilters}
                className="p-1.5 rounded hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                title="איפוס כל הפילטרים"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-xs text-muted-foreground">מתאריך</span>
                <Input 
                  type="date" 
                  className="bg-secondary/50 [color-scheme:dark]" 
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  min="2023-04-01"
                  max="2023-10-01"
                />
              </div>
              <div>
                <span className="text-xs text-muted-foreground">עד תאריך</span>
                <Input 
                  type="date" 
                  className="bg-secondary/50 [color-scheme:dark]"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  min="2023-04-01"
                  max="2023-10-01"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-xs text-muted-foreground">משעה</span>
                <Input 
                  type="time" 
                  className="bg-secondary/50 [color-scheme:dark]"
                  value={fromTime}
                  onChange={(e) => setFromTime(e.target.value)}
                />
              </div>
              <div>
                <span className="text-xs text-muted-foreground">עד שעה</span>
                <Input 
                  type="time" 
                  className="bg-secondary/50 [color-scheme:dark]"
                  value={toTime}
                  onChange={(e) => setToTime(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Keywords Filter */}
          <div className="space-y-3">
            <label className="text-sm font-medium flex items-center gap-2">
              <Search className="w-4 h-4 text-primary" />
              מילות קוד
            </label>
            <Input 
              placeholder="כומתה, יחידה, דרגה..."
              value={searchKeywords}
              onChange={(e) => setSearchKeywords(e.target.value)}
              className="bg-secondary/50"
            />
            <div className="flex flex-wrap gap-1">
              {["כומתה אדומה", "יחידה 669", "דרגת סרן"].map((kw) => (
                <Badge 
                  key={kw}
                  className={cn(
                    "cursor-pointer",
                    searchKeywords.includes(kw) 
                      ? "bg-primary/40 text-primary-foreground" 
                      : "bg-primary/20 text-primary hover:bg-primary/30"
                  )}
                  onClick={() => setSearchKeywords(prev => prev ? prev + ", " + kw : kw)}
                >
                  {kw}
                </Badge>
              ))}
            </div>
          </div>

          <Button 
            variant="tacticalOutline" 
            className="w-full"
            onClick={handleApplyFilters}
            disabled={isFiltering}
          >
            {isFiltering ? (
              <>
                <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                מחפש...
              </>
            ) : (
              "החל פילטרים"
            )}
          </Button>

          <div className="p-3 bg-primary/10 rounded-lg border border-primary/30">
            <p className="text-xs text-primary text-center">
              ✓ {filteredPosts.length} תוצאות
            </p>
          </div>
        </aside>

        {/* Posts Grid */}
        <main className="flex-1 glass-panel rounded-xl p-4 overflow-y-auto scrollbar-tactical">
          {/* Platform Tabs */}
          <div className="flex gap-2 mb-4 border-b border-border pb-4">
            <button
              onClick={() => setSelectedPlatform("all")}
              className={cn(
                "px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2",
                selectedPlatform === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
              )}
            >
              הכל
            </button>
            <button
              onClick={() => setSelectedPlatform("facebook")}
              className={cn(
                "px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2",
                selectedPlatform === "facebook"
                  ? "bg-[#1877f2] text-white"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
              )}
            >
              <Facebook className="w-4 h-4" />
              Facebook
            </button>
            <button
              onClick={() => setSelectedPlatform("instagram")}
              className={cn(
                "px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2",
                selectedPlatform === "instagram"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
              )}
            >
              <Instagram className="w-4 h-4" />
              Instagram
            </button>
            <button
              onClick={() => setSelectedPlatform("x")}
              className={cn(
                "px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2",
                selectedPlatform === "x"
                  ? "bg-foreground text-background border border-border"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
              )}
            >
              <XIcon className="w-4 h-4" />
              X
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredPosts.map((post) => {
              const isSelected = selectedPosts.includes(post.id);
              const isSaved = savedPosts.includes(post.id);
              return (
                <div
                  key={post.id}
                  className={cn(
                    "relative rounded-xl overflow-hidden transition-all duration-300 group",
                    isSelected 
                      ? "ring-2 ring-primary shadow-[0_0_15px_hsl(var(--primary)/0.3)]" 
                      : "hover:ring-1 hover:ring-primary/50"
                  )}
                >
                  {/* Clickable Image Area */}
                  <div 
                    className="aspect-square bg-secondary cursor-pointer overflow-hidden"
                    onClick={() => setEnlargedPost(post)}
                  >
                    <img 
                      src={post.image}
                      alt={`פוסט של ${post.user}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Platform Badge */}
                  <div className={cn(
                    "absolute top-2 right-2 px-2 py-0.5 rounded text-white text-[10px] font-medium flex items-center gap-1",
                    getPlatformColor(post.platform)
                  )}>
                    {getPlatformIcon(post.platform)}
                    {post.platform}
                  </div>

                  {/* Save Button */}
                  <button
                    onClick={(e) => toggleSavePost(post.id, e)}
                    className={cn(
                      "absolute top-2 left-2 w-7 h-7 rounded-full flex items-center justify-center transition-all",
                      isSaved 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-background/50 text-foreground hover:bg-background/70"
                    )}
                  >
                    <Bookmark className={cn("w-4 h-4", isSaved && "fill-current")} />
                  </button>

                  {/* Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent p-3">
                    <div className="flex items-center justify-between text-foreground text-xs mb-1">
                      <span className="font-medium">@{post.user}</span>
                      <span className="opacity-70">{post.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-1 text-foreground/70 text-[10px] mb-2">
                      <MapPin className="w-3 h-3" />
                      {post.location}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {post.keywords.slice(0, 2).map((kw, i) => (
                        <span key={i} className="px-1.5 py-0.5 bg-foreground/20 rounded text-[9px] text-foreground">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Selection Radio */}
                  <div 
                    className="absolute bottom-3 left-3 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePost(post.id);
                    }}
                  >
                    <div className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                      isSelected 
                        ? "border-primary bg-primary" 
                        : "border-foreground/70 bg-background/30"
                    )}>
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredPosts.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
              <Search className="w-12 h-12 mb-4 opacity-50" />
              <p className="text-lg font-medium">לא נמצאו תוצאות</p>
              <p className="text-sm">נסה לשנות את הפילטרים</p>
            </div>
          )}
        </main>
      </div>

      {/* Enlarged Post Dialog */}
      <Dialog open={!!enlargedPost} onOpenChange={() => setEnlargedPost(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>@{enlargedPost?.user}</span>
              <Badge className={getPlatformColor(enlargedPost?.platform || "")}>
                {enlargedPost?.platform}
              </Badge>
            </DialogTitle>
          </DialogHeader>
          
          {enlargedPost && (
            <div className="space-y-4">
              <div className="aspect-square bg-secondary rounded-lg overflow-hidden">
                <img 
                  src={enlargedPost.image}
                  alt={`פוסט של ${enlargedPost.user}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{enlargedPost.location}</span>
                  <span className="mx-2">•</span>
                  <Clock className="w-4 h-4" />
                  <span>{enlargedPost.timestamp}</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {enlargedPost.keywords.map((kw, i) => (
                    <Badge key={i} variant="outline" className="text-primary border-primary/50">
                      {kw}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <Button 
                variant={selectedPosts.includes(enlargedPost.id) ? "tactical" : "tacticalOutline"}
                className="w-full"
                onClick={() => {
                  togglePost(enlargedPost.id);
                  setEnlargedPost(null);
                }}
              >
                {selectedPosts.includes(enlargedPost.id) ? "הסר מהבחירה" : "בחר פוסט זה"}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Mission Details Popup */}
      <MissionDetailsPopup 
        open={showMissionDetails} 
        onClose={() => setShowMissionDetails(false)} 
      />
    </div>
  );
};

export default Game;
