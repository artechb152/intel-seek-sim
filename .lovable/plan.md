
# תכנית לייעול מלא וחלוקת הקוד לקטגוריות

## מבנה הקבצים המוצע

```text
src/
├── components/
│   ├── common/
│   │   ├── icons/
│   │   │   └── XIcon.tsx                 # (קיים)
│   │   └── EmptyState.tsx                # חדש
│   │
│   ├── game/                              # חדש - כל רכיבי מסך המשחק
│   │   ├── GameHeader.tsx                 # כותרת + טיימר
│   │   ├── FiltersSidebar/
│   │   │   ├── index.tsx                  # רכיב ראשי
│   │   │   ├── LocationFilter.tsx         # פילטר מיקום
│   │   │   ├── DateTimeFilter.tsx         # פילטר תאריך/שעה
│   │   │   ├── KeywordsFilter.tsx         # פילטר מילות קוד
│   │   │   └── SavedFilter.tsx            # כפתור שמורים
│   │   ├── PlatformTabs.tsx               # טאבים של פלטפורמות
│   │   ├── PostCard.tsx                   # כרטיסיית פוסט
│   │   ├── PostGrid.tsx                   # רשת הפוסטים
│   │   ├── EnlargedPostDialog.tsx         # דיאלוג פוסט מוגדל
│   │   └── MissionDetailsPopup.tsx        # (מועבר מ-landing/)
│   │
│   ├── landing/                           # ללא שינוי במבנה
│   │   ├── SocialMenu.tsx                 # יעודכן - ישתמש ב-XIcon משותף
│   │   ├── TeamChat.tsx
│   │   ├── WelcomePopup.tsx
│   │   └── MissionPopup.tsx
│   │
│   ├── phone-mockup/                      # (קיים - מאורגן היטב)
│   │   ├── PhoneMockup.tsx
│   │   ├── StatusBar.tsx
│   │   └── feeds/
│   │       ├── index.ts
│   │       ├── InstagramFeed.tsx
│   │       ├── FacebookFeed.tsx
│   │       ├── TikTokFeed.tsx
│   │       ├── XFeed.tsx
│   │       ├── SnapchatFeed.tsx
│   │       ├── SecurityCamerasFeed.tsx
│   │       └── RadioListeningFeed.tsx
│   │
│   ├── quiz/                              # חדש
│   │   └── AnswerCard.tsx
│   │
│   └── ui/                                # ללא שינוי
│
├── constants/
│   ├── images.ts                          # (קיים)
│   ├── platforms.ts                       # יורחב - כל הגדרות הפלטפורמות
│   ├── posts.ts                           # (קיים)
│   ├── quiz.ts                            # חדש - תשובות השאלון
│   ├── locations.ts                       # חדש - מיקומים ומילות קוד
│   └── feedData/                          # חדש - נתוני פידים לכל פלטפורמה
│       ├── instagram.ts
│       ├── facebook.ts
│       ├── tiktok.ts
│       ├── x.ts
│       └── snapchat.ts
│
├── hooks/
│   ├── useTimer.ts                        # (קיים)
│   ├── usePostFilters.ts                  # (קיים) - כבר מאורגן היטב
│   ├── usePostSelection.ts                # חדש - לוגיקת בחירת פוסטים
│   ├── use-mobile.tsx                     # (קיים)
│   └── use-toast.ts                       # (קיים)
│
├── lib/
│   ├── utils.ts                           # (קיים)
│   └── platform-helpers.tsx               # יורחב
│
├── types/
│   ├── index.ts                           # (קיים)
│   ├── game.ts                            # חדש - טיפוסי Game
│   └── feeds.ts                           # חדש - טיפוסי Feeds
│
└── pages/
    ├── Index.tsx                          # (קיים - נקי)
    ├── Game.tsx                           # יקטן מ-586 ל-~80 שורות
    ├── Quiz.tsx                           # יקטן - ישתמש ב-constants
    ├── Results.tsx                        # (קיים)
    └── NotFound.tsx                       # (קיים)
```

---

## פירוט השינויים לפי קטגוריות

### קטגוריה 1: רכיבי Game (פירוק מ-586 שורות)

#### `GameHeader.tsx` (~60 שורות)
- כותרת עם לוגו
- כפתור חזרה
- תצוגת משימה (לחיצה פותחת popup)
- מונה פוסטים נבחרים
- טיימר עם אנימציית אזהרה
- כפתור סיום בדיקה

#### `FiltersSidebar/index.tsx` (~80 שורות)
רכיב wrapper שמארגן את כל הפילטרים:
- כותרת + כפתור איפוס
- מאגד את תת-הקומפוננטות

#### `FiltersSidebar/LocationFilter.tsx` (~50 שורות)
- מפה סכמטית
- שדה חיפוש
- badges של אזורים

#### `FiltersSidebar/DateTimeFilter.tsx` (~50 שורות)
- שדות תאריך (מ/עד)
- שדות שעה (מ/עד)
- כפתור איפוס

#### `FiltersSidebar/KeywordsFilter.tsx` (~40 שורות)
- שדה חיפוש
- badges של מילות קוד נפוצות

#### `FiltersSidebar/SavedFilter.tsx` (~20 שורות)
- כפתור הצגת שמורים בלבד

#### `PlatformTabs.tsx` (~70 שורות)
- כפתור "הכל"
- כפתור Facebook
- כפתור Instagram  
- כפתור X
- לוגיקת צבעים לפי פלטפורמה

#### `PostCard.tsx` (~80 שורות)
- תמונת הפוסט
- badge פלטפורמה
- כפתור שמירה
- מידע (משתמש, מיקום, שעה, מילות קוד)
- radio button לבחירה

#### `PostGrid.tsx` (~30 שורות)
- Grid layout
- מיפוי PostCard
- הודעת "אין תוצאות"

#### `EnlargedPostDialog.tsx` (~70 שורות)
- תמונה מוגדלת
- מידע מפורט
- כפתור בחר/הסר

---

### קטגוריה 2: Constants (נתונים סטטיים)

#### `constants/quiz.ts` (חדש)
```typescript
export const quizAnswers = [
  { id: 1, text: "פרסום תמונה עם כומתה...", isCorrect: true },
  // ... 10 תשובות
];
```

#### `constants/locations.ts` (חדש)
```typescript
export const locationOptions = [
  { label: "הכל", value: "" },
  { label: "צפון", value: "צפת" },
  { label: "מרכז", value: "תל אביב" },
  { label: "דרום", value: "באר שבע" },
];

export const keywordSuggestions = [
  "כומתה אדומה",
  "יחידה 669", 
  "דרגת סרן"
];
```

#### `constants/feedData/instagram.ts` (חדש)
```typescript
export const instagramPosts = [
  { id: 1, user: "joshua_l", location: "Tokyo, Japan", likes: "44,686" },
  // ...
];

export const instagramStories = [
  { name: "Your Story", hasNew: false },
  // ...
];
```

#### דפוס דומה ל-facebook.ts, tiktok.ts, x.ts, snapchat.ts

---

### קטגוריה 3: Hooks (לוגיקה)

#### `hooks/usePostSelection.ts` (חדש ~40 שורות)
```typescript
export const usePostSelection = (posts: Post[]) => {
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  
  const togglePost = useCallback((id: string) => {
    setSelectedPosts(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  }, []);
  
  const correctCount = useMemo(() => 
    selectedPosts.filter(id => posts.find(p => p.id === id)?.isRelevant).length
  , [selectedPosts, posts]);
  
  const wrongCount = useMemo(() => 
    selectedPosts.filter(id => !posts.find(p => p.id === id)?.isRelevant).length
  , [selectedPosts, posts]);
  
  return { selectedPosts, togglePost, correctCount, wrongCount };
};
```

---

### קטגוריה 4: Types (טיפוסים)

#### `types/game.ts` (חדש)
```typescript
export interface FilterState {
  searchKeywords: string;
  selectedLocation: string;
  selectedPlatform: "all" | Platform;
  fromDate: string;
  toDate: string;
  fromTime: string;
  toTime: string;
  showSavedOnly: boolean;
}

export interface PostCardProps {
  post: Post;
  isSelected: boolean;
  isSaved: boolean;
  onSelect: () => void;
  onSave: (e: React.MouseEvent) => void;
  onEnlarge: () => void;
}
```

#### `types/feeds.ts` (חדש)
```typescript
export interface InstagramPost {
  id: number;
  user: string;
  location: string;
  likes: string;
}

export interface Tweet {
  id: number;
  user: string;
  handle: string;
  content: string;
  time: string;
  likes: string;
  retweets: string;
}
// ... טיפוסים נוספים לכל פלטפורמה
```

---

### קטגוריה 5: עדכונים נוספים

#### תיקון SocialMenu.tsx
```typescript
// במקום הגדרה מקומית של XIcon:
import { XIcon } from "@/components/common/icons/XIcon";
```

#### עדכון platforms.ts
```typescript
// הוספת הגדרות מרוכזות
export const platformColors = {
  instagram: "bg-gradient-to-r from-purple-500 to-pink-500",
  facebook: "bg-[#1877f2]",
  x: "bg-black",
  tiktok: "bg-black",
  snapchat: "bg-yellow-400",
} as const;

export const platformActiveClasses = {
  instagram: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
  facebook: "bg-[#1877f2] text-white",
  x: "bg-foreground text-background border border-border",
} as const;
```

---

## טבלת סיכום

| קובץ מקורי | שורות | לאחר פירוק |
|------------|--------|------------|
| Game.tsx | 586 | ~80 (+ 10 קומפוננטות) |
| Quiz.tsx | 153 | ~100 (+ constants) |
| SocialMenu.tsx | 68 | ~50 (ללא XIcon כפול) |
| Feeds (כל אחד) | ~80-130 | ללא שינוי (כבר מחולק) |

---

## יתרונות הפתרון

**ארגון:**
- כל קובץ עם אחריות יחידה (Single Responsibility)
- קומפוננטות קטנות (< 100 שורות)
- הפרדה ברורה בין UI, לוגיקה, ונתונים

**שימוש חוזר:**
- קומפוננטות עצמאיות שניתן לייצא
- הוקים גנריים
- קבועים מרוכזים

**תחזוקה:**
- קל למצוא קוד רלוונטי
- שינויים מבודדים
- debugging פשוט יותר

**ביצועים:**
- React יכול לעשות memoization יעיל
- טעינה עצלה אפשרית
- פחות re-renders מיותרים
