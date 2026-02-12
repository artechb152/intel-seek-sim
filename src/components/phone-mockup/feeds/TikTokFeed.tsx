import { Heart, MessageCircle, Share2, Home, Search, PlusSquare, Play, Music } from "lucide-react";
import { StatusBar } from "../StatusBar";
import { getFeedImage, getFeedAvatar } from "@/constants/images";

const videos = [
  { id: 1, user: "@dance_master", desc: "ריקוד חדש 🔥 #dance #viral", likes: "234K", comments: "5.6K", shares: "12K" },
  { id: 2, user: "@cooking_il", desc: "מתכון קל לפסטה 🍝", likes: "89K", comments: "2.3K", shares: "8K" },
  { id: 3, user: "@travel_now", desc: "הנוף המטורף הזה! 🏔️", likes: "567K", comments: "15K", shares: "45K" },
];

export const TikTokFeed = () => {
  return (
    <div className="h-full flex flex-col bg-black text-white overflow-hidden relative">
      {/* Video Feed - Full Screen */}
      <div className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 animate-auto-scroll-tiktok">
          {[...videos, ...videos, ...videos].map((video, i) => (
            <div key={i} className="h-full w-full relative flex-shrink-0" style={{ height: '100%' }}>
              {/* Video Background */}
              <div className="absolute inset-0 overflow-hidden">
                <img 
                  src={getFeedImage("tiktok", video.id)}
                  alt={video.desc}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <Play className="w-16 h-16 text-white/30" />
                </div>
              </div>
              
              {/* Right Side Actions */}
              <div className="absolute right-2 bottom-20 flex flex-col items-center gap-4">
                <img 
                  src={getFeedAvatar("tiktok", video.user)}
                  alt={video.user}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white"
                />
                <div className="flex flex-col items-center">
                  <Heart className="w-7 h-7" fill="white" />
                  <span className="text-[10px]">{video.likes}</span>
                </div>
                <div className="flex flex-col items-center">
                  <MessageCircle className="w-7 h-7" />
                  <span className="text-[10px]">{video.comments}</span>
                </div>
                <div className="flex flex-col items-center">
                  <Share2 className="w-7 h-7" />
                  <span className="text-[10px]">{video.shares}</span>
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white animate-spin relative overflow-hidden" style={{ animationDuration: '3s' }}>
                  <img 
                    src={getFeedAvatar("tiktok", video.user + "_music")}
                    alt="Music"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-2 left-2 right-14">
                <span className="font-bold text-sm">{video.user}</span>
                <p className="text-xs mt-1">{video.desc}</p>
                <div className="flex items-center gap-2 mt-2 text-[10px]">
                  <Music className="w-3 h-3" />
                  <span className="animate-marquee">Original Sound - {video.user}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Navigation */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-center gap-6 py-3 bg-gradient-to-b from-black/50 to-transparent z-10">
        <StatusBar />
      </div>
      <div className="absolute top-8 left-0 right-0 flex items-center justify-center gap-6">
        <span className="text-gray-400 text-sm">עוקבים</span>
        <span className="text-white text-sm font-bold border-b-2 border-white pb-1">עבורך</span>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-around py-2 bg-black">
        <div className="flex flex-col items-center">
          <Home className="w-6 h-6" />
          <span className="text-[9px]">בית</span>
        </div>
        <div className="flex flex-col items-center text-gray-500">
          <Search className="w-6 h-6" />
          <span className="text-[9px]">חיפוש</span>
        </div>
        <div className="w-10 h-7 bg-white rounded flex items-center justify-center">
          <PlusSquare className="w-5 h-5 text-black" />
        </div>
        <div className="flex flex-col items-center text-gray-500">
          <MessageCircle className="w-6 h-6" />
          <span className="text-[9px]">הודעות</span>
        </div>
        <div className="flex flex-col items-center text-gray-500">
          <div className="w-6 h-6 rounded-full bg-gray-600"></div>
          <span className="text-[9px]">פרופיל</span>
        </div>
      </div>
    </div>
  );
};
