import { motion } from 'motion/react';
import { useState } from 'react';
import {
  Brain,
  Clock3,
  HeartPulse,
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
  { label: 'Calm', value: 46, color: 'bg-[#455763]', stroke: '#455763' },
  { label: 'Curious', value: 28, color: 'bg-[#be7d62]', stroke: '#be7d62' },
  { label: 'Frustrated', value: 14, color: 'bg-[#d6c9b4]', stroke: '#d6c9b4' },
  { label: 'Anxious', value: 12, color: 'bg-[#d3dadc]', stroke: '#d3dadc' },
];

const readinessRingRadius = 46;
const readinessRingCircumference = 2 * Math.PI * readinessRingRadius;
const readinessRingGap = 6;

const polarToCartesian = (cx: number, cy: number, radius: number, angleInDegrees: number) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;

  return {
    x: cx + radius * Math.cos(angleInRadians),
    y: cy + radius * Math.sin(angleInRadians),
  };
};

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

const learningConditionOrbs = [
  {
    className: 'left-[16%] top-[33%] h-[4.25rem] w-[4.25rem] bg-[#455763]',
    opacity: 0.9,
    blur: 'blur-[2px]',
    x: [0, 10, -6, 0],
    y: [0, -8, 6, 0],
    scale: [1, 1.06, 0.98, 1],
    duration: 13,
  },
  {
    className: 'left-[30%] top-[42%] h-[5.25rem] w-[5.25rem] bg-[#ef8870]',
    opacity: 0.72,
    blur: 'blur-[8px]',
    x: [0, -12, 8, 0],
    y: [0, 10, -6, 0],
    scale: [1, 1.08, 0.96, 1],
    duration: 16,
  },
  {
    className: 'left-[48%] top-[20%] h-[6.1rem] w-[6.1rem] bg-[#f4d870]',
    opacity: 0.92,
    blur: 'blur-[10px]',
    x: [0, 12, -10, 0],
    y: [0, -12, 8, 0],
    scale: [1, 1.04, 0.97, 1],
    duration: 18,
  },
];

const learningConditionParticles = [
  { left: '18%', top: '24%', size: '0.45rem', color: 'bg-white/65', delay: 0, duration: 7.5 },
  { left: '24%', top: '52%', size: '0.55rem', color: 'bg-[#d8eef4]/70', delay: 0.8, duration: 8.5 },
  { left: '33%', top: '28%', size: '0.5rem', color: 'bg-[#f4d870]/75', delay: 1.6, duration: 9.5 },
  { left: '39%', top: '50%', size: '0.7rem', color: 'bg-[#ef8870]/58', delay: 0.4, duration: 10.5 },
  { left: '49%', top: '34%', size: '0.52rem', color: 'bg-white/55', delay: 1.2, duration: 8.2 },
  { left: '56%', top: '61%', size: '0.42rem', color: 'bg-[#455763]/45', delay: 2.1, duration: 11 },
  { left: '61%', top: '30%', size: '0.6rem', color: 'bg-[#f4d870]/58', delay: 0.7, duration: 9.8 },
  { left: '67%', top: '49%', size: '0.48rem', color: 'bg-white/60', delay: 1.8, duration: 8.8 },
];

export const QuizView = () => {
  const [isPlanOpen, setIsPlanOpen] = useState(false);
  const [activeEmotion, setActiveEmotion] = useState(emotionalStates[0].label);

  let cumulativeShare = 0;
  const emotionalSegments = emotionalStates.map((item) => {
    const share = item.value / 100;
    const arcLength = readinessRingCircumference * share;
    const segment = {
      ...item,
      startAngle: cumulativeShare * 360,
      endAngle: (cumulativeShare + share) * 360,
      visibleArc: Math.max(arcLength - readinessRingGap, 0),
      dashOffset: -readinessRingCircumference * cumulativeShare,
    };

    cumulativeShare += share;
    return segment;
  });

  const activeEmotionalSegment = emotionalSegments.find((item) => item.label === activeEmotion) ?? emotionalSegments[0];
  const activeEmotionMarker = polarToCartesian(
    64,
    64,
    56,
    (activeEmotionalSegment.startAngle + activeEmotionalSegment.endAngle) / 2
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid h-full min-h-0 gap-5 overflow-hidden"
    >
      <section className="app-surface flex min-h-0 flex-col overflow-hidden rounded-[30px] p-4 sm:p-5">
        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
          <div className="grid gap-4">
            <div className="flex flex-col gap-3 rounded-[24px] bg-[#f7f4ef] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-[1.75rem] font-semibold tracking-[-0.04em] text-[#313238]">Hi, Rachel.</div>
                <div className="mt-1 text-sm leading-6 text-[#5f564c]">
                  Here is today&apos;s learning state, with attention, emotion, and anxiety signals in one place.
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsPlanOpen((prev) => !prev)}
                className="self-start rounded-full bg-[#202127] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#313238] sm:self-auto"
              >
                {isPlanOpen ? 'Hide plan' : 'Review plan'}
              </button>
            </div>

            {isPlanOpen && (
              <div className="rounded-[18px] bg-[#f7f4ef] px-5 py-4 text-sm leading-6 text-[#5f564c] shadow-[0_12px_24px_rgba(49,50,56,0.05)]">
                The current plan prioritizes one guided example, one low-pressure recall task, and one short reflection to keep anxiety contained while retention improves.
              </div>
            )}

            <div className="grid items-stretch gap-4 lg:grid-cols-[minmax(0,1.2fr)_320px]">
              <section className="relative h-full overflow-hidden rounded-[20px] bg-[#d9d0c3] p-3">
                <div className="max-w-[190px]">
                  <div className="text-[12px] font-semibold text-[#313238]">Today&apos;s learning condition</div>
                  <div className="mt-1 text-[12px] leading-4.5 text-[#5f564c]">
                    The learner is receptive and focused, but anxiety rises when task pressure becomes visible.
                  </div>
                </div>

                <div className="relative mt-4 flex min-h-[128px] items-center justify-center">
                  <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                    <motion.div
                      className="absolute inset-x-[18%] top-[24%] h-24 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.34)_0%,rgba(255,255,255,0)_72%)] blur-2xl"
                      animate={{ opacity: [0.2, 0.42, 0.24, 0.2], scale: [0.96, 1.04, 0.98, 0.96] }}
                      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    {learningConditionOrbs.map((orb) => (
                      <motion.div
                        key={orb.className}
                        className={clsx('absolute rounded-full', orb.className, orb.blur)}
                        style={{ opacity: orb.opacity }}
                        animate={{ x: orb.x, y: orb.y, scale: orb.scale }}
                        transition={{ duration: orb.duration, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    ))}
                    {learningConditionParticles.map((particle) => (
                      <motion.div
                        key={`${particle.left}-${particle.top}`}
                        className={clsx('absolute rounded-full', particle.color)}
                        style={{
                          left: particle.left,
                          top: particle.top,
                          width: particle.size,
                          height: particle.size,
                        }}
                        animate={{
                          x: [0, 8, -5, 0],
                          y: [0, -14, 6, 0],
                          opacity: [0.22, 0.78, 0.34, 0.22],
                          scale: [0.72, 1.18, 0.9, 0.72],
                        }}
                        transition={{
                          duration: particle.duration,
                          delay: particle.delay,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                    ))}
                  </div>
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
                    <div
                      key={metric.label}
                      className="flex min-h-[118px] flex-col rounded-[16px] bg-white/58 px-3 py-3 text-left backdrop-blur-xl"
                    >
                      <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#5f564c]">
                        {metric.label}
                      </div>
                      <div className="mt-1.5 text-[1rem] font-semibold leading-none text-[#313238]">{metric.value}</div>
                      <div className="mt-2 min-h-[2.5rem] text-[12px] leading-4.5 text-[#5f564c]">{metric.note}</div>
                      <div className="mt-auto pt-2">
                        <div className="h-1.5 rounded-full bg-white/60">
                        <div className={`h-1.5 rounded-full ${metric.accent}`} style={{ width: `${metric.progress}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="grid h-full gap-4">
                <div className="flex h-full flex-col rounded-[26px] bg-[#1f2229] p-5 text-white">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold">Mental state summary</div>
                      <div className="mt-1 text-sm text-white/78">
                        A cleaner snapshot of stress, recovery, and confidence.
                      </div>
                    </div>
                    <div className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white/86">
                      Live
                    </div>
                  </div>

                  <div className="mt-5 grid min-h-0 flex-1 grid-rows-3 gap-3">
                    {stateSummaryCards.map((item) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.label}
                          className={`flex h-full rounded-[16px] p-4 text-[#313238] ${item.tone}`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/70">
                              <Icon size={18} />
                            </div>
                            <div>
                              <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#5f564c]">
                                {item.label}
                              </div>
                              <div className="mt-1 text-lg font-semibold">{item.value}</div>
                              <div className="mt-1 text-sm leading-6 text-[#5f564c]">{item.detail}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </section>
            </div>

            <div className="grid gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
              <div className="grid gap-4">
                <section className="rounded-[22px] bg-[#f7f4ef] p-5 shadow-[0_12px_24px_rgba(49,50,56,0.05)]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-[#313238]">Emotional readiness</div>
                      <div className="mt-1 text-sm text-[#5f564c]">Current state mix</div>
                    </div>
                    <HeartPulse size={18} className="text-[#be7d62]" />
                  </div>

                  <div className="relative mx-auto mt-5 flex h-40 w-40 items-center justify-center">
                    <div className="absolute inset-[1.1rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0)_72%)]" />

                    <svg viewBox="0 0 128 128" className="h-full w-full overflow-visible">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        fill="none"
                        stroke="rgba(49,50,56,0.08)"
                        strokeWidth="1.5"
                        strokeDasharray="2.5 6.5"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r={readinessRingRadius}
                        fill="none"
                        stroke="rgba(49,50,56,0.08)"
                        strokeWidth="11"
                      />

                      {emotionalSegments.map((item) => (
                        <g key={item.label}>
                          {activeEmotion === item.label && (
                            <circle
                              cx="64"
                              cy="64"
                              r="52"
                              fill="none"
                              stroke={item.stroke}
                              strokeWidth="4"
                              strokeDasharray={`${item.visibleArc} ${readinessRingCircumference}`}
                              strokeDashoffset={item.dashOffset}
                              strokeLinecap="round"
                              transform="rotate(-90 64 64)"
                              opacity="0.24"
                            />
                          )}

                          <circle
                            cx="64"
                            cy="64"
                            r={readinessRingRadius}
                            fill="none"
                            stroke={item.stroke}
                            strokeWidth={activeEmotion === item.label ? 12 : 10}
                            strokeDasharray={`${item.visibleArc} ${readinessRingCircumference}`}
                            strokeDashoffset={item.dashOffset}
                            strokeLinecap="round"
                            transform="rotate(-90 64 64)"
                            opacity={activeEmotion === item.label ? 1 : 0.78}
                          />
                        </g>
                      ))}
                    </svg>

                    <div
                      className="pointer-events-none absolute h-3 w-3 rounded-full shadow-[0_0_0_5px_rgba(255,255,255,0.3)]"
                      style={{
                        left: `calc(${(activeEmotionMarker.x / 128) * 100}% - 0.375rem)`,
                        top: `calc(${(activeEmotionMarker.y / 128) * 100}% - 0.375rem)`,
                        backgroundColor: activeEmotionalSegment.stroke,
                      }}
                    />

                    <div className="absolute flex h-[5.9rem] w-[5.9rem] items-center justify-center rounded-full border border-white/80 bg-[#f7f4ef]/95 text-center shadow-[0_10px_24px_rgba(49,50,56,0.08)]">
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#5f564c]">
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
                        <span className="text-[#5f564c]">{item.value}%</span>
                      </button>
                    ))}
                  </div>
                </section>

                <section className="rounded-[22px] bg-[#f7f4ef] p-5 shadow-[0_12px_24px_rgba(49,50,56,0.05)]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-[#313238]">Anxiety watch</div>
                      <div className="mt-1 text-sm text-[#5f564c]">Trigger profile</div>
                    </div>
                    <ShieldAlert size={18} className="text-[#455763]" />
                  </div>

                  <div className="mt-5 space-y-4">
                    {anxietyTriggers.map((item) => (
                      <div
                        key={item.label}
                        className="block w-full rounded-[16px] px-2 py-1 text-left"
                      >
                        <div className="flex items-center justify-between text-sm font-semibold text-[#313238]">
                          <span>{item.label}</span>
                          <span className="text-[#5f564c]">{item.value}%</span>
                        </div>
                        <div className="mt-2 h-2 rounded-full bg-[#e8e2da]">
                          <div className="h-2 rounded-full bg-[#be7d62]" style={{ width: `${item.value}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-[16px] bg-[#ece7ff] px-4 py-4">
                    <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#5a60d6]">
                      Anxiety trend
                    </div>
                    <div className="mt-2 text-sm leading-6 text-[#4f4b7a]">
                      Lower than last week, but still spikes when timing pressure appears too early.
                    </div>
                  </div>
                </section>
              </div>

              <section className="rounded-[22px] bg-[#f7f4ef] p-5 shadow-[0_12px_24px_rgba(49,50,56,0.05)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-[#313238]">Learning signals</div>
                    <div className="mt-1 text-sm text-[#5f564c]">
                      Metrics that shape pace, confidence, and retention quality
                    </div>
                  </div>
                  <div className="rounded-full bg-[#202127] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                    Signal model
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {signalRows.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.label}
                        className="flex w-full items-center gap-4 rounded-[16px] bg-white px-4 py-4 text-left shadow-[0_8px_18px_rgba(49,50,56,0.04)]"
                      >
                        <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${item.tint} text-[#313238]`}>
                          <Icon size={20} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-semibold text-[#313238]">{item.label}</div>
                          <div className="mt-1 text-sm text-[#5f564c]">{item.owner}</div>
                        </div>

                        <div className="w-[180px]">
                          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.14em] text-[#5f564c]">
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
                      </div>
                    );
                  })}
                </div>

                <div className="mt-5 rounded-[18px] bg-[#faf8f4] p-5">
                  <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#5f564c]">
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
