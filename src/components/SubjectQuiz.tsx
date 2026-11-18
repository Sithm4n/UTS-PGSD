import { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight } from 'lucide-react';
import { QuizQuestion } from '../types';

interface SubjectQuizProps {
  title: string;
  subtitle: string;
  questions: QuizQuestion[];
  accentColor?: 'teal' | 'amber' | 'blue' | 'slate';
  bestScore?: number;
  onComplete: (percentage: number) => void;
}

const ACCENT_MAP = {
  teal: {
    button: 'bg-teal-700 hover:bg-teal-800 text-white',
    ring: 'focus-visible:ring-teal-600',
    activeOption: 'border-teal-700 bg-teal-50/70 text-slate-900',
    progress: 'bg-teal-700',
  },
  amber: {
    button: 'bg-amber-700 hover:bg-amber-800 text-white',
    ring: 'focus-visible:ring-amber-600',
    activeOption: 'border-amber-700 bg-amber-50/70 text-slate-900',
    progress: 'bg-amber-700',
  },
  blue: {
    button: 'bg-blue-700 hover:bg-blue-800 text-white',
    ring: 'focus-visible:ring-blue-600',
    activeOption: 'border-blue-700 bg-blue-50/70 text-slate-900',
    progress: 'bg-blue-700',
  },
  slate: {
    button: 'bg-slate-900 hover:bg-slate-800 text-white',
    ring: 'focus-visible:ring-slate-900',
    activeOption: 'border-slate-900 bg-slate-100 text-slate-900',
    progress: 'bg-slate-900',
  },
};

export function SubjectQuiz({
  title,
  subtitle,
  questions,
  accentColor = 'slate',
  bestScore,
  onComplete,
}: SubjectQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const theme = ACCENT_MAP[accentColor];
  const currentQuestion = questions[currentIndex];

  if (!currentQuestion) {
    return null;
  }

  const handleSelect = (optIndex: number) => {
    if (isSubmitted) return;
    setSelectedOption(optIndex);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: selectedOption,
    }));
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      const updatedAnswers = {
        ...answers,
        [currentQuestion.id]: selectedOption ?? -1,
      };
      const correctCount = questions.reduce(
        (sum, q) => sum + (updatedAnswers[q.id] === q.correctIndex ? 1 : 0),
        0
      );
      const percentage = Math.round((correctCount / questions.length) * 100);
      onComplete(percentage);
      setShowSummary(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswers({});
    setIsSubmitted(false);
    setShowSummary(false);
  };

  if (showSummary) {
    const correctCount = questions.reduce(
      (sum, q) => sum + (answers[q.id] === q.correctIndex ? 1 : 0),
      0
    );
    const percentage = Math.round((correctCount / questions.length) * 100);

    return (
      <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <p className="text-xs font-medium text-slate-500">Hasil Evaluasi · {title}</p>
            <h3 className="text-2xl font-semibold text-slate-900 mt-1">
              Skor Akhir: <span className="font-mono-tabular">{percentage}%</span>
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Menjawab benar <span className="font-mono-tabular font-medium text-slate-900">{correctCount}</span> dari{' '}
              <span className="font-mono-tabular font-medium text-slate-900">{questions.length}</span> pertanyaan.
            </p>
          </div>
          <button
            type="button"
            onClick={handleRestart}
            className={`inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${theme.button}`}
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>Ulangi Latihan</span>
          </button>
        </div>

        <div className="divide-y divide-slate-200 mt-2">
          {questions.map((q, idx) => {
            const userPick = answers[q.id];
            const isCorrect = userPick === q.correctIndex;
            return (
              <div key={q.id} className="py-4">
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" aria-hidden="true" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-1">
                      <span className="font-mono-tabular">Soal {idx + 1}</span>
                      <span aria-hidden="true">·</span>
                      <span>{q.topic}</span>
                      <span aria-hidden="true">·</span>
                      <span className={isCorrect ? 'text-emerald-700 font-medium' : 'text-rose-700 font-medium'}>
                        {isCorrect ? 'Benar' : 'Perlu Ditinjau'}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-slate-900 leading-relaxed">{q.question}</p>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      <span className="font-semibold text-slate-800">Jawaban tepat:</span> {q.options[q.correctIndex]}
                    </p>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{q.explanation}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  const isAnswerCorrect = selectedOption === currentQuestion.correctIndex;
  const progressPercent = Math.round(((currentIndex + (isSubmitted ? 1 : 0)) / questions.length) * 100);

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 pb-5 border-b border-slate-200">
        <div>
          <p className="text-xs font-medium text-slate-500">
            {title}
            {typeof bestScore === 'number' && (
              <>
                <span className="mx-1.5" aria-hidden="true">·</span>
                <span className="font-mono-tabular text-slate-700">Skor Terbaik: {bestScore}%</span>
              </>
            )}
          </p>
          <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mt-1">{subtitle}</h3>
        </div>
        <div className="text-xs font-medium text-slate-600 font-mono-tabular shrink-0">
          Pertanyaan {currentIndex + 1} / {questions.length}
        </div>
      </div>

      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-4">
        <div
          className={`h-full transition-all duration-200 ${theme.progress}`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="mt-6">
        <p className="text-xs font-medium text-slate-500 mb-2">Topik: {currentQuestion.topic}</p>
        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
          {currentQuestion.question}
        </p>

        <div className="mt-5 space-y-2.5" role="radiogroup" aria-label="Pilihan jawaban">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrectOpt = idx === currentQuestion.correctIndex;

            let optionStyle =
              'border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50';

            if (isSubmitted) {
              if (isCorrectOpt) {
                optionStyle = 'border-emerald-600 bg-emerald-50 text-emerald-950';
              } else if (isSelected && !isCorrectOpt) {
                optionStyle = 'border-rose-600 bg-rose-50 text-rose-950';
              } else {
                optionStyle = 'border-slate-200 bg-slate-50/50 text-slate-500';
              }
            } else if (isSelected) {
              optionStyle = theme.activeOption;
            }

            const letter = String.fromCharCode(65 + idx);

            return (
              <button
                key={idx}
                type="button"
                role="radio"
                aria-checked={isSelected}
                disabled={isSubmitted}
                onClick={() => handleSelect(idx)}
                className={`w-full min-h-[48px] text-left px-4 py-3 rounded-xl border transition-colors flex items-start gap-3 cursor-pointer disabled:cursor-default focus-visible:outline-none focus-visible:ring-2 ${theme.ring} ${optionStyle}`}
              >
                <span className="font-mono-tabular text-xs font-semibold w-6 h-6 rounded-md border border-current/25 flex items-center justify-center shrink-0 mt-0.5">
                  {letter}
                </span>
                <span className="text-sm sm:text-base leading-snug flex-1">{option}</span>
                {isSubmitted && isCorrectOpt && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                )}
                {isSubmitted && isSelected && !isCorrectOpt && (
                  <XCircle className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>

        {isSubmitted && (
          <div
            className={`mt-5 p-4 rounded-xl border ${
              isAnswerCorrect
                ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                : 'bg-rose-50/70 border-rose-200 text-rose-950'
            }`}
          >
            <div className="flex items-center gap-2 text-sm font-semibold">
              {isAnswerCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                  <span>Jawaban Tepat</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-700 shrink-0" aria-hidden="true" />
                  <span>Kurang Tepat — Mari Pelajari Penjelasannya</span>
                </>
              )}
            </div>
            <p className="text-sm leading-relaxed mt-1.5 opacity-90">{currentQuestion.explanation}</p>
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
          {!isSubmitted ? (
            <button
              type="button"
              disabled={selectedOption === null}
              onClick={handleCheckAnswer}
              className={`min-h-[44px] px-5 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${theme.button}`}
            >
              Periksa Jawaban
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className={`inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${theme.button}`}
            >
              <span>{currentIndex + 1 < questions.length ? 'Soal Berikutnya' : 'Lihat Hasil Akhir'}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
