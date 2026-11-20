import { useState } from 'react';
import { ArrowLeft, Plus, Minus } from 'lucide-react';
import { PageRoute, TopicId } from '../types';
import { TopicFooterAction } from './TopicFooterAction';

interface TopicBilanganProps {
  completedTopics: TopicId[];
  onCompleteTopic: (topicId: TopicId) => void;
  onNavigate: (route: PageRoute) => void;
}

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

export function TopicBilangan({
  completedTopics,
  onCompleteTopic,
  onNavigate,
}: TopicBilanganProps) {
  const [subTab, setSubTab] = useState<'bulat' | 'pecahan'>('bulat');

  // Integer Number Line state
  const [startNum, setStartNum] = useState<number>(-4);
  const [op, setOp] = useState<'+' | '-'>('+');
  const [secondNum, setSecondNum] = useState<number>(7);

  // Fraction Adder state
  const [numA, setNumA] = useState<number>(1);
  const [denA, setDenA] = useState<number>(2);
  const [numB, setNumB] = useState<number>(1);
  const [denB, setDenB] = useState<number>(4);

  const intResult = op === '+' ? startNum + secondNum : startNum - secondNum;
  const effectiveMove = op === '+' ? secondNum : -secondNum;
  const clampedStart = Math.max(-12, Math.min(12, startNum));
  const clampedEnd = Math.max(-12, Math.min(12, intResult));

  // Number line SVG mapping (-12 to +12)
  const toLineX = (val: number) => 35 + ((val + 12) / 24) * 550;

  // Fraction math
  const commonDen = lcm(denA, denB);
  const scaledNumA = numA * (commonDen / denA);
  const scaledNumB = numB * (commonDen / denB);
  const sumNum = scaledNumA + scaledNumB;
  const divisor = gcd(sumNum, commonDen);
  const simpNum = sumNum / divisor;
  const simpDen = commonDen / divisor;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onNavigate('menu')}
          className="inline-flex items-center gap-1.5 min-h-[44px] px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Kembali ke Menu</span>
        </button>

        <div className="inline-flex p-1 bg-slate-200/70 rounded-xl" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={subTab === 'bulat'}
            onClick={() => setSubTab('bulat')}
            className={`min-h-[40px] px-4 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer ${
              subTab === 'bulat' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
            }`}
          >
            Bilangan Bulat
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={subTab === 'pecahan'}
            onClick={() => setSubTab('pecahan')}
            className={`min-h-[40px] px-4 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer ${
              subTab === 'pecahan' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
            }`}
          >
            Pecahan
          </button>
        </div>
      </div>

      {/* Topic Header */}
      <header className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 space-y-2">
        <p className="text-xs font-semibold text-blue-700">Materi 01 · Matematika Kelas 6 SD</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Operasi Bilangan Bulat &amp; Pecahan
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Bilangan bulat terdiri atas bilangan negatif, nol, dan positif. Pada garis bilangan, penjumlahan bilangan positif melangkah ke kanan, sedangkan pengurangan atau penjumlahan bilangan negatif melangkah ke kiri.
        </p>
      </header>

      {subTab === 'bulat' ? (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Number Line Stage */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-base sm:text-lg font-semibold text-slate-900">
                Garis Bilangan Interaktif
              </h2>
              <p className="font-mono-tabular text-base sm:text-lg font-bold text-blue-700">
                {startNum} {op} ({secondNum < 0 ? secondNum : secondNum}) = {intResult}
              </p>
            </div>

            <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-2">
              <svg
                viewBox="0 0 620 185"
                className="w-full min-w-[460px] h-auto block"
                role="img"
                aria-label={`Garis bilangan dari ${startNum} menghasilkan ${intResult}`}
              >
                {/* Base axis */}
                <line x1="20" y1="120" x2="600" y2="120" stroke="#0F172A" strokeWidth="2" />

                {/* Ticks -12 to 12 */}
                {Array.from({ length: 25 }, (_, i) => i - 12).map((n) => {
                  const x = toLineX(n);
                  const isZero = n === 0;
                  return (
                    <g key={n}>
                      <line
                        x1={x}
                        y1={isZero ? 108 : 114}
                        x2={x}
                        y2={isZero ? 132 : 126}
                        stroke={isZero ? '#0F172A' : '#64748B'}
                        strokeWidth={isZero ? 2 : 1.25}
                      />
                      {n % 2 === 0 && (
                        <text
                          x={x}
                          y="148"
                          textAnchor="middle"
                          className={`text-[10px] ${
                            isZero ? 'font-bold fill-slate-900' : 'fill-slate-600'
                          }`}
                        >
                          {n}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Step 1 arrow: 0 to startNum */}
                {startNum !== 0 && (
                  <path
                    d={`M ${toLineX(0)} 110 Q ${(toLineX(0) + toLineX(clampedStart)) / 2} 65 ${toLineX(clampedStart)} 110`}
                    fill="none"
                    stroke="#64748B"
                    strokeWidth="2"
                    strokeDasharray="4 3"
                  />
                )}
                <circle cx={toLineX(clampedStart)} cy="120" r="5" fill="#475569" />

                {/* Step 2 arrow: startNum to intResult */}
                {effectiveMove !== 0 && (
                  <path
                    d={`M ${toLineX(clampedStart)} 110 Q ${(toLineX(clampedStart) + toLineX(clampedEnd)) / 2} 32 ${toLineX(clampedEnd)} 110`}
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="3"
                  />
                )}
                <circle
                  cx={toLineX(clampedEnd)}
                  cy="120"
                  r="6.5"
                  fill="#2563EB"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />

                <text x={toLineX(clampedEnd)} y="24" textAnchor="middle" className="text-[11px] font-bold fill-blue-800">
                  Hasil: {intResult}
                </text>
              </svg>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <span className="font-semibold text-slate-900 block mb-1">Langkah Membaca Garis:</span>
              {op === '-' && secondNum < 0
                ? `Mengurangi bilangan negatif sama dengan menjumlahkan lawannya: ${startNum} - (${secondNum}) = ${startNum} + ${Math.abs(secondNum)} = ${intResult} (melangkah ${Math.abs(secondNum)} satuan ke kanan).`
                : effectiveMove > 0
                ? `Mulai dari titik ${startNum}, lalu melangkah ${effectiveMove} satuan ke kanan sehingga berhenti di ${intResult}.`
                : effectiveMove < 0
                ? `Mulai dari titik ${startNum}, lalu melangkah ${Math.abs(effectiveMove)} satuan ke kiri sehingga berhenti di ${intResult}.`
                : `Nilai pengubah adalah 0, sehingga posisi tetap di titik ${startNum}.`}
            </div>
          </div>

          {/* Controls */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5">
            <h3 className="text-base font-semibold text-slate-900">Uji Operasi Bilangan</h3>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <label htmlFor="int-start" className="font-medium text-slate-800">
                  Bilangan Awal
                </label>
                <span className="font-mono-tabular font-bold text-slate-900">{startNum}</span>
              </div>
              <input
                id="int-start"
                type="range"
                min={-6}
                max={6}
                value={startNum}
                onChange={(e) => setStartNum(Number(e.target.value))}
                className="edu-slider"
              />
            </div>

            <div>
              <p className="text-xs font-medium text-slate-600 mb-2">Pilih Operasi</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setOp('+')}
                  className={`min-h-[44px] inline-flex items-center justify-center gap-1.5 rounded-xl border text-sm font-semibold cursor-pointer ${
                    op === '+'
                      ? 'bg-blue-700 text-white border-blue-700'
                      : 'bg-white text-slate-800 border-slate-200'
                  }`}
                >
                  <Plus className="w-4 h-4" aria-hidden="true" />
                  <span>Tambah (+)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOp('-')}
                  className={`min-h-[44px] inline-flex items-center justify-center gap-1.5 rounded-xl border text-sm font-semibold cursor-pointer ${
                    op === '-'
                      ? 'bg-blue-700 text-white border-blue-700'
                      : 'bg-white text-slate-800 border-slate-200'
                  }`}
                >
                  <Minus className="w-4 h-4" aria-hidden="true" />
                  <span>Kurang (-)</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <label htmlFor="int-second" className="font-medium text-slate-800">
                  Bilangan Kedua
                </label>
                <span className="font-mono-tabular font-bold text-slate-900">{secondNum}</span>
              </div>
              <input
                id="int-second"
                type="range"
                min={-6}
                max={6}
                value={secondNum}
                onChange={(e) => setSecondNum(Number(e.target.value))}
                className="edu-slider"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-950 space-y-1">
              <p className="font-semibold">Ingat Aturan Tanda:</p>
              <p>• a + (-b) = a - b</p>
              <p>• a - (-b) = a + b</p>
            </div>
          </div>
        </section>
      ) : (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Fraction Visualizer */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-base sm:text-lg font-semibold text-slate-900">
                Visualisasi Penjumlahan Pecahan
              </h2>
              <p className="font-mono-tabular text-base sm:text-lg font-bold text-blue-700">
                {numA}/{denA} + {numB}/{denB} = {simpNum}/{simpDen}
              </p>
            </div>

            {/* Fraction Bars */}
            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium text-slate-600 mb-1.5 font-mono-tabular">
                  Pecahan Pertama: {numA}/{denA} (senilai {scaledNumA}/{commonDen})
                </p>
                <div className="grid gap-1 h-10" style={{ gridTemplateColumns: `repeat(${denA}, minmax(0, 1fr))` }}>
                  {Array.from({ length: denA }, (_, i) => (
                    <div
                      key={i}
                      className={`rounded-lg border ${
                        i < numA
                          ? 'bg-blue-600 border-blue-700'
                          : 'bg-slate-100 border-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-600 mb-1.5 font-mono-tabular">
                  Pecahan Kedua: {numB}/{denB} (senilai {scaledNumB}/{commonDen})
                </p>
                <div className="grid gap-1 h-10" style={{ gridTemplateColumns: `repeat(${denB}, minmax(0, 1fr))` }}>
                  {Array.from({ length: denB }, (_, i) => (
                    <div
                      key={i}
                      className={`rounded-lg border ${
                        i < numB
                          ? 'bg-teal-600 border-teal-700'
                          : 'bg-slate-100 border-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs sm:text-sm text-slate-700">
              <p className="font-semibold text-slate-900">Langkah Penyelesaian:</p>
              <p className="font-mono-tabular">
                1. Cari KPK penyebut ({denA} dan {denB}) = {commonDen}
              </p>
              <p className="font-mono-tabular">
                2. Samakan penyebut: {scaledNumA}/{commonDen} + {scaledNumB}/{commonDen} = {sumNum}/{commonDen}
              </p>
              {divisor > 1 && (
                <p className="font-mono-tabular font-semibold text-blue-800">
                  3. Sederhanakan (bagi {divisor}): {simpNum}/{simpDen}
                </p>
              )}
            </div>
          </div>

          {/* Fraction Controls */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5">
            <h3 className="text-base font-semibold text-slate-900">Atur Nilai Pecahan</h3>

            <div className="space-y-3 pb-4 border-b border-slate-200">
              <p className="text-xs font-semibold text-blue-700">Pecahan Pertama ({numA}/{denA})</p>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <label htmlFor="numA">Pembilang</label>
                  <span className="font-mono-tabular font-semibold">{numA}</span>
                </div>
                <input
                  id="numA"
                  type="range"
                  min={1}
                  max={denA}
                  value={numA}
                  onChange={(e) => setNumA(Number(e.target.value))}
                  className="edu-slider"
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <label htmlFor="denA">Penyebut</label>
                  <span className="font-mono-tabular font-semibold">{denA}</span>
                </div>
                <input
                  id="denA"
                  type="range"
                  min={2}
                  max={8}
                  value={denA}
                  onChange={(e) => {
                    const nextDen = Number(e.target.value);
                    setDenA(nextDen);
                    if (numA > nextDen) setNumA(nextDen);
                  }}
                  className="edu-slider"
                />
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold text-teal-700">Pecahan Kedua ({numB}/{denB})</p>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <label htmlFor="numB">Pembilang</label>
                  <span className="font-mono-tabular font-semibold">{numB}</span>
                </div>
                <input
                  id="numB"
                  type="range"
                  min={1}
                  max={denB}
                  value={numB}
                  onChange={(e) => setNumB(Number(e.target.value))}
                  className="edu-slider"
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <label htmlFor="denB">Penyebut</label>
                  <span className="font-mono-tabular font-semibold">{denB}</span>
                </div>
                <input
                  id="denB"
                  type="range"
                  min={2}
                  max={8}
                  value={denB}
                  onChange={(e) => {
                    const nextDen = Number(e.target.value);
                    setDenB(nextDen);
                    if (numB > nextDen) setNumB(nextDen);
                  }}
                  className="edu-slider"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      <TopicFooterAction
        currentTopicId="bilangan"
        completedTopics={completedTopics}
        onCompleteTopic={onCompleteTopic}
        onNavigate={onNavigate}
      />
    </div>
  );
}
