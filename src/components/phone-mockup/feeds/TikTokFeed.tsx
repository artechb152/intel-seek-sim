import { Heart, MessageCircle, Share2, Home, Search, PlusSquare, Play, Music } from 'lucide-react';
import { StatusBar } from '../StatusBar';

import image1 from '../../../assets/Feed/TikTok/image1.png';
import image2 from '../../../assets/Feed/TikTok/image2.png';
import image3 from '../../../assets/Feed/TikTok/image3.png'; // תוקן הנתיב

import profileImage1 from '../../../assets/Feed/TikTok/profileImage1.png'; // תוקן שם המשתנה
import profileImage2 from '../../../assets/Feed/TikTok/profileImage2.png'; // תוקן שם המשתנה
import profileImage3 from '../../../assets/Feed/TikTok/profileImage3.png'; // תוקן שם המשתנה

const videos = [
  { id: 1, user: '@TomerBarazni', desc: 'המבצע הכי טוב שהיה #פוריוכיאנחנוחיילים #viral', likes: '234K', comments: '5.6K', shares: '12K', videoImage: image1, avatar: profileImage1 },
  { id: 2, user: '@AmitNakmias', desc: 'הילדים שלי הביאו את האדומה', likes: '89K', comments: '2.3K', shares: '8K', videoImage: image2, avatar: profileImage2 },
  { id: 3, user: '@ToharMalkov', desc: 'נוב 23 עייפים', likes: '567K', comments: '15K', shares: '45K', videoImage: image3, avatar: profileImage3 },
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
                <img src={video.videoImage} alt={video.desc} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none">
                  <Play className="w-16 h-16 text-white/30" />
                </div>
              </div>

              {/* Right Side Actions */}
              <div className="absolute right-2 bottom-20 flex flex-col items-center gap-4 z-10">
                {/* Profile Avatar */}
                <div className="relative w-10 h-10">
                  <img src={video.avatar} alt={video.user} className="w-full h-full rounded-full object-cover border-2 border-white" />
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center border border-white">
                    <span className="text-white text-[10px] leading-none">+</span>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <Heart className="w-7 h-7" fill="white" />
                  <span className="text-[10px] mt-1">{video.likes}</span>
                </div>
                <div className="flex flex-col items-center">
                  <MessageCircle className="w-7 h-7" />
                  <span className="text-[10px] mt-1">{video.comments}</span>
                </div>
                <div className="flex flex-col items-center">
                  <Share2 className="w-7 h-7" />
                  <span className="text-[10px] mt-1">{video.shares}</span>
                </div>

                {/* Spinning Music Disc */}
                <div className="w-8 h-8 rounded-full border-[6px] border-[#2E2E2E] animate-spin relative overflow-hidden flex items-center justify-center mt-2" style={{ animationDuration: '3s' }}>
                  <img src={video.avatar} alt="Music" className="w-4 h-4 rounded-full object-cover" />
                </div>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-20 left-2 right-16 z-10 text-shadow-sm">
                <span className="font-bold text-sm block mb-1">{video.user}</span>
                <p className="text-sm mb-2">{video.desc}</p>
                <div className="flex items-center gap-2 text-xs">
                  <Music className="w-3 h-3 flex-shrink-0" />
                  <div className="overflow-hidden whitespace-nowrap w-40">
                    <div className="animate-marquee inline-block">Original Sound - {video.user}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Navigation */}
      <div className="absolute top-0 left-0 right-0 py-3 bg-gradient-to-b from-black/60 to-transparent z-20 pointer-events-none">
        <StatusBar />
        <div className="flex items-center justify-center gap-6 mt-2 pointer-events-auto">
          <span className="text-gray-400 text-sm font-semibold">עוקבים</span>
          <span className="text-white text-sm font-bold border-b-2 border-white pb-1">עבורך</span>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-around py-3 bg-black z-20 border-t border-gray-800">
        <div className="flex flex-col items-center gap-1 cursor-pointer">
          <Home className="w-6 h-6" fill="white" strokeWidth={1.5} />
          <span className="text-[10px] font-medium">בית</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400 cursor-pointer">
          <Search className="w-6 h-6" strokeWidth={1.5} />
          <span className="text-[10px] font-medium">חיפוש</span>
        </div>

        {/* TikTok Upload Button */}
        <div className="relative h-7 w-11 flex items-center justify-center cursor-pointer">
          <div className="absolute inset-0 bg-cyan-400 rounded-lg -ml-1.5"></div>
          <div className="absolute inset-0 bg-pink-500 rounded-lg -mr-1.5"></div>
          <div className="absolute inset-0 bg-white rounded-lg flex items-center justify-center z-10">
            <PlusSquare className="w-5 h-5 text-black" strokeWidth={2.5} />
          </div>
        </div>

        <div className="flex flex-col items-center gap-1 text-gray-400 cursor-pointer">
          <MessageCircle className="w-6 h-6" strokeWidth={1.5} />
          <span className="text-[10px] font-medium">הודעות</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400 cursor-pointer">
          <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-600">
            <img src={profileImage1} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <span className="text-[10px] font-medium">פרופיל</span>
        </div>
      </div>
    </div>
  );
};
