import { Heart, MessageCircle, Send, Bookmark, Home, Search, PlusSquare } from "lucide-react";

interface PhoneMockupProps {
  platform: string;
}

const InstagramFeed = () => {
  const posts = [
    { id: 1, user: "joshua_l", location: "Tokyo, Japan", likes: "44,686" },
    { id: 2, user: "sarah_m", location: "Tel Aviv", likes: "12,340" },
    { id: 3, user: "david_k", location: "Haifa", likes: "8,921" },
    { id: 4, user: "amit_r", location: "Jerusalem", likes: "5,432" },
  ];

  const stories = [
    { name: "Your Story", hasNew: false },
    { name: "karennne", hasNew: true, live: true },
    { name: "zackjohn", hasNew: true },
    { name: "kieron_d", hasNew: true },
    { name: "craig_l", hasNew: true },
  ];

  return (
    <div className="h-full flex flex-col bg-white text-black overflow-hidden">
      {/* Status Bar */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 py-1 text-xs">
        <span className="font-semibold">9:41</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-0.5">
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
          </div>
          <span>5G</span>
          <div className="w-6 h-3 border border-black rounded-sm relative">
            <div className="absolute inset-0.5 bg-black rounded-sm" style={{ width: "80%" }}></div>
          </div>
        </div>
      </div>

      {/* Instagram Header */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 py-2 border-b border-gray-100">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <span className="text-xl font-light tracking-wide" style={{ fontFamily: 'serif' }}>Instagram</span>
        <div className="flex items-center gap-4">
          <Heart className="w-5 h-5" />
          <Send className="w-5 h-5 -rotate-45" />
        </div>
      </div>

      {/* Stories - Fixed */}
      <div className="flex-shrink-0 flex gap-3 px-3 py-3 overflow-x-auto border-b border-gray-100">
        {stories.map((story, i) => (
          <div key={i} className="flex flex-col items-center gap-1 min-w-[60px]">
            <div className={`w-14 h-14 rounded-full p-0.5 ${story.hasNew ? 'bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600' : 'bg-gray-200'}`}>
              <div className="w-full h-full rounded-full bg-white p-0.5">
                <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center relative">
                  {story.live && (
                    <span className="text-[8px] bg-pink-500 text-white px-1 rounded absolute -bottom-1">LIVE</span>
                  )}
                </div>
              </div>
            </div>
            <span className="text-[10px] text-gray-600 truncate w-14 text-center">{story.name}</span>
          </div>
        ))}
      </div>

      {/* Posts - Auto Scrolling */}
      <div className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 animate-auto-scroll">
          <div className="space-y-0">
            {[...posts, ...posts, ...posts].map((post, i) => (
              <div key={i} className="px-0">
                {/* Post Header */}
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-semibold">{post.user}</span>
                        <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-[6px]">✓</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-500">{post.location}</span>
                    </div>
                  </div>
                  <span className="text-lg">•••</span>
                </div>
                
                {/* Post Image */}
                <div className="w-full aspect-square bg-gray-100 flex items-center justify-center relative">
                  <div className="w-20 h-20 rounded-lg border-2 border-gray-300 flex items-center justify-center">
                    <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="absolute top-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded">1/3</span>
                </div>

                {/* Post Actions */}
                <div className="px-3 py-2">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-4">
                      <Heart className="w-6 h-6" />
                      <MessageCircle className="w-6 h-6" />
                      <Send className="w-6 h-6 -rotate-45" />
                    </div>
                    <Bookmark className="w-6 h-6" />
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">Liked by craig_love and {post.likes} others</span>
                  </div>
                  <p className="text-sm mt-1">
                    <span className="font-semibold">{post.user}</span> Amazing day! 📸
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Nav - Fixed */}
      <div className="flex-shrink-0 flex items-center justify-around py-2 border-t border-gray-100 bg-white">
        <Home className="w-6 h-6" />
        <Search className="w-6 h-6" />
        <PlusSquare className="w-6 h-6" />
        <Heart className="w-6 h-6" />
        <div className="w-6 h-6 rounded-full bg-gray-300"></div>
      </div>
    </div>
  );
};

export const PhoneMockup = ({ platform }: PhoneMockupProps) => {
  return (
    <div className="phone-frame w-[280px] h-[560px] mx-auto">
      {/* Notch */}
      <div className="relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-10"></div>
      </div>
      
      {/* Screen */}
      <div className="phone-screen w-full h-full">
        {platform === "instagram" && <InstagramFeed />}
        {platform !== "instagram" && (
          <div className="h-full flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200">
            <p className="text-gray-500 text-center px-4">
              {platform === "tiktok" && "TikTok Feed"}
              {platform === "facebook" && "Facebook Feed"}
              {platform === "twitter" && "Twitter Feed"}
              {platform === "snapchat" && "Snapchat Feed"}
              {platform === "telegram" && "Telegram Feed"}
              {!["tiktok", "facebook", "twitter", "snapchat", "telegram"].includes(platform) && "בחר רשת חברתית"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
