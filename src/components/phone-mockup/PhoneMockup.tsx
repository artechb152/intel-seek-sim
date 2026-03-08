import {
  InstagramFeed,
  FacebookFeed,
  TikTokFeed,
  XFeed,
  SnapchatFeed,
  SecurityCamerasFeed,
  RadioListeningFeed,
} from "./feeds";

interface PhoneMockupProps {
  platform: string;
}

/**
 * Phone mockup component that displays different social media feeds
 * based on the selected platform
 */
export const PhoneMockup = ({ platform }: PhoneMockupProps) => {
  const renderPlatform = () => {
    switch (platform) {
      case "instagram":
        return <InstagramFeed />;
      case "facebook":
        return <FacebookFeed />;
      case "tiktok":
        return <TikTokFeed />;
      case "x":
        return <XFeed />;
      case "snapchat":
        return <SnapchatFeed />;
      case "cameras":
        return <SecurityCamerasFeed />;
      case "listening":
        return <RadioListeningFeed />;
      default:
        return (
          <div className="h-full flex items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900">
            <p className="text-gray-400 text-center px-4">
              בחר רשת חברתית מהתפריט
            </p>
          </div>
        );
    }
  };

  return (
    <div className="phone-frame w-[280px] h-[560px] mx-auto">
      {/* Notch */}
      <div className="relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-10"></div>
      </div>
      
      {/* Screen */}
      <div className="phone-screen w-full h-full">
        {renderPlatform()}
      </div>
    </div>
  );
};
