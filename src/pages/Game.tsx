import { useState, useMemo, useEffect } from "react";
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

interface Post {
  id: string;
  image: string;
  platform: "instagram" | "x" | "facebook";
  user: string;
  location: string;
  timestamp: string;
  date: string;
  keywords: string[];
  isRelevant: boolean;
}

const generateMockPosts = (): Post[] => {
  const platforms: ("instagram" | "x" | "facebook")[] = ["instagram", "x", "facebook"];
  const locations = ["תל אביב", "חיפה", "ירושלים", "באר שבע", "אילת", "נתניה", "רמת גן", "צפת", "אשדוד", "פתח תקווה", "ראשון לציון", "חולון", "הרצליה", "כפר סבא", "רעננה", "מודיעין"];
  const users = ["soldier_123", "army_life", "beach_vibes", "military_fan", "travel_il", "idf_proud", "daily_post", "reserve_unit", "combat_ready", "base_life", "training_day", "weekend_warrior", "patrol_unit", "field_ops", "recon_team", "night_watch", "desert_fox", "eagle_eye", "shadow_ops", "swift_blade"];
  const keywordSets = [
    ["כומתה אדומה", "צנחנים"],
    ["אימון", "יחידה 669"],
    ["חופש", "ים"],
    ["כומתה ירוקה", "גולני"],
    ["טיול", "נגב"],
    ["דרגת סרן", "מפקד"],
    ["בוקר טוב"],
    ["מילואים", "יחידה 8200"],
    ["כומתה שחורה", "שריון"],
    ["תרגיל", "חי״ר"],
    ["סיור", "גבול"],
    ["מסע", "טירונות"],
    ["קורס קצינים", "בה״ד 1"],
    ["חיילים", "בסיס"],
    ["נשק", "מטווח"],
    ["ג׳יפ", "שטח"],
  ];
  const times = ["08:00", "09:15", "10:30", "11:45", "12:00", "13:15", "14:30", "15:45", "16:20", "17:00", "18:30", "19:45", "20:15", "21:30", "22:00"];
  const dates = ["2023-04-05", "2023-04-18", "2023-05-02", "2023-05-20", "2023-06-10", "2023-06-25", "2023-07-08", "2023-07-22", "2023-08-05", "2023-08-20", "2023-09-01", "2023-09-15", "2023-09-28"];

  const posts: Post[] = [];
  for (let i = 1; i <= 50; i++) {
    const keywordSet = keywordSets[Math.floor(Math.random() * keywordSets.length)];
    const isMilitary = keywordSet.some(k => k.includes("כומתה") || k.includes("יחידה") || k.includes("דרגת") || k.includes("מילואים") || k.includes("שריון") || k.includes("חי״ר") || k.includes("קורס") || k.includes("נשק") || k.includes("בסיס"));
    posts.push({
      id: i.toString(),
      image: "",
      platform: platforms[Math.floor(Math.random() * platforms.length)],
      user: users[Math.floor(Math.random() * users.length)] + "_" + i,
      location: locations[Math.floor(Math.random() * locations.length)],
      timestamp: times[Math.floor(Math.random() * times.length)],
      date: dates[Math.floor(Math.random() * dates.length)],
      keywords: keywordSet,
      isRelevant: isMilitary,
    });
  }
  return posts;
};

const mockPosts: Post[] = generateMockPosts();

const Game = () => {
  const navigate = useNavigate();
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const [searchKeywords, setSearchKeywords] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<"all" | "instagram" | "x" | "facebook">("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);
  const [enlargedPost, setEnlargedPost] = useState<Post | null>(null);
  const [showMissionDetails, setShowMissionDetails] = useState(false);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(10 * 60); // 10 minutes in seconds

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/quiz", { state: { correct: correctCount, wrong: wrongCount, total: selectedPosts.length, timedOut: true } });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Dynamic filtering
  const filteredPosts = useMemo(() => {
    let posts = mockPosts;
    
    // Show only saved posts if filter is active
    if (showSavedOnly) {
      posts = posts.filter(post => savedPosts.includes(post.id));
    }
    
    return posts.filter(post => {
      // Platform filter
      if (selectedPlatform !== "all" && post.platform !== selectedPlatform) {
        return false;
      }
      
      // Location filter
      if (selectedLocation && !post.location.includes(selectedLocation)) {
        return false;
      }
      
      // Keywords filter
      if (searchKeywords) {
        const keywords = searchKeywords.split(",").map(k => k.trim().toLowerCase());
        const postKeywords = post.keywords.map(k => k.toLowerCase());
        const hasMatch = keywords.some(kw => 
          postKeywords.some(pk => pk.includes(kw)) || 
          post.user.toLowerCase().includes(kw)
        );
        if (!hasMatch) return false;
      }
      
      // Date filter
      if (fromDate && post.date < fromDate) {
        return false;
      }
      if (toDate && post.date > toDate) {
        return false;
      }
      
      // Time filter
      if (fromTime && post.timestamp < fromTime) {
        return false;
      }
      if (toTime && post.timestamp > toTime) {
        return false;
      }
      
      return true;
    });
  }, [selectedPlatform, selectedLocation, searchKeywords, fromDate, toDate, fromTime, toTime, showSavedOnly, savedPosts]);

  const correctCount = selectedPosts.filter(id => 
    mockPosts.find(p => p.id === id)?.isRelevant
  ).length;

  const wrongCount = selectedPosts.filter(id => 
    !mockPosts.find(p => p.id === id)?.isRelevant
  ).length;

  const handleApplyFilters = () => {
    setIsFiltering(true);
    setTimeout(() => {
      setIsFiltering(false);
      toast.success("הפילטרים הוחלו בהצלחה", {
        description: `נמצאו ${filteredPosts.length} פוסטים תואמים`,
      });
    }, 800);
  };

  const handleResetFilters = () => {
    setSearchKeywords("");
    setSelectedLocation("");
    setSelectedPlatform("all");
    setFromDate("");
    setToDate("");
    setFromTime("");
    setToTime("");
    setShowSavedOnly(false);
    toast.success("הפילטרים אופסו");
  };

  const togglePost = (id: string) => {
    setSelectedPosts(prev => 
      prev.includes(id) 
        ? prev.filter(p => p !== id)
        : [...prev, id]
    );
  };

  const toggleSavePost = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedPosts(prev => 
      prev.includes(id) 
        ? prev.filter(p => p !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = () => {
    navigate("/quiz", { state: { correct: correctCount, wrong: wrongCount, total: selectedPosts.length } });
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "instagram": return "bg-gradient-to-r from-purple-500 to-pink-500";
      case "x": return "bg-black";
      case "facebook": return "bg-blue-600";
      default: return "bg-gray-500";
    }
  };

  // X (Twitter) Icon Component
  const XIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "instagram": return <Instagram className="w-4 h-4" />;
      case "x": return <XIcon className="w-4 h-4" />;
      case "facebook": return <Facebook className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <header className="glass-panel rounded-xl p-4 mb-4 flex items-center justify-between flex-wrap gap-4">
        <Button variant="ghost" onClick={() => navigate("/")} className="gap-2">
          <ChevronLeft className="w-4 h-4" />
          חזור
        </Button>
        
        <div className="flex items-center gap-4 flex-wrap">
          {/* Clickable Mission Header */}
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
            timeRemaining <= 60 ? "text-red-500 animate-pulse" : "text-amber-400"
          )} style={{ textShadow: timeRemaining <= 60 ? '0 0 10px rgba(239,68,68,0.8)' : '0 0 10px rgba(251,191,36,0.6)' }}>
            <Clock className="w-5 h-5" />
            <span>{formatTime(timeRemaining)}</span>
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
              <Filter className="w-5 h-5 text-blue-400" />
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
            <Bookmark className={cn("w-4 h-4", showSavedOnly && "fill-primary")} />
            <span className="font-medium">שמורים ({savedPosts.length})</span>
          </button>

          {/* Location Filter */}
          <div className="space-y-3">
            <label className="text-sm font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-400" />
              מיקום
            </label>
            <div className="aspect-[4/3] bg-secondary rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="w-20 h-40 bg-blue-500/20 rounded-full rotate-12 border border-blue-500/40" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
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
              <Badge 
                variant="outline" 
                className={cn(
                  "cursor-pointer hover:bg-blue-500/20 hover:border-blue-500/50",
                  selectedLocation === "" && "bg-blue-500/20 border-blue-500/50"
                )}
                onDoubleClick={() => setSelectedLocation("")}
                onClick={() => setSelectedLocation("")}
              >
                הכל
              </Badge>
              <Badge 
                variant="outline" 
                className={cn(
                  "cursor-pointer hover:bg-blue-500/20 hover:border-blue-500/50",
                  selectedLocation.includes("צפ") && "bg-blue-500/20 border-blue-500/50"
                )}
                onDoubleClick={() => setSelectedLocation("")}
                onClick={() => setSelectedLocation(selectedLocation === "צפת" ? "" : "צפת")}
              >
                צפון
              </Badge>
              <Badge 
                variant="outline" 
                className={cn(
                  "cursor-pointer hover:bg-blue-500/20 hover:border-blue-500/50",
                  (selectedLocation.includes("תל אביב") || selectedLocation.includes("רמת")) && "bg-blue-500/20 border-blue-500/50"
                )}
                onDoubleClick={() => setSelectedLocation("")}
                onClick={() => setSelectedLocation(selectedLocation === "תל אביב" ? "" : "תל אביב")}
              >
                מרכז
              </Badge>
              <Badge 
                variant="outline" 
                className={cn(
                  "cursor-pointer hover:bg-blue-500/20 hover:border-blue-500/50",
                  (selectedLocation.includes("באר") || selectedLocation.includes("אילת")) && "bg-blue-500/20 border-blue-500/50"
                )}
                onDoubleClick={() => setSelectedLocation("")}
                onClick={() => setSelectedLocation(selectedLocation === "באר שבע" ? "" : "באר שבע")}
              >
                דרום
              </Badge>
            </div>
          </div>

          {/* Date/Time Filter */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-400" />
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
              <Search className="w-4 h-4 text-blue-400" />
              מילות קוד
            </label>
            <Input 
              placeholder="כומתה, יחידה, דרגה..."
              value={searchKeywords}
              onChange={(e) => setSearchKeywords(e.target.value)}
              className="bg-secondary/50"
            />
            <div className="flex flex-wrap gap-1">
              <Badge 
                className={cn(
                  "cursor-pointer",
                  searchKeywords.includes("כומתה אדומה") 
                    ? "bg-blue-500/40 text-blue-300" 
                    : "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                )}
                onClick={() => setSearchKeywords(prev => prev ? prev + ", כומתה אדומה" : "כומתה אדומה")}
              >
                כומתה אדומה
              </Badge>
              <Badge 
                className={cn(
                  "cursor-pointer",
                  searchKeywords.includes("יחידה 669") 
                    ? "bg-blue-500/40 text-blue-300" 
                    : "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                )}
                onClick={() => setSearchKeywords(prev => prev ? prev + ", יחידה 669" : "יחידה 669")}
              >
                יחידה 669
              </Badge>
              <Badge 
                className={cn(
                  "cursor-pointer",
                  searchKeywords.includes("דרגת סרן") 
                    ? "bg-blue-500/40 text-blue-300" 
                    : "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                )}
                onClick={() => setSearchKeywords(prev => prev ? prev + ", דרגת סרן" : "דרגת סרן")}
              >
                דרגת סרן
              </Badge>
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

          <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
            <p className="text-xs text-blue-400 text-center">
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
                  ? "bg-blue-600 text-white"
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
                  ? "bg-black text-white border border-white/20"
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
                      ? "ring-2 ring-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]" 
                      : "hover:ring-1 hover:ring-blue-500/50"
                  )}
                >
                  {/* Clickable Image Area - Opens Enlarged View */}
                  <div 
                    className="aspect-square bg-secondary flex items-center justify-center cursor-pointer"
                    onClick={() => setEnlargedPost(post)}
                  >
                    <div className="w-16 h-16 rounded-lg border border-muted-foreground/30 flex items-center justify-center">
                      <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>

                  {/* Platform Badge */}
                  <div className={cn(
                    "absolute top-2 right-2 px-2 py-0.5 rounded text-white text-[10px] font-medium flex items-center gap-1",
                    getPlatformColor(post.platform)
                  )}>
                    {getPlatformIcon(post.platform)}
                    {post.platform}
                  </div>

                  {/* Save Button - Always Visible */}
                  <button
                    onClick={(e) => toggleSavePost(post.id, e)}
                    className={cn(
                      "absolute top-2 left-2 w-7 h-7 rounded-full flex items-center justify-center transition-all",
                      isSaved 
                        ? "bg-primary text-white" 
                        : "bg-black/50 text-white hover:bg-black/70"
                    )}
                  >
                    <Bookmark className={cn("w-4 h-4", isSaved && "fill-white")} />
                  </button>

                  {/* Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <div className="flex items-center justify-between text-white text-xs mb-1">
                      <span className="font-medium">@{post.user}</span>
                      <span className="opacity-70">{post.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-1 text-white/70 text-[10px] mb-2">
                      <MapPin className="w-3 h-3" />
                      {post.location}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {post.keywords.slice(0, 2).map((kw, i) => (
                        <span key={i} className="px-1.5 py-0.5 bg-white/20 rounded text-[9px] text-white">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Static Radio Button for Selection */}
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
                        : "border-white/70 bg-black/30"
                    )}>
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-white" />
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
              {/* Large Image */}
              <div className="aspect-square bg-secondary rounded-lg flex items-center justify-center">
                <div className="w-32 h-32 rounded-lg border border-muted-foreground/30 flex items-center justify-center">
                  <svg className="w-16 h-16 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              
              {/* Post Details */}
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
                    <Badge key={i} variant="outline" className="text-blue-400 border-blue-500/50">
                      {kw}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Select Button */}
              <Button 
                variant={selectedPosts.includes(enlargedPost.id) ? "tactical" : "tacticalOutline"}
                className="w-full"
                onClick={() => {
                  togglePost(enlargedPost.id);
                  setEnlargedPost(null); // Close popup after selection
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
