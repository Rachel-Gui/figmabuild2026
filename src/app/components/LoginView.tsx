import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

import doodle from '@/assets/c66905e9277bdd045c5911a8ef1f9bc6131f4a00.png';

export const LoginView = () => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [goal, setGoal] = useState('');
  const [time, setTime] = useState('');

  const handleNext = () => {
    navigate('/app/workspace', {
      state: {
        isFreeMode: false,
        topic,
        goal,
        time,
        freeText: '',
      },
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-5 text-[#313238] sm:px-6 lg:px-8">
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

      <div className="relative mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-5xl items-center justify-center">
        <motion.section
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="app-surface relative w-full max-w-4xl rounded-[40px] p-4 sm:p-6 lg:p-7"
        >
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
          <div className="pointer-events-none absolute inset-x-8 top-0 h-20 rounded-b-[30px] bg-[linear-gradient(180deg,rgba(208,198,184,0.16)_0%,rgba(208,198,184,0)_100%)]" />
          <div className="rounded-[34px] border border-[#313238]/10 bg-[#f3efe8] px-5 py-8 shadow-[0_18px_32px_rgba(49,50,56,0.05)] sm:px-8 sm:py-10">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-white/65 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-[#7a7063]">
                Quick learning brief
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-4 text-center text-[1.85rem] font-medium leading-[1.4] text-[#5a4638] sm:text-[2.55rem]">
              <span>Hi Cogi, I want to learn</span>
              <InlineField
                value={topic}
                onChange={setTopic}
                placeholder="Topic"
                widthClass="w-[220px] sm:w-[260px]"
              />
              <span>.</span>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-4 text-center text-[1.85rem] font-medium leading-[1.4] text-[#5a4638] sm:text-[2.55rem]">
              <span>My goal is to</span>
              <InlineField
                value={goal}
                onChange={setGoal}
                placeholder="Learning Goal"
                widthClass="w-[260px] sm:w-[320px]"
              />
              <span>, and I plan to study for</span>
              <InlineField
                value={time}
                onChange={setTime}
                placeholder="Time"
                widthClass="w-[180px] sm:w-[220px]"
              />
              <span>.</span>
            </div>

            <div className="mt-8 flex flex-col gap-4 border-t border-[#313238]/8 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-center text-sm leading-6 text-[#7a7063] sm:text-left">
                Fill in one sentence to open your workspace.
              </div>
              <button
                onClick={handleNext}
                className="inline-flex items-center justify-center gap-2 self-center rounded-full bg-[#313238] px-6 py-3 text-sm font-bold text-[#f4f1eb] shadow-[0_14px_24px_rgba(49,50,56,0.14)] transition hover:bg-[#7a7063] sm:self-auto"
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
  <label className={`inline-flex min-h-[58px] items-center rounded-full border border-[#313238]/6 bg-[#d9d7d5] px-5 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_8px_18px_rgba(49,50,56,0.04)] ${widthClass}`}>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-transparent text-center text-base font-semibold text-[#313238] outline-none placeholder:text-[#a9a6a3] sm:text-[1.05rem]"
    />
  </label>
);
