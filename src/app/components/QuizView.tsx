import { motion } from 'motion/react';
import {
  BarChart3,
  CalendarRange,
  CheckCircle2,
  CircleDashed,
  Clock3,
  Flame,
  Radar,
  Target,
  TrendingUp,
} from 'lucide-react';
import { clsx } from 'clsx';

const topStats = [
  { label: 'Weekly streak', value: '6 days', icon: Flame, tone: 'bg-[#be7d62]' },
  { label: 'Mastery rate', value: '78%', icon: CheckCircle2, tone: 'bg-[#313238]' },
  { label: 'Study time', value: '4.2 hrs', icon: Clock3, tone: 'bg-[#d0c6b8]' },
  { label: 'Focus score', value: '84', icon: Target, tone: 'bg-[#e5e0d7] text-[#313238]' },
];

const masteryBars = [
  { name: 'Concept recall', progress: 88, color: 'from-[#313238] to-[#e5e0d7]' },
  { name: 'Worked examples', progress: 72, color: 'from-[#d0c6b8] to-[#d0c6b8]' },
  { name: 'Application questions', progress: 61, color: 'from-[#be7d62] to-[#ceb3a1]' },
  { name: 'Reflection quality', progress: 69, color: 'from-[#e5e0d7] to-[#f3efe8]' },
];

const weeklyHeat = [
  [1, 2, 0, 3, 2, 1, 0],
  [0, 1, 2, 3, 2, 0, 1],
  [2, 3, 2, 1, 0, 0, 1],
  [1, 2, 3, 2, 1, 1, 0],
];

const subjectMix = [
  { name: 'Reading', value: 34, color: 'bg-[#313238]' },
  { name: 'Practice', value: 28, color: 'bg-[#be7d62]' },
  { name: 'Review', value: 22, color: 'bg-[#d0c6b8]' },
  { name: 'Quiz', value: 16, color: 'bg-[#e5e0d7]' },
];

const trendPoints = [42, 51, 48, 62, 66, 74, 81];

const radarStats = [
  { label: 'Recall', value: 82 },
  { label: 'Reasoning', value: 69 },
  { label: 'Speed', value: 58 },
  { label: 'Accuracy', value: 77 },
  { label: 'Review', value: 71 },
];

const reviewCards = [
  {
    title: 'Strong area',
    text: 'Definition recall is stable. Keep ending each session with two short retrieval questions.',
  },
  {
    title: 'Needs review',
    text: 'Application under time pressure still drops. Add one timed example before the next quiz.',
  },
  {
    title: 'Recommended next test',
    text: 'Run a 5-question mixed check focused on transfer instead of memorization.',
  },
];

export const QuizView = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4">
      <section className="app-surface overflow-hidden rounded-[32px] p-6 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div>
            <div className="inline-flex items-center rounded-full bg-[#313238] px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#f4f1eb]">
              Dashboard
            </div>
            <h2 className="mt-5 text-3xl font-semibold text-[#313238] sm:text-4xl">
              A faster read on focus, consistency, and study quality.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#7a7063]">
              This view turns study behavior into a readable dashboard, so weak spots, momentum, and
              recovery actions are visible at a glance instead of hidden inside logs.
            </p>
          </div>

          <div className="app-panel rounded-[28px] p-5">
            <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#7a7063]">
              Session read
            </div>
            <div className="mt-4 space-y-3">
              {[
                ['Focus stability', 'Strong in the first 20 minutes'],
                ['Efficiency', 'Best when review follows explanation'],
                ['Depth', 'Needs one more transfer task this week'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[20px] bg-[#f3efe8] px-4 py-4">
                  <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7a7063]">
                    {label}
                  </div>
                  <div className="mt-2 text-sm font-semibold leading-6 text-[#313238]">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {topStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div key={stat.label} className="app-surface rounded-[28px] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#7a7063]">
                    {stat.label}
                  </div>
                  <div className="mt-3 text-3xl font-semibold text-[#313238]">{stat.value}</div>
                </div>
                <div className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl text-[#fffaf4] ${stat.tone}`}>
                  <Icon size={18} />
                </div>
              </div>
              <div className="mt-5 h-1.5 rounded-full bg-[#e5e0d7]">
                <div
                  className={clsx(
                    'h-1.5 rounded-full',
                    stat.label === 'Weekly streak' && 'w-[72%] bg-[#be7d62]',
                    stat.label === 'Mastery rate' && 'w-[78%] bg-[#313238]',
                    stat.label === 'Study time' && 'w-[63%] bg-[#d0c6b8]',
                    stat.label === 'Focus score' && 'w-[84%] bg-[#e5e0d7]'
                  )}
                />
              </div>
            </div>
          );
        })}
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.3fr)_380px]">
        <div className="grid gap-4">
          <div className="app-surface rounded-[32px] p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#313238] text-[#f4f1eb]">
                <BarChart3 size={20} />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#7a7063]">
                  Mastery overview
                </div>
                <h2 className="text-2xl font-semibold text-[#313238]">Multi-layer dashboard, not a placeholder</h2>
              </div>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
              <div className="space-y-4">
                {masteryBars.map((item) => (
                  <div key={item.name} className="app-panel rounded-[26px] p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-sm font-semibold text-[#313238]">{item.name}</div>
                      <div className="text-sm font-bold text-[#7a7063]">{item.progress}%</div>
                    </div>
                    <div className="mt-3 h-3 rounded-full bg-white/80">
                      <div
                        className={`h-3 rounded-full bg-gradient-to-r ${item.color}`}
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="app-panel rounded-[28px] p-5">
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#7a7063]">
                  Subject mix
                </div>
                <div className="mt-5 flex items-center justify-center">
                  <div
                    className="relative h-44 w-44 rounded-full"
                    style={{
                      background:
                        'conic-gradient(#313238 0 34%, #be7d62 34% 62%, #d0c6b8 62% 84%, #e5e0d7 84% 100%)',
                    }}
                  >
                    <div className="absolute inset-6 rounded-full bg-[#f3efe8] shadow-inner" />
                    <div className="absolute inset-0 flex items-center justify-center text-center">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#7a7063]">
                          This week
                        </div>
                        <div className="mt-2 text-2xl font-semibold text-[#313238]">24 blocks</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {subjectMix.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3 font-semibold text-[#313238]">
                        <span className={`h-3 w-3 rounded-full ${item.color}`} />
                        {item.name}
                      </div>
                      <span className="font-bold text-[#7a7063]">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="app-surface rounded-[30px] p-6">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e5e0d7] text-[#313238]">
                  <CalendarRange size={18} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#7a7063]">
                    Consistency map
                  </div>
                  <div className="text-lg font-semibold text-[#313238]">Last 4 weeks</div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-7 gap-2">
                {weeklyHeat.flat().map((cell, index) => (
                  <div
                    key={index}
                    className={clsx(
                      'aspect-square rounded-[10px]',
                      cell === 0 && 'bg-[#f3efe8]',
                      cell === 1 && 'bg-[#e5e0d7]',
                      cell === 2 && 'bg-[#d0c6b8]',
                      cell === 3 && 'bg-[#313238]'
                    )}
                  />
                ))}
              </div>

              <div className="mt-4 flex items-center gap-3 text-xs font-semibold text-[#7a7063]">
                <span>Less</span>
                <div className="h-3 w-3 rounded bg-[#f3efe8]" />
                <div className="h-3 w-3 rounded bg-[#e5e0d7]" />
                <div className="h-3 w-3 rounded bg-[#d0c6b8]" />
                <div className="h-3 w-3 rounded bg-[#313238]" />
                <span>More</span>
              </div>
            </div>

            <div className="app-surface rounded-[30px] p-6">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ceb3a1] text-[#be7d62]">
                  <TrendingUp size={18} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#7a7063]">
                    Weekly trend
                  </div>
                  <div className="text-lg font-semibold text-[#313238]">Momentum curve</div>
                </div>
              </div>

              <div className="mt-6 flex h-44 items-end gap-3">
                {trendPoints.map((value, index) => (
                  <div key={index} className="flex flex-1 flex-col items-center gap-2">
                    <div
                      className="w-full rounded-t-[14px] bg-gradient-to-t from-[#be7d62] to-[#ceb3a1]"
                      style={{ height: `${value}%` }}
                    />
                    <div className="text-xs font-bold text-[#7a7063]">D{index + 1}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <aside className="grid gap-4">
          <section className="app-surface rounded-[30px] p-6">
            <div className="flex items-center gap-3">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e5e0d7] text-[#313238]">
                <Radar size={18} />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#7a7063]">
                  Skill radar
                </div>
                  <div className="text-lg font-semibold text-[#313238]">Capability snapshot</div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {radarStats.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between text-sm font-semibold text-[#313238]">
                    <span>{item.label}</span>
                    <span className="text-[#7a7063]">{item.value}%</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-[#e5e0d7]">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-[#e5e0d7] via-[#d0c6b8] to-[#313238]"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="app-surface rounded-[30px] p-6">
            <div className="flex items-center gap-3">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ceb3a1] text-[#be7d62]">
                <CircleDashed size={18} />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#7a7063]">
                  Review actions
                </div>
                  <div className="text-lg font-semibold text-[#313238]">What to do next</div>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {reviewCards.map((card) => (
                <div key={card.title} className="app-panel rounded-[24px] p-4">
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#7a7063]">
                    {card.title}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[#313238]">{card.text}</p>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </section>
    </motion.div>
  );
};
