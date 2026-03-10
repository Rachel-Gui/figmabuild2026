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
          className="relative w-full max-w-6xl rounded-[44px] p-4 sm:p-5 lg:p-6"
        >
          <div className="rounded-[40px] border border-[#ebe7e1] bg-[#f6f4f1] px-6 py-7 shadow-[0_22px_42px_rgba(49,50,56,0.05),inset_0_1px_0_rgba(255,255,255,0.82)] sm:px-10 sm:py-10">
            <div className="mb-8 flex justify-center">
              <div className="rounded-full bg-white/88 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.28em] text-[#8b857f] shadow-[0_8px_18px_rgba(49,50,56,0.04)]">
                Quick learning brief
              </div>
            </div>

            <div className="mx-auto max-w-5xl text-center text-[1.6rem] font-medium leading-[1.4] tracking-[-0.035em] text-[#5a4638] sm:text-[2.15rem]">
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

              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-3">
                <span>My goal is to</span>
                <InlineField
                  value={goal}
                  onChange={setGoal}
                  placeholder="Learning Goal"
                  widthClass="w-[240px] sm:w-[300px]"
                />
                <span>, and I plan to study for</span>
                <InlineField
                  value={time}
                  onChange={setTime}
                  placeholder="Time"
                  widthClass="w-[170px] sm:w-[210px]"
                />
                <span>.</span>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-4 border-t border-[#313238]/8 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm leading-6 text-[#8b857f]">
                Fill in one sentence to open your workspace.
              </div>
              <button
                onClick={handleNext}
                className="inline-flex items-center justify-center gap-2 self-end rounded-full bg-[#202127] px-7 py-4 text-base font-semibold text-white shadow-[0_18px_28px_rgba(49,50,56,0.16)] transition hover:bg-[#313238] sm:self-auto"
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
