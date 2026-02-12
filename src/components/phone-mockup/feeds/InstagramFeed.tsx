import { Heart, MessageCircle, Send, Bookmark, Home, Search, PlusSquare } from 'lucide-react';
import { StatusBar } from '../StatusBar';
import { getFeedImage, getFeedAvatar } from '@/constants/images';

const posts = [
  { id: 1, user: 'joshua_l', location: 'Tokyo, Japan', likes: '44,686' },
  { id: 2, user: 'sarah_m', location: 'Tel Aviv', likes: '12,340' },
  { id: 3, user: 'david_k', location: 'Haifa', likes: '8,921' },
  { id: 4, user: 'amit_r', location: 'Jerusalem', likes: '5,432' },
];

const stories = [
  { name: 'Your Story', hasNew: false },
  { name: 'karennne', hasNew: true, live: true },
  { name: 'zackjohn', hasNew: true },
  { name: 'kieron_d', hasNew: true },
  { name: 'craig_l', hasNew: true },
];

export const InstagramFeed = () => {
  return (
    <div className="h-full flex flex-col bg-white text-black overflow-hidden">
      <StatusBar />

      {/* Instagram Header */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 py-2 border-b border-gray-100">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <span className="text-xl font-light tracking-wide" style={{ fontFamily: 'serif' }}>
          Instagram
        </span>
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
                <img src={getFeedAvatar('instagram', story.name)} alt={story.name} className="w-full h-full rounded-full object-cover" />
                {story.live && <span className="text-[8px] bg-pink-500 text-white px-1 rounded absolute -bottom-1">LIVE</span>}
              </div>
            </div>
            <span className="text-[10px] text-gray-600 truncate w-14 text-center">{story.name}</span>
          </div>
        ))}
      </div>

      {/* Posts - Auto Scrolling - Faster */}
      <div className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 animate-auto-scroll-fast">
          <div className="space-y-0">
            {[...posts, ...posts, ...posts].map((post, i) => (
              <div key={i} className="px-0">
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="flex items-center gap-2">
                    <img src={getFeedAvatar('instagram', post.user)} alt={post.user} className="w-8 h-8 rounded-full object-cover" />
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

                <div className="w-full aspect-square bg-gray-100 flex items-center justify-center relative overflow-hidden">
                  <img src={getFeedImage('instagram', post.id)} alt={`Post by ${post.user}`} className="w-full h-full object-cover" loading="lazy" />
                  <span className="absolute top-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded">1/3</span>
                </div>

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
