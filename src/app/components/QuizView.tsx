import { motion } from 'motion/react';
import { useState } from 'react';
import {
  Activity,
  Brain,
  CircleGauge,
  Clock3,
  HeartPulse,
  Search,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { clsx } from 'clsx';

const overviewMetrics = [
  {
    label: 'Attention stability',
    value: '82',
    note: 'Steady through explanation blocks',
    accent: 'bg-[#455763]',
    progress: 82,
  },
  {
    label: 'Emotional readiness',
    value: '74%',
    note: 'Open to learning, low resistance',
    accent: 'bg-[#be7d62]',
    progress: 74,
  },
  {
    label: 'Anxiety signal',
    value: '31%',
    note: 'Elevates before timed tasks',
    accent: 'bg-[#d6c9b4]',
    progress: 31,
  },
];

const signalRows = [
  {
    label: 'Cognitive friction',
    owner: 'Prompt complexity and step load',
    score: 41,
    icon: Brain,
    tint: 'bg-[#f3efe8]',
  },
  {
    label: 'Memory imprint depth',
    owner: 'Retention after 12-hour gap',
    score: 69,
    icon: Sparkles,
    tint: 'bg-[#e8e2da]',
  },
  {
    label: 'Learning pace compatibility',
    owner: 'Best with short guided cycles',
    score: 78,
    icon: Clock3,
    tint: 'bg-[#d6c9b4]',
  },
  {
    label: 'Mood recovery',
    owner: 'Returns to neutral after errors',
    score: 72,
    icon: HeartPulse,
    tint: 'bg-[#f3efe8]',
  },
];

const emotionalStates = [
  { label: 'Calm', value: 46, color: 'bg-[#455763]' },
  { label: 'Curious', value: 28, color: 'bg-[#be7d62]' },
  { label: 'Frustrated', value: 14, color: 'bg-[#d6c9b4]' },
  { label: 'Anxious', value: 12, color: 'bg-[#d3dadc]' },
];

const anxietyTriggers = [
  { label: 'Timed quiz', value: 67 },
  { label: 'Too many steps', value: 52 },
  { label: 'Unclear feedback', value: 38 },
];

const interventions = [
  'Switch from timed practice to one guided example before the first quiz.',
  'Keep each task under three visible steps to reduce hesitation.',
  'Add a short reflection after each correct answer to deepen retention.',
];

const dashboardTabs = [
  { id: 'overview', icon: Sparkles, label: 'Overview' },
  { id: 'activity', icon: Activity, label: 'Activity' },
  { id: 'cognition', icon: Brain, label: 'Cognition' },
  { id: 'stress', icon: ShieldAlert, label: 'Stress' },
];

const stateSummaryCards = [
  {
    label: 'Stress load',
    value: 'Moderate',
    detail: 'Manageable during guided study, rises under time pressure.',
    icon: ShieldAlert,
    tone: 'bg-[#f3efe8]',
  },
  {
    label: 'Recovery state',
    value: 'Rebuilding',
    detail: 'Focus returns well after short breaks and explanation resets.',
    icon: HeartPulse,
    tone: 'bg-[#e8e2da]',
  },
  {
    label: 'Confidence pattern',
    value: 'Uneven',
    detail: 'Strong with concept review, softer during fast application tasks.',
    icon: Sparkles,
    tone: 'bg-[#d6c9b4]',
  },
];

export const QuizView = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlanOpen, setIsPlanOpen] = useState(false);
  const [activeMetric, setActiveMetric] = useState(overviewMetrics[0].label);
  const [activeStateCard, setActiveStateCard] = useState(stateSummaryCards[0].label);
  const [doneActions, setDoneActions] = useState<number[]>([]);
  const [activeEmotion, setActiveEmotion] = useState(emotionalStates[0].label);
  const [activeTrigger, setActiveTrigger] = useState(anxietyTriggers[0].label);
  const [activeSignal, setActiveSignal] = useState(signalRows[0].label);
  const [isLiveModelOn, setIsLiveModelOn] = useState(true);

  const toggleAction = (index: number) => {
    setDoneActions((prev) => (prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid gap-5"
    >
      <section className="app-surface overflow-hidden rounded-[36px] p-4 sm:p-5">
        <div className="grid gap-4 xl:grid-cols-[72px_minmax(0,1.1fr)_320px]">
          <aside className="hidden rounded-[28px] bg-[#f7f4ef] p-3 xl:flex xl:flex-col xl:items-center xl:justify-between">
            <div className="space-y-3">
              {dashboardTabs.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    aria-label={item.label}
                    className={clsx(
                      'inline-flex h-12 w-12 items-center justify-center rounded-2xl transition',
                      activeTab === item.id
                        ? 'bg-[#ece7ff] text-[#5a60d6] shadow-[0_10px_20px_rgba(90,96,214,0.16)]'
                        : 'bg-white text-[#7a7063] hover:bg-[#f1ece7]'
                    )}
                  >
                    <Icon size={20} />
                  </button>
                );
              })}
            </div>

            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#455763] text-sm font-bold text-white">
              RG
            </div>
          </aside>

          <div className="grid gap-4">
            <div className="flex flex-col gap-3 rounded-[30px] bg-[#f7f4ef] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-[1.75rem] font-semibold tracking-[-0.04em] text-[#313238]">Hi, Rachel.</div>
                <div className="mt-1 text-sm leading-6 text-[#7a7063]">
                  Here is today&apos;s learning state, with attention, emotion, and anxiety signals in one place.
                </div>
              </div>

              <div className="flex items-center gap-3">
                <label className="flex min-w-[240px] items-center gap-2 rounded-full bg-white px-4 py-3 text-sm text-[#7a7063] shadow-[0_10px_18px_rgba(49,50,56,0.05)]">
                  <Search size={16} />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search learning signals"
                    className="w-full bg-transparent text-[#313238] outline-none placeholder:text-[#7a7063]"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => setIsPlanOpen((prev) => !prev)}
                  className="rounded-full bg-[#202127] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#313238]"
                >
                  {isPlanOpen ? 'Hide plan' : 'Review plan'}
                </button>
              </div>
            </div>

            {isPlanOpen && (
              <div className="rounded-[24px] bg-[#f7f4ef] px-5 py-4 text-sm leading-6 text-[#5f564c] shadow-[0_12px_24px_rgba(49,50,56,0.05)]">
                The current plan prioritizes one guided example, one low-pressure recall task, and one short reflection to keep anxiety contained while retention improves.
              </div>
            )}

            <div className="grid items-stretch gap-4 lg:grid-cols-[minmax(0,1.2fr)_320px]">
              <section className="relative h-full overflow-hidden rounded-[26px] bg-[#d9d0c3] p-3">
                <div className="max-w-[190px]">
                  <div className="text-[12px] font-semibold text-[#313238]">Today&apos;s learning condition</div>
                  <div className="mt-1 text-[12px] leading-4.5 text-[#5f564c]">
                    The learner is receptive and focused, but anxiety rises when task pressure becomes visible.
                  </div>
                </div>

                <div className="relative mt-4 flex min-h-[128px] items-center justify-center">
                  <div className="absolute left-[16%] top-[33%] h-[4.25rem] w-[4.25rem] rounded-full bg-[#455763] opacity-90 blur-[2px]" />
                  <div className="absolute left-[30%] top-[42%] h-[5.25rem] w-[5.25rem] rounded-full bg-[#ef8870] opacity-72 blur-[8px]" />
                  <div className="absolute left-[48%] top-[20%] h-[6.1rem] w-[6.1rem] rounded-full bg-[#f4d870] opacity-92 blur-[10px]" />
                  <div className="absolute left-[29%] top-[57%] text-center">
                    <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/80">focus</div>
                    <div className="mt-0.5 text-[13px] font-semibold text-white">2.4h</div>
                  </div>
                  <div className="absolute left-[40%] top-[62%] text-center">
                    <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#5d443d]">anxiety</div>
                    <div className="mt-0.5 text-[13px] font-semibold text-[#5d443d]">31%</div>
                  </div>
                  <div className="absolute left-[58%] top-[42%] text-center">
                    <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#5f564c]">retention</div>
                    <div className="mt-0.5 text-[13px] font-semibold text-[#5f564c]">69%</div>
                  </div>
                </div>

                <div className="mt-2 grid gap-2 sm:grid-cols-3">
                  {overviewMetrics.map((metric) => (
                    <button
                      key={metric.label}
                      type="button"
                      onClick={() => setActiveMetric(metric.label)}
                      className={clsx(
                        'flex min-h-[118px] flex-col rounded-[16px] bg-white/58 px-3 py-3 text-left backdrop-blur-xl transition',
                        activeMetric === metric.label
                          ? 'ring-2 ring-[#455763]/30'
                          : 'hover:bg-white/70'
                      )}
                    >
                      <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#7a7063]">
                        {metric.label}
                      </div>
                      <div className="mt-1.5 text-[1rem] font-semibold leading-none text-[#313238]">{metric.value}</div>
                      <div className="mt-2 min-h-[2.5rem] text-[12px] leading-4.5 text-[#7a7063]">{metric.note}</div>
                      <div className="mt-auto pt-2">
                        <div className="h-1.5 rounded-full bg-white/60">
                        <div className={`h-1.5 rounded-full ${metric.accent}`} style={{ width: `${metric.progress}%` }} />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              <section className="grid h-full gap-4">
                <div className="flex h-full flex-col rounded-[32px] bg-[#1f2229] p-5 text-white">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold">Mental state summary</div>
                      <div className="mt-1 text-sm text-white/62">
                        A cleaner snapshot of stress, recovery, and confidence.
                      </div>
                    </div>
                    <div className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white/72">
                      Live
                    </div>
                  </div>

                  <div className="mt-5 flex-1 space-y-3">
                    {stateSummaryCards.map((item) => {
                      const Icon = item.icon;

                      return (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() => setActiveStateCard(item.label)}
                          className={clsx(
                            `rounded-[20px] p-4 text-[#313238] transition ${item.tone}`,
                            activeStateCard === item.label ? 'ring-2 ring-white/60' : 'hover:brightness-[0.98]'
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/70">
                              <Icon size={18} />
                            </div>
                            <div>
                              <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#7a7063]">
                                {item.label}
                              </div>
                              <div className="mt-1 text-lg font-semibold">{item.value}</div>
                              <div className="mt-1 text-sm leading-6 text-[#5f564c]">{item.detail}</div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-[30px] bg-[#f7f4ef] p-5 shadow-[0_12px_24px_rgba(49,50,56,0.05)]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-[#313238]">Fast actions</div>
                      <div className="mt-1 text-sm text-[#7a7063]">
                        What to adjust right now to reduce anxiety and keep learning effective.
                      </div>
                    </div>
                    <Activity size={18} className="text-[#455763]" />
                  </div>

                  <div className="mt-5 space-y-3">
                    {[
                      'Begin with one guided example before any timed task.',
                      'Reduce visible task steps from five to three.',
                      'Use one short recap after each correct answer.',
                    ].map((item, index) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleAction(index)}
                        className={clsx(
                          'w-full rounded-[18px] bg-white px-4 py-4 text-left shadow-[0_8px_18px_rgba(49,50,56,0.04)] transition',
                          doneActions.includes(index) ? 'ring-2 ring-[#455763]/28 bg-[#f3f7f7]' : 'hover:bg-[#fcfbf8]'
                        )}
                      >
                        <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#7a7063]">
                          Action 0{index + 1} {doneActions.includes(index) ? '• done' : ''}
                        </div>
                        <div className="mt-2 text-sm leading-6 text-[#5f564c]">{item}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            <div className="grid gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
              <div className="grid gap-4">
                <section className="rounded-[28px] bg-[#f7f4ef] p-5 shadow-[0_12px_24px_rgba(49,50,56,0.05)]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-[#313238]">Emotional readiness</div>
                      <div className="mt-1 text-sm text-[#7a7063]">Current state mix</div>
                    </div>
                    <HeartPulse size={18} className="text-[#be7d62]" />
                  </div>

                  <div
                    className="mx-auto mt-5 h-32 w-32 rounded-full"
                    style={{
                      background:
                        'conic-gradient(#455763 0 46%, #be7d62 46% 74%, #d6c9b4 74% 88%, #d3dadc 88% 100%)',
                    }}
                  >
                    <div className="m-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#f7f4ef] text-center">
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#7a7063]">
                          readiness
                        </div>
                        <div className="mt-1 text-2xl font-semibold text-[#313238]">74%</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    {emotionalStates.map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => setActiveEmotion(item.label)}
                        className={clsx(
                          'flex w-full items-center justify-between rounded-[14px] px-2 py-1.5 text-sm transition',
                          activeEmotion === item.label ? 'bg-white/70' : 'hover:bg-white/40'
                        )}
                      >
                        <div className="flex items-center gap-2 font-semibold text-[#313238]">
                          <span className={`h-3 w-3 rounded-full ${item.color}`} />
                          {item.label}
                        </div>
                        <span className="text-[#7a7063]">{item.value}%</span>
                      </button>
                    ))}
                  </div>
                </section>

                <section className="rounded-[28px] bg-[#f7f4ef] p-5 shadow-[0_12px_24px_rgba(49,50,56,0.05)]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-[#313238]">Anxiety watch</div>
                      <div className="mt-1 text-sm text-[#7a7063]">Trigger profile</div>
                    </div>
                    <ShieldAlert size={18} className="text-[#455763]" />
                  </div>

                  <div className="mt-5 space-y-4">
                    {anxietyTriggers.map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => setActiveTrigger(item.label)}
                        className={clsx(
                          'block w-full rounded-[16px] px-2 py-1 text-left transition',
                          activeTrigger === item.label ? 'bg-white/60' : 'hover:bg-white/35'
                        )}
                      >
                        <div className="flex items-center justify-between text-sm font-semibold text-[#313238]">
                          <span>{item.label}</span>
                          <span className="text-[#7a7063]">{item.value}%</span>
                        </div>
                        <div className="mt-2 h-2 rounded-full bg-[#e8e2da]">
                          <div className="h-2 rounded-full bg-[#be7d62]" style={{ width: `${item.value}%` }} />
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-5 rounded-[20px] bg-[#ece7ff] px-4 py-4">
                    <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#5a60d6]">
                      Anxiety trend
                    </div>
                    <div className="mt-2 text-sm leading-6 text-[#4f4b7a]">
                      Lower than last week, but still spikes when timing pressure appears too early.
                    </div>
                  </div>
                </section>
              </div>

              <section className="rounded-[28px] bg-[#f7f4ef] p-5 shadow-[0_12px_24px_rgba(49,50,56,0.05)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-[#313238]">Learning signals</div>
                    <div className="mt-1 text-sm text-[#7a7063]">
                      Metrics that shape pace, confidence, and retention quality
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsLiveModelOn((prev) => !prev)}
                    className="inline-flex items-center gap-2 rounded-full bg-[#202127] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#313238]"
                  >
                    <CircleGauge size={14} />
                    {isLiveModelOn ? 'Live model' : 'Model paused'}
                  </button>
                </div>

                <div className="mt-5 space-y-3">
                  {signalRows.map((item) => {
                    const Icon = item.icon;

                    return (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => setActiveSignal(item.label)}
                        className={clsx(
                          'flex w-full items-center gap-4 rounded-[22px] bg-white px-4 py-4 text-left shadow-[0_8px_18px_rgba(49,50,56,0.04)] transition',
                          activeSignal === item.label ? 'ring-2 ring-[#455763]/22' : 'hover:bg-[#fcfbf8]'
                        )}
                      >
                        <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${item.tint} text-[#313238]`}>
                          <Icon size={20} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-semibold text-[#313238]">{item.label}</div>
                          <div className="mt-1 text-sm text-[#7a7063]">{item.owner}</div>
                        </div>

                        <div className="w-[180px]">
                          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.14em] text-[#7a7063]">
                            <span>signal</span>
                            <span>{item.score}%</span>
                          </div>
                          <div className="mt-2 flex gap-1">
                            {Array.from({ length: 12 }).map((_, index) => (
                              <span
                                key={index}
                                className={clsx(
                                  'h-7 flex-1 rounded-full',
                                  index < Math.round(item.score / 8.5)
                                    ? index > 8
                                      ? 'bg-[#be7d62]'
                                      : 'bg-[#455763]'
                                    : 'bg-[#e8e2da]'
                                )}
                              />
                            ))}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-5 rounded-[24px] bg-[#faf8f4] p-5">
                  <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#7a7063]">
                    Recommended intervention
                  </div>
                  <div className="mt-4 space-y-3">
                    {interventions.map((item, index) => (
                      <div key={item} className="flex gap-3">
                        <div className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#202127] text-[11px] font-bold text-white">
                          {index + 1}
                        </div>
                        <div className="text-sm leading-6 text-[#5f564c]">{item}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
