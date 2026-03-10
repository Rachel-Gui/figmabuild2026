import { useState } from 'react';
import { NavLink, Outlet } from 'react-router';
import {
  BookOpenCheck,
  ChartNoAxesColumn,
  FolderOpen,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
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
    label: 'Folder',
    description: 'Past study records and saved boards',
    icon: FolderOpen,
  },
  {
    to: '/app/quiz',
    label: 'Dashboard',
    description: 'Visual analytics and milestones',
    icon: ChartNoAxesColumn,
  },
];

const profileNavItem = {
  to: '/app/profile',
  label: 'Profile',
  description: 'Streaks, badges, and goals',
  icon: UserRound,
};

export const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="relative min-h-[100dvh] overflow-hidden text-[#313238]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8rem] top-[-6rem] h-72 w-72 rounded-full bg-[#e5e0d7]/30 blur-3xl" />
        <div className="absolute right-[-4rem] top-20 h-80 w-80 rounded-full bg-[#ceb3a1]/24 blur-3xl" />
        <div className="absolute bottom-[-5rem] right-[18%] h-72 w-72 rounded-full bg-[#d0c6b8]/16 blur-3xl" />
        <div className="app-grid absolute inset-0 opacity-35" />
      </div>

      <div className="relative flex min-h-[100dvh]">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="app-frost fixed left-4 top-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-2xl text-[#313238] lg:hidden"
          aria-label="Open navigation"
        >
          <Menu size={22} />
        </button>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-[#313238]/18 backdrop-blur-sm lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <aside
          className={clsx(
            'app-surface fixed inset-y-4 left-4 z-40 flex h-[calc(100dvh-2rem)] flex-col overflow-hidden rounded-[30px] p-4 transition-all duration-300 lg:static lg:m-4 lg:h-[calc(100dvh-2rem)] lg:self-start lg:translate-x-0',
            isSidebarCollapsed ? 'w-[92px]' : 'w-[290px]',
            isSidebarOpen ? 'translate-x-0' : '-translate-x-[120%]'
          )}
        >
          <div className="pointer-events-none absolute inset-x-4 top-0 h-24 rounded-b-[30px] bg-[linear-gradient(180deg,rgba(208,198,184,0.22)_0%,rgba(208,198,184,0)_100%)]" />
          <div className={clsx('mb-8 flex shrink-0 px-2 pt-2', isSidebarCollapsed ? 'justify-center' : 'items-start justify-between')}>
            <div className={clsx(isSidebarCollapsed && 'hidden lg:block')}>
              <NavLink
                to="/"
                onClick={() => setIsSidebarOpen(false)}
                className="mb-3 inline-flex items-center rounded-full bg-[#313238] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.24em] text-[#f4f1eb] shadow-[0_10px_18px_rgba(49,50,56,0.16)] transition hover:bg-[#7a7063]"
              >
                <span className={clsx(isSidebarCollapsed && 'hidden')}>CogniSense</span>
              </NavLink>
              {!isSidebarCollapsed && (
                <>
                  <h2 className="text-[1.58rem] font-semibold leading-tight text-[#313238]">Adaptive Learning Studio</h2>
                  <p className="mt-2 max-w-[18rem] text-sm leading-6 text-[#7a7063]">
                    A cleaner control center for planning lessons, chatting with AI, and tracking progress.
                  </p>
                </>
              )}
            </div>

            <div className={clsx('flex gap-2', isSidebarCollapsed && 'lg:flex-col')}>
              <button
                onClick={() => setIsSidebarCollapsed((prev) => !prev)}
                className="hidden lg:inline-flex h-10 w-10 items-center justify-center rounded-2xl text-[#7a7063] transition hover:bg-[#e5e0d7]/28 hover:text-[#313238]"
                aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {isSidebarCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
              </button>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl text-[#7a7063] transition hover:bg-[#e5e0d7]/28 hover:text-[#313238] lg:hidden"
                aria-label="Close navigation"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <nav className="min-h-0 flex-1 overflow-y-auto pr-1">
            <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) =>
                  clsx(
                    'group rounded-[24px] px-4 py-4 transition-all duration-200',
                    isActive
                      ? 'bg-[#7a7063] text-[#f4f1eb] shadow-[0_20px_40px_rgba(49,50,56,0.16)]'
                      : 'hover:bg-[#e5e0d7]/26 hover:shadow-[0_12px_22px_rgba(49,50,56,0.05)]'
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
                          isActive ? 'bg-white/18' : 'bg-[#e5e0d7]/32 text-[#313238]'
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
                              isActive ? 'text-[#f4f1eb]/76' : 'text-[#7a7063]'
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
            </div>
          </nav>

          <div className="mt-3 shrink-0 border-t border-[#313238]/8 pt-3">
            <NavLink
              to={profileNavItem.to}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                clsx(
                  'group block rounded-[24px] px-4 py-4 transition-all duration-200',
                  isActive
                    ? 'bg-[#7a7063] text-[#f4f1eb] shadow-[0_20px_40px_rgba(49,50,56,0.16)]'
                    : 'hover:bg-[#e5e0d7]/26 hover:shadow-[0_12px_22px_rgba(49,50,56,0.05)]'
                )
              }
            >
              {({ isActive }) => {
                const Icon = profileNavItem.icon;

                return (
                  <div className={clsx('flex items-start gap-3', isSidebarCollapsed && 'justify-center')}>
                    <div
                      className={clsx(
                        'mt-0.5 inline-flex h-11 w-11 items-center justify-center rounded-2xl transition',
                        isActive ? 'bg-white/18' : 'bg-[#e5e0d7]/32 text-[#313238]'
                      )}
                    >
                      <Icon size={20} />
                    </div>
                    {!isSidebarCollapsed && (
                      <div>
                        <div className="text-base font-bold">{profileNavItem.label}</div>
                        <div
                          className={clsx(
                            'mt-1 text-sm leading-5',
                            isActive ? 'text-[#f4f1eb]/76' : 'text-[#7a7063]'
                          )}
                        >
                          {profileNavItem.description}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }}
            </NavLink>
          </div>

        </aside>

        <div className="flex min-w-0 flex-1 flex-col p-4 pt-20 lg:p-4 lg:pl-0 lg:pt-4">
          <main className="min-h-0 flex-1 overflow-hidden rounded-[34px]">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
