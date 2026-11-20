export type TopicId = 'bilangan' | 'rasio' | 'bangun-datar' | 'bangun-ruang';

export type PageRoute = 'welcome' | 'menu' | TopicId | 'latihan';

export interface TopicInfo {
  id: TopicId;
  numberLabel: string;
  title: string;
  shortDesc: string;
  keyFormula: string;
}

export interface QuizQuestion {
  id: string;
  topicId: TopicId;
  topicLabel: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LearningProgress {
  completedTopics: TopicId[];
  bestQuizScore?: number;
  lastQuizScore?: number;
}
