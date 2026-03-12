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

const signalRows = [
  {
    label: 'Cognitive friction',
    owner: 'Prompt complexity and step load',
    score: 41,
    icon: Brain,
    tint: 'bg-[#34268C]/8',
  },
  {
    label: 'Memory imprint depth',
    owner: 'Retention after 12-hour gap',
    score: 69,
    icon: Sparkles,
    tint: 'bg-[#E2F263]/40',
  },
  {
    label: 'Learning pace compatibility',
    owner: 'Best with short guided cycles',
    score: 78,
    icon: Clock3,
    tint: 'bg-[#0CF25D]/18',
  },
  {
    label: 'Mood recovery',
    owner: 'Returns to neutral after errors',
    score: 72,
    icon: HeartPulse,
    tint: 'bg-[#34268C]/8',
  },
];

const emotionalStates = [
  { label: 'Calm', value: 46, color: 'bg-[#34268C]', stroke: '#34268C' },
  { label: 'Curious', value: 28, color: 'bg-[#0CF25D]', stroke: '#0CF25D' },
  { label: 'Frustrated', value: 14, color: 'bg-[#E2F263]', stroke: '#E2F263' },
  { label: 'Anxious', value: 12, color: 'bg-[#1E1C59]/14', stroke: 'rgba(30, 28, 89, 0.24)' },
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
    tone: 'bg-[#34268C]/8',
  },
  {
    label: 'Recovery state',
    value: 'Rebuilding',
    detail: 'Focus returns well after short breaks and explanation resets.',
    icon: HeartPulse,
    tone: 'bg-[#0CF25D]/18',
  },
  {
    label: 'Confidence pattern',
    value: 'Uneven',
    detail: 'Strong with concept review, softer during fast application tasks.',
    icon: Sparkles,
    tone: 'bg-[#E2F263]/32',
  },
];

const learningConditionOrbs = [
  {
    className: 'left-[12%] top-[31%] h-[4.5rem] w-[4.5rem] bg-[#34268C]',
    opacity: 0.88,
    blur: 'blur-[3px]',
    x: [0, 18, -12, 8, 0],
    y: [0, -16, 10, -6, 0],
    scale: [1, 1.1, 0.94, 1.04, 1],
    duration: 15,
  },
  {
    className: 'left-[27%] top-[44%] h-[5.6rem] w-[5.6rem] bg-[#0CF25D]',
    opacity: 0.74,
    blur: 'blur-[10px]',
    x: [0, -18, 14, -6, 0],
    y: [0, 14, -9, 5, 0],
    scale: [1, 1.12, 0.95, 1.03, 1],
    duration: 18,
  },
  {
    className: 'left-[46%] top-[18%] h-[6.2rem] w-[6.2rem] bg-[#E2F263]',
    opacity: 0.92,
    blur: 'blur-[12px]',
    x: [0, 20, -16, 10, 0],
    y: [0, -18, 12, -8, 0],
    scale: [1, 1.08, 0.95, 1.02, 1],
    duration: 20,
  },
  {
    className: 'left-[58%] top-[36%] h-[4.2rem] w-[4.2rem] bg-[#1E1C59]',
    opacity: 0.58,
    blur: 'blur-[8px]',
    x: [0, 14, -10, 6, 0],
    y: [0, 12, -14, 4, 0],
    scale: [1, 1.07, 0.92, 1.04, 1],
    duration: 17,
  },
  {
    className: 'left-[66%] top-[24%] h-[3.4rem] w-[3.4rem] bg-[#E2F263]',
    opacity: 0.72,
    blur: 'blur-[7px]',
    x: [0, -12, 16, -4, 0],
    y: [0, -10, 12, -6, 0],
    scale: [1, 1.11, 0.93, 1.05, 1],
    duration: 14,
  },
];

const learningConditionParticles = [
  {
    left: '14%',
    top: '22%',
    size: '0.36rem',
    color: 'bg-white/65',
    delay: 0,
    duration: 8.4,
    x: [0, 15, -8, 5, 0],
    y: [0, -18, 10, -6, 0],
    opacity: [0.18, 0.82, 0.28, 0.56, 0.18],
    scale: [0.62, 1.22, 0.82, 1.04, 0.62],
  },
  {
    left: '18%',
    top: '39%',
    size: '0.48rem',
    color: 'bg-[#0CF25D]/70',
    delay: 1.1,
    duration: 9.2,
    x: [0, -12, 16, -4, 0],
    y: [0, 14, -10, 6, 0],
    opacity: [0.22, 0.7, 0.36, 0.62, 0.22],
    scale: [0.68, 1.18, 0.88, 1.08, 0.68],
  },
  {
    left: '22%',
    top: '55%',
    size: '0.42rem',
    color: 'bg-white/55',
    delay: 0.4,
    duration: 10.6,
    x: [0, 10, -14, 7, 0],
    y: [0, -12, 14, -5, 0],
    opacity: [0.16, 0.76, 0.24, 0.54, 0.16],
    scale: [0.58, 1.16, 0.86, 1.02, 0.58],
  },
  {
    left: '27%',
    top: '26%',
    size: '0.56rem',
    color: 'bg-[#E2F263]/78',
    delay: 1.8,
    duration: 8.8,
    x: [0, -16, 12, -3, 0],
    y: [0, -20, 8, 4, 0],
    opacity: [0.2, 0.84, 0.34, 0.6, 0.2],
    scale: [0.7, 1.26, 0.9, 1.08, 0.7],
  },
  {
    left: '32%',
    top: '47%',
    size: '0.7rem',
    color: 'bg-[#34268C]/46',
    delay: 0.9,
    duration: 11.4,
    x: [0, 18, -10, 6, 0],
    y: [0, 12, -16, 8, 0],
    opacity: [0.18, 0.64, 0.28, 0.46, 0.18],
    scale: [0.76, 1.18, 0.92, 1.04, 0.76],
  },
  {
    left: '38%',
    top: '20%',
    size: '0.38rem',
    color: 'bg-white/60',
    delay: 2.2,
    duration: 9.8,
    x: [0, 13, -11, 4, 0],
    y: [0, -15, 12, -7, 0],
    opacity: [0.14, 0.74, 0.26, 0.58, 0.14],
    scale: [0.54, 1.2, 0.8, 1.06, 0.54],
  },
  {
    left: '43%',
    top: '57%',
    size: '0.44rem',
    color: 'bg-[#1E1C59]/42',
    delay: 1.3,
    duration: 12.1,
    x: [0, -14, 18, -5, 0],
    y: [0, 16, -12, 5, 0],
    opacity: [0.12, 0.52, 0.24, 0.4, 0.12],
    scale: [0.6, 1.14, 0.82, 0.98, 0.6],
  },
  {
    left: '48%',
    top: '31%',
    size: '0.5rem',
    color: 'bg-[#E2F263]/65',
    delay: 0.6,
    duration: 10.1,
    x: [0, 17, -9, 6, 0],
    y: [0, -19, 11, -4, 0],
    opacity: [0.18, 0.78, 0.3, 0.58, 0.18],
    scale: [0.64, 1.22, 0.88, 1.02, 0.64],
  },
  {
    left: '54%',
    top: '44%',
    size: '0.34rem',
    color: 'bg-white/70',
    delay: 2.5,
    duration: 7.9,
    x: [0, -11, 13, -2, 0],
    y: [0, 10, -14, 6, 0],
    opacity: [0.2, 0.88, 0.32, 0.66, 0.2],
    scale: [0.52, 1.24, 0.78, 1.1, 0.52],
  },
  {
    left: '58%',
    top: '62%',
    size: '0.4rem',
    color: 'bg-[#0CF25D]/58',
    delay: 1.7,
    duration: 11.8,
    x: [0, 12, -16, 5, 0],
    y: [0, -16, 14, -6, 0],
    opacity: [0.12, 0.6, 0.24, 0.44, 0.12],
    scale: [0.58, 1.12, 0.82, 1, 0.58],
  },
  {
    left: '61%',
    top: '27%',
    size: '0.62rem',
    color: 'bg-[#E2F263]/60',
    delay: 0.2,
    duration: 9.5,
    x: [0, -18, 10, -4, 0],
    y: [0, -13, 15, -7, 0],
    opacity: [0.16, 0.72, 0.28, 0.5, 0.16],
    scale: [0.72, 1.28, 0.9, 1.06, 0.72],
  },
  {
    left: '64%',
    top: '51%',
    size: '0.46rem',
    color: 'bg-white/58',
    delay: 2.1,
    duration: 8.7,
    x: [0, 14, -12, 3, 0],
    y: [0, 18, -8, 5, 0],
    opacity: [0.18, 0.82, 0.34, 0.62, 0.18],
    scale: [0.62, 1.18, 0.84, 1.04, 0.62],
  },
  {
    left: '69%',
    top: '36%',
    size: '0.52rem',
    color: 'bg-[#34268C]/42',
    delay: 0.7,
    duration: 10.9,
    x: [0, -15, 17, -6, 0],
    y: [0, -17, 12, -4, 0],
    opacity: [0.14, 0.58, 0.22, 0.42, 0.14],
    scale: [0.66, 1.16, 0.86, 1.02, 0.66],
  },
  {
    left: '72%',
    top: '57%',
    size: '0.36rem',
    color: 'bg-[#1E1C59]/36',
    delay: 1.5,
    duration: 12.4,
    x: [0, 11, -13, 4, 0],
    y: [0, 15, -12, 6, 0],
    opacity: [0.1, 0.46, 0.18, 0.34, 0.1],
    scale: [0.5, 1.08, 0.74, 0.96, 0.5],
  },
  {
    left: '76%',
    top: '24%',
    size: '0.48rem',
    color: 'bg-white/62',
    delay: 2.8,
    duration: 9.1,
    x: [0, -10, 14, -5, 0],
    y: [0, -14, 10, -3, 0],
    opacity: [0.16, 0.78, 0.26, 0.56, 0.16],
    scale: [0.6, 1.22, 0.82, 1.04, 0.6],
  },
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
            <div className="flex flex-col gap-3 rounded-[24px] bg-white px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-[1.75rem] font-semibold tracking-[-0.04em] text-[#1E1C59]">Hi, Rachel.</div>
                <div className="mt-1 text-sm leading-6 text-[#6B6794]">
                  Here is today&apos;s learning state, with attention, emotion, and anxiety signals in one place.
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsPlanOpen((prev) => !prev)}
                className="self-start rounded-full bg-[var(--brand-strong)] px-5 py-3 text-sm font-semibold text-[var(--brand-strong-foreground)] transition hover:bg-[var(--brand-strong-hover)] sm:self-auto"
              >
                {isPlanOpen ? 'Hide plan' : 'Review plan'}
              </button>
            </div>

            {isPlanOpen && (
              <div className="rounded-[18px] bg-white px-5 py-4 text-sm leading-6 text-[#6B6794]">
                The current plan prioritizes one guided example, one low-pressure recall task, and one short reflection to keep anxiety contained while retention improves.
              </div>
            )}

            <div className="grid items-stretch gap-4 lg:grid-cols-[minmax(0,1.2fr)_320px]">
              <section className="relative h-full overflow-hidden rounded-[20px] bg-[#34268C]/6 p-3">
                <div className="max-w-[30rem] pr-4">
                  <div className="text-[12px] font-semibold text-[#1E1C59]">Today&apos;s learning condition</div>
                  <div className="mt-1 text-[12px] leading-4.5 text-[#6B6794]">
                    The learner is receptive and focused, but anxiety rises when task pressure becomes visible.
                  </div>
                </div>

                <div className="relative mt-4 flex min-h-[128px] items-center justify-center">
                  <div className="pointer-events-none absolute inset-0" aria-hidden="true">
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
                          x: particle.x,
                          y: particle.y,
                          opacity: particle.opacity,
                          scale: particle.scale,
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
                    <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#6B6794]">retention</div>
                    <div className="mt-0.5 text-[13px] font-semibold text-[#6B6794]">69%</div>
                  </div>
                </div>
              </section>

              <section className="grid h-full gap-4">
                <div className="flex h-full flex-col rounded-[26px] bg-white p-5 text-[#1E1C59]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold">Mental state summary</div>
                      <div className="mt-1 text-sm text-[#6B6794]">
                        A cleaner snapshot of stress, recovery, and confidence.
                      </div>
                    </div>
                    <div className="rounded-full bg-[#34268C]/8 px-3 py-1 text-[12px] font-bold uppercase tracking-[0.16em] text-[#6B6794]">
                      Live
                    </div>
                  </div>

                  <div className="mt-5 grid min-h-0 flex-1 grid-rows-3 gap-3">
                    {stateSummaryCards.map((item) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.label}
                          className={`flex h-full rounded-[16px] p-4 text-[#1E1C59] ${item.tone}`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/70">
                              <Icon size={18} />
                            </div>
                            <div>
                              <div className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#6B6794]">
                                {item.label}
                              </div>
                              <div className="mt-1 text-lg font-semibold">{item.value}</div>
                              <div className="mt-1 text-sm leading-6 text-[#6B6794]">{item.detail}</div>
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
                <section className="rounded-[22px] bg-white p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-[#1E1C59]">Emotional readiness</div>
                      <div className="mt-1 text-sm text-[#6B6794]">Current state mix</div>
                    </div>
                    <HeartPulse size={18} className="text-[#0CF25D]" />
                  </div>

                  <div className="relative mx-auto mt-5 flex h-40 w-40 items-center justify-center">
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
                      className="pointer-events-none absolute h-3 w-3 rounded-full"
                      style={{
                        left: `calc(${(activeEmotionMarker.x / 128) * 100}% - 0.375rem)`,
                        top: `calc(${(activeEmotionMarker.y / 128) * 100}% - 0.375rem)`,
                        backgroundColor: activeEmotionalSegment.stroke,
                      }}
                    />

                    <div className="absolute flex h-[5.9rem] w-[5.9rem] items-center justify-center rounded-full border border-white/80 bg-white/95 text-center">
                      <div>
                        <div className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#6B6794]">
                          readiness
                        </div>
                        <div className="mt-1 text-2xl font-semibold text-[#1E1C59]">74%</div>
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
                        <div className="flex items-center gap-2 font-semibold text-[#1E1C59]">
                          <span className={`h-3 w-3 rounded-full ${item.color}`} />
                          {item.label}
                        </div>
                        <span className="text-[#6B6794]">{item.value}%</span>
                      </button>
                    ))}
                  </div>
                </section>

                <section className="rounded-[22px] bg-white p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-[#1E1C59]">Anxiety watch</div>
                      <div className="mt-1 text-sm text-[#6B6794]">Trigger profile</div>
                    </div>
                    <ShieldAlert size={18} className="text-[#34268C]" />
                  </div>

                  <div className="mt-5 space-y-4">
                    {anxietyTriggers.map((item) => (
                      <div
                        key={item.label}
                        className="block w-full rounded-[16px] px-2 py-1 text-left"
                      >
                        <div className="flex items-center justify-between text-sm font-semibold text-[#1E1C59]">
                          <span>{item.label}</span>
                          <span className="text-[#6B6794]">{item.value}%</span>
                        </div>
                        <div className="mt-2 h-2 rounded-full bg-[#E2F263]/22">
                          <div className="h-2 rounded-full bg-[#0CF25D]" style={{ width: `${item.value}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-[16px] bg-[#ece7ff] px-4 py-4">
                    <div className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#5a60d6]">
                      Anxiety trend
                    </div>
                    <div className="mt-2 text-sm leading-6 text-[#4f4b7a]">
                      Lower than last week, but still spikes when timing pressure appears too early.
                    </div>
                  </div>
                </section>
              </div>

              <section className="rounded-[22px] bg-white p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-[#1E1C59]">Learning signals</div>
                    <div className="mt-1 text-sm text-[#6B6794]">
                      Metrics that shape pace, confidence, and retention quality
                    </div>
                  </div>
                  <div className="rounded-full bg-[var(--brand-strong)] px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--brand-strong-foreground)]">
                    Signal model
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {signalRows.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.label}
                        className="flex w-full items-center gap-4 rounded-[16px] bg-white px-4 py-4 text-left"
                      >
                        <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${item.tint} text-[#1E1C59]`}>
                          <Icon size={20} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-semibold text-[#1E1C59]">{item.label}</div>
                          <div className="mt-1 text-sm text-[#6B6794]">{item.owner}</div>
                        </div>

                        <div className="w-[180px]">
                          <div className="flex items-center justify-between text-[12px] font-bold uppercase tracking-[0.14em] text-[#6B6794]">
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
                                      ? 'bg-[#0CF25D]'
                                      : 'bg-[#34268C]'
                                    : 'bg-[#E2F263]/24'
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
                  <div className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#6B6794]">
                    Recommended intervention
                  </div>
                  <div className="mt-4 space-y-3">
                    {interventions.map((item, index) => (
                      <div key={item} className="flex gap-3">
                        <div className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--brand-strong)] text-[12px] font-bold text-[var(--brand-strong-foreground)]">
                          {index + 1}
                        </div>
                        <div className="text-sm leading-6 text-[#6B6794]">{item}</div>
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
