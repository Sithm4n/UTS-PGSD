import { BookOpen, ChevronRight, CheckCircle2, ClipboardCheck, RotateCcw } from 'lucide-react';
import { TOPICS } from '../data/learningData';
import { LearningProgress, PageRoute, TopicId } from '../types';

interface MenuScreenProps {
  progress: LearningProgress;
  onNavigate: (route: PageRoute) => void;
  onResetProgress: () => void;
}

export function MenuScreen({ progress, onNavigate, onResetProgress }: MenuScreenProps) {
  const completedCount = progress.completedTopics.length;
  const allCompleted = completedCount === TOPICS.length;
  const nextTopic = TOPICS.find((t) => !progress.completedTopics.includes(t.id));
  const percentDone = Math.round((completedCount / TOPICS.length) * 100);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Section Header Card — Clean version of "Materi Pembelajaran" banner in screenshot */}
      <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Materi Pembelajaran</h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Matematika Dasar Kelas 6 SD · Pilih materi secara berurutan
              </p>
            </div>
          </div>

          {completedCount > 0 && (
            <button
              type="button"
              onClick={onResetProgress}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 min-h-[36px] px-2 cursor-pointer shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Ulangi Progres</span>
            </button>
          )}
        </div>

        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-600 font-mono-tabular">
            <span>Kemajuan Materi</span>
            <span className="font-semibold text-slate-900">{completedCount} / 4 Selesai</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-700 transition-all duration-200"
              style={{ width: `${percentDone}%` }}
            />
          </div>
        </div>
      </section>

      {/* 4 Stacked Menu Topic Buttons — Clean version of the 4 vertical buttons in screenshot */}
      <section aria-label="Daftar 4 materi pembelajaran" className="space-y-3">
        {TOPICS.map((topic) => {
          const isDone = progress.completedTopics.includes(topic.id as TopicId);

          return (
            <button
              key={topic.id}
              type="button"
              onClick={() => onNavigate(topic.id)}
              className={`w-full min-h-[76px] text-left bg-white border rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 transition-colors cursor-pointer ${
                isDone
                  ? 'border-emerald-300 bg-emerald-50/30 hover:bg-emerald-50/60'
                  : 'border-slate-200 hover:border-blue-400 hover:bg-slate-50/70'
              }`}
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <span
                  className={`font-mono-tabular text-sm font-bold w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isDone
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  {topic.numberLabel}
                </span>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base sm:text-lg font-semibold text-slate-900">
                      {topic.title}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-snug">
                    {topic.shortDesc}
                  </p>
                  <p className="text-xs mt-1.5 font-medium text-slate-500">
                    {isDone ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Sudah Dipelajari</span>
                      </span>
                    ) : (
                      <span className="text-blue-700">Ketuk untuk mempelajari</span>
                    )}
                  </p>
                </div>
              </div>

              <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" aria-hidden="true" />
            </button>
          );
        })}
      </section>

      {/* Guided Quiz Callout Block */}
      <section
        className={`rounded-2xl border p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
          allCompleted
            ? 'bg-blue-50/70 border-blue-300'
            : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-start gap-3.5">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
              allCompleted ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            <ClipboardCheck className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-slate-900">
              Latihan Soal Pilihan Ganda (10 Soal)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
              {allCompleted
                ? 'Semua 4 materi sudah selesai dipelajari. Ayo kerjakan 10 soal latihan untuk melihat umpan balik hasil belajarmu.'
                : `Selesaikan ${4 - completedCount} materi lagi (${nextTopic?.title}), atau langsung uji kemampuanmu kapan saja.`}
            </p>
            {typeof progress.bestQuizScore === 'number' && (
              <p className="text-xs font-mono-tabular font-medium text-blue-800 mt-1">
                Nilai Terbaik Sebelumnya: {progress.bestQuizScore} / 100
              </p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('latihan')}
          className={`min-h-[44px] px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
            allCompleted
              ? 'bg-blue-700 hover:bg-blue-800 text-white'
              : 'bg-slate-900 hover:bg-slate-800 text-white'
          }`}
        >
          {allCompleted ? 'Mulai Latihan 10 Soal' : 'Buka Latihan Soal'}
        </button>
      </section>
    </div>
  );
}
