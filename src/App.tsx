import { useCallback, useEffect, useState } from 'react';
import { Home, LayoutGrid, ClipboardCheck } from 'lucide-react';
import { PageRoute } from './types';
import { useLearningProgress } from './hooks/useLearningProgress';
import { WelcomeScreen } from './components/WelcomeScreen';
import { MenuScreen } from './components/MenuScreen';
import { TopicBilangan } from './components/TopicBilangan';
import { TopicRasio } from './components/TopicRasio';
import { TopicBangunDatar } from './components/TopicBangunDatar';
import { TopicBangunRuang } from './components/TopicBangunRuang';
import { LatihanQuiz } from './components/LatihanQuiz';

const VALID_ROUTES: PageRoute[] = [
  'welcome',
  'menu',
  'bilangan',
  'rasio',
  'bangun-datar',
  'bangun-ruang',
  'latihan',
];

function readRouteFromHash(): PageRoute {
  if (typeof window === 'undefined') return 'welcome';
  const raw = window.location.hash.replace('#', '').toLowerCase() as PageRoute;
  return VALID_ROUTES.includes(raw) ? raw : 'welcome';
}

export default function App() {
  const [route, setRoute] = useState<PageRoute>(readRouteFromHash);
  const { progress, markTopicCompleted, recordQuizResult, resetProgress } =
    useLearningProgress();

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

  const desktopNavItems: { id: PageRoute; label: string }[] = [
    { id: 'menu', label: 'Menu Materi' },
    { id: 'bilangan', label: 'Bilangan' },
    { id: 'rasio', label: 'Rasio & Skala' },
    { id: 'bangun-datar', label: 'Bangun Datar' },
    { id: 'bangun-ruang', label: 'Bangun Ruang' },
  ];

  const isWelcome = route === 'welcome';

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      {/* Desktop Top Bar (3-zone contract) */}
      <header className="hidden md:block sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
          <a
            href="#welcome"
            onClick={(e) => {
              e.preventDefault();
              navigate('welcome');
            }}
            className="font-display text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            Matematika 6 SD
          </a>

          <nav aria-label="Navigasi utama" className="flex items-center gap-6">
            {desktopNavItems.map((item) => {
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
                      ? 'text-blue-700 border-blue-700'
                      : 'text-slate-600 border-transparent hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="shrink-0">
            <button
              type="button"
              onClick={() => navigate('latihan')}
              className="min-h-[40px] px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Latihan Soal
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Compact Header (hidden on welcome screen to preserve clean Screen1 feel) */}
      {!isWelcome && (
        <header className="md:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
          <div className="px-4 h-12 flex items-center justify-between gap-4">
            <a
              href="#menu"
              onClick={(e) => {
                e.preventDefault();
                navigate('menu');
              }}
              className="font-display text-base font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
            >
              Matematika 6 SD
            </a>

            <button
              type="button"
              onClick={() => navigate('latihan')}
              className={`inline-flex items-center gap-1.5 min-h-[36px] px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer ${
                route === 'latihan'
                  ? 'bg-blue-700 text-white'
                  : 'bg-blue-50 text-blue-800 border border-blue-200'
              }`}
            >
              <ClipboardCheck className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Latihan (10)</span>
            </button>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main
        className={`flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 ${
          isWelcome ? 'pb-8' : 'pb-24 md:pb-14'
        }`}
      >
        {route === 'welcome' && (
          <WelcomeScreen
            completedCount={progress.completedTopics.length}
            bestQuizScore={progress.bestQuizScore}
            onStart={() => navigate('menu')}
          />
        )}

        {route === 'menu' && (
          <MenuScreen
            progress={progress}
            onNavigate={navigate}
            onResetProgress={resetProgress}
          />
        )}

        {route === 'bilangan' && (
          <TopicBilangan
            completedTopics={progress.completedTopics}
            onCompleteTopic={markTopicCompleted}
            onNavigate={navigate}
          />
        )}

        {route === 'rasio' && (
          <TopicRasio
            completedTopics={progress.completedTopics}
            onCompleteTopic={markTopicCompleted}
            onNavigate={navigate}
          />
        )}

        {route === 'bangun-datar' && (
          <TopicBangunDatar
            completedTopics={progress.completedTopics}
            onCompleteTopic={markTopicCompleted}
            onNavigate={navigate}
          />
        )}

        {route === 'bangun-ruang' && (
          <TopicBangunRuang
            completedTopics={progress.completedTopics}
            onCompleteTopic={markTopicCompleted}
            onNavigate={navigate}
          />
        )}

        {route === 'latihan' && (
          <LatihanQuiz
            bestScore={progress.bestQuizScore}
            onCompleteQuiz={recordQuizResult}
            onNavigate={navigate}
          />
        )}
      </main>

      {/* Mobile Fixed Bottom Navigation (shown after leaving welcome screen) */}
      {!isWelcome && (
        <nav
          aria-label="Navigasi seluler"
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 pb-safe"
        >
          <div className="grid grid-cols-3 h-14">
            <button
              type="button"
              onClick={() => navigate('welcome')}
              className="flex flex-col items-center justify-center gap-0.5 min-h-[44px] text-slate-500 hover:text-slate-900 cursor-pointer"
            >
              <Home className="w-5 h-5" aria-hidden="true" />
              <span className="text-[11px] leading-none">Awal</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('menu')}
              className={`flex flex-col items-center justify-center gap-0.5 min-h-[44px] cursor-pointer ${
                route !== 'latihan' ? 'text-blue-700 font-semibold' : 'text-slate-500'
              }`}
            >
              <LayoutGrid className="w-5 h-5" aria-hidden="true" />
              <span className="text-[11px] leading-none">Menu Materi</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('latihan')}
              className={`flex flex-col items-center justify-center gap-0.5 min-h-[44px] cursor-pointer ${
                route === 'latihan' ? 'text-blue-700 font-semibold' : 'text-slate-500'
              }`}
            >
              <ClipboardCheck className="w-5 h-5" aria-hidden="true" />
              <span className="text-[11px] leading-none">Latihan (10)</span>
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}
