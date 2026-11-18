import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, BookOpen, Sparkles } from 'lucide-react';
import { EYD_ITEMS, QUIZ_QUESTIONS, SPOK_CHALLENGES } from '../data/learningData';
import { SubjectQuiz } from './SubjectQuiz';

interface BahasaModuleProps {
  completedLabs: string[];
  bestQuizScore?: number;
  onCompleteLab: (labId: string) => void;
  onCompleteQuiz: (percentage: number) => void;
}

type BahasaTab = 'spok' | 'eyd';

export function BahasaModule({
  completedLabs,
  bestQuizScore,
  onCompleteLab,
  onCompleteQuiz,
}: BahasaModuleProps) {
  const [activeTab, setActiveTab] = useState<BahasaTab>('spok');

  // SPOK Builder state
  const [challengeIdx, setChallengeIdx] = useState<number>(0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [checkedSpok, setCheckedSpok] = useState<boolean>(false);

  // EYD V Proofreader state
  const [eydSelections, setEydSelections] = useState<Record<string, string>>({
    'eyd-1': 'di lakukan',
    'eyd-2': 'diatas',
    'eyd-3': 'analisa',
    'eyd-4': 'praktek',
    'eyd-5': 'resiko',
  });
  const [activeEydId, setActiveEydId] = useState<string>('eyd-1');
  const [showEydEvaluation, setShowEydEvaluation] = useState<boolean>(false);

  const bahasaQuestions = QUIZ_QUESTIONS.filter((q) => q.subject === 'bahasa');
  const currentChallenge = SPOK_CHALLENGES[challengeIdx];

  useEffect(() => {
    if (activeTab === 'spok') {
      onCompleteLab('bahasa-spok');
    } else {
      onCompleteLab('bahasa-eyd');
    }
  }, [activeTab, onCompleteLab]);

  // Deterministic shuffled display for clause bank
  const shuffledSegments = useMemo(() => {
    const segs = [...currentChallenge.segments];
    // Order: K, P, S, O so learner actively rearranges into S-P-O-K
    return [segs[3], segs[1], segs[0], segs[2]];
  }, [currentChallenge]);

  const handlePickChallenge = (idx: number) => {
    setChallengeIdx(idx);
    setSelectedIds([]);
    setCheckedSpok(false);
  };

  const handleToggleSegment = (segId: string) => {
    setCheckedSpok(false);
    setSelectedIds((prev) => {
      if (prev.includes(segId)) {
        return prev.filter((id) => id !== segId);
      }
      return [...prev, segId];
    });
  };

  const isSpokComplete = selectedIds.length === currentChallenge.segments.length;
  const isSpokCorrect =
    isSpokComplete &&
    selectedIds.every((id, index) => id === currentChallenge.correctOrder[index]);

  const eydCorrectCount = EYD_ITEMS.reduce(
    (sum, item) => sum + (eydSelections[item.id] === item.correctOption ? 1 : 0),
    0
  );

  const activeEydItem = EYD_ITEMS.find((i) => i.id === activeEydId) || EYD_ITEMS[0];

  const handleToggleEydWord = (id: string) => {
    setActiveEydId(id);
    const item = EYD_ITEMS.find((i) => i.id === id);
    if (!item) return;
    setEydSelections((prev) => {
      const currentVal = prev[id];
      const nextVal = currentVal === item.options[0] ? item.options[1] : item.options[0];
      return { ...prev, [id]: nextVal };
    });
  };

  const handleResetEyd = () => {
    setEydSelections({
      'eyd-1': 'di lakukan',
      'eyd-2': 'diatas',
      'eyd-3': 'analisa',
      'eyd-4': 'praktek',
      'eyd-5': 'resiko',
    });
    setShowEydEvaluation(false);
    setActiveEydId('eyd-1');
  };

  return (
    <div className="space-y-8">
      {/* Header & Module Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <p className="text-xs font-medium text-amber-700">
            02 · Bahasa Indonesia &amp; Literasi ·{' '}
            {completedLabs.filter((id) => id.startsWith('bahasa-')).length}/2 Studio Dieksplorasi
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 text-balance">
            Studio Kalimat Efektif &amp; Kaidah EYD V
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
            Latih ketepatan struktur sintaksis SPOK serta penyuntingan kosakata baku sesuai Ejaan Yang Disempurnakan.
          </p>
        </div>

        <div
          className="inline-flex items-center p-1 bg-slate-200/70 rounded-xl self-start lg:self-auto"
          role="tablist"
          aria-label="Pilih studio Bahasa Indonesia"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'spok'}
            onClick={() => setActiveTab('spok')}
            className={`min-h-[44px] px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'spok'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Penyusun SPOK
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'eyd'}
            onClick={() => setActiveTab('eyd')}
            className={`min-h-[44px] px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'eyd'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sunting EYD V
          </button>
        </div>
      </div>

      {/* TAB 1: PENYUSUN KALIMAT EFEKTIF (SPOK) */}
      {activeTab === 'spok' && (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Interactive Sentence Workspace */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">{currentChallenge.title}</h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">{currentChallenge.context}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedIds([]);
                  setCheckedSpok(false);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 min-h-[40px] px-3 rounded-lg border border-slate-200 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Kosongkan</span>
              </button>
            </div>

            {/* Challenge Selector */}
            <div className="grid grid-cols-3 gap-2">
              {SPOK_CHALLENGES.map((ch, idx) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => handlePickChallenge(idx)}
                  className={`min-h-[44px] px-3 py-2 text-xs font-medium rounded-xl border transition-colors cursor-pointer ${
                    challengeIdx === idx
                      ? 'bg-amber-700 text-white border-amber-700'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Latihan {idx + 1}
                </button>
              ))}
            </div>

            {/* Assembled Sentence Dropzone */}
            <div className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50 min-h-[120px] flex flex-col justify-between">
              <p className="text-xs font-medium text-slate-500 mb-3">
                Susunan Kalimat Anda (ketuk kartu untuk melepas):
              </p>

              {selectedIds.length === 0 ? (
                <p className="text-sm text-slate-400 italic py-4">
                  Pilih potongan klausa di bawah secara berurutan dari Subjek hingga Keterangan.
                </p>
              ) : (
                <div className="flex flex-wrap items-center gap-2">
                  {selectedIds.map((id, position) => {
                    const seg = currentChallenge.segments.find((s) => s.id === id);
                    if (!seg) return null;
                    const expectedSlot = ['S', 'P', 'O', 'K'][position];
                    const matchesSlot = seg.role === expectedSlot;

                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => handleToggleSegment(id)}
                        className={`min-h-[44px] px-3.5 py-2 rounded-xl border text-left transition-colors cursor-pointer ${
                          checkedSpok
                            ? matchesSlot
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                              : 'bg-rose-50 border-rose-300 text-rose-950'
                            : 'bg-white border-slate-300 text-slate-900 hover:border-slate-400'
                        }`}
                      >
                        <span className="block text-[11px] font-mono-tabular font-semibold text-slate-500">
                          {seg.role} · {seg.roleLabel}
                        </span>
                        <span className="text-sm font-medium">{seg.text}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Source Clause Bank */}
            <div>
              <p className="text-xs font-medium text-slate-600 mb-2.5">Bank Potongan Klausa (ketuk untuk menyusun):</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {shuffledSegments.map((seg) => {
                  const isUsed = selectedIds.includes(seg.id);
                  return (
                    <button
                      key={seg.id}
                      type="button"
                      disabled={isUsed}
                      onClick={() => handleToggleSegment(seg.id)}
                      className={`min-h-[48px] px-4 py-2.5 rounded-xl border text-left text-sm font-medium transition-colors cursor-pointer ${
                        isUsed
                          ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                          : 'bg-white border-slate-200 text-slate-800 hover:border-amber-600 hover:bg-amber-50/40'
                      }`}
                    >
                      {seg.text}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <p className="text-xs text-slate-500 font-mono-tabular">
                Terpasang: {selectedIds.length} / {currentChallenge.segments.length} unsur
              </p>
              <button
                type="button"
                disabled={!isSpokComplete}
                onClick={() => setCheckedSpok(true)}
                className="min-h-[44px] px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Periksa Struktur SPOK
              </button>
            </div>

            {checkedSpok && (
              <div
                className={`p-4 rounded-xl border ${
                  isSpokCorrect
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : 'bg-rose-50 border-rose-200 text-rose-950'
                }`}
              >
                <div className="flex items-center gap-2 text-sm font-semibold">
                  {isSpokCorrect ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                      <span>Struktur Kalimat Efektif Tepat (S - P - O - K)</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-700 shrink-0" aria-hidden="true" />
                      <span>Urutan Belum Sesuai Pola Baku S - P - O - K</span>
                    </>
                  )}
                </div>
                <p className="text-xs sm:text-sm mt-1.5 leading-relaxed opacity-90">{currentChallenge.note}</p>
              </div>
            )}
          </div>

          {/* Syntactic Reference Guide */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2 text-slate-900">
              <BookOpen className="w-4 h-4 text-amber-700" aria-hidden="true" />
              <h3 className="text-base font-semibold">Panduan Pola Kalimat Efektif</h3>
            </div>

            <div className="divide-y divide-slate-200 text-sm">
              <div className="py-3">
                <p className="font-semibold text-slate-900">S — Subjek</p>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Pelaku atau pokok pembicaraan (nomina/frasa nominal). Hindari meletakkan kata depan seperti &ldquo;bagi&rdquo; atau &ldquo;untuk&rdquo; di depan Subjek.
                </p>
              </div>
              <div className="py-3">
                <p className="font-semibold text-slate-900">P — Predikat</p>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Tindakan atau keadaan yang dilakukan Subjek (umumnya kata kerja berimbuhan me- atau ber-).
                </p>
              </div>
              <div className="py-3">
                <p className="font-semibold text-slate-900">O — Objek</p>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Sasaran langsung dari Predikat transitif. Tidak boleh disisipi preposisi &ldquo;tentang&rdquo; atau &ldquo;akan&rdquo; di antara P dan O.
                </p>
              </div>
              <div className="py-3">
                <p className="font-semibold text-slate-900">K — Keterangan</p>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Informasi tambahan berupa tempat, waktu, cara, atau alat (contoh: &ldquo;di laboratorium&rdquo;, &ldquo;dengan teliti&rdquo;).
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 2: LABORATORIUM EYD V & KATA BAKU */}
      {activeTab === 'eyd' && (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Interactive Proofreading Passage */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Sunting Naskah Laporan Ilmiah</h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  Ketuk kata yang disorot pada paragraf di bawah untuk memperbaiki ejaan sesuai KBBI dan EYD V.
                </p>
              </div>
              <button
                type="button"
                onClick={handleResetEyd}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 min-h-[40px] px-3 rounded-lg border border-slate-200 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Reset Naskah</span>
              </button>
            </div>

            <div className="p-5 sm:p-6 rounded-xl bg-slate-50 border border-slate-200 text-base sm:text-lg leading-loose text-slate-800">
              <span>Pengamatan reaksi fotosintesis tumbuhan air </span>
              <EydInlineButton
                id="eyd-1"
                value={eydSelections['eyd-1']}
                isActive={activeEydId === 'eyd-1'}
                isChecked={showEydEvaluation}
                isCorrect={eydSelections['eyd-1'] === 'dilakukan'}
                onClick={() => handleToggleEydWord('eyd-1')}
              />
              <span> oleh siswa di halaman sekolah pada pagi hari. Semua alat pengukur diletakkan </span>
              <EydInlineButton
                id="eyd-2"
                value={eydSelections['eyd-2']}
                isActive={activeEydId === 'eyd-2'}
                isChecked={showEydEvaluation}
                isCorrect={eydSelections['eyd-2'] === 'di atas'}
                onClick={() => handleToggleEydWord('eyd-2')}
              />
              <span> meja pengamatan agar gelembung oksigen mudah diamati. Setelah pencatatan data selesai, tim penyusun melakukan </span>
              <EydInlineButton
                id="eyd-3"
                value={eydSelections['eyd-3']}
                isActive={activeEydId === 'eyd-3'}
                isChecked={showEydEvaluation}
                isCorrect={eydSelections['eyd-3'] === 'analisis'}
                onClick={() => handleToggleEydWord('eyd-3')}
              />
              <span> terhadap perubahan intensitas cahaya selama </span>
              <EydInlineButton
                id="eyd-4"
                value={eydSelections['eyd-4']}
                isActive={activeEydId === 'eyd-4'}
                isChecked={showEydEvaluation}
                isCorrect={eydSelections['eyd-4'] === 'praktik'}
                onClick={() => handleToggleEydWord('eyd-4')}
              />
              <span> berlangsung guna meminimalkan </span>
              <EydInlineButton
                id="eyd-5"
                value={eydSelections['eyd-5']}
                isActive={activeEydId === 'eyd-5'}
                isChecked={showEydEvaluation}
                isCorrect={eydSelections['eyd-5'] === 'risiko'}
                onClick={() => handleToggleEydWord('eyd-5')}
              />
              <span> kesalahan pengukuran.</span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs sm:text-sm text-slate-600 font-mono-tabular">
                {showEydEvaluation
                  ? `Ketepatan Suntingan: ${eydCorrectCount} / ${EYD_ITEMS.length}`
                  : 'Ketuk setiap kata bergaris bawah untuk mengganti ejaan'}
              </div>
              <button
                type="button"
                onClick={() => setShowEydEvaluation(true)}
                className="min-h-[44px] px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-sm font-medium transition-colors cursor-pointer"
              >
                Evaluasi Suntingan
              </button>
            </div>
          </div>

          {/* EYD V Rule Inspector */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-700" aria-hidden="true" />
              <h3 className="text-base font-semibold text-slate-900">Catatan Kaidah EYD V</h3>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
              <p className="text-xs font-medium text-amber-800">{activeEydItem.category}</p>
              <p className="text-base font-semibold text-slate-900">
                Pilihan aktif:{' '}
                <span className="font-mono-tabular underline decoration-amber-600 underline-offset-4">
                  {eydSelections[activeEydItem.id]}
                </span>
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{activeEydItem.rule}</p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium text-slate-500">Daftar Kata Uji dalam Paragraf:</p>
              <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
                {EYD_ITEMS.map((item) => {
                  const chosen = eydSelections[item.id];
                  const isOk = chosen === item.correctOption;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleToggleEydWord(item.id)}
                      className={`w-full min-h-[44px] px-3.5 py-2.5 text-left flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                        activeEydId === item.id ? 'bg-slate-100' : 'bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="min-w-0">
                        <span className="text-xs text-slate-500 block">{item.category}</span>
                        <span className="text-sm font-medium text-slate-900">{chosen}</span>
                      </div>
                      {showEydEvaluation && (
                        <span
                          className={`text-xs font-medium inline-flex items-center gap-1 shrink-0 ${
                            isOk ? 'text-emerald-700' : 'text-rose-700'
                          }`}
                        >
                          {isOk ? (
                            <>
                              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                              <span>Baku</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4" aria-hidden="true" />
                              <span>Perbaiki</span>
                            </>
                          )}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Embedded Bahasa Quiz */}
      <SubjectQuiz
        title="Evaluasi Bahasa Indonesia"
        subtitle="Latihan Kalimat Efektif, Kata Baku & EYD V"
        questions={bahasaQuestions}
        accentColor="amber"
        bestScore={bestQuizScore}
        onComplete={onCompleteQuiz}
      />
    </div>
  );
}

interface EydInlineButtonProps {
  id: string;
  value: string;
  isActive: boolean;
  isChecked: boolean;
  isCorrect: boolean;
  onClick: () => void;
}

function EydInlineButton({
  value,
  isActive,
  isChecked,
  isCorrect,
  onClick,
}: EydInlineButtonProps) {
  let styleClass =
    'bg-amber-100/80 text-amber-950 border-amber-400 hover:bg-amber-200/70';

  if (isChecked) {
    styleClass = isCorrect
      ? 'bg-emerald-100 text-emerald-950 border-emerald-500'
      : 'bg-rose-100 text-rose-950 border-rose-500';
  } else if (isActive) {
    styleClass = 'bg-amber-200 text-slate-950 border-amber-700 ring-2 ring-amber-400/50';
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center px-2 py-0.5 mx-0.5 rounded-md border-b-2 font-semibold transition-colors cursor-pointer ${styleClass}`}
    >
      {value}
    </button>
  );
}
