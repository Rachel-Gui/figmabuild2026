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

const topStats = [
  { label: 'Weekly streak', value: '6 days', icon: Flame, tone: 'bg-[#d77642]' },
  { label: 'Mastery rate', value: '78%', icon: CheckCircle2, tone: 'bg-[#17332d]' },
  { label: 'Study time', value: '4.2 hrs', icon: Clock3, tone: 'bg-[#5f8f82]' },
  { label: 'Focus score', value: '84', icon: Target, tone: 'bg-[#8a79bf]' },
];

const masteryBars = [
  { name: 'Concept recall', progress: 88, color: 'from-[#d77642] to-[#f0b086]' },
  { name: 'Worked examples', progress: 72, color: 'from-[#17332d] to-[#5f8f82]' },
  { name: 'Application questions', progress: 61, color: 'from-[#8a79bf] to-[#b8abe0]' },
  { name: 'Reflection quality', progress: 69, color: 'from-[#d88ca3] to-[#f0bfcb]' },
];

const weeklyHeat = [
  [1, 2, 0, 3, 2, 1, 0],
  [0, 1, 2, 3, 2, 0, 1],
  [2, 3, 2, 1, 0, 0, 1],
  [1, 2, 3, 2, 1, 1, 0],
];

const subjectMix = [
  { name: 'Reading', value: 34, color: 'bg-[#17332d]' },
  { name: 'Practice', value: 28, color: 'bg-[#d77642]' },
  { name: 'Review', value: 22, color: 'bg-[#8a79bf]' },
  { name: 'Quiz', value: 16, color: 'bg-[#5f8f82]' },
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
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {topStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div key={stat.label} className="app-surface rounded-[28px] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#60716b]">
                    {stat.label}
                  </div>
                  <div className="mt-3 text-3xl font-semibold text-[#17332d]">{stat.value}</div>
                </div>
                <div className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl text-[#fffaf4] ${stat.tone}`}>
                  <Icon size={18} />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.3fr)_380px]">
        <div className="grid gap-4">
          <div className="app-surface rounded-[32px] p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#17332d] text-[#fffaf4]">
                <BarChart3 size={20} />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#60716b]">
                  Mastery overview
                </div>
                <h2 className="text-2xl font-semibold text-[#17332d]">Multi-layer dashboard, not a placeholder</h2>
              </div>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
              <div className="space-y-4">
                {masteryBars.map((item) => (
                  <div key={item.name} className="app-panel rounded-[26px] p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-sm font-semibold text-[#17332d]">{item.name}</div>
                      <div className="text-sm font-bold text-[#60716b]">{item.progress}%</div>
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
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#60716b]">
                  Subject mix
                </div>
                <div className="mt-5 flex items-center justify-center">
                  <div
                    className="relative h-44 w-44 rounded-full"
                    style={{
                      background:
                        'conic-gradient(#17332d 0 34%, #d77642 34% 62%, #8a79bf 62% 84%, #5f8f82 84% 100%)',
                    }}
                  >
                    <div className="absolute inset-6 rounded-full bg-[#fffaf4] shadow-inner" />
                    <div className="absolute inset-0 flex items-center justify-center text-center">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#60716b]">
                          This week
                        </div>
                        <div className="mt-2 text-2xl font-semibold text-[#17332d]">24 blocks</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {subjectMix.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3 font-semibold text-[#17332d]">
                        <span className={`h-3 w-3 rounded-full ${item.color}`} />
                        {item.name}
                      </div>
                      <span className="font-bold text-[#60716b]">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="app-surface rounded-[30px] p-6">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef2ff] text-[#8a79bf]">
                  <CalendarRange size={18} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#60716b]">
                    Consistency map
                  </div>
                  <div className="text-lg font-semibold text-[#17332d]">Last 4 weeks</div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-7 gap-2">
                {weeklyHeat.flat().map((cell, index) => (
                  <div
                    key={index}
                    className={clsx(
                      'aspect-square rounded-[10px]',
                      cell === 0 && 'bg-[#f1ede6]',
                      cell === 1 && 'bg-[#dfe7dc]',
                      cell === 2 && 'bg-[#8eb19f]',
                      cell === 3 && 'bg-[#17332d]'
                    )}
                  />
                ))}
              </div>

              <div className="mt-4 flex items-center gap-3 text-xs font-semibold text-[#60716b]">
                <span>Less</span>
                <div className="h-3 w-3 rounded bg-[#f1ede6]" />
                <div className="h-3 w-3 rounded bg-[#dfe7dc]" />
                <div className="h-3 w-3 rounded bg-[#8eb19f]" />
                <div className="h-3 w-3 rounded bg-[#17332d]" />
                <span>More</span>
              </div>
            </div>

            <div className="app-surface rounded-[30px] p-6">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff1e8] text-[#d77642]">
                  <TrendingUp size={18} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#60716b]">
                    Weekly trend
                  </div>
                  <div className="text-lg font-semibold text-[#17332d]">Momentum curve</div>
                </div>
              </div>

              <div className="mt-6 flex h-44 items-end gap-3">
                {trendPoints.map((value, index) => (
                  <div key={index} className="flex flex-1 flex-col items-center gap-2">
                    <div
                      className="w-full rounded-t-[14px] bg-gradient-to-t from-[#d77642] to-[#f0b086]"
                      style={{ height: `${value}%` }}
                    />
                    <div className="text-xs font-bold text-[#60716b]">D{index + 1}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <aside className="grid gap-4">
          <section className="app-surface rounded-[30px] p-6">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef7ef] text-[#5f8f82]">
                <Radar size={18} />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#60716b]">
                  Skill radar
                </div>
                <div className="text-lg font-semibold text-[#17332d]">Capability snapshot</div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {radarStats.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between text-sm font-semibold text-[#17332d]">
                    <span>{item.label}</span>
                    <span className="text-[#60716b]">{item.value}%</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-[#edf0e8]">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-[#5f8f82] to-[#17332d]"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="app-surface rounded-[30px] p-6">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f4efff] text-[#8a79bf]">
                <CircleDashed size={18} />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#60716b]">
                  Review actions
                </div>
                <div className="text-lg font-semibold text-[#17332d]">What to do next</div>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {reviewCards.map((card) => (
                <div key={card.title} className="app-panel rounded-[24px] p-4">
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#60716b]">
                    {card.title}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[#17332d]">{card.text}</p>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </section>
    </motion.div>
  );
};
