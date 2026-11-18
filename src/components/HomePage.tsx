import { ArrowRight, RotateCcw } from 'lucide-react';
import { HERO_IMAGE_PATH, SUBJECTS } from '../data/learningData';
import { LearningProgress, PageRoute, SubjectId } from '../types';
import { ResilientImage } from './ResilientImage';

interface HomePageProps {
  progress: LearningProgress;
  onNavigate: (route: PageRoute) => void;
  onResetProgress: () => void;
}

const SUBJECT_ACCENT: Record<SubjectId, { kicker: string; button: string }> = {
  ipa: {
    kicker: 'text-teal-700',
    button: 'bg-teal-700 hover:bg-teal-800 text-white',
  },
  bahasa: {
    kicker: 'text-amber-700',
    button: 'bg-amber-700 hover:bg-amber-800 text-white',
  },
  matematika: {
    kicker: 'text-blue-700',
    button: 'bg-blue-700 hover:bg-blue-800 text-white',
  },
};

export function HomePage({ progress, onNavigate, onResetProgress }: HomePageProps) {
  const totalLabsCompleted = progress.completedLabs.length;
  const hasAnyProgress =
    totalLabsCompleted > 0 || Object.keys(progress.bestQuizScores).length > 0;

  return (
    <div className="space-y-10 sm:space-y-14">
      {/* Hero Split */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <p className="text-xs sm:text-sm font-medium text-slate-500">
              Media Pembelajaran Terpadu · IPA, Bahasa Indonesia &amp; Matematika
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-slate-900 leading-[1.12] text-balance">
              Eksplorasi Konsep Sains, Bahasa, dan Matematika Secara Interaktif
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              Setiap halaman dilengkapi simulasi langsung dan latihan pemahaman otomatis. Dirancang nyaman untuk layar ponsel maupun komputer desktop.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('ipa')}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Mulai Belajar</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('kuis')}
                className="inline-flex items-center justify-center min-h-[48px] px-5 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-900 text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Buka Latihan Terpadu
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span>3 Mata Pelajaran Utama</span>
              <span aria-hidden="true">·</span>
              <span>6 Simulasi Interaktif</span>
              <span aria-hidden="true">·</span>
              <span>15 Soal Evaluasi</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-slate-200 bg-white min-h-[220px]">
          <ResilientImage
            src={HERO_IMAGE_PATH}
            alt="Meja belajar terstruktur dengan labu kaca botani, jangka kuningan, dan buku catatan"
            fallbackTitle="Ruang Belajar Interaktif"
            className="w-full h-full object-cover lg:h-full"
          />
        </div>
      </section>

      {/* Full-Width 4-Column Progress Summary Strip */}
      <section aria-label="Ringkasan capaian belajar">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-slate-900">Catatan Kemajuan Belajar</h2>
          {hasAnyProgress && (
            <button
              type="button"
              onClick={onResetProgress}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 min-h-[36px] px-2 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Atur Ulang Progres</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5">
            <p className="text-xs text-slate-500">Simulasi Dieksplorasi</p>
            <p className="text-2xl font-bold text-slate-900 font-mono-tabular mt-1">
              {totalLabsCompleted} / 6
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5">
            <p className="text-xs text-slate-500">Skor Kuis IPA</p>
            <p className="text-2xl font-bold text-teal-700 font-mono-tabular mt-1">
              {typeof progress.bestQuizScores.ipa === 'number'
                ? `${progress.bestQuizScores.ipa}%`
                : 'Belum diuji'}
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5">
            <p className="text-xs text-slate-500">Skor Kuis Bahasa</p>
            <p className="text-2xl font-bold text-amber-700 font-mono-tabular mt-1">
              {typeof progress.bestQuizScores.bahasa === 'number'
                ? `${progress.bestQuizScores.bahasa}%`
                : 'Belum diuji'}
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5">
            <p className="text-xs text-slate-500">Skor Kuis Matematika</p>
            <p className="text-2xl font-bold text-blue-700 font-mono-tabular mt-1">
              {typeof progress.bestQuizScores.matematika === 'number'
                ? `${progress.bestQuizScores.matematika}%`
                : 'Belum diuji'}
            </p>
          </div>
        </div>
      </section>

      {/* 3 Main Subjects Grid */}
      <section aria-labelledby="subjects-heading" className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 id="subjects-heading" className="text-xl sm:text-2xl font-bold text-slate-900">
              Pilih Mata Pelajaran
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Ketuk salah satu materi untuk membuka simulasi interaktif dan evaluasi.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SUBJECTS.map((subject) => {
            const accent = SUBJECT_ACCENT[subject.id];
            const completedCount = subject.modules.filter((m) =>
              progress.completedLabs.includes(m.id)
            ).length;

            return (
              <article
                key={subject.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] w-full bg-slate-100 border-b border-slate-200 overflow-hidden">
                    <ResilientImage
                      src={subject.imagePath}
                      alt={subject.imageAlt}
                      fallbackTitle={subject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-5 sm:p-6 space-y-3">
                    <p className={`text-xs font-semibold ${accent.kicker}`}>
                      {subject.numberLabel} · {subject.subtitle}
                    </p>
                    <h3 className="text-xl font-bold text-slate-900">{subject.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{subject.summary}</p>

                    <div className="pt-2 border-t border-slate-100 space-y-1.5">
                      {subject.modules.map((mod) => (
                        <p key={mod.id} className="text-xs text-slate-600">
                          <span className="font-medium text-slate-800">{mod.title}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-2 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-mono-tabular">
                    <span>{subject.metaItems[0]}</span>
                    <span aria-hidden="true">·</span>
                    <span>{subject.metaItems[1]}</span>
                    <span aria-hidden="true">·</span>
                    <span>{completedCount}/2 Selesai</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onNavigate(subject.id)}
                    className={`w-full min-h-[44px] px-4 py-2.5 rounded-xl text-sm font-medium inline-flex items-center justify-center gap-2 transition-colors cursor-pointer ${accent.button}`}
                  >
                    <span>Buka Materi {subject.shortTitle}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
