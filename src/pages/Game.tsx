import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  MapPin, Calendar, Search, Filter, Check, X, 
  Clock, Target, ChevronLeft, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Post {
  id: string;
  image: string;
  platform: "instagram" | "tiktok" | "facebook";
  user: string;
  location: string;
  timestamp: string;
  keywords: string[];
  isRelevant: boolean;
}

const generateMockPosts = (): Post[] => {
  const platforms: ("instagram" | "tiktok" | "facebook")[] = ["instagram", "tiktok", "facebook"];
  const locations = ["תל אביב", "חיפה", "ירושלים", "באר שבע", "אילת", "נתניה", "רמת גן", "צפת", "אשדוד", "פתח תקווה", "ראשון לציון", "חולון"];
  const users = ["soldier_123", "army_life", "beach_vibes", "military_fan", "travel_il", "idf_proud", "daily_post", "reserve_unit", "combat_ready", "base_life", "training_day", "weekend_warrior", "patrol_unit", "field_ops", "recon_team"];
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
  ];
  const times = ["08:00", "09:15", "10:30", "11:45", "12:00", "13:15", "14:30", "15:45", "16:20", "17:00", "18:30", "19:45"];

  const posts: Post[] = [];
  for (let i = 1; i <= 30; i++) {
    const keywordSet = keywordSets[Math.floor(Math.random() * keywordSets.length)];
    const isMilitary = keywordSet.some(k => k.includes("כומתה") || k.includes("יחידה") || k.includes("דרגת") || k.includes("מילואים") || k.includes("שריון") || k.includes("חי״ר"));
    posts.push({
      id: i.toString(),
      image: "",
      platform: platforms[Math.floor(Math.random() * platforms.length)],
      user: users[Math.floor(Math.random() * users.length)] + "_" + i,
      location: locations[Math.floor(Math.random() * locations.length)],
      timestamp: times[Math.floor(Math.random() * times.length)],
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
  const [searchKeywords, setSearchKeywords] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);
  const [filterApplied, setFilterApplied] = useState(false);

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
      setFilterApplied(true);
      toast.success("הפילטרים הוחלו בהצלחה", {
        description: `נמצאו ${mockPosts.length} פוסטים תואמים`,
      });
    }, 1500);
  };

  const togglePost = (id: string) => {
    setSelectedPosts(prev => 
      prev.includes(id) 
        ? prev.filter(p => p !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = () => {
    if (correctCount >= 5) {
      navigate("/results", { state: { passed: true, correct: correctCount, wrong: wrongCount, total: selectedPosts.length } });
    } else {
      navigate("/results", { state: { passed: false, correct: correctCount, wrong: wrongCount, total: selectedPosts.length } });
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "instagram": return "bg-gradient-to-r from-purple-500 to-pink-500";
      case "tiktok": return "bg-black";
      case "facebook": return "bg-blue-600";
      default: return "bg-gray-500";
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
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">משימה:</span>
            <span className="font-semibold text-foreground">זיהוי יחידות צבאיות</span>
          </div>
          
          <div className="h-8 w-px bg-border hidden sm:block" />
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">נבחרו:</span>
              <Badge variant="outline" className="font-mono">{selectedPosts.length}/30</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span className="font-mono text-primary">{correctCount}</span>
            </div>
            <div className="flex items-center gap-2">
              <X className="w-4 h-4 text-destructive" />
              <span className="font-mono text-destructive">{wrongCount}</span>
            </div>
          </div>
          
          <div className="h-8 w-px bg-border" />
          
          <div className="flex items-center gap-2 text-accent">
            <Clock className="w-4 h-4" />
            <span className="font-mono">12:34</span>
          </div>
        </div>
        
        <Button variant="tactical" onClick={handleSubmit}>
          סיים בדיקה
        </Button>
      </header>

      <div className="flex gap-4 h-[calc(100vh-140px)]">
        {/* Filters Sidebar */}
        <aside className="w-80 glass-panel rounded-xl p-4 space-y-6 overflow-y-auto scrollbar-tactical">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            פילטרים
          </h2>

          {/* Location Filter */}
          <div className="space-y-3">
            <label className="text-sm font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              מיקום
            </label>
            <div className="aspect-[4/3] bg-secondary rounded-lg relative overflow-hidden">
              {/* Simple Israel Map Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="w-20 h-40 bg-primary/20 rounded-full rotate-12 border border-primary/40" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 bg-primary rounded-full animate-pulse glow-green" />
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
            <div className="flex gap-2">
              <Badge variant="outline" className="cursor-pointer hover:bg-primary/20">צפון</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary/20">מרכז</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary/20">דרום</Badge>
            </div>
          </div>

          {/* Date/Time Filter */}
          <div className="space-y-3">
            <label className="text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              תאריך ושעה
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-xs text-muted-foreground">מתאריך</span>
                <Input type="date" className="bg-secondary/50" />
              </div>
              <div>
                <span className="text-xs text-muted-foreground">עד תאריך</span>
                <Input type="date" className="bg-secondary/50" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-xs text-muted-foreground">משעה</span>
                <Input type="time" className="bg-secondary/50" />
              </div>
              <div>
                <span className="text-xs text-muted-foreground">עד שעה</span>
                <Input type="time" className="bg-secondary/50" />
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
              <Badge className="bg-primary/20 text-primary cursor-pointer">כומתה אדומה</Badge>
              <Badge className="bg-primary/20 text-primary cursor-pointer">יחידה 669</Badge>
              <Badge className="bg-primary/20 text-primary cursor-pointer">דרגת סרן</Badge>
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

          {filterApplied && (
            <div className="mt-3 p-3 bg-primary/10 rounded-lg border border-primary/30">
              <p className="text-xs text-primary text-center">
                ✓ נמצאו {mockPosts.length} תוצאות
              </p>
            </div>
          )}
        </aside>

        {/* Posts Grid */}
        <main className="flex-1 glass-panel rounded-xl p-4 overflow-y-auto scrollbar-tactical">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {mockPosts.map((post) => {
              const isSelected = selectedPosts.includes(post.id);
              return (
                <div
                  key={post.id}
                  onClick={() => togglePost(post.id)}
                  className={cn(
                    "relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 group",
                    isSelected 
                      ? "ring-2 ring-primary glow-green scale-[0.98]" 
                      : "hover:scale-[1.02] hover:ring-1 hover:ring-primary/50"
                  )}
                >
                  {/* Image */}
                  <div className="aspect-square bg-secondary flex items-center justify-center">
                    <div className="w-16 h-16 rounded-lg border border-muted-foreground/30 flex items-center justify-center">
                      <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>

                  {/* Platform Badge */}
                  <div className={cn(
                    "absolute top-2 right-2 px-2 py-0.5 rounded text-white text-[10px] font-medium",
                    getPlatformColor(post.platform)
                  )}>
                    {post.platform}
                  </div>

                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}

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
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Game;
