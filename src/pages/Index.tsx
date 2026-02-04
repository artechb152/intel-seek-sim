import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SocialMenu } from "@/components/landing/SocialMenu";
import { TeamChat } from "@/components/landing/TeamChat";
import { PhoneMockup } from "@/components/phone-mockup/PhoneMockup";
import { WelcomePopup } from "@/components/landing/WelcomePopup";
import { MissionPopup } from "@/components/landing/MissionPopup";

const Index = () => {
  const navigate = useNavigate();
  const [activePlatform, setActivePlatform] = useState("instagram");
  const [showWelcome, setShowWelcome] = useState(false);
  const [showMission, setShowMission] = useState(false);

  useEffect(() => {
    // Always show welcome popup on page load
    setShowWelcome(true);
  }, []);

  const handleStart = () => {
    setShowMission(true);
  };

  const handleMissionStart = () => {
    setShowMission(false);
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
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
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
        {/* Right Panel - Social Menu */}
        <div className="w-72 flex-shrink-0 hidden md:block">
          <SocialMenu
            activePlatform={activePlatform}
            onPlatformChange={setActivePlatform}
          />
        </div>

        {/* Center Panel - Phone Mockup & Start */}
        <div className="flex-1 flex flex-col items-center justify-center relative min-w-0">
          {/* Header */}
          <div className="mb-6 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold tracking-wider">
                <span className="text-gradient-tactical">شبكة الظل</span>
              </h1>
              <p className="text-xs text-muted-foreground tracking-widest">סימולטור איסוף מודיעין מרשתות חברתיות</p>
            </div>
          </div>

          {/* Phone */}
          <div className="mb-6 flex-shrink-0">
            <PhoneMockup platform={activePlatform} />
          </div>


          {/* Start Button */}
          <Button
            onClick={handleStart}
            variant="tactical"
            size="xl"
            className="group relative overflow-hidden animate-pulse-glow"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Play className="w-6 h-6 transition-transform group-hover:scale-125" />
              התחל סימולציה
            </span>
          </Button>
        </div>

        {/* Left Panel - Team Chat */}
        <div className="w-80 flex-shrink-0 hidden lg:block">
          <TeamChat />
        </div>
      </div>

      {/* Welcome Popup */}
      <WelcomePopup open={showWelcome} onClose={() => setShowWelcome(false)} />
      
      {/* Mission Popup */}
      <MissionPopup 
        open={showMission} 
        onClose={() => setShowMission(false)} 
        onStart={handleMissionStart}
      />
    </div>
  );
};

export default Index;
