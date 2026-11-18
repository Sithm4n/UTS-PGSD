import { useEffect, useState } from 'react';
import {
  Sun,
  Droplets,
  Wind,
  Zap,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Lightbulb,
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/learningData';
import { SubjectQuiz } from './SubjectQuiz';

interface IpaModuleProps {
  completedLabs: string[];
  bestQuizScore?: number;
  onCompleteLab: (labId: string) => void;
  onCompleteQuiz: (percentage: number) => void;
}

type IpaTab = 'fotosintesis' | 'listrik';

export function IpaModule({
  completedLabs,
  bestQuizScore,
  onCompleteLab,
  onCompleteQuiz,
}: IpaModuleProps) {
  const [activeTab, setActiveTab] = useState<IpaTab>('fotosintesis');

  // Fotosintesis state
  const [sunlight, setSunlight] = useState<number>(75); // %
  const [co2Level, setCo2Level] = useState<number>(420); // ppm
  const [waterSupply, setWaterSupply] = useState<number>(80); // %

  // Rangkaian Listrik state
  const [circuitMode, setCircuitMode] = useState<'seri' | 'paralel'>('seri');
  const [voltage, setVoltage] = useState<number>(12); // Volt
  const [switchMain, setSwitchMain] = useState<boolean>(true);
  const [switchBranch2, setSwitchBranch2] = useState<boolean>(true);
  const [resistor1, setResistor1] = useState<number>(4); // Ohm
  const [resistor2, setResistor2] = useState<number>(6); // Ohm

  const ipaQuestions = QUIZ_QUESTIONS.filter((q) => q.subject === 'ipa');

  useEffect(() => {
    if (activeTab === 'fotosintesis') {
      onCompleteLab('ipa-fotosintesis');
    } else {
      onCompleteLab('ipa-listrik');
    }
  }, [activeTab, onCompleteLab]);

  // Fotosintesis calculations (Law of Limiting Factors)
  const co2Normalized = Math.min(100, Math.max(0, ((co2Level - 100) / 700) * 100));
  const limitingFactorValue = Math.min(sunlight, co2Normalized, waterSupply);
  const photosynthesisRate = Math.round(limitingFactorValue);
  const oxygenOutput = ((photosynthesisRate / 100) * 18.4).toFixed(1);
  const glucoseOutput = ((photosynthesisRate / 100) * 3.1).toFixed(2);

  let limitingName = 'Seimbang';
  if (photosynthesisRate < 95) {
    if (sunlight <= co2Normalized && sunlight <= waterSupply) limitingName = 'Intensitas Cahaya';
    else if (co2Normalized <= sunlight && co2Normalized <= waterSupply) limitingName = 'Kadar CO2';
    else limitingName = 'Ketersediaan Air';
  }

  const bioStatus =
    photosynthesisRate >= 65
      ? { label: 'Laju Optimal', tone: 'text-emerald-700 bg-emerald-50 border-emerald-200', icon: CheckCircle2 }
      : photosynthesisRate >= 25
      ? { label: 'Laju Terbatas', tone: 'text-amber-700 bg-amber-50 border-amber-200', icon: AlertTriangle }
      : { label: 'Fotosintesis Terhenti', tone: 'text-rose-700 bg-rose-50 border-rose-200', icon: AlertTriangle };

  // Circuit calculations
  let totalR = 0;
  let totalI = 0;
  let i1 = 0;
  let i2 = 0;
  let v1 = 0;
  let v2 = 0;
  let bulb1On = false;
  let bulb2On = false;

  if (switchMain) {
    if (circuitMode === 'seri') {
      totalR = resistor1 + resistor2;
      totalI = voltage / totalR;
      i1 = totalI;
      i2 = totalI;
      v1 = i1 * resistor1;
      v2 = i2 * resistor2;
      bulb1On = totalI > 0;
      bulb2On = totalI > 0;
    } else {
      // Paralel: branch 1 always connected when main switch closed; branch 2 controlled by switchBranch2
      i1 = voltage / resistor1;
      v1 = voltage;
      bulb1On = true;

      if (switchBranch2) {
        i2 = voltage / resistor2;
        v2 = voltage;
        totalI = i1 + i2;
        totalR = (resistor1 * resistor2) / (resistor1 + resistor2);
        bulb2On = true;
      } else {
        i2 = 0;
        v2 = 0;
        totalI = i1;
        totalR = resistor1;
        bulb2On = false;
      }
    }
  }

  const p1 = bulb1On ? v1 * i1 : 0;
  const p2 = bulb2On ? v2 * i2 : 0;
  const bulb1Glow = Math.min(1, p1 / 24);
  const bulb2Glow = Math.min(1, p2 / 24);

  const BioIcon = bioStatus.icon;

  return (
    <div className="space-y-8">
      {/* Header & Module Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <p className="text-xs font-medium text-teal-700">
            01 · Ilmu Pengetahuan Alam · {completedLabs.filter((id) => id.startsWith('ipa-')).length}/2 Lab Dieksplorasi
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 text-balance">
            Laboratorium Interaktif Biologi &amp; Fisika
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
            Ubah parameter lingkungan dan komponen listrik untuk mengamati dampak ilmiahnya secara langsung.
          </p>
        </div>

        <div
          className="inline-flex items-center p-1 bg-slate-200/70 rounded-xl self-start lg:self-auto"
          role="tablist"
          aria-label="Pilih simulasi IPA"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'fotosintesis'}
            onClick={() => setActiveTab('fotosintesis')}
            className={`min-h-[44px] px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'fotosintesis'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Simulasi Fotosintesis
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'listrik'}
            onClick={() => setActiveTab('listrik')}
            className={`min-h-[44px] px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'listrik'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Rangkaian Listrik
          </button>
        </div>
      </div>

      {/* TAB 1: FOTOSINTESIS */}
      {activeTab === 'fotosintesis' && (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Interactive Visual Stage */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Diagram Kloroplas &amp; Penampang Daun</h2>
                <p className="text-xs text-slate-500">
                  Reaksi: <span className="font-mono-tabular text-slate-700">6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂</span>
                </p>
              </div>
              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium ${bioStatus.tone}`}>
                <BioIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{bioStatus.label}</span>
              </div>
            </div>

            {/* Responsive SVG Photosynthesis Simulation */}
            <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
              <svg
                viewBox="0 0 640 360"
                className="w-full h-auto block"
                role="img"
                aria-label={`Simulasi fotosintesis dengan laju ${photosynthesisRate} persen`}
              >
                <defs>
                  <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={sunlight > 40 ? '#E0F2FE' : '#E2E8F0'} />
                    <stop offset="100%" stopColor="#F8FAFC" />
                  </linearGradient>
                  <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={waterSupply < 20 ? '#A3A65B' : '#10B981'} />
                    <stop offset="100%" stopColor={waterSupply < 20 ? '#857E3B' : '#047857'} />
                  </linearGradient>
                </defs>

                {/* Sky Backdrop */}
                <rect x="0" y="0" width="640" height="360" fill="url(#skyGrad)" />

                {/* Sun */}
                <circle
                  cx="90"
                  cy="70"
                  r={22 + (sunlight / 100) * 14}
                  fill="#F59E0B"
                  opacity={0.25 + (sunlight / 100) * 0.75}
                />
                <circle
                  cx="90"
                  cy="70"
                  r="20"
                  fill="#FBBF24"
                  opacity={0.35 + (sunlight / 100) * 0.65}
                />
                <text x="90" y="122" textAnchor="middle" className="text-[11px] font-medium fill-amber-900">
                  Cahaya {sunlight}%
                </text>

                {/* Sun Rays hitting leaf */}
                {sunlight > 10 &&
                  [0, 1, 2].map((ray) => (
                    <line
                      key={ray}
                      x1={115 + ray * 18}
                      y1={82 + ray * 8}
                      x2={230 + ray * 42}
                      y2={155 + ray * 6}
                      stroke="#F59E0B"
                      strokeWidth={1.5 + (sunlight / 100) * 2.5}
                      strokeDasharray="6 6"
                      opacity={0.2 + (sunlight / 100) * 0.7}
                    />
                  ))}

                {/* Soil & Roots */}
                <rect x="0" y="295" width="640" height="65" fill="#E7E5E4" />
                <line x1="0" y1="295" x2="640" y2="295" stroke="#CBD5E1" strokeWidth="1.5" />
                <text x="24" y="325" className="text-[11px] font-medium fill-slate-700">
                  Penyerapan Air Akar (Xilem): {waterSupply}%
                </text>

                {/* Plant Stem & Xylem Vessel */}
                <path
                  d="M312 310 L312 185"
                  stroke="#059669"
                  strokeWidth="16"
                  strokeLinecap="round"
                />
                <path
                  d="M312 310 L312 185"
                  stroke="#0EA5E9"
                  strokeWidth={Math.max(2, (waterSupply / 100) * 7)}
                  strokeDasharray="6 6"
                  opacity={waterSupply > 5 ? 0.9 : 0.2}
                />

                {/* Water droplets rising */}
                {waterSupply > 15 &&
                  [0, 1, 2].map((drop) => (
                    <circle
                      key={drop}
                      cx="312"
                      cy={285 - drop * 38}
                      r="4"
                      fill="#0284C7"
                      opacity={0.5 + (waterSupply / 100) * 0.5}
                    />
                  ))}

                {/* Main Leaf Chamber */}
                <path
                  d="M190 190 C210 105, 430 105, 455 190 C430 265, 210 265, 190 190 Z"
                  fill="url(#leafGrad)"
                  stroke="#065F46"
                  strokeWidth="2.5"
                />
                <line x1="205" y1="190" x2="440" y2="190" stroke="#ECFDF5" strokeWidth="2" opacity="0.65" />

                {/* Chloroplast Center Core */}
                <rect
                  x="252"
                  y="148"
                  width="140"
                  height="84"
                  rx="16"
                  fill="#ECFDF5"
                  fillOpacity="0.92"
                  stroke="#059669"
                  strokeWidth="1.5"
                />
                <text x="322" y="176" textAnchor="middle" className="text-[11px] font-semibold fill-emerald-950">
                  Kloroplas Aktif
                </text>
                <text x="322" y="198" textAnchor="middle" className="text-[18px] font-bold fill-teal-800">
                  {photosynthesisRate}% Laju
                </text>
                <text x="322" y="218" textAnchor="middle" className="text-[10px] fill-slate-600">
                  C₆H₁₂O₆: {glucoseOutput} mg/mnt
                </text>

                {/* CO2 Intake */}
                <g>
                  <rect x="465" y="135" width="145" height="54" rx="10" fill="#FFFFFF" stroke="#CBD5E1" />
                  <text x="537" y="157" textAnchor="middle" className="text-[11px] font-semibold fill-slate-800">
                    Masukan CO₂ (Stomata)
                  </text>
                  <text x="537" y="176" textAnchor="middle" className="text-[12px] font-bold fill-slate-700">
                    {co2Level} ppm
                  </text>
                  <line
                    x1="465"
                    y1="162"
                    x2="425"
                    y2="176"
                    stroke="#475569"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                </g>

                {/* O2 Bubbles Output */}
                <g>
                  <rect x="465" y="210" width="145" height="54" rx="10" fill="#ECFEFF" stroke="#0891B2" />
                  <text x="537" y="232" textAnchor="middle" className="text-[11px] font-semibold fill-cyan-950">
                    Pelepasan Oksigen (O₂)
                  </text>
                  <text x="537" y="251" textAnchor="middle" className="text-[12px] font-bold fill-cyan-800">
                    {oxygenOutput} mL/menit
                  </text>
                  {photosynthesisRate > 10 &&
                    [0, 1, 2, 3].map((b) => {
                      const visible = photosynthesisRate >= (b + 1) * 20;
                      if (!visible) return null;
                      return (
                        <circle
                          key={b}
                          cx={415 + b * 12}
                          cy={225 - b * 8}
                          r={4 + b * 0.8}
                          fill="#06B6D4"
                          opacity="0.8"
                        />
                      );
                    })}
                </g>
              </svg>
            </div>

            {/* Live Tabular Metrics */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-xs text-slate-500">Laju Reaksi</p>
                <p className="text-lg sm:text-xl font-bold text-slate-900 font-mono-tabular mt-0.5">
                  {photosynthesisRate}%
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-xs text-slate-500">Oksigen (O₂)</p>
                <p className="text-lg sm:text-xl font-bold text-teal-700 font-mono-tabular mt-0.5">
                  {oxygenOutput} <span className="text-xs font-normal text-slate-500">mL/m</span>
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-xs text-slate-500">Faktor Pembatas</p>
                <p className="text-sm sm:text-base font-semibold text-slate-900 mt-1 truncate" title={limitingName}>
                  {limitingName}
                </p>
              </div>
            </div>
          </div>

          {/* Control & Concept Deck */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-6">
            <div>
              <h3 className="text-base font-semibold text-slate-900">Panel Kontrol Variabel</h3>
              <p className="text-xs text-slate-500 mt-1">
                Geser nilai di bawah untuk menguji Hukum Faktor Pembatas Blackman.
              </p>
            </div>

            {/* Preset Stage Buttons */}
            <div>
              <p className="text-xs font-medium text-slate-600 mb-2">Skenario Cepat</p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSunlight(30);
                    setCo2Level(380);
                    setWaterSupply(70);
                  }}
                  className="min-h-[44px] px-2.5 py-2 text-xs font-medium rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 transition-colors cursor-pointer"
                >
                  Pagi Teduh
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSunlight(90);
                    setCo2Level(650);
                    setWaterSupply(90);
                  }}
                  className="min-h-[44px] px-2.5 py-2 text-xs font-medium rounded-xl border border-teal-200 bg-teal-50 hover:bg-teal-100 text-teal-900 transition-colors cursor-pointer"
                >
                  Siang Optimal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSunlight(95);
                    setCo2Level(400);
                    setWaterSupply(12);
                  }}
                  className="min-h-[44px] px-2.5 py-2 text-xs font-medium rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-900 transition-colors cursor-pointer"
                >
                  Kekeringan
                </button>
              </div>
            </div>

            {/* Slider 1: Cahaya */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <label htmlFor="slider-sunlight" className="inline-flex items-center gap-2 font-medium text-slate-800">
                  <Sun className="w-4 h-4 text-amber-600" aria-hidden="true" />
                  <span>Intensitas Cahaya</span>
                </label>
                <span className="font-mono-tabular font-semibold text-slate-900">{sunlight}%</span>
              </div>
              <input
                id="slider-sunlight"
                type="range"
                min={0}
                max={100}
                value={sunlight}
                onChange={(e) => setSunlight(Number(e.target.value))}
                className="edu-slider"
              />
            </div>

            {/* Slider 2: CO2 */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <label htmlFor="slider-co2" className="inline-flex items-center gap-2 font-medium text-slate-800">
                  <Wind className="w-4 h-4 text-slate-600" aria-hidden="true" />
                  <span>Kadar Karbon Dioksida</span>
                </label>
                <span className="font-mono-tabular font-semibold text-slate-900">{co2Level} ppm</span>
              </div>
              <input
                id="slider-co2"
                type="range"
                min={100}
                max={800}
                step={10}
                value={co2Level}
                onChange={(e) => setCo2Level(Number(e.target.value))}
                className="edu-slider"
              />
            </div>

            {/* Slider 3: Air */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <label htmlFor="slider-water" className="inline-flex items-center gap-2 font-medium text-slate-800">
                  <Droplets className="w-4 h-4 text-sky-600" aria-hidden="true" />
                  <span>Ketersediaan Air Tanah</span>
                </label>
                <span className="font-mono-tabular font-semibold text-slate-900">{waterSupply}%</span>
              </div>
              <input
                id="slider-water"
                type="range"
                min={0}
                max={100}
                value={waterSupply}
                onChange={(e) => setWaterSupply(Number(e.target.value))}
                className="edu-slider"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <span className="font-semibold text-slate-900 block mb-1">Kesimpulan Pengamatan:</span>
              {photosynthesisRate < 25
                ? `Reaksi hampir terhenti karena ${limitingName} berada pada titik kritis. Penambahan faktor lain tidak akan menaikkan hasil sebelum faktor pembatas dinaikkan.`
                : photosynthesisRate < 65
                ? `Laju produksi tertahan oleh ${limitingName}. Coba naikkan nilai tersebut untuk mendorong pembentukan glukosa lebih cepat.`
                : 'Ketiga komponen (cahaya, air, CO₂) tersedia seimbang sehingga kloroplas memproduksi glukosa dan oksigen secara optimal.'}
            </div>
          </div>
        </section>
      )}

      {/* TAB 2: RANGKAIAN LISTRIK */}
      {activeTab === 'listrik' && (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Interactive Circuit Canvas */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Simulasi Rangkaian {circuitMode === 'seri' ? 'Seri' : 'Paralel'}
                </h2>
                <p className="text-xs text-slate-500">
                  Hukum Ohm: <span className="font-mono-tabular text-slate-700">I = V / R_total</span>
                </p>
              </div>
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium ${
                  switchMain
                    ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                    : 'text-slate-600 bg-slate-100 border-slate-200'
                }`}
              >
                <Zap className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{switchMain ? 'Arus Mengalir' : 'Saklar Terbuka (Padam)'}</span>
              </div>
            </div>

            <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
              <svg
                viewBox="0 0 640 340"
                className="w-full h-auto block"
                role="img"
                aria-label={`Diagram rangkaian ${circuitMode} dengan tegangan ${voltage} Volt`}
              >
                <rect x="0" y="0" width="640" height="340" fill="#F8FAFC" />

                {circuitMode === 'seri' ? (
                  <g>
                    {/* Main loop wire */}
                    <rect
                      x="95"
                      y="75"
                      width="450"
                      height="195"
                      rx="16"
                      fill="none"
                      stroke={switchMain ? '#0F766E' : '#94A3B8'}
                      strokeWidth="4"
                    />

                    {/* Battery on left */}
                    <rect x="70" y="135" width="50" height="75" rx="8" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
                    <text x="95" y="168" textAnchor="middle" className="text-[12px] font-bold fill-slate-900">
                      {voltage}V
                    </text>
                    <text x="95" y="188" textAnchor="middle" className="text-[10px] fill-slate-500">
                      Baterai
                    </text>

                    {/* Switch at bottom */}
                    <rect x="275" y="250" width="90" height="40" rx="8" fill="#F8FAFC" />
                    <circle cx="290" cy="270" r="5" fill="#0F172A" />
                    <circle cx="350" cy="270" r="5" fill="#0F172A" />
                    <line
                      x1="290"
                      y1="270"
                      x2={switchMain ? 350 : 340}
                      y2={switchMain ? 270 : 244}
                      stroke="#0F172A"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <text x="320" y="305" textAnchor="middle" className="text-[11px] font-medium fill-slate-700">
                      Saklar Utama ({switchMain ? 'Tertutup' : 'Terbuka'})
                    </text>

                    {/* Bulb 1 */}
                    <circle
                      cx="240"
                      cy="75"
                      r={24 + bulb1Glow * 14}
                      fill="#FBBF24"
                      opacity={bulb1On ? 0.15 + bulb1Glow * 0.4 : 0}
                    />
                    <circle
                      cx="240"
                      cy="75"
                      r="22"
                      fill={bulb1On ? '#FEF08A' : '#FFFFFF'}
                      stroke={bulb1On ? '#D97706' : '#64748B'}
                      strokeWidth="2.5"
                    />
                    <text x="240" y="79" textAnchor="middle" className="text-[11px] font-bold fill-slate-900">
                      L1 ({resistor1}Ω)
                    </text>
                    <text x="240" y="116" textAnchor="middle" className="text-[10px] fill-slate-600">
                      {v1.toFixed(1)}V · {i1.toFixed(2)}A
                    </text>

                    {/* Bulb 2 */}
                    <circle
                      cx="415"
                      cy="75"
                      r={24 + bulb2Glow * 14}
                      fill="#FBBF24"
                      opacity={bulb2On ? 0.15 + bulb2Glow * 0.4 : 0}
                    />
                    <circle
                      cx="415"
                      cy="75"
                      r="22"
                      fill={bulb2On ? '#FEF08A' : '#FFFFFF'}
                      stroke={bulb2On ? '#D97706' : '#64748B'}
                      strokeWidth="2.5"
                    />
                    <text x="415" y="79" textAnchor="middle" className="text-[11px] font-bold fill-slate-900">
                      L2 ({resistor2}Ω)
                    </text>
                    <text x="415" y="116" textAnchor="middle" className="text-[10px] fill-slate-600">
                      {v2.toFixed(1)}V · {i2.toFixed(2)}A
                    </text>
                  </g>
                ) : (
                  <g>
                    {/* Parallel Outer Rail & Middle Branch */}
                    <rect
                      x="95"
                      y="65"
                      width="450"
                      height="215"
                      rx="16"
                      fill="none"
                      stroke={switchMain && switchBranch2 ? '#0F766E' : '#94A3B8'}
                      strokeWidth="4"
                    />
                    <line
                      x1="95"
                      y1="170"
                      x2="545"
                      y2="170"
                      stroke={switchMain ? '#0F766E' : '#94A3B8'}
                      strokeWidth="4"
                    />

                    {/* Battery on left */}
                    <rect x="70" y="132" width="50" height="75" rx="8" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
                    <text x="95" y="165" textAnchor="middle" className="text-[12px] font-bold fill-slate-900">
                      {voltage}V
                    </text>
                    <text x="95" y="185" textAnchor="middle" className="text-[10px] fill-slate-500">
                      Baterai
                    </text>

                    {/* Main Switch at bottom */}
                    <rect x="175" y="260" width="90" height="36" fill="#F8FAFC" />
                    <circle cx="190" cy="280" r="5" fill="#0F172A" />
                    <circle cx="250" cy="280" r="5" fill="#0F172A" />
                    <line
                      x1="190"
                      y1="280"
                      x2={switchMain ? 250 : 240}
                      y2={switchMain ? 280 : 254}
                      stroke="#0F172A"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <text x="220" y="308" textAnchor="middle" className="text-[10px] font-medium fill-slate-700">
                      Saklar Utama
                    </text>

                    {/* Branch 2 Switch at top right */}
                    <rect x="405" y="47" width="80" height="36" fill="#F8FAFC" />
                    <circle cx="415" cy="65" r="5" fill="#0F172A" />
                    <circle cx="475" cy="65" r="5" fill="#0F172A" />
                    <line
                      x1="415"
                      y1="65"
                      x2={switchBranch2 ? 475 : 465}
                      y2={switchBranch2 ? 65 : 42}
                      stroke="#0F172A"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <text x="445" y="38" textAnchor="middle" className="text-[10px] font-medium fill-slate-700">
                      Saklar Cabang 2
                    </text>

                    {/* Bulb 1 on Middle Branch */}
                    <circle
                      cx="320"
                      cy="170"
                      r={24 + bulb1Glow * 14}
                      fill="#FBBF24"
                      opacity={bulb1On ? 0.15 + bulb1Glow * 0.4 : 0}
                    />
                    <circle
                      cx="320"
                      cy="170"
                      r="22"
                      fill={bulb1On ? '#FEF08A' : '#FFFFFF'}
                      stroke={bulb1On ? '#D97706' : '#64748B'}
                      strokeWidth="2.5"
                    />
                    <text x="320" y="174" textAnchor="middle" className="text-[11px] font-bold fill-slate-900">
                      L1 ({resistor1}Ω)
                    </text>
                    <text x="320" y="212" textAnchor="middle" className="text-[10px] fill-slate-600">
                      {v1.toFixed(1)}V · {i1.toFixed(2)}A
                    </text>

                    {/* Bulb 2 on Top Branch */}
                    <circle
                      cx="320"
                      cy="65"
                      r={24 + bulb2Glow * 14}
                      fill="#FBBF24"
                      opacity={bulb2On ? 0.15 + bulb2Glow * 0.4 : 0}
                    />
                    <circle
                      cx="320"
                      cy="65"
                      r="22"
                      fill={bulb2On ? '#FEF08A' : '#FFFFFF'}
                      stroke={bulb2On ? '#D97706' : '#64748B'}
                      strokeWidth="2.5"
                    />
                    <text x="320" y="69" textAnchor="middle" className="text-[11px] font-bold fill-slate-900">
                      L2 ({resistor2}Ω)
                    </text>
                    <text x="320" y="106" textAnchor="middle" className="text-[10px] fill-slate-600">
                      {v2.toFixed(1)}V · {i2.toFixed(2)}A
                    </text>
                  </g>
                )}
              </svg>
            </div>

            {/* Multimeter Readout Strip */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-xs text-slate-500">Arus Total (I)</p>
                <p className="text-lg sm:text-xl font-bold text-slate-900 font-mono-tabular mt-0.5">
                  {totalI.toFixed(2)} A
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-xs text-slate-500">Hambatan Total</p>
                <p className="text-lg sm:text-xl font-bold text-teal-700 font-mono-tabular mt-0.5">
                  {switchMain ? totalR.toFixed(2) : '—'} Ω
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-xs text-slate-500">Daya Total</p>
                <p className="text-lg sm:text-xl font-bold text-slate-900 font-mono-tabular mt-0.5">
                  {(p1 + p2).toFixed(1)} W
                </p>
              </div>
            </div>
          </div>

          {/* Circuit Controls */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">Konfigurasi Rangkaian</h3>
              <button
                type="button"
                onClick={() => {
                  setVoltage(12);
                  setResistor1(4);
                  setResistor2(6);
                  setSwitchMain(true);
                  setSwitchBranch2(true);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 min-h-[36px] px-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Reset</span>
              </button>
            </div>

            {/* Mode Toggle */}
            <div>
              <p className="text-xs font-medium text-slate-600 mb-2">Jenis Susunan</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setCircuitMode('seri')}
                  className={`min-h-[44px] px-3 py-2 text-sm font-medium rounded-xl border transition-colors cursor-pointer ${
                    circuitMode === 'seri'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Rangkaian Seri
                </button>
                <button
                  type="button"
                  onClick={() => setCircuitMode('paralel')}
                  className={`min-h-[44px] px-3 py-2 text-sm font-medium rounded-xl border transition-colors cursor-pointer ${
                    circuitMode === 'paralel'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Rangkaian Paralel
                </button>
              </div>
            </div>

            {/* Voltage Selector */}
            <div>
              <p className="text-xs font-medium text-slate-600 mb-2">Tegangan Baterai (Volt)</p>
              <div className="grid grid-cols-4 gap-2">
                {[3, 6, 9, 12].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setVoltage(v)}
                    className={`min-h-[44px] font-mono-tabular text-sm font-semibold rounded-xl border transition-colors cursor-pointer ${
                      voltage === v
                        ? 'bg-teal-700 text-white border-teal-700'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {v}V
                  </button>
                ))}
              </div>
            </div>

            {/* Switches */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setSwitchMain((prev) => !prev)}
                className={`min-h-[44px] px-3 py-2 rounded-xl border text-xs font-medium flex items-center justify-between cursor-pointer transition-colors ${
                  switchMain
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                <span>Saklar Utama</span>
                <span className="font-semibold">{switchMain ? 'NYALA' : 'MATI'}</span>
              </button>

              {circuitMode === 'paralel' && (
                <button
                  type="button"
                  onClick={() => setSwitchBranch2((prev) => !prev)}
                  className={`min-h-[44px] px-3 py-2 rounded-xl border text-xs font-medium flex items-center justify-between cursor-pointer transition-colors ${
                    switchBranch2
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                      : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <span>Saklar L2</span>
                  <span className="font-semibold">{switchBranch2 ? 'NYALA' : 'MATI'}</span>
                </button>
              )}
            </div>

            {/* Resistor Sliders */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <label htmlFor="slider-r1" className="inline-flex items-center gap-2 font-medium text-slate-800">
                    <Lightbulb className="w-4 h-4 text-amber-600" aria-hidden="true" />
                    <span>Hambatan Lampu 1</span>
                  </label>
                  <span className="font-mono-tabular font-semibold text-slate-900">{resistor1} Ω</span>
                </div>
                <input
                  id="slider-r1"
                  type="range"
                  min={2}
                  max={12}
                  step={1}
                  value={resistor1}
                  onChange={(e) => setResistor1(Number(e.target.value))}
                  className="edu-slider"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <label htmlFor="slider-r2" className="inline-flex items-center gap-2 font-medium text-slate-800">
                    <Lightbulb className="w-4 h-4 text-amber-600" aria-hidden="true" />
                    <span>Hambatan Lampu 2</span>
                  </label>
                  <span className="font-mono-tabular font-semibold text-slate-900">{resistor2} Ω</span>
                </div>
                <input
                  id="slider-r2"
                  type="range"
                  min={2}
                  max={12}
                  step={1}
                  value={resistor2}
                  onChange={(e) => setResistor2(Number(e.target.value))}
                  className="edu-slider"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <span className="font-semibold text-slate-900 block mb-1">Perbandingan Kunci:</span>
              {circuitMode === 'seri'
                ? 'Pada rangkaian seri, arus yang melewati L1 dan L2 sama besar, tetapi tegangan baterai terbagi sehingga lampu menyala lebih redup.'
                : 'Pada rangkaian paralel, L1 dan L2 menerima tegangan penuh dari baterai. Mematikan saklar L2 tidak memadamkan L1.'}
            </div>
          </div>
        </section>
      )}

      {/* Embedded IPA Quiz */}
      <SubjectQuiz
        title="Evaluasi IPA"
        subtitle="Latihan Pemahaman Fotosintesis & Kelistrikan"
        questions={ipaQuestions}
        accentColor="teal"
        bestScore={bestQuizScore}
        onComplete={onCompleteQuiz}
      />
    </div>
  );
}
