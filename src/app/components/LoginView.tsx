import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

import doodle from '@/assets/c66905e9277bdd045c5911a8ef1f9bc6131f4a00.png';

export const LoginView = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'guided' | 'self'>('self');
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
    <div className="relative min-h-[100dvh] overflow-hidden px-4 py-5 text-[#313238] sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <img
          src={doodle}
          alt=""
          className="absolute right-[-2rem] top-8 w-[18rem] rotate-[8deg] opacity-[0.08] blur-[1px] sm:w-[26rem]"
        />
        <div className="absolute bottom-[-6rem] left-[-4rem] h-72 w-72 rounded-full bg-[#e5e0d7]/24 blur-3xl" />
        <div className="absolute right-[-5rem] top-1/4 h-80 w-80 rounded-full bg-[#ceb3a1]/18 blur-3xl" />
        <div className="absolute left-[28%] top-[14%] h-64 w-64 rounded-full bg-[#d0c6b8]/10 blur-3xl" />
        <div className="app-grid absolute inset-0 opacity-30" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100dvh-2.5rem)] max-w-[min(96vw,84rem)] items-center justify-center">
        <motion.section
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="relative w-full max-w-[min(92vw,78rem)] rounded-[44px] p-3 sm:p-5 lg:p-6"
        >
          <div className="rounded-[40px] border border-[#ebe7e1] bg-[#f6f4f1] px-6 py-7 shadow-[0_22px_42px_rgba(49,50,56,0.05),inset_0_1px_0_rgba(255,255,255,0.82)] sm:px-9 sm:py-9 lg:px-10 lg:py-10">
            <div className="mb-8 flex flex-col items-center gap-4">
              <div className="inline-flex rounded-full bg-[#ebe7e1] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]">
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
                        ? 'bg-[#202127] text-white shadow-[0_10px_18px_rgba(49,50,56,0.14)]'
                        : 'text-[#7a7063] hover:text-[#313238]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="rounded-full bg-white/88 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.28em] text-[#8b857f] shadow-[0_8px_18px_rgba(49,50,56,0.04)]">
                {mode === 'self' ? 'Self-directed learning mode' : 'Quick learning brief'}
              </div>
            </div>

            {mode === 'self' ? (
              <div className="mx-auto max-w-[min(100%,64rem)]">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe what you want to learn, your goal, what feels difficult, and how you want to study."
                  className="min-h-[220px] w-full resize-none rounded-[30px] bg-[#ece7e1] px-6 py-6 text-[1.15rem] font-medium leading-8 tracking-[-0.02em] text-[#313238] outline-none placeholder:text-[#938b82] sm:min-h-[260px] sm:px-8 sm:py-8 sm:text-[1.35rem]"
                />
              </div>
            ) : (
              <div className="mx-auto max-w-[min(100%,66rem)] text-center text-[clamp(1.35rem,1.1rem+1.05vw,2.1rem)] font-medium leading-[1.4] tracking-[-0.035em] text-[#5a4638]">
                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3">
                  <span>Hi Cogi, I want to learn</span>
                  <InlineField
                    value={topic}
                    onChange={setTopic}
                    placeholder="Topic"
                    widthClass="w-[210px] sm:w-[250px]"
                  />
                  <span>.</span>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-3 whitespace-nowrap">
                  <span>My goal is to</span>
                  <InlineField
                    value={goal}
                    onChange={setGoal}
                    placeholder="Learning Goal"
                    widthClass="w-[210px] sm:w-[260px]"
                  />
                  <span>, and I plan to study for</span>
                  <InlineField
                    value={time}
                    onChange={setTime}
                    placeholder="Time"
                    widthClass="w-[150px] sm:w-[180px]"
                  />
                  <span>.</span>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-end border-t border-[#313238]/8 pt-5 sm:mt-10">
              <button
                onClick={handleNext}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#202127] px-7 py-4 text-base font-semibold text-white shadow-[0_18px_28px_rgba(49,50,56,0.16)] transition hover:bg-[#313238]"
              >
                Continue
                <ArrowRight size={18} />
              </button>
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
  <label
    className={`inline-flex min-h-[60px] items-center rounded-full bg-[#e3dfda] px-5 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_8px_18px_rgba(49,50,56,0.04)] ${widthClass}`}
  >
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-transparent text-center text-[0.95rem] font-semibold text-[#313238] outline-none placeholder:text-[#a8a39d] sm:text-[1.05rem]"
    />
  </label>
);
