import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { PageRoute, TopicId } from '../types';
import { TopicFooterAction } from './TopicFooterAction';

interface TopicBangunRuangProps {
  completedTopics: TopicId[];
  onCompleteTopic: (topicId: TopicId) => void;
  onNavigate: (route: PageRoute) => void;
}

type Shape3D = 'kubus' | 'balok' | 'tabung';

export function TopicBangunRuang({
  completedTopics,
  onCompleteTopic,
  onNavigate,
}: TopicBangunRuangProps) {
  const [shape3d, setShape3d] = useState<Shape3D>('balok');
  const [p, setP] = useState<number>(10); // rusuk kubus / panjang balok / jari-jari tabung
  const [l, setL] = useState<number>(6); // lebar balok
  const [t, setT] = useState<number>(8); // tinggi balok / tinggi tabung

  let volumeDisplay = '';
  let surfaceDisplay = '';
  let volumeFormula = '';
  let surfaceFormula = '';

  if (shape3d === 'kubus') {
    const v = p * p * p;
    const lp = 6 * p * p;
    volumeDisplay = `${v.toLocaleString('id-ID')} cm³`;
    surfaceDisplay = `${lp.toLocaleString('id-ID')} cm²`;
    volumeFormula = `Volume = s × s × s = ${p} × ${p} × ${p} = ${volumeDisplay}`;
    surfaceFormula = `Luas Permukaan = 6 × s² = 6 × ${p * p} = ${surfaceDisplay}`;
  } else if (shape3d === 'balok') {
    const v = p * l * t;
    const lp = 2 * (p * l + p * t + l * t);
    volumeDisplay = `${v.toLocaleString('id-ID')} cm³`;
    surfaceDisplay = `${lp.toLocaleString('id-ID')} cm²`;
    volumeFormula = `Volume = p × l × t = ${p} × ${l} × ${t} = ${volumeDisplay}`;
    surfaceFormula = `Luas Permukaan = 2 × (p×l + p×t + l×t) = ${surfaceDisplay}`;
  } else {
    const r = p;
    const isMult7 = r % 7 === 0;
    const piLabel = isMult7 ? '22/7' : '3,14';
    const piVal = isMult7 ? 22 / 7 : 3.14;
    const v = piVal * r * r * t;
    const lp = 2 * piVal * r * (r + t);
    volumeDisplay = `${(Number.isInteger(v) ? v : Number(v.toFixed(1))).toLocaleString('id-ID')} cm³`;
    surfaceDisplay = `${(Number.isInteger(lp) ? lp : Number(lp.toFixed(1))).toLocaleString('id-ID')} cm²`;
    volumeFormula = `Volume = π × r² × t = ${piLabel} × ${r}² × ${t} = ${volumeDisplay}`;
    surfaceFormula = `Luas Permukaan = 2 × π × r × (r + t) = ${surfaceDisplay}`;
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
        <p className="text-xs font-semibold text-blue-700">Materi 04 · Matematika Kelas 6 SD</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Bangun Ruang</h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Bangun ruang memiliki tiga dimensi: panjang, lebar, dan tinggi. Volume menunjukkan kapasitas isi di dalamnya (cm³), sedangkan luas permukaan adalah total luas seluruh sisi luarnya (cm²).
        </p>
      </header>

      {/* 3D Shape Tabs */}
      <div className="grid grid-cols-3 gap-2.5" role="tablist">
        {(
          [
            { id: 'kubus', label: 'Kubus' },
            { id: 'balok', label: 'Balok' },
            { id: 'tabung', label: 'Tabung' },
          ] as const
        ).map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={shape3d === item.id}
            onClick={() => {
              setShape3d(item.id);
              if (item.id === 'tabung') {
                setP(7);
                setT(10);
              } else if (item.id === 'kubus') {
                setP(8);
              } else {
                setP(10);
                setL(6);
                setT(8);
              }
            }}
            className={`min-h-[44px] px-3 py-2 rounded-xl border text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
              shape3d === item.id
                ? 'bg-blue-700 text-white border-blue-700'
                : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 3D Isometric SVG Stage */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <svg viewBox="0 0 400 250" className="w-full h-auto block" role="img" aria-label={`Diagram 3D ${shape3d}`}>
              <rect x="0" y="0" width="400" height="250" fill="#F8FAFC" />

              {shape3d === 'kubus' && (
                <g>
                  {(() => {
                    const s = Math.max(55, Math.min(115, p * 8));
                    const d = s * 0.38;
                    const x0 = 200 - s / 2 - d / 2;
                    const y0 = 135 - s / 2 + d / 2;
                    return (
                      <g>
                        {/* Front */}
                        <rect x={x0} y={y0} width={s} height={s} fill="#DBEAFE" stroke="#2563EB" strokeWidth="2" />
                        {/* Top */}
                        <polygon
                          points={`${x0},${y0} ${x0 + d},${y0 - d} ${x0 + s + d},${y0 - d} ${x0 + s},${y0}`}
                          fill="#BFDBFE"
                          stroke="#2563EB"
                          strokeWidth="2"
                        />
                        {/* Right */}
                        <polygon
                          points={`${x0 + s},${y0} ${x0 + s + d},${y0 - d} ${x0 + s + d},${y0 + s - d} ${x0 + s},${y0 + s}`}
                          fill="#93C5FD"
                          stroke="#2563EB"
                          strokeWidth="2"
                        />
                        <text x={x0 + s / 2} y={y0 + s + 18} textAnchor="middle" className="text-[12px] font-bold fill-slate-900">
                          s = {p} cm
                        </text>
                      </g>
                    );
                  })()}
                </g>
              )}

              {shape3d === 'balok' && (
                <g>
                  {(() => {
                    const w = Math.max(70, Math.min(140, p * 9));
                    const h = Math.max(50, Math.min(110, t * 7.5));
                    const d = Math.max(25, Math.min(60, l * 4.5));
                    const x0 = 200 - w / 2 - d / 2;
                    const y0 = 135 - h / 2 + d / 2;
                    return (
                      <g>
                        <rect x={x0} y={y0} width={w} height={h} fill="#DBEAFE" stroke="#2563EB" strokeWidth="2" />
                        <polygon
                          points={`${x0},${y0} ${x0 + d},${y0 - d} ${x0 + w + d},${y0 - d} ${x0 + w},${y0}`}
                          fill="#BFDBFE"
                          stroke="#2563EB"
                          strokeWidth="2"
                        />
                        <polygon
                          points={`${x0 + w},${y0} ${x0 + w + d},${y0 - d} ${x0 + w + d},${y0 + h - d} ${x0 + w},${y0 + h}`}
                          fill="#93C5FD"
                          stroke="#2563EB"
                          strokeWidth="2"
                        />
                        <text x={x0 + w / 2} y={y0 + h + 18} textAnchor="middle" className="text-[11px] font-bold fill-slate-900">
                          p = {p} cm
                        </text>
                        <text x={x0 + w + d + 8} y={y0 + h / 2} textAnchor="start" className="text-[11px] font-bold fill-slate-900">
                          t = {t} cm
                        </text>
                        <text x={x0 + w + d / 2 + 8} y={y0 + h - d / 2 + 16} textAnchor="start" className="text-[11px] font-bold fill-slate-700">
                          l = {l} cm
                        </text>
                      </g>
                    );
                  })()}
                </g>
              )}

              {shape3d === 'tabung' && (
                <g>
                  {(() => {
                    const rx = Math.max(36, Math.min(82, p * 4.5));
                    const ry = rx * 0.3;
                    const h = Math.max(60, Math.min(125, t * 8));
                    const cx = 200;
                    const topY = 125 - h / 2;
                    const botY = 125 + h / 2;
                    return (
                      <g>
                        <path
                          d={`M ${cx - rx} ${topY} L ${cx - rx} ${botY} A ${rx} ${ry} 0 0 0 ${cx + rx} ${botY} L ${cx + rx} ${topY} Z`}
                          fill="#DBEAFE"
                          stroke="#2563EB"
                          strokeWidth="2"
                        />
                        <ellipse cx={cx} cy={topY} rx={rx} ry={ry} fill="#BFDBFE" stroke="#2563EB" strokeWidth="2" />
                        <line x1={cx} y1={topY} x2={cx + rx} y2={topY} stroke="#0F172A" strokeWidth="2" />
                        <circle cx={cx} cy={topY} r="3" fill="#0F172A" />
                        <text x={cx + rx / 2} y={topY - 8} textAnchor="middle" className="text-[11px] font-bold fill-slate-900">
                          r = {p} cm
                        </text>
                        <text x={cx + rx + 10} y={(topY + botY) / 2 + 4} textAnchor="start" className="text-[11px] font-bold fill-slate-900">
                          t = {t} cm
                        </text>
                      </g>
                    );
                  })()}
                </g>
              )}
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-xs text-slate-500">Volume Bangun Ruang</p>
              <p className="text-lg sm:text-xl font-bold text-blue-700 font-mono-tabular mt-0.5">
                {volumeDisplay}
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-xs text-slate-500">Luas Permukaan</p>
              <p className="text-lg sm:text-xl font-bold text-slate-900 font-mono-tabular mt-0.5">
                {surfaceDisplay}
              </p>
            </div>
          </div>
        </div>

        {/* Sliders & Calculation */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5">
          <h2 className="text-base font-semibold text-slate-900">Atur Ukuran Dimensi</h2>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <label htmlFor="dim-p" className="font-medium text-slate-800">
                {shape3d === 'kubus'
                  ? 'Panjang Rusuk (s)'
                  : shape3d === 'balok'
                  ? 'Panjang (p)'
                  : 'Jari-jari Alas (r)'}
              </label>
              <span className="font-mono-tabular font-bold">{p} cm</span>
            </div>
            <input
              id="dim-p"
              type="range"
              min={shape3d === 'tabung' ? 7 : 4}
              max={shape3d === 'tabung' ? 14 : 15}
              value={p}
              onChange={(e) => setP(Number(e.target.value))}
              className="edu-slider"
            />
          </div>

          {shape3d === 'balok' && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label htmlFor="dim-l" className="font-medium text-slate-800">
                  Lebar (l)
                </label>
                <span className="font-mono-tabular font-bold">{l} cm</span>
              </div>
              <input
                id="dim-l"
                type="range"
                min={3}
                max={12}
                value={l}
                onChange={(e) => setL(Number(e.target.value))}
                className="edu-slider"
              />
            </div>
          )}

          {(shape3d === 'balok' || shape3d === 'tabung') && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label htmlFor="dim-t" className="font-medium text-slate-800">
                  Tinggi (t)
                </label>
                <span className="font-mono-tabular font-bold">{t} cm</span>
              </div>
              <input
                id="dim-t"
                type="range"
                min={4}
                max={15}
                value={t}
                onChange={(e) => setT(Number(e.target.value))}
                className="edu-slider"
              />
            </div>
          )}

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs sm:text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Langkah Perhitungan:</p>
            <p className="font-mono-tabular font-semibold text-blue-800">{volumeFormula}</p>
            <p className="font-mono-tabular">{surfaceFormula}</p>
          </div>
        </div>
      </section>

      <TopicFooterAction
        currentTopicId="bangun-ruang"
        completedTopics={completedTopics}
        onCompleteTopic={onCompleteTopic}
        onNavigate={onNavigate}
      />
    </div>
  );
}
