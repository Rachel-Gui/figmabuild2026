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
    icon: BookOpenCheck,
  },
  {
    to: '/app/chat',
    label: 'Folder',
    icon: FolderOpen,
  },
  {
    to: '/app/quiz',
    label: 'Dashboard',
    icon: ChartNoAxesColumn,
  },
];

const profileNavItem = {
  to: '/app/profile',
  label: 'Profile',
  icon: UserRound,
};

export const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const showSidebar = true;

  return (
    <div className="relative h-[100dvh] overflow-hidden text-[#1E1C59]">
      <div className="relative flex h-full min-h-0">
        {showSidebar && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="app-frost fixed left-2 top-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-xl text-[#1E1C59] lg:hidden"
            aria-label="Open navigation"
          >
            <Menu size={22} />
          </button>
        )}

        {showSidebar && isSidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-[#1E1C59]/18 backdrop-blur-sm lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {showSidebar && (
          <aside
            className={clsx(
              'app-surface fixed top-2 bottom-6 left-0 z-40 flex flex-col overflow-hidden rounded-[24px] px-4 pt-3 pb-4 transition-all duration-300 sm:top-2 sm:bottom-7 lg:static lg:mt-2 lg:mb-7 lg:h-[calc(100dvh-2.25rem)] lg:self-start lg:translate-x-0',
              isSidebarCollapsed ? 'w-[92px]' : 'w-[180px]',
              isSidebarOpen ? 'translate-x-0' : '-translate-x-[120%]'
            )}
          >
            <div
              className={clsx(
                'mb-8 shrink-0 px-2 pt-0',
                isSidebarCollapsed ? 'flex justify-center' : 'relative'
              )}
            >
              {isSidebarCollapsed ? (
                <button
                  onClick={() => setIsSidebarCollapsed((prev) => !prev)}
                  className="hidden lg:inline-flex h-10 w-10 items-center justify-center rounded-xl text-[#6B6794] transition hover:bg-[#34268C]/8 hover:text-[#1E1C59]"
                  aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                  {isSidebarCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
                </button>
              ) : (
                <div className="min-w-0">
                  <button
                    onClick={() => setIsSidebarCollapsed((prev) => !prev)}
                    className="mb-3 hidden h-10 w-10 items-center justify-center rounded-xl text-[#6B6794] transition hover:bg-[#34268C]/8 hover:text-[#1E1C59] lg:inline-flex"
                    aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                  >
                    {isSidebarCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
                  </button>

                  <NavLink
                    to="/"
                    onClick={() => setIsSidebarOpen(false)}
                    className="inline-flex items-center rounded-full bg-[var(--brand-strong)] px-4 py-1 text-[12px] font-bold uppercase tracking-[0.24em] text-[var(--brand-strong-foreground)] transition hover:bg-[var(--brand-strong-hover)]"
                  >
                    <span>CogniSense</span>
                  </NavLink>
                </div>
              )}

              <button
                onClick={() => setIsSidebarOpen(false)}
                className={clsx(
                  'inline-flex h-10 w-10 items-center justify-center rounded-xl text-[#6B6794] transition hover:bg-[#34268C]/8 hover:text-[#1E1C59] lg:hidden',
                  isSidebarCollapsed ? '' : 'absolute right-2 top-2'
                )}
                aria-label="Close navigation"
              >
                <X size={20} />
              </button>
            </div>

            <nav className={clsx('min-h-0 flex-1 overflow-y-auto', isSidebarCollapsed ? 'pr-0' : 'pr-1')}>
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsSidebarOpen(false)}
                    className={({ isActive }) =>
                      clsx(
                        'group block w-full rounded-[18px] transition-all duration-200',
                        isSidebarCollapsed ? 'flex justify-center px-0 py-3' : 'px-4 py-4',
                        isActive
                          ? 'bg-[#34268C]/8 text-[#1E1C59]'
                          : 'hover:bg-[#34268C]/6'
                      )
                    }
                  >
                    {({ isActive }) => {
                      const Icon = item.icon;

                      return (
                        <div
                          className={clsx(
                            'flex w-full gap-3',
                            isSidebarCollapsed ? 'justify-center' : 'items-start'
                          )}
                        >
                          <div
                            className={clsx(
                              'inline-flex h-11 w-11 items-center justify-center rounded-xl transition',
                              !isSidebarCollapsed && 'mt-0.5',
                              'bg-transparent text-[#1E1C59]'
                            )}
                          >
                            <Icon size={20} />
                          </div>
                          {!isSidebarCollapsed && (
                            <div>
                              <div className="text-base font-bold">{item.label}</div>
                            </div>
                          )}
                        </div>
                      );
                    }}
                  </NavLink>
                ))}
              </div>
            </nav>

            <div className="mt-3 shrink-0 border-t border-[#1E1C59]/8 pt-3">
              <NavLink
                to={profileNavItem.to}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) =>
                  clsx(
                    'group block rounded-[18px] transition-all duration-200',
                    isSidebarCollapsed ? 'flex justify-center px-0 py-3' : 'px-4 py-4',
                    isActive
                      ? 'bg-[#34268C]/8 text-[#1E1C59]'
                      : 'hover:bg-[#34268C]/6'
                  )
                }
              >
                {({ isActive }) => {
                  const Icon = profileNavItem.icon;

                  return (
                    <div className={clsx('flex gap-3', isSidebarCollapsed ? 'justify-center' : 'items-start')}>
                      <div
                        className={clsx(
                          'inline-flex h-11 w-11 items-center justify-center rounded-xl transition',
                          !isSidebarCollapsed && 'mt-0.5',
                          'bg-transparent text-[#1E1C59]'
                        )}
                      >
                        <Icon size={20} />
                      </div>
                      {!isSidebarCollapsed && (
                        <div>
                          <div className="text-base font-bold">{profileNavItem.label}</div>
                        </div>
                      )}
                    </div>
                  );
                }}
              </NavLink>
            </div>
          </aside>
        )}

        <div
          className={clsx(
            'flex min-h-0 min-w-0 flex-1 flex-col p-4',
            showSidebar ? 'pt-20 lg:p-0' : 'pt-4 lg:p-0'
          )}
        >
          <main className="h-full min-h-0 flex-1 overflow-hidden rounded-[28px]">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
