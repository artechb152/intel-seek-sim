// Post types
export interface Post {
  id: string;
  image: string;
  avatar: string;
  platform: Platform;
  user: string;
  content: string;
  location: string;
  timestamp: string;
  date: string;
  keywords: string[];
  isRelevant: boolean;
}

export type Platform = "instagram" | "x" | "facebook";

// Quiz types
export interface Answer {
  id: number;
  text: string;
  isCorrect: boolean;
}

export interface QuizStep {
  question: string;
  answers: Answer[];
  relatedPostIds: string[];
}

// Chat types
export interface ChatMessage {
  id: string;
  user: string;
  avatar: string;
  message: string;
  time: string;
  isSystem?: boolean;
}

// Social menu types
export interface SocialMenuItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  active?: boolean;
}
