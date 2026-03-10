import { useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router';
import {
  BookOpenCheck,
  ChartNoAxesColumn,
  Menu,
  MessageSquareMore,
  PanelLeftClose,
  PanelLeftOpen,
  Sparkles,
  UserRound,
  X,
} from 'lucide-react';
import { clsx } from 'clsx';

const navItems = [
  {
    to: '/app/workspace',
    label: 'Workspace',
    description: 'Daily plan and learning flow',
    icon: BookOpenCheck,
  },
  {
    to: '/app/chat',
    label: 'AI Chat',
    description: 'Prompt ideas and instant help',
    icon: MessageSquareMore,
  },
  {
    to: '/app/quiz',
    label: 'Dashboard',
    description: 'Visual analytics and milestones',
    icon: ChartNoAxesColumn,
  },
  {
    to: '/app/profile',
    label: 'Profile',
    description: 'Streaks, badges, and goals',
    icon: UserRound,
  },
];

const pageMeta = [
  {
    match: '/app/workspace',
    title: 'Learning workspace',
    description: 'Keep your study plan, notes, and conversation in one focused canvas.',
  },
  {
    match: '/app/chat',
    title: 'AI chat studio',
    description: 'Turn rough questions into clear prompts and guided learning conversations.',
  },
  {
    match: '/app/quiz',
    title: 'Learning dashboard',
    description: 'See study momentum, mastery signals, and review priorities through clear visual summaries.',
  },
  {
    match: '/app/profile',
    title: 'Learner profile',
    description: 'See your streak, strengths, and achievement signals at a glance.',
  },
];

export const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();

  const currentMeta =
    pageMeta.find((item) => location.pathname.startsWith(item.match)) ?? pageMeta[0];

  return (
    <div className="relative min-h-screen overflow-hidden text-[#17332d]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8rem] top-[-6rem] h-72 w-72 rounded-full bg-[#d77642]/18 blur-3xl" />
        <div className="absolute right-[-4rem] top-20 h-80 w-80 rounded-full bg-[#5f8f82]/16 blur-3xl" />
        <div className="app-grid absolute inset-0 opacity-35" />
      </div>

      <div className="relative flex min-h-screen">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="app-surface fixed left-4 top-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-2xl text-[#17332d] lg:hidden"
          aria-label="Open navigation"
        >
          <Menu size={22} />
        </button>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-[#17332d]/24 backdrop-blur-sm lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <aside
          className={clsx(
            'app-surface fixed inset-y-4 left-4 z-40 flex flex-col rounded-[30px] p-4 transition-all duration-300 lg:static lg:m-4 lg:translate-x-0',
            isSidebarCollapsed ? 'w-[92px]' : 'w-[290px]',
            isSidebarOpen ? 'translate-x-0' : '-translate-x-[120%]'
          )}
        >
          <div className={clsx('mb-8 flex px-2 pt-2', isSidebarCollapsed ? 'justify-center' : 'items-start justify-between')}>
            <div className={clsx(isSidebarCollapsed && 'hidden lg:block')}>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#17332d] px-3 py-1 text-xs font-bold uppercase tracking-[0.24em] text-[#fffaf4]">
                <Sparkles size={14} />
                <span className={clsx(isSidebarCollapsed && 'hidden')}>CogniSense</span>
              </div>
              {!isSidebarCollapsed && (
                <>
                  <h2 className="text-2xl font-semibold text-[#17332d]">Adaptive Learning Studio</h2>
                  <p className="mt-2 max-w-[18rem] text-sm leading-6 text-[#5d6f68]">
                    A cleaner control center for planning lessons, chatting with AI, and tracking progress.
                  </p>
                </>
              )}
            </div>

            <div className={clsx('flex gap-2', isSidebarCollapsed && 'lg:flex-col')}>
              <button
                onClick={() => setIsSidebarCollapsed((prev) => !prev)}
                className="hidden lg:inline-flex h-10 w-10 items-center justify-center rounded-2xl text-[#17332d]/60 transition hover:bg-[#17332d]/6 hover:text-[#17332d]"
                aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {isSidebarCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
              </button>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl text-[#17332d]/60 transition hover:bg-[#17332d]/6 hover:text-[#17332d] lg:hidden"
                aria-label="Close navigation"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <nav className="flex flex-1 flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) =>
                  clsx(
                    'group rounded-[24px] px-4 py-4 transition',
                    isActive
                      ? 'bg-[#17332d] text-[#fffaf4] shadow-[0_20px_40px_rgba(23,51,45,0.18)]'
                      : 'hover:bg-white/55'
                  )
                }
              >
                {({ isActive }) => {
                  const Icon = item.icon;

                  return (
                    <div className={clsx('flex items-start gap-3', isSidebarCollapsed && 'justify-center')}>
                      <div
                        className={clsx(
                          'mt-0.5 inline-flex h-11 w-11 items-center justify-center rounded-2xl transition',
                          isActive ? 'bg-white/14' : 'bg-[#17332d]/6 text-[#17332d]'
                        )}
                      >
                        <Icon size={20} />
                      </div>
                      {!isSidebarCollapsed && (
                        <div>
                          <div className="text-base font-bold">{item.label}</div>
                          <div
                            className={clsx(
                              'mt-1 text-sm leading-5',
                              isActive ? 'text-[#fffaf4]/72' : 'text-[#60716b]'
                            )}
                          >
                            {item.description}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }}
              </NavLink>
            ))}
          </nav>

          {!isSidebarCollapsed && (
            <div className="app-panel rounded-[26px] p-4">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#60716b]">
                Today
              </div>
              <div className="mt-2 text-lg font-bold text-[#17332d]">Small steps, visible progress</div>
              <p className="mt-2 text-sm leading-6 text-[#60716b]">
                Keep one goal in focus, review one weak spot, and let the interface stay quiet around it.
              </p>
            </div>
          )}
        </aside>

        <div className="flex min-w-0 flex-1 flex-col p-4 pt-20 lg:p-4 lg:pl-0 lg:pt-4">
          <header className="app-surface rounded-[30px] px-6 py-6 sm:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#60716b]">
                  Adaptive learning studio
                </div>
                <h1 className="mt-3 text-3xl font-semibold text-[#17332d] sm:text-4xl">
                  {currentMeta.title}
                </h1>
                <p className="mt-3 text-base leading-7 text-[#60716b] sm:text-lg">
                  {currentMeta.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-[#17332d]">
                  Focus mode active
                </div>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center rounded-full bg-[#17332d] px-5 py-3 text-sm font-bold text-[#fffaf4] transition hover:bg-[#21453d]"
                >
                  Start a new session
                </Link>
              </div>
            </div>
          </header>

          <main className="min-h-0 flex-1 pt-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
