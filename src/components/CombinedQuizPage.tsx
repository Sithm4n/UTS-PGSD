import { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/learningData';
import { SubjectId } from '../types';
import { SubjectQuiz } from './SubjectQuiz';

interface CombinedQuizPageProps {
  bestScores: Partial<Record<SubjectId | 'kuis', number>>;
  onRecordScore: (key: SubjectId | 'kuis', percentage: number) => void;
}

type QuizFilter = 'semua' | SubjectId;

export function CombinedQuizPage({ bestScores, onRecordScore }: CombinedQuizPageProps) {
  const [filter, setFilter] = useState<QuizFilter>('semua');

  const filteredQuestions =
    filter === 'semua'
      ? QUIZ_QUESTIONS
      : QUIZ_QUESTIONS.filter((q) => q.subject === filter);

  const filterLabel: Record<QuizFilter, string> = {
    semua: 'Evaluasi Gabungan (IPA, Bahasa & Matematika)',
    ipa: 'Evaluasi Khusus IPA',
    bahasa: 'Evaluasi Khusus Bahasa Indonesia',
    matematika: 'Evaluasi Khusus Matematika',
  };

  const accentMap: Record<QuizFilter, 'slate' | 'teal' | 'amber' | 'blue'> = {
    semua: 'slate',
    ipa: 'teal',
    bahasa: 'amber',
    matematika: 'blue',
  };

  const scoreKey: SubjectId | 'kuis' = filter === 'semua' ? 'kuis' : filter;

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <p className="text-xs font-medium text-slate-500">
            Bank Soal Interaktif · {filteredQuestions.length} Pertanyaan Tersedia
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 text-balance">
            Latihan Soal &amp; Evaluasi Terpadu
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
            Pilih seluruh mata pelajaran atau saring satu bidang studi tertentu untuk menguji penguasaan konsep secara langsung.
          </p>
        </div>

        <div
          className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-200/70 rounded-xl self-start lg:self-auto"
          role="tablist"
          aria-label="Saring mata pelajaran kuis"
        >
          {(
            [
              { id: 'semua', label: 'Semua (15)' },
              { id: 'ipa', label: 'IPA (5)' },
              { id: 'bahasa', label: 'Bahasa (5)' },
              { id: 'matematika', label: 'Matematika (5)' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={filter === tab.id}
              onClick={() => setFilter(tab.id)}
              className={`min-h-[44px] px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                filter === tab.id
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <SubjectQuiz
        key={filter}
        title="Uji Pemahaman"
        subtitle={filterLabel[filter]}
        questions={filteredQuestions}
        accentColor={accentMap[filter]}
        bestScore={bestScores[scoreKey]}
        onComplete={(pct) => onRecordScore(scoreKey, pct)}
      />
    </div>
  );
}
