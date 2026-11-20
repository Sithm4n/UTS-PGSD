import { Play } from 'lucide-react';
import { COVER_IMAGE_PATH } from '../data/learningData';
import { ResilientImage } from './ResilientImage';

interface WelcomeScreenProps {
  completedCount: number;
  bestQuizScore?: number;
  onStart: () => void;
}

export function WelcomeScreen({
  completedCount,
  bestQuizScore,
  onStart,
}: WelcomeScreenProps) {
  return (
    <section className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-4">
      <div className="w-full max-w-4xl bg-white border border-slate-200 rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-12 items-stretch">
        {/* Visual Side */}
        <div className="md:col-span-5 bg-slate-100 border-b md:border-b-0 md:border-r border-slate-200 aspect-[4/3] md:aspect-auto">
          <ResilientImage
            src={COVER_IMAGE_PATH}
            alt="Ilustrasi koordinat matematika, segitiga, dan alat ukur geometri"
            fallbackTitle="Matematika Kelas 6 SD"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Clean Editorial Cover Content */}
        <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <p className="text-xs font-semibold text-blue-700">
              Media Pembelajaran Interaktif · Sekolah Dasar
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-[1.15] text-balance">
              Matematika Dasar Kelas 6 SD
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Pelajari operasi bilangan bulat dan pecahan, rasio dan skala, bangun datar, serta bangun ruang secara visual, lalu uji pemahaman dengan 10 soal pilihan ganda.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-mono-tabular">
              <span>4 Materi Pokok</span>
              <span aria-hidden="true">·</span>
              <span>Simulasi Visual</span>
              <span aria-hidden="true">·</span>
              <span>10 Soal Pilihan Ganda</span>
            </div>

            {completedCount > 0 && (
              <p className="text-xs text-slate-600 font-mono-tabular">
                Progres tersimpan: {completedCount}/4 materi selesai
                {typeof bestQuizScore === 'number' ? ` · Nilai terbaik ${bestQuizScore}/100` : ''}
              </p>
            )}

            <button
              type="button"
              onClick={onStart}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 min-h-[52px] px-7 py-3.5 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white text-base font-semibold transition-colors cursor-pointer"
            >
              <Play className="w-5 h-5 fill-current" aria-hidden="true" />
              <span>{completedCount > 0 ? 'Lanjutkan Belajar' : 'Mulai Belajar'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
