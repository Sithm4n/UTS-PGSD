import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { PageRoute, TopicId } from '../types';
import { TopicFooterAction } from './TopicFooterAction';

interface TopicBangunDatarProps {
  completedTopics: TopicId[];
  onCompleteTopic: (topicId: TopicId) => void;
  onNavigate: (route: PageRoute) => void;
}

type Shape2D = 'persegi' | 'persegi-panjang' | 'segitiga' | 'lingkaran';

export function TopicBangunDatar({
  completedTopics,
  onCompleteTopic,
  onNavigate,
}: TopicBangunDatarProps) {
  const [shape, setShape] = useState<Shape2D>('lingkaran');
  const [valA, setValA] = useState<number>(14); // sisi / panjang / alas / jari-jari
  const [valB, setValB] = useState<number>(10); // lebar / tinggi

  // Calculations
  let perimeterText = '';
  let areaText = '';
  let perimeterSteps = '';
  let areaSteps = '';

  if (shape === 'persegi') {
    const k = 4 * valA;
    const l = valA * valA;
    perimeterText = `${k} cm`;
    areaText = `${l} cm²`;
    perimeterSteps = `Keliling = 4 × s = 4 × ${valA} = ${k} cm`;
    areaSteps = `Luas = s × s = ${valA} × ${valA} = ${l} cm²`;
  } else if (shape === 'persegi-panjang') {
    const k = 2 * (valA + valB);
    const l = valA * valB;
    perimeterText = `${k} cm`;
    areaText = `${l} cm²`;
    perimeterSteps = `Keliling = 2 × (p + l) = 2 × (${valA} + ${valB}) = ${k} cm`;
    areaSteps = `Luas = p × l = ${valA} × ${valB} = ${l} cm²`;
  } else if (shape === 'segitiga') {
    const sisiMiring = Math.sqrt(Math.pow(valA / 2, 2) + Math.pow(valB, 2));
    const k = valA + 2 * sisiMiring;
    const l = 0.5 * valA * valB;
    perimeterText = `± ${k.toFixed(1)} cm`;
    areaText = `${l.toFixed(1)} cm²`;
    perimeterSteps = `Keliling = jumlah ketiga sisi (a + b + c) ≈ ${k.toFixed(1)} cm`;
    areaSteps = `Luas = 1/2 × alas × tinggi = 1/2 × ${valA} × ${valB} = ${l.toFixed(1)} cm²`;
  } else {
    const isMultipleOf7 = valA % 7 === 0;
    const piLabel = isMultipleOf7 ? '22/7' : '3,14';
    const k = isMultipleOf7 ? 2 * (22 / 7) * valA : 2 * 3.14 * valA;
    const l = isMultipleOf7 ? (22 / 7) * valA * valA : 3.14 * valA * valA;
    perimeterText = `${Number.isInteger(k) ? k : k.toFixed(2)} cm`;
    areaText = `${Number.isInteger(l) ? l : l.toFixed(2)} cm²`;
    perimeterSteps = `Keliling = 2 × π × r = 2 × ${piLabel} × ${valA} = ${perimeterText}`;
    areaSteps = `Luas = π × r² = ${piLabel} × ${valA} × ${valA} = ${areaText}`;
  }

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
      </div>

      <header className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 space-y-2">
        <p className="text-xs font-semibold text-blue-700">Materi 03 · Matematika Kelas 6 SD</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Bangun Datar</h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Pelajari cara menghitung keliling (panjang garis tepi) dan luas (besar daerah di dalam bangun) pada persegi, persegi panjang, segitiga, serta lingkaran.
        </p>
      </header>

      {/* Shape Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5" role="tablist">
        {(
          [
            { id: 'persegi', label: 'Persegi' },
            { id: 'persegi-panjang', label: 'Persegi Panjang' },
            { id: 'segitiga', label: 'Segitiga' },
            { id: 'lingkaran', label: 'Lingkaran' },
          ] as const
        ).map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={shape === item.id}
            onClick={() => {
              setShape(item.id);
              if (item.id === 'lingkaran') setValA(14);
              else setValA(12);
            }}
            className={`min-h-[44px] px-3 py-2 rounded-xl border text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
              shape === item.id
                ? 'bg-blue-700 text-white border-blue-700'
                : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Diagram Stage */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <svg viewBox="0 0 400 240" className="w-full h-auto block" role="img" aria-label={`Diagram ${shape}`}>
              <rect x="0" y="0" width="400" height="240" fill="#F8FAFC" />

              {shape === 'persegi' && (
                <g>
                  <rect
                    x={200 - valA * 4}
                    y={120 - valA * 4}
                    width={valA * 8}
                    height={valA * 8}
                    fill="#DBEAFE"
                    stroke="#2563EB"
                    strokeWidth="2.5"
                  />
                  <text x="200" y={120 + valA * 4 + 18} textAnchor="middle" className="text-[12px] font-bold fill-slate-900">
                    s = {valA} cm
                  </text>
                </g>
              )}

              {shape === 'persegi-panjang' && (
                <g>
                  <rect
                    x={200 - valA * 4.5}
                    y={120 - valB * 4}
                    width={valA * 9}
                    height={valB * 8}
                    fill="#DBEAFE"
                    stroke="#2563EB"
                    strokeWidth="2.5"
                  />
                  <text x="200" y={120 + valB * 4 + 18} textAnchor="middle" className="text-[12px] font-bold fill-slate-900">
                    p = {valA} cm
                  </text>
                  <text
                    x={200 + valA * 4.5 + 10}
                    y="124"
                    textAnchor="start"
                    className="text-[12px] font-bold fill-slate-900"
                  >
                    l = {valB} cm
                  </text>
                </g>
              )}

              {shape === 'segitiga' && (
                <g>
                  <polygon
                    points={`${200 - valA * 4.5},${120 + valB * 4} ${200 + valA * 4.5},${120 + valB * 4} 200,${120 - valB * 4}`}
                    fill="#DBEAFE"
                    stroke="#2563EB"
                    strokeWidth="2.5"
                  />
                  <line
                    x1="200"
                    y1={120 - valB * 4}
                    x2="200"
                    y2={120 + valB * 4}
                    stroke="#0F172A"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  <text x="200" y={120 + valB * 4 + 18} textAnchor="middle" className="text-[12px] font-bold fill-slate-900">
                    alas = {valA} cm
                  </text>
                  <text x="208" y="124" textAnchor="start" className="text-[12px] font-bold fill-slate-900">
                    t = {valB} cm
                  </text>
                </g>
              )}

              {shape === 'lingkaran' && (
                <g>
                  <circle
                    cx="200"
                    cy="120"
                    r={Math.min(88, Math.max(28, valA * 3.5))}
                    fill="#DBEAFE"
                    stroke="#2563EB"
                    strokeWidth="2.5"
                  />
                  <line
                    x1="200"
                    y1="120"
                    x2={200 + Math.min(88, Math.max(28, valA * 3.5))}
                    y2="120"
                    stroke="#0F172A"
                    strokeWidth="2"
                  />
                  <circle cx="200" cy="120" r="3.5" fill="#0F172A" />
                  <text
                    x={200 + Math.min(88, Math.max(28, valA * 3.5)) / 2}
                    y="112"
                    textAnchor="middle"
                    className="text-[12px] font-bold fill-slate-900"
                  >
                    r = {valA} cm
                  </text>
                </g>
              )}
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-xs text-slate-500">Keliling</p>
              <p className="text-lg sm:text-xl font-bold text-slate-900 font-mono-tabular mt-0.5">
                {perimeterText}
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-xs text-slate-500">Luas Daerah</p>
              <p className="text-lg sm:text-xl font-bold text-blue-700 font-mono-tabular mt-0.5">
                {areaText}
              </p>
            </div>
          </div>
        </div>

        {/* Controls & Formulas */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5">
          <h2 className="text-base font-semibold text-slate-900">Atur Ukuran Bangun</h2>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <label htmlFor="shape-a" className="font-medium text-slate-800">
                {shape === 'persegi'
                  ? 'Panjang Sisi (s)'
                  : shape === 'persegi-panjang'
                  ? 'Panjang (p)'
                  : shape === 'segitiga'
                  ? 'Panjang Alas (a)'
                  : 'Jari-jari (r)'}
              </label>
              <span className="font-mono-tabular font-bold">{valA} cm</span>
            </div>
            <input
              id="shape-a"
              type="range"
              min={shape === 'lingkaran' ? 7 : 4}
              max={shape === 'lingkaran' ? 21 : 20}
              step={shape === 'lingkaran' ? 1 : 1}
              value={valA}
              onChange={(e) => setValA(Number(e.target.value))}
              className="edu-slider"
            />
          </div>

          {(shape === 'persegi-panjang' || shape === 'segitiga') && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label htmlFor="shape-b" className="font-medium text-slate-800">
                  {shape === 'persegi-panjang' ? 'Lebar (l)' : 'Tinggi (t)'}
                </label>
                <span className="font-mono-tabular font-bold">{valB} cm</span>
              </div>
              <input
                id="shape-b"
                type="range"
                min={4}
                max={16}
                value={valB}
                onChange={(e) => setValB(Number(e.target.value))}
                className="edu-slider"
              />
            </div>
          )}

          {shape === 'lingkaran' && (
            <div className="flex flex-wrap gap-2">
              {[7, 10, 14, 21].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setValA(r)}
                  className={`min-h-[40px] px-3 py-1.5 rounded-lg border text-xs font-mono-tabular font-semibold cursor-pointer ${
                    valA === r
                      ? 'bg-blue-700 text-white border-blue-700'
                      : 'bg-slate-50 text-slate-800 border-slate-200'
                  }`}
                >
                  r = {r} cm
                </button>
              ))}
            </div>
          )}

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs sm:text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Langkah Rumus:</p>
            <p className="font-mono-tabular">{perimeterSteps}</p>
            <p className="font-mono-tabular font-semibold text-blue-800">{areaSteps}</p>
          </div>
        </div>
      </section>

      <TopicFooterAction
        currentTopicId="bangun-datar"
        completedTopics={completedTopics}
        onCompleteTopic={onCompleteTopic}
        onNavigate={onNavigate}
      />
    </div>
  );
}
