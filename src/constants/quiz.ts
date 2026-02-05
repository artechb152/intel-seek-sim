import type { Answer } from "@/types";
import type { QuizStep } from "@/types";

/**
 * Quiz answers for the final questionnaire (legacy)
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

/**
 * Quiz steps for the 5-step quiz popup
 */
export const quizSteps: QuizStep[] = [
  {
    question: "מהו הסיכון העיקרי בפרסום תמונה עם כומתה צבאית?",
    answers: [
      { id: 1, text: "חשיפת היחידה והתפקיד הצבאי", isCorrect: true },
      { id: 2, text: "הפרת זכויות יוצרים", isCorrect: false },
      { id: 3, text: "עומס על שרתי הרשת", isCorrect: false },
      { id: 4, text: "פגיעה בדימוי האישי", isCorrect: false },
    ],
    relatedPostIds: ["1", "5", "9", "13"],
  },
  {
    question: "מה ניתן ללמוד מתמונה עם תגית מיקום?",
    answers: [
      { id: 1, text: "רק את שם המקום", isCorrect: false },
      { id: 2, text: "המיקום המדויק, הזמן ודפוס הפעילות", isCorrect: true },
      { id: 3, text: "את מזג האוויר בלבד", isCorrect: false },
      { id: 4, text: "שום דבר מעניין", isCorrect: false },
    ],
    relatedPostIds: ["2", "6", "10", "14"],
  },
  {
    question: "האם סטורי שנעלם אחרי 24 שעות בטוח לפרסום?",
    answers: [
      { id: 1, text: "כן, כי הוא נמחק אוטומטית", isCorrect: false },
      { id: 2, text: "כן, רק חברים רואים אותו", isCorrect: false },
      { id: 3, text: "לא, ניתן לצלם מסך ולשמור אותו", isCorrect: true },
      { id: 4, text: "כן, אם הפרופיל פרטי", isCorrect: false },
    ],
    relatedPostIds: ["3", "7", "11", "15"],
  },
  {
    question: "איך ניתן לזהות יחידה צבאית מתוך תמונה?",
    answers: [
      { id: 1, text: "רק לפי שם המשתמש", isCorrect: false },
      { id: 2, text: "לפי סמלים, רקע, ציוד ואנשים בתמונה", isCorrect: true },
      { id: 3, text: "לא ניתן לזהות", isCorrect: false },
      { id: 4, text: "רק אם כתוב במפורש", isCorrect: false },
    ],
    relatedPostIds: ["4", "8", "12", "16"],
  },
  {
    question: "האם פרופיל פרטי מספיק כדי להגן על מידע רגיש?",
    answers: [
      { id: 1, text: "כן, רק חברים יכולים לראות", isCorrect: false },
      { id: 2, text: "כן, זה הגנה מלאה", isCorrect: false },
      { id: 3, text: "לא, חברים יכולים לשתף ולצלם מסך", isCorrect: true },
      { id: 4, text: "כן, אם יש סיסמה חזקה", isCorrect: false },
    ],
    relatedPostIds: ["17", "21", "25", "29"],
  },
];
