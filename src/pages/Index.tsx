import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Radar, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SocialMenu } from "@/components/landing/SocialMenu";
import { TeamChat } from "@/components/landing/TeamChat";
import { PhoneMockup } from "@/components/landing/PhoneMockup";
import { WelcomePopup } from "@/components/landing/WelcomePopup";

const Index = () => {
  const navigate = useNavigate();
  const [activePlatform, setActivePlatform] = useState("instagram");
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const hidePopup = localStorage.getItem("hideWelcomePopup");
    if (!hidePopup) {
      setShowWelcome(true);
    }
  }, []);

  const handleStart = () => {
    navigate("/game");
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(74, 222, 128, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(74, 222, 128, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Radar Animation in Background */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
        <div className="relative w-[600px] h-[600px]">
          <div className="absolute inset-0 rounded-full border border-primary/30 animate-ping" style={{ animationDuration: '3s' }} />
          <div className="absolute inset-8 rounded-full border border-primary/30 animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }} />
          <div className="absolute inset-16 rounded-full border border-primary/30 animate-ping" style={{ animationDuration: '3s', animationDelay: '2s' }} />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex h-screen p-4 gap-4">
        {/* Left Panel - Team Chat */}
        <div className="w-80 flex-shrink-0 hidden lg:block">
          <TeamChat />
        </div>

        {/* Center Panel - Phone Mockup & Start */}
        <div className="flex-1 flex flex-col items-center justify-center relative min-w-0">
          {/* Header */}
          <div className="mb-6 flex items-center justify-center">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-primary" />
              <div className="text-center">
                <h1 className="text-2xl font-bold tracking-wider">
                  <span className="text-gradient-tactical">SOCIAL INTEL</span>
                  <span className="text-foreground"> SIM</span>
                </h1>
                <p className="text-xs text-muted-foreground tracking-widest">סימולטור איסוף מודיעין מרשתות חברתיות</p>
              </div>
              <Radar className="w-6 h-6 text-primary animate-pulse-glow" />
            </div>
          </div>

          {/* Phone */}
          <div className="mb-6 flex-shrink-0">
            <PhoneMockup platform={activePlatform} />
          </div>

          {/* Status Indicators */}
          <div className="flex items-center gap-6 mb-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-muted-foreground">מערכת פעילה</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-muted-foreground">3 תרחישים זמינים</span>
            </div>
          </div>

          {/* Start Button */}
          <Button
            onClick={handleStart}
            variant="tactical"
            size="xl"
            className="group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Play className="w-5 h-5 transition-transform group-hover:scale-110" />
              התחל סימולציה
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-emerald-500 to-primary bg-[length:200%_100%] animate-[shimmer_2s_infinite] opacity-0 group-hover:opacity-20" />
          </Button>
        </div>

        {/* Right Panel - Social Menu */}
        <div className="w-72 flex-shrink-0 hidden md:block">
          <SocialMenu
            activePlatform={activePlatform}
            onPlatformChange={setActivePlatform}
          />
        </div>
      </div>

      {/* Welcome Popup */}
      <WelcomePopup open={showWelcome} onClose={() => setShowWelcome(false)} />
    </div>
  );
};

export default Index;
