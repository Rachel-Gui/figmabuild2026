import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

import doodle from '@/assets/c66905e9277bdd045c5911a8ef1f9bc6131f4a00.png';

export const LoginView = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'guided' | 'self'>('guided');
  const [prompt, setPrompt] = useState('');
  const [topic, setTopic] = useState('');
  const [goal, setGoal] = useState('');
  const [time, setTime] = useState('');

  const handleNext = () => {
    navigate('/app/workspace', {
      state: {
        isFreeMode: mode === 'self',
        topic: mode === 'guided' ? topic : '',
        goal: mode === 'guided' ? goal : '',
        time: mode === 'guided' ? time : '',
        freeText: mode === 'self' ? prompt : '',
      },
    });
  };

  return (
    <div className="relative h-[100dvh] overflow-y-auto px-4 py-5 text-[#1E1C59] sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <img
          src={doodle}
          alt=""
          className="absolute right-[-2rem] top-8 w-[18rem] rotate-[8deg] opacity-[0.08] blur-[1px] sm:w-[26rem]"
        />
        <div className="absolute bottom-[-6rem] left-[-4rem] h-72 w-72 rounded-full bg-[#ffd39a]/34 blur-3xl" />
        <div className="absolute right-[-5rem] top-1/4 h-80 w-80 rounded-full bg-[#ebb3ff]/30 blur-3xl" />
        <div className="absolute left-[28%] top-[14%] h-64 w-64 rounded-full bg-[#aab6ff]/24 blur-3xl" />
        <div className="app-grid absolute inset-0 opacity-30" />
      </div>

      <div className="relative mx-auto flex min-h-full max-w-[min(96vw,84rem)] items-center justify-center">
        <motion.section
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="relative w-full max-w-[min(90vw,54rem)] rounded-[32px] p-2 sm:p-3"
        >
          <div className="app-surface rounded-[28px]">
            <div className="px-5 py-5 sm:px-6 sm:py-6">
              <div className="mb-6 flex flex-col items-center gap-4">
                <div className="app-frost inline-flex rounded-full p-1">
                  {[
                    ['guided', 'Guided'],
                    ['self', 'Self-directed'],
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setMode(value as 'guided' | 'self')}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                        mode === value
                          ? 'bg-[var(--brand-strong)] text-[var(--brand-strong-foreground)]'
                          : 'text-[#6B6794] hover:text-[#1E1C59]'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

              </div>

              {mode === 'self' ? (
                <div className="mx-auto flex min-h-[120px] w-full max-w-[38rem] items-center sm:min-h-[130px] sm:max-w-[40rem]">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe what you want to learn, your goal, what feels difficult, and how you want to study."
                    className="app-glass-field h-[120px] w-full resize-none rounded-[24px] px-5 py-4 text-[1.04rem] font-medium leading-7 tracking-[-0.02em] text-[#1E1C59] outline-none placeholder:text-[#6B6794] sm:h-[130px] sm:px-6 sm:py-4 sm:text-[1.12rem]"
                  />
                </div>
              ) : (
                <div className="mx-auto flex min-h-[120px] w-full max-w-[38rem] items-center justify-center sm:min-h-[130px] sm:max-w-[40rem]">
                  <div className="w-full text-center text-[clamp(1.02rem,0.96rem+0.42vw,1.22rem)] font-medium leading-[1.45] tracking-[-0.02em] text-[#6B6794]">
                    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3">
                      <span>Hi Cogi, I want to learn</span>
                      <InlineField
                        value={topic}
                        onChange={setTopic}
                        placeholder="Topic"
                        widthClass="w-[108px] sm:w-[140px]"
                      />
                      <span>.</span>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-3 whitespace-nowrap">
                      <span>My goal is to</span>
                      <InlineField
                        value={goal}
                        onChange={setGoal}
                        placeholder="Learning Goal"
                        widthClass="w-[126px] sm:w-[156px]"
                      />
                      <span>, and I plan to study for</span>
                      <InlineField
                        value={time}
                        onChange={setTime}
                        placeholder="Time"
                        widthClass="w-[72px] sm:w-[92px]"
                      />
                      <span>.</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-end border-t border-[#1E1C59]/8 pt-5 sm:mt-7">
                <button
                  onClick={handleNext}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-strong)] px-7 py-4 text-base font-semibold text-[var(--brand-strong-foreground)] transition hover:bg-[var(--brand-strong-hover)]"
                >
                  Continue
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

const InlineField = ({
  value,
  onChange,
  placeholder,
  widthClass,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  widthClass: string;
}) => (
  <label className={`app-glass-field inline-flex min-h-[36px] items-center rounded-full px-2.5 py-0.5 ${widthClass}`}>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-transparent text-center text-[clamp(0.94rem,0.9rem+0.34vw,1.14rem)] font-medium tracking-[-0.02em] text-[#1E1C59] outline-none placeholder:text-[#6B6794]"
    />
  </label>
);
