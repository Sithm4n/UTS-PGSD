import { useEffect, useState } from 'react';
import { RotateCcw, Compass, FunctionSquare } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/learningData';
import { SubjectQuiz } from './SubjectQuiz';

interface MatematikaModuleProps {
  completedLabs: string[];
  bestQuizScore?: number;
  onCompleteLab: (labId: string) => void;
  onCompleteQuiz: (percentage: number) => void;
}

type MathTab = 'fungsi' | 'pythagoras';

export function MatematikaModule({
  completedLabs,
  bestQuizScore,
  onCompleteLab,
  onCompleteQuiz,
}: MatematikaModuleProps) {
  const [activeTab, setActiveTab] = useState<MathTab>('fungsi');

  // Quadratic & Linear Function state: f(x) = a x^2 + b x + c
  const [funcType, setFuncType] = useState<'kuadrat' | 'linear'>('kuadrat');
  const [coefA, setCoefA] = useState<number>(1);
  const [coefB, setCoefB] = useState<number>(-2);
  const [coefC, setCoefC] = useState<number>(-3);

  // Pythagoras state
  const [sideA, setSideA] = useState<number>(6);
  const [sideB, setSideB] = useState<number>(8);

  const mathQuestions = QUIZ_QUESTIONS.filter((q) => q.subject === 'matematika');

  useEffect(() => {
    if (activeTab === 'fungsi') {
      onCompleteLab('math-fungsi');
    } else {
      onCompleteLab('math-pythagoras');
    }
  }, [activeTab, onCompleteLab]);

  // Coordinate Plane helpers (-8 to +8 mapped to 360x360 SVG)
  const size = 360;
  const range = 8;
  const toSvgX = (x: number) => ((x + range) / (range * 2)) * size;
  const toSvgY = (y: number) => ((range - y) / (range * 2)) * size;

  const effectiveA = funcType === 'linear' ? 0 : coefA;

  // Build SVG path for curve
  const curvePath = (() => {
    const pts: string[] = [];
    for (let px = -8; px <= 8; px += 0.2) {
      const y = effectiveA * px * px + coefB * px + coefC;
      const sx = toSvgX(px);
      const sy = toSvgY(y);
      if (sy >= -40 && sy <= size + 40) {
        pts.push(`${pts.length === 0 ? 'M' : 'L'} ${sx.toFixed(1)} ${sy.toFixed(1)}`);
      } else if (pts.length > 0) {
        // break out-of-bounds cleanly without jumping
        pts.push(`M ${sx.toFixed(1)} ${Math.min(size + 20, Math.max(-20, sy)).toFixed(1)}`);
      }
    }
    return pts.join(' ');
  })();

  // Quadratic math analysis
  const discriminant = coefB * coefB - 4 * effectiveA * coefC;
  const hasVertex = funcType === 'kuadrat' && effectiveA !== 0;
  const vertexX = hasVertex ? -coefB / (2 * effectiveA) : 0;
  const vertexY = hasVertex ? effectiveA * vertexX * vertexX + coefB * vertexX + coefC : coefC;

  const roots: number[] = [];
  if (funcType === 'linear') {
    if (coefB !== 0) roots.push(-coefC / coefB);
  } else if (effectiveA === 0) {
    if (coefB !== 0) roots.push(-coefC / coefB);
  } else if (discriminant > 0) {
    roots.push((-coefB - Math.sqrt(discriminant)) / (2 * effectiveA));
    roots.push((-coefB + Math.sqrt(discriminant)) / (2 * effectiveA));
  } else if (discriminant === 0) {
    roots.push(-coefB / (2 * effectiveA));
  }

  // Format equation text cleanly
  const formatEquation = () => {
    if (funcType === 'linear') {
      const bSign = coefC >= 0 ? `+ ${coefC}` : `- ${Math.abs(coefC)}`;
      return `y = ${coefB}x ${bSign}`;
    }
    const bPart = coefB >= 0 ? `+ ${coefB}x` : `- ${Math.abs(coefB)}x`;
    const cPart = coefC >= 0 ? `+ ${coefC}` : `- ${Math.abs(coefC)}`;
    return `f(x) = ${effectiveA}x² ${bPart} ${cPart}`;
  };

  // Pythagoras math
  const aSq = sideA * sideA;
  const bSq = sideB * sideB;
  const cSq = aSq + bSq;
  const sideC = Math.sqrt(cSq);
  const isExactInteger = Number.isInteger(sideC);
  const triangleArea = 0.5 * sideA * sideB;
  const trianglePerimeter = sideA + sideB + sideC;

  return (
    <div className="space-y-8">
      {/* Header & Module Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <p className="text-xs font-medium text-blue-700">
            03 · Matematika Terapan ·{' '}
            {completedLabs.filter((id) => id.startsWith('math-')).length}/2 Visualisasi Dieksplorasi
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 text-balance">
            Laboratorium Aljabar &amp; Geometri Visual
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
            Eksplorasi kurva koordinat Kartesius serta pembuktian visual luas persegi pada Teorema Pythagoras.
          </p>
        </div>

        <div
          className="inline-flex items-center p-1 bg-slate-200/70 rounded-xl self-start lg:self-auto"
          role="tablist"
          aria-label="Pilih visualisasi Matematika"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'fungsi'}
            onClick={() => setActiveTab('fungsi')}
            className={`min-h-[44px] px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'fungsi'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Grafik Fungsi
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'pythagoras'}
            onClick={() => setActiveTab('pythagoras')}
            className={`min-h-[44px] px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'pythagoras'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Teorema Pythagoras
          </button>
        </div>
      </div>

      {/* TAB 1: GRAFIK FUNGSI KUADRAT & LINEAR */}
      {activeTab === 'fungsi' && (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Coordinate Plane Canvas */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Bidang Koordinat Kartesius</h2>
                <p className="text-sm font-mono-tabular font-semibold text-blue-700 mt-0.5">
                  {formatEquation()}
                </p>
              </div>
              <div className="text-xs text-slate-600">
                <span className="inline-flex items-center gap-1.5 mr-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" aria-hidden="true" />
                  <span>Kurva</span>
                </span>
                {hasVertex && (
                  <span className="inline-flex items-center gap-1.5 mr-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-600 inline-block" aria-hidden="true" />
                    <span>Puncak</span>
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" aria-hidden="true" />
                  <span>Akar (y=0)</span>
                </span>
              </div>
            </div>

            <div className="w-full max-w-[440px] mx-auto overflow-hidden rounded-xl border border-slate-200 bg-white">
              <svg
                viewBox={`0 0 ${size} ${size}`}
                className="w-full h-auto block"
                role="img"
                aria-label={`Grafik ${formatEquation()} pada koordinat Kartesius`}
              >
                {/* Grid lines */}
                {Array.from({ length: 17 }, (_, i) => i - 8).map((val) => {
                  const pos = toSvgX(val);
                  const posY = toSvgY(val);
                  const isAxis = val === 0;
                  return (
                    <g key={val}>
                      <line
                        x1={pos}
                        y1={0}
                        x2={pos}
                        y2={size}
                        stroke={isAxis ? '#0F172A' : '#E2E8F0'}
                        strokeWidth={isAxis ? 1.5 : 1}
                      />
                      <line
                        x1={0}
                        y1={posY}
                        x2={size}
                        y2={posY}
                        stroke={isAxis ? '#0F172A' : '#E2E8F0'}
                        strokeWidth={isAxis ? 1.5 : 1}
                      />
                      {val !== 0 && val % 2 === 0 && (
                        <>
                          <text
                            x={pos}
                            y={toSvgY(0) + 12}
                            textAnchor="middle"
                            className="text-[9px] fill-slate-500"
                          >
                            {val}
                          </text>
                          <text
                            x={toSvgX(0) - 10}
                            y={posY + 3}
                            textAnchor="end"
                            className="text-[9px] fill-slate-500"
                          >
                            {val}
                          </text>
                        </>
                      )}
                    </g>
                  );
                })}

                {/* Axis labels */}
                <text x={size - 12} y={toSvgY(0) - 6} className="text-[10px] font-bold fill-slate-800">
                  X
                </text>
                <text x={toSvgX(0) + 8} y={14} className="text-[10px] font-bold fill-slate-800">
                  Y
                </text>

                {/* Plotted curve */}
                <path
                  d={curvePath}
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Y-intercept marker */}
                {Math.abs(coefC) <= 8 && (
                  <circle cx={toSvgX(0)} cy={toSvgY(coefC)} r="4.5" fill="#0F172A" />
                )}

                {/* Real Roots markers */}
                {roots.map((rx, idx) => {
                  if (Math.abs(rx) > 8) return null;
                  return (
                    <circle
                      key={idx}
                      cx={toSvgX(rx)}
                      cy={toSvgY(0)}
                      r="5.5"
                      fill="#059669"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                    />
                  );
                })}

                {/* Vertex marker */}
                {hasVertex && Math.abs(vertexX) <= 8 && Math.abs(vertexY) <= 8 && (
                  <circle
                    cx={toSvgX(vertexX)}
                    cy={toSvgY(vertexY)}
                    r="5.5"
                    fill="#D97706"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                )}
              </svg>
            </div>

            {/* Tabular Properties Readout */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-xs text-slate-500">Titik Potong Y</p>
                <p className="text-base sm:text-lg font-bold text-slate-900 font-mono-tabular mt-0.5">
                  (0, {coefC})
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-xs text-slate-500">
                  {funcType === 'kuadrat' ? 'Titik Puncak' : 'Gradien (m)'}
                </p>
                <p className="text-base sm:text-lg font-bold text-amber-700 font-mono-tabular mt-0.5">
                  {funcType === 'kuadrat'
                    ? hasVertex
                      ? `(${vertexX.toFixed(1)}, ${vertexY.toFixed(1)})`
                      : 'Garis Lurus'
                    : coefB}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-xs text-slate-500">
                  {funcType === 'kuadrat' ? 'Diskriminan (D)' : 'Akar (y = 0)'}
                </p>
                <p className="text-base sm:text-lg font-bold text-blue-700 font-mono-tabular mt-0.5">
                  {funcType === 'kuadrat'
                    ? discriminant
                    : roots.length > 0
                    ? `x = ${roots[0].toFixed(1)}`
                    : 'Tidak ada'}
                </p>
              </div>
            </div>
          </div>

          {/* Function Controls */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FunctionSquare className="w-4 h-4 text-blue-700" aria-hidden="true" />
                <h3 className="text-base font-semibold text-slate-900">Parameter Persamaan</h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setFuncType('kuadrat');
                  setCoefA(1);
                  setCoefB(-2);
                  setCoefC(-3);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 min-h-[36px] px-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Reset</span>
              </button>
            </div>

            {/* Type Toggle */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFuncType('kuadrat')}
                className={`min-h-[44px] px-3 py-2 text-xs sm:text-sm font-medium rounded-xl border transition-colors cursor-pointer ${
                  funcType === 'kuadrat'
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                Fungsi Kuadrat
              </button>
              <button
                type="button"
                onClick={() => setFuncType('linear')}
                className={`min-h-[44px] px-3 py-2 text-xs sm:text-sm font-medium rounded-xl border transition-colors cursor-pointer ${
                  funcType === 'linear'
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                Fungsi Linear
              </button>
            </div>

            {/* Sliders */}
            {funcType === 'kuadrat' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <label htmlFor="slider-a" className="font-medium text-slate-800">
                    Koefisien a (Kelengkungan)
                  </label>
                  <span className="font-mono-tabular font-semibold text-slate-900">{coefA}</span>
                </div>
                <input
                  id="slider-a"
                  type="range"
                  min={-3}
                  max={3}
                  step={0.5}
                  value={coefA}
                  onChange={(e) => setCoefA(Number(e.target.value))}
                  className="edu-slider"
                />
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <label htmlFor="slider-b" className="font-medium text-slate-800">
                  {funcType === 'kuadrat' ? 'Koefisien b (Pergeseran)' : 'Gradien m (Kemiringan)'}
                </label>
                <span className="font-mono-tabular font-semibold text-slate-900">{coefB}</span>
              </div>
              <input
                id="slider-b"
                type="range"
                min={-6}
                max={6}
                step={1}
                value={coefB}
                onChange={(e) => setCoefB(Number(e.target.value))}
                className="edu-slider"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <label htmlFor="slider-c" className="font-medium text-slate-800">
                  Konstanta c (Titik Potong Y)
                </label>
                <span className="font-mono-tabular font-semibold text-slate-900">{coefC}</span>
              </div>
              <input
                id="slider-c"
                type="range"
                min={-6}
                max={6}
                step={1}
                value={coefC}
                onChange={(e) => setCoefC(Number(e.target.value))}
                className="edu-slider"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-1.5">
              <p className="font-semibold text-slate-900">Analisis Grafik:</p>
              {funcType === 'kuadrat' ? (
                <>
                  <p>
                    • Kurva {effectiveA > 0 ? 'terbuka ke atas (titik minimum)' : effectiveA < 0 ? 'terbuka ke bawah (titik maksimum)' : 'membentuk garis lurus karena a = 0'}.
                  </p>
                  <p>
                    • {discriminant > 0
                      ? `Karena D = ${discriminant} > 0, kurva memotong sumbu X di dua titik: x₁ = ${roots[0]?.toFixed(2)} dan x₂ = ${roots[1]?.toFixed(2)}.`
                      : discriminant === 0 && effectiveA !== 0
                      ? `Karena D = 0, kurva menyinggung sumbu X tepat di satu titik (x = ${roots[0]?.toFixed(2)}).`
                      : effectiveA !== 0
                      ? `Karena D = ${discriminant} < 0, kurva tidak memotong sumbu X (definit).`
                      : 'Ubah nilai a selain 0 untuk melihat parabola kuadrat.'}
                  </p>
                </>
              ) : (
                <p>
                  Garis memiliki kemiringan m = {coefB} ({coefB > 0 ? 'naik ke kanan' : coefB < 0 ? 'turun ke kanan' : 'mendatar sejajar sumbu X'}) dan memotong sumbu Y di titik (0, {coefC}).
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* TAB 2: TEOREMA PYTHAGORAS */}
      {activeTab === 'pythagoras' && (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Geometric Proof Stage */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Visualisasi Luas Persegi Pythagoras</h2>
                <p className="text-xs text-slate-500">
                  Luas Persegi a² + Luas Persegi b² = Luas Persegi Sisi Miring c²
                </p>
              </div>
              <span className="font-mono-tabular text-xs font-semibold text-blue-700">
                {isExactInteger ? 'Triple Pythagoras Bulat' : 'Akar Bilangan Real'}
              </span>
            </div>

            <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
              <svg
                viewBox="0 0 560 360"
                className="w-full h-auto block"
                role="img"
                aria-label={`Segitiga siku-siku dengan alas ${sideA}, tinggi ${sideB}, dan sisi miring ${sideC.toFixed(2)}`}
              >
                <rect x="0" y="0" width="560" height="360" fill="#F8FAFC" />
                {(() => {
                  // Fit triangle + squares comfortably inside SVG
                  const scale = 11;
                  const pxA = sideA * scale;
                  const pxB = sideB * scale;
                  const originX = 195;
                  const originY = 215;

                  // Triangle vertices: right angle at (originX, originY)
                  const p0 = { x: originX, y: originY };
                  const p1 = { x: originX + pxA, y: originY }; // bottom right
                  const p2 = { x: originX, y: originY - pxB }; // top left

                  // Outward normal for hypotenuse p2 -> p1
                  const dx = p1.x - p2.x;
                  const dy = p1.y - p2.y;
                  // Outward normal vector (perpendicular pointing top-right)
                  const nx = dy;
                  const ny = -dx;
                  const cSqPoly = `${p2.x},${p2.y} ${p1.x},${p1.y} ${p1.x + nx},${p1.y + ny} ${p2.x + nx},${p2.y + ny}`;

                  return (
                    <g>
                      {/* Square on side b (left of vertical leg) */}
                      <rect
                        x={originX - pxB}
                        y={originY - pxB}
                        width={pxB}
                        height={pxB}
                        fill="#DBEAFE"
                        stroke="#2563EB"
                        strokeWidth="1.5"
                      />
                      <text
                        x={originX - pxB / 2}
                        y={originY - pxB / 2 + 4}
                        textAnchor="middle"
                        className="text-[11px] font-bold fill-blue-900"
                      >
                        b² = {bSq}
                      </text>

                      {/* Square on side a (below horizontal leg) */}
                      <rect
                        x={originX}
                        y={originY}
                        width={pxA}
                        height={pxA}
                        fill="#D1FAE5"
                        stroke="#059669"
                        strokeWidth="1.5"
                      />
                      <text
                        x={originX + pxA / 2}
                        y={originY + pxA / 2 + 4}
                        textAnchor="middle"
                        className="text-[11px] font-bold fill-emerald-900"
                      >
                        a² = {aSq}
                      </text>

                      {/* Square on hypotenuse c */}
                      <polygon
                        points={cSqPoly}
                        fill="#FEF3C7"
                        stroke="#D97706"
                        strokeWidth="1.5"
                      />
                      <text
                        x={(p1.x + p2.x + nx) / 2}
                        y={(p1.y + p2.y + ny) / 2 + 4}
                        textAnchor="middle"
                        className="text-[11px] font-bold fill-amber-950"
                      >
                        c² = {cSq}
                      </text>

                      {/* Right Triangle */}
                      <polygon
                        points={`${p0.x},${p0.y} ${p1.x},${p1.y} ${p2.x},${p2.y}`}
                        fill="#FFFFFF"
                        stroke="#0F172A"
                        strokeWidth="2.5"
                      />

                      {/* Right-angle marker */}
                      <polyline
                        points={`${originX + 12},${originY} ${originX + 12},${originY - 12} ${originX},${originY - 12}`}
                        fill="none"
                        stroke="#0F172A"
                        strokeWidth="1.5"
                      />

                      {/* Side Labels */}
                      <text
                        x={originX + pxA / 2}
                        y={originY - 6}
                        textAnchor="middle"
                        className="text-[10px] font-semibold fill-emerald-900"
                      >
                        a = {sideA}
                      </text>
                      <text
                        x={originX + 14}
                        y={originY - pxB / 2}
                        textAnchor="start"
                        className="text-[10px] font-semibold fill-blue-900"
                      >
                        b = {sideB}
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-xs text-slate-500">Sisi Miring (c)</p>
                <p className="text-lg sm:text-xl font-bold text-blue-700 font-mono-tabular mt-0.5">
                  {isExactInteger ? sideC : sideC.toFixed(2)} cm
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-xs text-slate-500">Luas Segitiga</p>
                <p className="text-lg sm:text-xl font-bold text-slate-900 font-mono-tabular mt-0.5">
                  {triangleArea.toFixed(1)} cm²
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-xs text-slate-500">Keliling</p>
                <p className="text-lg sm:text-xl font-bold text-slate-900 font-mono-tabular mt-0.5">
                  {trianglePerimeter.toFixed(1)} cm
                </p>
              </div>
            </div>
          </div>

          {/* Pythagoras Controls & Steps */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-700" aria-hidden="true" />
              <h3 className="text-base font-semibold text-slate-900">Atur Panjang Sisi Siku-Siku</h3>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-600 mb-2">Triple Pythagoras Populer</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: '3 - 4 - 5', a: 3, b: 4 },
                  { label: '6 - 8 - 10', a: 6, b: 8 },
                  { label: '5 - 12 - 13', a: 5, b: 12 },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      setSideA(preset.a);
                      setSideB(preset.b);
                    }}
                    className={`min-h-[44px] px-2 py-2 text-xs font-mono-tabular font-semibold rounded-xl border transition-colors cursor-pointer ${
                      sideA === preset.a && sideB === preset.b
                        ? 'bg-blue-700 text-white border-blue-700'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <label htmlFor="slider-side-a" className="font-medium text-slate-800">
                  Panjang Alas (a)
                </label>
                <span className="font-mono-tabular font-semibold text-slate-900">{sideA} cm</span>
              </div>
              <input
                id="slider-side-a"
                type="range"
                min={3}
                max={12}
                step={1}
                value={sideA}
                onChange={(e) => setSideA(Number(e.target.value))}
                className="edu-slider"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <label htmlFor="slider-side-b" className="font-medium text-slate-800">
                  Panjang Tinggi (b)
                </label>
                <span className="font-mono-tabular font-semibold text-slate-900">{sideB} cm</span>
              </div>
              <input
                id="slider-side-b"
                type="range"
                min={3}
                max={12}
                step={1}
                value={sideB}
                onChange={(e) => setSideB(Number(e.target.value))}
                className="edu-slider"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-sm">
              <p className="font-semibold text-slate-900">Langkah Perhitungan:</p>
              <div className="font-mono-tabular text-xs sm:text-sm text-slate-700 space-y-1">
                <p>c² = a² + b²</p>
                <p>
                  c² = {sideA}² + {sideB}² = {aSq} + {bSq} = {cSq}
                </p>
                <p className="font-bold text-blue-800">
                  c = √{cSq} = {isExactInteger ? sideC : sideC.toFixed(2)} cm
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Embedded Matematika Quiz */}
      <SubjectQuiz
        title="Evaluasi Matematika"
        subtitle="Latihan Fungsi Kuadrat, Linear & Pythagoras"
        questions={mathQuestions}
        accentColor="blue"
        bestScore={bestQuizScore}
        onComplete={onCompleteQuiz}
      />
    </div>
  );
}
