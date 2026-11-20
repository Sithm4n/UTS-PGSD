import { ArrowLeft, ArrowRight, CheckCircle2, ClipboardCheck } from 'lucide-react';
import { TOPICS } from '../data/learningData';
import { PageRoute, TopicId } from '../types';

interface TopicFooterActionProps {
  currentTopicId: TopicId;
  completedTopics: TopicId[];
  onCompleteTopic: (topicId: TopicId) => void;
  onNavigate: (route: PageRoute) => void;
}

export function TopicFooterAction({
  currentTopicId,
  completedTopics,
  onCompleteTopic,
  onNavigate,
}: TopicFooterActionProps) {
  const isCurrentDone = completedTopics.includes(currentTopicId);
  const currentIndex = TOPICS.findIndex((t) => t.id === currentTopicId);
  const nextTopic = TOPICS[currentIndex + 1];

  // Calculate what completed count will be once current is marked done
  const projectedCompletedCount = isCurrentDone
    ? completedTopics.length
    : completedTopics.length + 1;
  const willAllBeDone = projectedCompletedCount >= TOPICS.length;

  const handleCompleteAndContinue = () => {
    onCompleteTopic(currentTopicId);
    if (willAllBeDone || !nextTopic) {
      onNavigate('latihan');
    } else {
      onNavigate(nextTopic.id);
    }
  };

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="space-y-1">
        <p className="text-xs font-medium text-slate-500 font-mono-tabular">
          Progres Belajar: {completedTopics.length} / {TOPICS.length} Materi Selesai
        </p>
        <h3 className="text-base sm:text-lg font-semibold text-slate-900">
          {willAllBeDone
            ? 'Semua materi siap diselesaikan! Lanjut ke Latihan Soal (10 Soal).'
            : `Sudah paham bagian ini? Lanjutkan ke ${nextTopic?.title}.`}
        </h3>
        {isCurrentDone && (
          <p className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
            <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
            <span>Materi ini sudah ditandai selesai</span>
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2.5 shrink-0">
        <button
          type="button"
          onClick={() => onNavigate('menu')}
          className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-sm font-medium transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Menu</span>
        </button>

        <button
          type="button"
          onClick={handleCompleteAndContinue}
          className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold transition-colors cursor-pointer"
        >
          {willAllBeDone || !nextTopic ? (
            <>
              <ClipboardCheck className="w-4 h-4" aria-hidden="true" />
              <span>Selesai &amp; Latihan 10 Soal</span>
            </>
          ) : (
            <>
              <span>Selesai &amp; Materi Berikutnya</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </section>
  );
}
