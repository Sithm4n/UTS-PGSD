import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import { QUIZ_QUESTIONS, TOPICS } from '../data/learningData';
import { PageRoute, TopicId } from '../types';

interface LatihanQuizProps {
  bestScore?: number;
  onCompleteQuiz: (percentage: number) => void;
  onNavigate: (route: PageRoute) => void;
}

export function LatihanQuiz({ bestScore, onCompleteQuiz, onNavigate }: LatihanQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isChecked, setIsChecked] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const totalQuestions = QUIZ_QUESTIONS.length; // 10 soal
  const currentQuestion = QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isChecked) return;
    setSelectedOption(idx);
  };

  const handleCheck = () => {
    if (selectedOption === null) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: selectedOption,
    }));
    setIsChecked(true);
  };

  const handleNext = () => {
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsChecked(false);
    } else {
      const finalAnswers = {
        ...answers,
        [currentQuestion.id]: selectedOption ?? -1,
      };
      const correctCount = QUIZ_QUESTIONS.reduce(
        (sum, q) => sum + (finalAnswers[q.id] === q.correctIndex ? 1 : 0),
        0
      );
      const score = Math.round((correctCount / totalQuestions) * 100);
      onCompleteQuiz(score);
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswers({});
    setIsChecked(false);
    setIsFinished(false);
  };

  if (isFinished) {
    const correctCount = QUIZ_QUESTIONS.reduce(
      (sum, q) => sum + (answers[q.id] === q.correctIndex ? 1 : 0),
      0
    );
    const score = Math.round((correctCount / totalQuestions) * 100);

    // Topic-by-topic breakdown for targeted feedback
    const topicBreakdown = TOPICS.map((topic) => {
      const qs = QUIZ_QUESTIONS.filter((q) => q.topicId === topic.id);
      const ok = qs.filter((q) => answers[q.id] === q.correctIndex).length;
      return {
        id: topic.id as TopicId,
        title: topic.title,
        correct: ok,
        total: qs.length,
      };
    });

    const weakTopics = topicBreakdown.filter((tb) => tb.correct < tb.total);

    let feedbackTitle = 'Tetap Semangat! Mari Ulangi Materi yang Masih Perlu Dikuatkan';
    let feedbackDesc =
      'Beberapa konsep dasar masih perlu dilatih kembali. Coba buka kembali simulasi pada materi yang nilainya belum penuh, lalu ulangi latihan soal ini.';
    let feedbackTone = 'bg-amber-50 border-amber-200 text-amber-950';

    if (score >= 90) {
      feedbackTitle = 'Luar Biasa! Pemahaman Matematika Kelas 6 Kamu Sangat Baik';
      feedbackDesc =
        'Kamu berhasil menjawab hampir seluruh atau semua soal dengan tepat. Pertahankan ketelitian dalam menghitung dan membaca satuan!';
      feedbackTone = 'bg-emerald-50 border-emerald-200 text-emerald-950';
    } else if (score >= 70) {
      feedbackTitle = 'Bagus! Pemahaman Konsep Dasar Sudah Kuat';
      feedbackDesc =
        'Hasilmu sudah melampaui batas ketuntasan. Periksa kembali beberapa soal yang masih keliru di bawah ini agar pemahamanmu makin sempurna.';
      feedbackTone = 'bg-blue-50 border-blue-200 text-blue-950';
    }

    return (
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Feedback Summary Card */}
        <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Hasil Latihan Pilihan Ganda (10 Soal)
                </p>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono-tabular mt-0.5">
                  Nilai: {score} / 100
                </h1>
                <p className="text-sm text-slate-600 mt-1">
                  Jawaban benar:{' '}
                  <span className="font-mono-tabular font-semibold text-slate-900">
                    {correctCount} dari {totalQuestions} soal
                  </span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleRestart}
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                <span>Ulangi Latihan</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('menu')}
                className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-sm font-medium transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                <span>Menu Materi</span>
              </button>
            </div>
          </div>

          {/* Umpan Balik Pedagogis */}
          <div className={`p-4 sm:p-5 rounded-xl border ${feedbackTone}`}>
            <h2 className="text-base font-bold">{feedbackTitle}</h2>
            <p className="text-sm mt-1.5 leading-relaxed opacity-95">{feedbackDesc}</p>
            {weakTopics.length > 0 && (
              <div className="mt-3 pt-3 border-t border-current/15">
                <p className="text-xs font-semibold mb-2">Materi yang disarankan untuk ditinjau ulang:</p>
                <div className="flex flex-wrap gap-2">
                  {weakTopics.map((wt) => (
                    <button
                      key={wt.id}
                      type="button"
                      onClick={() => onNavigate(wt.id)}
                      className="min-h-[38px] px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white text-slate-900 text-xs font-semibold border border-slate-300 cursor-pointer transition-colors"
                    >
                      Buka {wt.title} ({wt.correct}/{wt.total})
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Rincian Per Topik */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Ketuntasan per Topik</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {topicBreakdown.map((tb) => {
                const isPerfect = tb.correct === tb.total;
                return (
                  <div
                    key={tb.id}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3"
                  >
                    <span className="text-xs sm:text-sm font-medium text-slate-800">{tb.title}</span>
                    <span
                      className={`font-mono-tabular text-xs font-bold shrink-0 ${
                        isPerfect ? 'text-emerald-700' : 'text-amber-700'
                      }`}
                    >
                      {tb.correct}/{tb.total} Benar
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pembahasan 10 Soal */}
        <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7">
          <h3 className="text-lg font-bold text-slate-900 pb-4 border-b border-slate-200">
            Pembahasan Lengkap (10 Soal)
          </h3>
          <div className="divide-y divide-slate-200">
            {QUIZ_QUESTIONS.map((q, idx) => {
              const userAns = answers[q.id];
              const isOk = userAns === q.correctIndex;

              return (
                <div key={q.id} className="py-4 flex items-start gap-3">
                  {isOk ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" aria-hidden="true" />
                  )}
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="font-mono-tabular font-semibold">Soal {idx + 1}</span>
                      <span aria-hidden="true">·</span>
                      <span>{q.topicLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span className={isOk ? 'text-emerald-700 font-semibold' : 'text-rose-700 font-semibold'}>
                        {isOk ? 'Benar' : 'Salah'}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-slate-900">{q.question}</p>
                    {!isOk && typeof userAns === 'number' && (
                      <p className="text-xs text-rose-700">
                        Jawaban kamu: {q.options[userAns]}
                      </p>
                    )}
                    <p className="text-xs text-emerald-800 font-medium">
                      Jawaban tepat: {q.options[q.correctIndex]}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">{q.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    );
  }

  const progressPct = Math.round(((currentIndex + (isChecked ? 1 : 0)) / totalQuestions) * 100);
  const isCurrentCorrect = selectedOption === currentQuestion.correctIndex;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => onNavigate('menu')}
          className="inline-flex items-center gap-1.5 min-h-[44px] px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Kembali ke Menu</span>
        </button>

        {typeof bestScore === 'number' && (
          <p className="text-xs font-mono-tabular font-medium text-slate-600">
            Nilai Terbaik: {bestScore}/100
          </p>
        )}
      </div>

      <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-slate-200">
          <div>
            <p className="text-xs font-semibold text-blue-700">
              Latihan Soal Pilihan Ganda · {currentQuestion.topicLabel}
            </p>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Evaluasi Matematika Kelas 6 SD
            </h1>
          </div>
          <span className="font-mono-tabular text-sm font-semibold text-slate-700 shrink-0">
            Soal {currentIndex + 1} / {totalQuestions}
          </span>
        </div>

        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-700 transition-all duration-200"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
          {currentQuestion.question}
        </p>

        <div className="space-y-2.5" role="radiogroup" aria-label="Pilihan jawaban">
          {currentQuestion.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrectOpt = idx === currentQuestion.correctIndex;
            const letter = String.fromCharCode(65 + idx);

            let cls =
              'border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50';
            if (isChecked) {
              if (isCorrectOpt) {
                cls = 'border-emerald-600 bg-emerald-50 text-emerald-950';
              } else if (isSelected && !isCorrectOpt) {
                cls = 'border-rose-600 bg-rose-50 text-rose-950';
              } else {
                cls = 'border-slate-200 bg-slate-50/50 text-slate-500';
              }
            } else if (isSelected) {
              cls = 'border-blue-700 bg-blue-50/80 text-slate-950';
            }

            return (
              <button
                key={idx}
                type="button"
                role="radio"
                aria-checked={isSelected}
                disabled={isChecked}
                onClick={() => handleSelectOption(idx)}
                className={`w-full min-h-[50px] text-left px-4 py-3 rounded-xl border transition-colors flex items-center gap-3 cursor-pointer disabled:cursor-default ${cls}`}
              >
                <span className="font-mono-tabular text-xs font-bold w-7 h-7 rounded-lg border border-current/25 flex items-center justify-center shrink-0">
                  {letter}
                </span>
                <span className="text-sm sm:text-base flex-1">{opt}</span>
                {isChecked && isCorrectOpt && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" aria-hidden="true" />
                )}
                {isChecked && isSelected && !isCorrectOpt && (
                  <XCircle className="w-5 h-5 text-rose-700 shrink-0" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>

        {isChecked && (
          <div
            className={`p-4 rounded-xl border ${
              isCurrentCorrect
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-rose-50 border-rose-200 text-rose-950'
            }`}
          >
            <p className="text-sm font-semibold">
              {isCurrentCorrect ? 'Jawaban Kamu Benar!' : 'Kurang Tepat — Lihat Pembahasannya:'}
            </p>
            <p className="text-xs sm:text-sm mt-1 leading-relaxed opacity-90">
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        <div className="flex justify-end pt-2">
          {!isChecked ? (
            <button
              type="button"
              disabled={selectedOption === null}
              onClick={handleCheck}
              className="min-h-[48px] px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Periksa Jawaban
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 min-h-[48px] px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              <span>{currentIndex + 1 < totalQuestions ? 'Soal Berikutnya' : 'Lihat Hasil & Umpan Balik'}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
