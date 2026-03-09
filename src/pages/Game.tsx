import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Components
import { GameHeader, FiltersSidebar, PlatformTabs, PostGrid, EnlargedPostDialog, MissionDetailsPopup, QuizPopup, NotesPanel, TimeUpPopup } from '@/components/game';

// Hooks & Types
import type { Post, Platform } from '@/types';
import { mockPosts } from '@/constants/posts';
import { useTimer } from '@/hooks/useTimer';
import { usePostSelection } from '@/hooks/usePostSelection';

const Game = () => {
  const navigate = useNavigate();

  const [shuffledPosts] = useState<Post[]>(() => {
    return [...mockPosts].sort(() => Math.random() - 0.5);
  });

  const { savedPosts, toggleSavePost, correctCount, wrongCount } = usePostSelection(shuffledPosts);

  const [searchKeywords, setSearchKeywords] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | Platform>('all');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  const [enlargedPost, setEnlargedPost] = useState<Post | null>(null);
  const [showMissionDetails, setShowMissionDetails] = useState(false);
  const [showQuizPopup, setShowQuizPopup] = useState(false);
  const [showTimeUp, setShowTimeUp] = useState(false);

  const { timeRemaining, formattedTime } = useTimer({
    initialSeconds: 15 * 60,
    onTimeUp: () => {
      setShowTimeUp(true);
    },
  });

  const filteredPosts = useMemo(() => {
    let posts = shuffledPosts;

    if (showSavedOnly) {
      posts = posts.filter((post) => savedPosts.includes(post.id));
    }

    return posts.filter((post) => {
      if (selectedPlatform !== 'all' && post.platform !== selectedPlatform) return false;
      if (selectedLocation && !post.location.includes(selectedLocation)) return false;

      if (searchKeywords) {
        const keywords = searchKeywords.split(',').map((k) => k.trim().toLowerCase());
        const postKeywords = post.keywords.map((k) => k.toLowerCase());
        const hasMatch = keywords.some((kw) => postKeywords.some((pk) => pk.includes(kw)) /* || post.user.toLowerCase().includes(kw) */);
        if (!hasMatch) return false;
      }

      if (fromDate && post.date < fromDate) return false;
      if (toDate && post.date > toDate) return false;
      if (fromTime && post.timestamp < fromTime) return false;
      if (toTime && post.timestamp > toTime) return false;

      return true;
    });
  }, [selectedPlatform, selectedLocation, searchKeywords, fromDate, toDate, fromTime, toTime, showSavedOnly, savedPosts, shuffledPosts]);

  const handleApplyFilters = useCallback(() => {
    setIsFiltering(true);
    setTimeout(() => {
      setIsFiltering(false);
      toast.success('הפילטרים הוחלו בהצלחה', {
        description: `נמצאו ${filteredPosts.length} פוסטים תואמים`,
      });
    }, 800);
  }, [filteredPosts.length]);

  const handleResetFilters = useCallback(() => {
    setSearchKeywords('');
    setSelectedLocation('');
    setSelectedPlatform('all');
    setFromDate('');
    setToDate('');
    setFromTime('');
    setToTime('');
    setShowSavedOnly(false);
    toast.success('הפילטרים אופסו');
  }, []);

  const handleSubmit = useCallback(() => {
    setShowQuizPopup(true);
  }, []);

  return (
    <div className="min-h-screen bg-background p-4 2xl:p-6">
      <GameHeader selectedCount={savedPosts.length} totalCount={50} timeRemaining={timeRemaining} formattedTime={formattedTime} onBack={() => navigate('/')} onShowMission={() => setShowMissionDetails(true)} onSubmit={handleSubmit} />

      <div className="flex gap-4 2xl:gap-6 h-[calc(100vh-140px)]">
        <FiltersSidebar selectedLocation={selectedLocation} onLocationChange={setSelectedLocation} fromDate={fromDate} toDate={toDate} fromTime={fromTime} toTime={toTime} onFromDateChange={setFromDate} onToDateChange={setToDate} onFromTimeChange={setFromTime} onToTimeChange={setToTime} searchKeywords={searchKeywords} onSearchKeywordsChange={setSearchKeywords} showSavedOnly={showSavedOnly} savedCount={savedPosts.length} onShowSavedOnlyChange={setShowSavedOnly} onReset={handleResetFilters} onApply={handleApplyFilters} isFiltering={isFiltering} resultsCount={filteredPosts.length} />

        <main className="flex-1 glass-panel rounded-xl p-4 2xl:p-6 overflow-y-auto scrollbar-tactical">
          <PlatformTabs selectedPlatform={selectedPlatform} onPlatformChange={setSelectedPlatform} />

          <PostGrid posts={filteredPosts} savedPosts={savedPosts} onToggleSave={toggleSavePost} onEnlargePost={setEnlargedPost} />
        </main>

        <NotesPanel />
      </div>

      <EnlargedPostDialog post={enlargedPost} isSaved={enlargedPost ? savedPosts.includes(enlargedPost.id) : false} onClose={() => setEnlargedPost(null)} onToggleSave={(e) => enlargedPost && toggleSavePost(enlargedPost.id, e)} />

      <MissionDetailsPopup open={showMissionDetails} onClose={() => setShowMissionDetails(false)} />

      <QuizPopup open={showQuizPopup} onClose={() => setShowQuizPopup(false)} correctCount={correctCount} wrongCount={wrongCount} totalSelected={savedPosts.length} />

      <TimeUpPopup open={showTimeUp} onStartQuiz={() => { setShowTimeUp(false); setShowQuizPopup(true); }} />
    </div>
  );
};

export default Game;
