import { useCallback, useEffect, useState } from 'react';
import { LearningProgress, TopicId } from '../types';

const STORAGE_KEY = 'matematika_sd6_progress_v1';

const DEFAULT_PROGRESS: LearningProgress = {
  completedTopics: [],
};

export function useLearningProgress() {
  const [progress, setProgress] = useState<LearningProgress>(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return DEFAULT_PROGRESS;
      const parsed = JSON.parse(raw) as LearningProgress;
      return {
        completedTopics: Array.isArray(parsed.completedTopics) ? parsed.completedTopics : [],
        bestQuizScore: typeof parsed.bestQuizScore === 'number' ? parsed.bestQuizScore : undefined,
        lastQuizScore: typeof parsed.lastQuizScore === 'number' ? parsed.lastQuizScore : undefined,
      };
    } catch {
      return DEFAULT_PROGRESS;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage errors in restricted WebViewer sessions
    }
  }, [progress]);

  const markTopicCompleted = useCallback((topicId: TopicId) => {
    setProgress((prev) => {
      if (prev.completedTopics.includes(topicId)) return prev;
      return {
        ...prev,
        completedTopics: [...prev.completedTopics, topicId],
      };
    });
  }, []);

  const recordQuizResult = useCallback((percentage: number) => {
    setProgress((prev) => ({
      ...prev,
      lastQuizScore: percentage,
      bestQuizScore:
        typeof prev.bestQuizScore === 'number'
          ? Math.max(prev.bestQuizScore, percentage)
          : percentage,
    }));
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(DEFAULT_PROGRESS);
  }, []);

  return {
    progress,
    markTopicCompleted,
    recordQuizResult,
    resetProgress,
  };
}
