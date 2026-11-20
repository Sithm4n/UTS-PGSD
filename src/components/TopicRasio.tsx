import { useState } from 'react';
import { ArrowLeft, MapPin } from 'lucide-react';
import { PageRoute, TopicId } from '../types';
import { TopicFooterAction } from './TopicFooterAction';

interface TopicRasioProps {
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

export function TopicRasio({
  completedTopics,
  onCompleteTopic,
  onNavigate,
}: TopicRasioProps) {
  const [subTab, setSubTab] = useState<'rasio' | 'skala'>('rasio');

  // Ratio state
  const [countA, setCountA] = useState<number>(8);
  const [countB, setCountB] = useState<number>(12);

  // Scale state
  const [mapDistCm, setMapDistCm] = useState<number>(5);
  const [scaleDenominator, setScaleDenominator] = useState<number>(400000);

  const ratioGcd = gcd(countA, countB);
  const simpA = countA / ratioGcd;
  const simpB = countB / ratioGcd;

  const realDistCm = mapDistCm * scaleDenominator;
  const realDistKm = realDistCm / 100000;

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
            aria-selected={subTab === 'rasio'}
            onClick={() => setSubTab('rasio')}
            className={`min-h-[40px] px-4 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer ${
              subTab === 'rasio' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
            }`}
          >
            Rasio Sederhana
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={subTab === 'skala'}
            onClick={() => setSubTab('skala')}
            className={`min-h-[40px] px-4 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer ${
              subTab === 'skala' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
            }`}
          >
            Skala Peta
          </button>
        </div>
      </div>

      <header className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 space-y-2">
        <p className="text-xs font-semibold text-blue-700">Materi 02 · Matematika Kelas 6 SD</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Rasio &amp; Skala</h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Rasio membandingkan dua besaran sejenis dalam bentuk paling sederhana dengan membagi kedua bilangan menggunakan FPB-nya. Skala adalah perbandingan jarak pada peta terhadap jarak sebenarnya.
        </p>
      </header>

      {subTab === 'rasio' ? (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Visual Ratio Blocks */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-base sm:text-lg font-semibold text-slate-900">
                Perbandingan Blok Satuan
              </h2>
              <p className="font-mono-tabular text-base sm:text-lg font-bold text-blue-700">
                {countA} : {countB} = {simpA} : {simpB}
              </p>
            </div>

            <div className="space-y-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <p className="text-xs font-medium text-slate-700 mb-2 font-mono-tabular">
                  Kelompok A ({countA} kotak biru)
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {Array.from({ length: countA }, (_, i) => (
                    <span
                      key={i}
                      className="w-5 h-5 rounded-md bg-blue-600 border border-blue-700 inline-block"
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-700 mb-2 font-mono-tabular">
                  Kelompok B ({countB} kotak hijau)
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {Array.from({ length: countB }, (_, i) => (
                    <span
                      key={i}
                      className="w-5 h-5 rounded-md bg-teal-600 border border-teal-700 inline-block"
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-1">
              <p className="font-semibold text-slate-900">Penyederhanaan dengan FPB:</p>
              <p className="font-mono-tabular">
                FPB dari {countA} dan {countB} adalah {ratioGcd}.
              </p>
              <p className="font-mono-tabular font-semibold text-blue-800">
                ({countA} ÷ {ratioGcd}) : ({countB} ÷ {ratioGcd}) = {simpA} : {simpB}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5">
            <h3 className="text-base font-semibold text-slate-900">Atur Jumlah Besaran</h3>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label htmlFor="ratio-a" className="font-medium text-slate-800">
                  Jumlah A
                </label>
                <span className="font-mono-tabular font-bold">{countA}</span>
              </div>
              <input
                id="ratio-a"
                type="range"
                min={2}
                max={24}
                value={countA}
                onChange={(e) => setCountA(Number(e.target.value))}
                className="edu-slider"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label htmlFor="ratio-b" className="font-medium text-slate-800">
                  Jumlah B
                </label>
                <span className="font-mono-tabular font-bold">{countB}</span>
              </div>
              <input
                id="ratio-b"
                type="range"
                min={2}
                max={24}
                value={countB}
                onChange={(e) => setCountB(Number(e.target.value))}
                className="edu-slider"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-950 space-y-1">
              <p className="font-semibold">Arti Rasio {simpA} : {simpB}:</p>
              <p>
                Setiap ada {simpA} bagian A, maka pasangannya adalah {simpB} bagian B. Urutan penulisan rasio tidak boleh tertukar!
              </p>
            </div>
          </div>
        </section>
      ) : (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Scale Visualizer */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-base sm:text-lg font-semibold text-slate-900">
                Simulator Jarak Peta &amp; Jarak Sebenarnya
              </h2>
              <span className="font-mono-tabular text-sm font-bold text-blue-700">
                1 : {scaleDenominator.toLocaleString('id-ID')}
              </span>
            </div>

            {/* Map Distance Bar */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span className="inline-flex items-center gap-1 font-medium text-slate-800">
                  <MapPin className="w-4 h-4 text-blue-700" aria-hidden="true" />
                  Kota A
                </span>
                <span className="font-mono-tabular font-semibold text-blue-800">
                  {mapDistCm} cm di peta = {realDistKm} km sebenarnya
                </span>
                <span className="inline-flex items-center gap-1 font-medium text-slate-800">
                  <MapPin className="w-4 h-4 text-teal-700" aria-hidden="true" />
                  Kota B
                </span>
              </div>

              <div className="relative h-6 flex items-center">
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all duration-200"
                    style={{ width: `${(mapDistCm / 20) * 100}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-white border border-slate-200">
                  <p className="text-xs text-slate-500">Dalam Sentimeter</p>
                  <p className="text-base sm:text-lg font-bold text-slate-900 font-mono-tabular mt-0.5">
                    {realDistCm.toLocaleString('id-ID')} cm
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200">
                  <p className="text-xs text-slate-500">Dalam Kilometer</p>
                  <p className="text-base sm:text-lg font-bold text-blue-700 font-mono-tabular mt-0.5">
                    {realDistKm} km
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-1">
              <p className="font-semibold text-slate-900">Langkah Perhitungan:</p>
              <p className="font-mono-tabular">
                Jarak Sebenarnya = {mapDistCm} cm × {scaleDenominator.toLocaleString('id-ID')} ={' '}
                {realDistCm.toLocaleString('id-ID')} cm
              </p>
              <p className="font-mono-tabular font-semibold text-blue-800">
                Konversi ke km (÷ 100.000) = {realDistKm} km
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5">
            <h3 className="text-base font-semibold text-slate-900">Atur Jarak &amp; Skala</h3>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label htmlFor="map-cm" className="font-medium text-slate-800">
                  Jarak pada Peta
                </label>
                <span className="font-mono-tabular font-bold">{mapDistCm} cm</span>
              </div>
              <input
                id="map-cm"
                type="range"
                min={1}
                max={20}
                value={mapDistCm}
                onChange={(e) => setMapDistCm(Number(e.target.value))}
                className="edu-slider"
              />
            </div>

            <div>
              <p className="text-xs font-medium text-slate-600 mb-2">Pilih Skala Peta</p>
              <div className="grid grid-cols-2 gap-2">
                {[100000, 250000, 400000, 1000000].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setScaleDenominator(s)}
                    className={`min-h-[44px] font-mono-tabular text-xs font-semibold rounded-xl border cursor-pointer transition-colors ${
                      scaleDenominator === s
                        ? 'bg-blue-700 text-white border-blue-700'
                        : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    1 : {s.toLocaleString('id-ID')}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-950 space-y-1">
              <p className="font-semibold">Rumus Cepat Skala:</p>
              <p>• 1 km = 100.000 cm</p>
              <p>• Jarak Sebenarnya = Jarak Peta × Penyebut Skala</p>
            </div>
          </div>
        </section>
      )}

      <TopicFooterAction
        currentTopicId="rasio"
        completedTopics={completedTopics}
        onCompleteTopic={onCompleteTopic}
        onNavigate={onNavigate}
      />
    </div>
  );
}
