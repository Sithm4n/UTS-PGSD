import { useCallback, useEffect, useState } from 'react';
import { LearningProgress, SubjectId } from '../types';

const STORAGE_KEY = 'ruangnalar_progress_v1';

const DEFAULT_PROGRESS: LearningProgress = {
  completedLabs: [],
  bestQuizScores: {},
};

export function useLearningProgress() {
  const [progress, setProgress] = useState<LearningProgress>(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return DEFAULT_PROGRESS;
      const parsed = JSON.parse(raw) as LearningProgress;
      return {
        completedLabs: Array.isArray(parsed.completedLabs) ? parsed.completedLabs : [],
        bestQuizScores: parsed.bestQuizScores || {},
      };
    } catch {
      return DEFAULT_PROGRESS;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage quota or WebViewer private mode restrictions
    }
  }, [progress]);

  const markLabCompleted = useCallback((labId: string) => {
    setProgress((prev) => {
      if (prev.completedLabs.includes(labId)) return prev;
      return {
        ...prev,
        completedLabs: [...prev.completedLabs, labId],
      };
    });
  }, []);

  const recordQuizScore = useCallback((key: SubjectId | 'kuis', percentage: number) => {
    setProgress((prev) => {
      const currentBest = prev.bestQuizScores[key] ?? -1;
      if (percentage <= currentBest) return prev;
      return {
        ...prev,
        bestQuizScores: {
          ...prev.bestQuizScores,
          [key]: percentage,
        },
      };
    });
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(DEFAULT_PROGRESS);
  }, []);

  return {
    progress,
    markLabCompleted,
    recordQuizScore,
    resetProgress,
  };
}
