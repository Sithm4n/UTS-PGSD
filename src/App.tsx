import { useCallback, useEffect, useState } from 'react';
import { Home, FlaskConical, BookOpenText, Calculator, ClipboardCheck } from 'lucide-react';
import { PageRoute } from './types';
import { useLearningProgress } from './hooks/useLearningProgress';
import { HomePage } from './components/HomePage';
import { IpaModule } from './components/IpaModule';
import { BahasaModule } from './components/BahasaModule';
import { MatematikaModule } from './components/MatematikaModule';
import { CombinedQuizPage } from './components/CombinedQuizPage';

const VALID_ROUTES: PageRoute[] = ['beranda', 'ipa', 'bahasa', 'matematika', 'kuis'];

function readRouteFromHash(): PageRoute {
  if (typeof window === 'undefined') return 'beranda';
  const raw = window.location.hash.replace('#', '').toLowerCase() as PageRoute;
  return VALID_ROUTES.includes(raw) ? raw : 'beranda';
}

export default function App() {
  const [route, setRoute] = useState<PageRoute>(readRouteFromHash);
  const { progress, markLabCompleted, recordQuizScore, resetProgress } = useLearningProgress();

  const navigate = useCallback((nextRoute: PageRoute) => {
    setRoute(nextRoute);
    if (typeof window !== 'undefined') {
      const targetHash = `#${nextRoute}`;
      if (window.location.hash !== targetHash) {
        window.history.pushState(null, '', targetHash);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(readRouteFromHash());
    };
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  const navItems: { id: PageRoute; label: string }[] = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'ipa', label: 'IPA' },
    { id: 'bahasa', label: 'Bahasa' },
    { id: 'matematika', label: 'Matematika' },
  ];

  const mobileTabs: { id: PageRoute; label: string; icon: typeof Home }[] = [
    { id: 'beranda', label: 'Beranda', icon: Home },
    { id: 'ipa', label: 'IPA', icon: FlaskConical },
    { id: 'bahasa', label: 'Bahasa', icon: BookOpenText },
    { id: 'matematika', label: 'Matematika', icon: Calculator },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8FA] text-slate-900">
      {/* Desktop Top Bar (Strictly 3-zone contract) */}
      <header className="hidden md:block sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#beranda"
            onClick={(e) => {
              e.preventDefault();
              navigate('beranda');
            }}
            className="font-display text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            RuangNalar
          </a>

          {/* Zone 2: 4 Clean Single-Line Nav Links */}
          <nav aria-label="Navigasi utama" className="flex items-center gap-7">
            {navItems.map((item) => {
              const isActive = route === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.id);
                  }}
                  className={`text-sm font-medium whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors ${
                    isActive
                      ? 'text-slate-900 border-slate-900'
                      : 'text-slate-600 border-transparent hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={() => navigate('kuis')}
              className="min-h-[40px] px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Latihan Soal
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Compact Sticky Header (48px — keeps total sticky height well under 15% cap) */}
      <header className="md:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="px-4 h-12 flex items-center justify-between gap-4">
          <a
            href="#beranda"
            onClick={(e) => {
              e.preventDefault();
              navigate('beranda');
            }}
            className="font-display text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            RuangNalar
          </a>

          <button
            type="button"
            onClick={() => navigate('kuis')}
            className={`inline-flex items-center gap-1.5 min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
              route === 'kuis'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
            }`}
          >
            <ClipboardCheck className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Latihan Soal</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 pb-24 md:pb-14">
        {route === 'beranda' && (
          <HomePage
            progress={progress}
            onNavigate={navigate}
            onResetProgress={resetProgress}
          />
        )}

        {route === 'ipa' && (
          <IpaModule
            completedLabs={progress.completedLabs}
            bestQuizScore={progress.bestQuizScores.ipa}
            onCompleteLab={markLabCompleted}
            onCompleteQuiz={(pct) => recordQuizScore('ipa', pct)}
          />
        )}

        {route === 'bahasa' && (
          <BahasaModule
            completedLabs={progress.completedLabs}
            bestQuizScore={progress.bestQuizScores.bahasa}
            onCompleteLab={markLabCompleted}
            onCompleteQuiz={(pct) => recordQuizScore('bahasa', pct)}
          />
        )}

        {route === 'matematika' && (
          <MatematikaModule
            completedLabs={progress.completedLabs}
            bestQuizScore={progress.bestQuizScores.matematika}
            onCompleteLab={markLabCompleted}
            onCompleteQuiz={(pct) => recordQuizScore('matematika', pct)}
          />
        )}

        {route === 'kuis' && (
          <CombinedQuizPage
            bestScores={progress.bestQuizScores}
            onRecordScore={recordQuizScore}
          />
        )}
      </main>

      {/* Clean Footer */}
      <footer className="hidden md:block border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>RuangNalar — Media Pembelajaran Interaktif IPA, Bahasa Indonesia &amp; Matematika</p>
          <div className="flex items-center gap-4">
            <a
              href="#ipa"
              onClick={(e) => {
                e.preventDefault();
                navigate('ipa');
              }}
              className="hover:text-slate-900"
            >
              IPA
            </a>
            <a
              href="#bahasa"
              onClick={(e) => {
                e.preventDefault();
                navigate('bahasa');
              }}
              className="hover:text-slate-900"
            >
              Bahasa
            </a>
            <a
              href="#matematika"
              onClick={(e) => {
                e.preventDefault();
                navigate('matematika');
              }}
              className="hover:text-slate-900"
            >
              Matematika
            </a>
          </div>
        </div>
      </footer>

      {/* Mobile Fixed Bottom Thumb Navigation Bar (56px) */}
      <nav
        aria-label="Navigasi seluler"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 pb-safe"
      >
        <div className="grid grid-cols-4 h-14">
          {mobileTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = route === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => navigate(tab.id)}
                className={`flex flex-col items-center justify-center gap-0.5 min-h-[44px] cursor-pointer transition-colors ${
                  isActive ? 'text-slate-900 font-semibold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.25 : 1.75} aria-hidden="true" />
                <span className="text-[11px] leading-none">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
