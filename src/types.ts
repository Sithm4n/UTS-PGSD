export type PageRoute = 'beranda' | 'ipa' | 'bahasa' | 'matematika' | 'kuis';

export type SubjectId = 'ipa' | 'bahasa' | 'matematika';

export interface QuizQuestion {
  id: string;
  subject: SubjectId;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface SubjectInfo {
  id: SubjectId;
  numberLabel: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  summary: string;
  imagePath: string;
  imageAlt: string;
  modules: {
    id: string;
    title: string;
    description: string;
  }[];
  metaItems: string[];
}

export interface LearningProgress {
  completedLabs: string[];
  bestQuizScores: Partial<Record<SubjectId | 'kuis', number>>;
}
