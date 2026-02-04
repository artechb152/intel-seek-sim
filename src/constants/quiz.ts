import type { Answer } from "@/types";

/**
 * Quiz answers for the final questionnaire
 */
export const quizAnswers: Answer[] = [
  { id: 1, text: "פרסום תמונה עם כומתה צבאית חושף את היחידה והתפקיד", isCorrect: true },
  { id: 2, text: "תמונה עם תגית מיקום מאפשרת לזהות את המיקום המדויק, הזמן ודפוס הפעילות", isCorrect: true },
  { id: 3, text: "שיתוף שגרה יומית מאפשר לאויב לחזות תנועות ולתכנן פעולות", isCorrect: true },
  { id: 4, text: "סטורי שנעלם אחרי 24 שעות בטוח לפרסום כי הוא נמחק", isCorrect: false },
  { id: 5, text: "ניתן לזהות יחידה מתוך תמונה לפי סמלים, רקע, ציוד ואנשים", isCorrect: true },
  { id: 6, text: "צילום מחוץ לבסיס לא מהווה סיכון ביטחוני", isCorrect: false },
  { id: 7, text: "תגובות וחברים ברשת יכולים לחשוף קשרים, יחידות ומידע על אחרים", isCorrect: true },
  { id: 8, text: "פרופיל פרטי מספיק כדי להגן על מידע רגיש", isCorrect: false },
  { id: 9, text: "אין בעיה לפרסם תמונות מטווחים אם לא רואים נשק", isCorrect: false },
  { id: 10, text: "מותר לפרסם תמונות מאירוע יחידתי לאחר אישור מג\"ד", isCorrect: false },
];

/**
 * Number of answers required to select
 */
export const REQUIRED_ANSWERS = 5;

/**
 * Minimum correct answers to pass
 */
export const PASSING_SCORE = 4;
