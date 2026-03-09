import type { Answer } from '@/types';
import type { QuizStep } from '@/types';

import map1 from '../assets/Test/Map4/map1.png';
import map2 from '../assets/Test/Map4/map2.png';
import map3 from '../assets/Test/Map4/map3.png';
import map4 from '../assets/Test/Map4/map4.png';

/**
 * Quiz answers for the final questionnaire (legacy)
 */
export const quizAnswers: Answer[] = [
  {
    id: 1,
    text: 'פרסום תמונה עם כומתה צבאית חושף את היחידה והתפקיד',
    isCorrect: true,
  },
  {
    id: 2,
    text: 'תמונה עם תגית מיקום מאפשרת לזהות את המיקום המדויק, הזמן ודפוס הפעילות',
    isCorrect: true,
  },
  {
    id: 3,
    text: 'שיתוף שגרה יומית מאפשר לאויב לחזות תנועות ולתכנן פעולות',
    isCorrect: true,
  },
  {
    id: 4,
    text: 'סטורי שנעלם אחרי 24 שעות בטוח לפרסום כי הוא נמחק',
    isCorrect: false,
  },
  {
    id: 5,
    text: 'ניתן לזהות יחידה מתוך תמונה לפי סמלים, רקע, ציוד ואנשים',
    isCorrect: true,
  },
  { id: 6, text: 'צילום מחוץ לבסיס לא מהווה סיכון ביטחוני', isCorrect: false },
  {
    id: 7,
    text: 'תגובות וחברים ברשת יכולים לחשוף קשרים, יחידות ומידע על אחרים',
    isCorrect: true,
  },
  { id: 8, text: 'פרופיל פרטי מספיק כדי להגן על מידע רגיש', isCorrect: false },
  {
    id: 9,
    text: 'אין בעיה לפרסם תמונות מטווחים אם לא רואים נשק',
    isCorrect: false,
  },
  {
    id: 10,
    text: 'מותר לפרסם תמונות מאירוע יחידתי לאחר אישור מג"ד',
    isCorrect: false,
  },
];

/**
 * Number of answers required to select
 */
export const REQUIRED_ANSWERS = 5;

/**
 * Minimum correct answers to pass
 */
export const PASSING_SCORE = 4;

/**
 * Quiz steps for the 5-step quiz popup
 */
export const quizSteps: QuizStep[] = [
  {
    question: 'מה מספר השומרים וזמני החלפת המשמרות?',
    answers: [
      { id: 1, text: '4–6 חיילים והחלפת משמרת בכל 4 שעות', isCorrect: true },
      { id: 2, text: '3–6 חיילים והחלפת משמרת כל 3 שעות', isCorrect: false },
      { id: 3, text: '7–8 חיילים והחלפת משמרת בכל 5 שעות', isCorrect: false },
      { id: 4, text: '7–10 חיילים והחלפת משמרת כל 3 שעות', isCorrect: false },
    ],
    relatedPostIds: ['93', '88', '98', '81'],
  },
  {
    question: 'כמה חיילים נמצאים בבסיס?',
    answers: [
      { id: 1, text: '100–150 חיילים', isCorrect: false },
      { id: 2, text: '150–200 חיילים', isCorrect: true },
      { id: 3, text: '200–250 חיילים', isCorrect: false },
      { id: 4, text: '250–300 חיילים', isCorrect: false },
    ],
    relatedPostIds: ['80', '94', '90', '86'],
  },
  {
    question: 'האם יש העלאת כוננות או הורדת כוננות?',
    answers: [
      {
        id: 1,
        text: 'הורדת כוננות – חלק מהכוחות יורדים מההיערכות',
        isCorrect: false,
      },
      {
        id: 2,
        text: 'הקפאת פעולות – הפעילות הצפויה נדחית עד להודעה חדשה',
        isCorrect: false,
      },
      {
        id: 3,
        text: 'העלאת כוננות – הכוחות נערכים למימוש משימה אפשרית',
        isCorrect: true,
      },
      {
        id: 4,
        text: 'כוננות שגרתית – אין שינוי במוכנות היחידות',
        isCorrect: false,
      },
    ],
    relatedPostIds: ['96', '100', '97', '99'],
  },
  {
    question: 'סמנו את התמונה שמייצגת את מבנה הבסיס.',
    isImageQuestion: true,
    answers: [
      { id: 1, text: 'תמונה 1', isCorrect: true, image: map1 },
      { id: 2, text: 'תמונה 2', isCorrect: false, image: map2 },
      { id: 3, text: 'תמונה 3', isCorrect: false, image: map3 },
      { id: 4, text: 'תמונה 4', isCorrect: false, image: map4 },
    ],
    relatedPostIds: ['93', '88', '75', '82'],
  },
  {
    question:
      'אילו מקומות בבסיס הקשורים לבכירים ניתן היה לזהות מתוך הפוסטים שהוצגו?',
    answers: [
      { id: 1, text: 'חדרי ישיבות בלבד', isCorrect: false },
      { id: 2, text: 'משרדי הנהלה וחדרי ישיבות בכירים', isCorrect: false },
      { id: 3, text: 'מחסנים ומגרש אימונים', isCorrect: false },
      { id: 4, text: 'חדרי ישיבות, משרדים וחדרי שינה', isCorrect: true },
    ],
    relatedPostIds: ['87', '92', '91', '95'],
  },
];
