import { useState, useMemo, useCallback } from 'react';
import { toast } from 'sonner';

// Components
import {
  GameHeader,
  FiltersSidebar,
  MissionSelectTabs,
  MissionTabs,
  PostGrid,
  EnlargedPostDialog,
  MissionDetailsPopup,
  QuizPopup,
  NotesPanel,
  TimeUpPopup,
} from '@/components/game';

// Hooks & Types
import type { Post, Platform } from '@/types';
import {
  missions,
  GENERAL_MISSION,
  type Mission,
  type SaveBucket,
} from '@/constants/missions';
import { mockPosts } from '@/constants/posts';
import { regionCities } from '@/constants/locations';
import { useTimer } from '@/hooks/useTimer';
import { usePostSelection } from '@/hooks/usePostSelection';
import { MissionPopup } from '@/components/landing/MissionPopup';

const Game = () => {
  const [shuffledPosts] = useState<Post[]>(() => {
    return [...mockPosts].sort(() => Math.random() - 0.5);
  });

  const { savedPosts, savedPostMissions, toggleSavePost, isSavedForMission, correctCount, wrongCount } =
    usePostSelection(shuffledPosts);

  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [savedMissionFilter, setSavedMissionFilter] = useState<
    'all' | SaveBucket
  >('all');

  const handleToggleSave = useCallback(
    (id: string, e?: React.MouseEvent) => {
      e?.stopPropagation();
      // When no mission is selected, save the post under the general bucket
      // so posts can be collected before committing to a specific mission.
      toggleSavePost(id, selectedMission ?? GENERAL_MISSION, e);
    },
    [toggleSavePost, selectedMission]
  );

  const [searchKeywords, setSearchKeywords] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | Platform>(
    'all'
  );
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
  const [showMissionIntro, setShowMissionIntro] = useState(true);

  const { timeRemaining, formattedTime } = useTimer({
    initialSeconds: 15 * 60,
    isRunning: !showMissionIntro,
    onTimeUp: () => {
      setShowTimeUp(true);
    },
  });

  const filteredPosts = useMemo(() => {
    let posts = shuffledPosts;

    if (showSavedOnly) {
      posts = posts.filter((post) => savedPosts.includes(post.id));
      if (savedMissionFilter !== 'all') {
        posts = posts.filter((post) =>
          savedPostMissions[post.id]?.includes(savedMissionFilter)
        );
      }
    }

    return posts.filter((post) => {
      // In saved view we filter by mission instead of platform
      if (
        !showSavedOnly &&
        selectedPlatform !== 'all' &&
        post.platform !== selectedPlatform
      )
        return false;
      if (selectedLocation) {
        const cities = regionCities[selectedLocation];
        if (cities) {
          if (!cities.includes(post.location)) return false;
        } else if (!post.location.includes(selectedLocation)) {
          return false;
        }
      }

      if (searchKeywords) {
        const keywords = searchKeywords
          .split(',')
          .map((k) => k.trim().toLowerCase());
        const postKeywords = post.keywords.map((k) => k.toLowerCase());
        const hasMatch = keywords.some(
          (kw) =>
            postKeywords.some((pk) =>
              pk.includes(kw)
            ) /* || post.user.toLowerCase().includes(kw) */
        );
        if (!hasMatch) return false;
      }

      if (fromDate && post.date < fromDate) return false;
      if (toDate && post.date > toDate) return false;
      if (fromTime && post.timestamp < fromTime) return false;
      if (toTime && post.timestamp > toTime) return false;

      return true;
    });
  }, [
    selectedPlatform,
    selectedLocation,
    searchKeywords,
    fromDate,
    toDate,
    fromTime,
    toTime,
    showSavedOnly,
    savedPosts,
    savedPostMissions,
    savedMissionFilter,
    shuffledPosts,
  ]);

  const savedMissionCounts = useMemo(() => {
    return savedPosts.reduce<Record<string, number>>((acc, id) => {
      const missions = savedPostMissions[id] ?? [];
      missions.forEach((mission) => {
        acc[mission] = (acc[mission] ?? 0) + 1;
      });
      return acc;
    }, {});
  }, [savedPosts, savedPostMissions]);

  // Posts saved under the currently selected mission — drives the bookmark state
  // so a post can be saved/removed per-mission independently.
  const savedPostsForSelectedMission = useMemo(() => {
    const bucket = selectedMission ?? GENERAL_MISSION;
    return savedPosts.filter((id) => isSavedForMission(id, bucket));
  }, [savedPosts, selectedMission, isSavedForMission]);

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
    setSavedMissionFilter('all');
    toast.success('הפילטרים אופסו');
  }, []);

  const handleSubmit = useCallback(() => {
    setShowQuizPopup(true);
  }, []);

  return (
    <div className="min-h-screen bg-background p-4 2xl:p-6">
      <GameHeader
        selectedCount={savedPosts.length}
        totalCount={50}
        timeRemaining={timeRemaining}
        formattedTime={formattedTime}
        onSubmit={handleSubmit}
      />

      <div className="flex gap-4 2xl:gap-6 h-[calc(100vh-140px)]">
        <FiltersSidebar
          selectedLocation={selectedLocation}
          onLocationChange={setSelectedLocation}
          fromDate={fromDate}
          toDate={toDate}
          fromTime={fromTime}
          toTime={toTime}
          onFromDateChange={setFromDate}
          onToDateChange={setToDate}
          onFromTimeChange={setFromTime}
          onToTimeChange={setToTime}
          searchKeywords={searchKeywords}
          onSearchKeywordsChange={setSearchKeywords}
          showSavedOnly={showSavedOnly}
          savedCount={savedPosts.length}
          onShowSavedOnlyChange={setShowSavedOnly}
          onReset={handleResetFilters}
          onApply={handleApplyFilters}
          isFiltering={isFiltering}
          resultsCount={filteredPosts.length}
        />

        <main className="flex-1 glass-panel rounded-xl p-4 2xl:p-6 overflow-y-auto scrollbar-tactical">
          {showSavedOnly ? (
            <MissionTabs
              selectedMissionFilter={savedMissionFilter}
              onMissionFilterChange={setSavedMissionFilter}
              counts={savedMissionCounts}
            />
          ) : (
            <MissionSelectTabs
              selectedMission={selectedMission}
              onSelectMission={setSelectedMission}
            />
          )}

          <PostGrid
            posts={filteredPosts}
            savedPosts={savedPostsForSelectedMission}
            onToggleSave={handleToggleSave}
            onEnlargePost={setEnlargedPost}
          />
        </main>

        <NotesPanel />
      </div>

      <EnlargedPostDialog
        post={enlargedPost}
        isSaved={
          enlargedPost
            ? isSavedForMission(enlargedPost.id, selectedMission ?? GENERAL_MISSION)
            : false
        }
        onClose={() => setEnlargedPost(null)}
        onToggleSave={(e) => enlargedPost && handleToggleSave(enlargedPost.id, e)}
      />

      <MissionPopup
        open={showMissionIntro}
        onClose={() => setShowMissionIntro(false)}
        onStart={() => setShowMissionIntro(false)}
      />

      <MissionDetailsPopup
        open={showMissionDetails}
        onClose={() => setShowMissionDetails(false)}
      />

      <QuizPopup
        open={showQuizPopup}
        onClose={() => setShowQuizPopup(false)}
        correctCount={correctCount}
        wrongCount={wrongCount}
        totalSelected={savedPosts.length}
        savedPosts={savedPosts}
        savedPostMissions={savedPostMissions}
      />

      <TimeUpPopup
        open={showTimeUp}
        onStartQuiz={() => {
          setShowTimeUp(false);
          setShowQuizPopup(true);
        }}
      />
    </div>
  );
};

export default Game;
