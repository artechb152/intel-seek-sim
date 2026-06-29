import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SocialMenu } from '@/components/landing/SocialMenu';
import { TeamChat } from '@/components/landing/TeamChat';
import { PhoneMockup } from '@/components/phone-mockup/PhoneMockup';
import { MissionPopup } from '@/components/landing/MissionPopup';

const Index = () => {
  const navigate = useNavigate();
  const [activePlatform, setActivePlatform] = useState('instagram');
  const [showMission, setShowMission] = useState(false);

  const handleStart = () => {
    setShowMission(true);
  };

  const handleMissionStart = () => {
    setShowMission(false);
    navigate('/game');
  };

  return (
    <div className="h-screen w-full bg-background overflow-hidden flex flex-col">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Radar Animation */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
        <div className="relative w-[600px] h-[600px]">
          <div className="absolute inset-0 rounded-full border border-primary/30 animate-ping" style={{ animationDuration: '3s' }} />
          <div className="absolute inset-8 rounded-full border border-primary/30 animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }} />
          <div className="absolute inset-16 rounded-full border border-primary/30 animate-ping" style={{ animationDuration: '3s', animationDelay: '2s' }} />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 flex flex-1 w-full h-full p-4 gap-4 overflow-hidden">
        {/* Right Panel - Social Menu */}
        <div className="w-72 flex-shrink-0 hidden md:flex flex-col h-full">
          <SocialMenu activePlatform={activePlatform} onPlatformChange={setActivePlatform} />
        </div>

        {/* Center Panel - Phone Mockup & Start */}
        {/* pt-2: Moves header UP. pb-4: Moves button DOWN. */}
        <div className="flex-1 flex flex-col items-center justify-between pt-2 pb-4 h-full relative min-w-0">
          {/* Header - Fixed to Top */}
          <div className="flex-shrink-0 text-center z-20">
            <h1 className="text-2xl font-bold tracking-wider">
              <span className="text-gradient-tactical">شبكة الظل</span>
            </h1>
            <p className="text-xs text-muted-foreground tracking-widest">סימולטור איסוף מודיעין מרשתות חברתיות</p>
          </div>

          {/* Phone Container */}
          {/* mt-8: Pushes the phone DOWN from the header */}
          <div className="flex-1 w-full flex items-center justify-center min-h-0 relative mt-8">
            <div className="transform scale-[0.80] 2xl:scale-90 origin-center transition-transform duration-300">
              <PhoneMockup platform={activePlatform} />
            </div>
          </div>

          {/* Start Button - Fixed to Bottom */}
          <div className="flex-shrink-0 z-20">
            <Button onClick={handleStart} variant="tactical" size="xl" className="group relative overflow-hidden animate-pulse-glow">
              <span className="relative z-10 flex items-center gap-2">
                <Play className="w-6 h-6 transition-transform group-hover:scale-125" />
                התחל משימה
              </span>
            </Button>
          </div>
        </div>

        {/* Left Panel - Team Chat */}
        <div className="w-80 flex-shrink-0 hidden lg:flex flex-col h-full">
          <TeamChat />
        </div>
      </div>

      {/* Popups */}
      <MissionPopup open={showMission} onClose={() => setShowMission(false)} onStart={handleMissionStart} />
    </div>
  );
};

export default Index;
