import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, BookOpenCheck, Compass, Sparkles } from 'lucide-react';

import doodle from '@/assets/c66905e9277bdd045c5911a8ef1f9bc6131f4a00.png';

export const LoginView = () => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [goal, setGoal] = useState('');
  const [time, setTime] = useState('');
  const [isFreeMode, setIsFreeMode] = useState(false);
  const [freeText, setFreeText] = useState('');

  const handleNext = () => {
    navigate('/app/workspace', {
      state: {
        isFreeMode,
        topic,
        goal,
        time,
        freeText,
      },
    });
  };

  const samplePrompts = [
    'Build a 2-week IELTS speaking plan',
    'Help me understand probability from zero',
    'Design a biology revision path for finals',
  ];

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-5 text-[#17332d] sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <img
          src={doodle}
          alt=""
          className="absolute right-[-2rem] top-8 w-[18rem] rotate-[8deg] opacity-[0.08] blur-[1px] sm:w-[26rem]"
        />
        <div className="absolute bottom-[-6rem] left-[-4rem] h-72 w-72 rounded-full bg-[#d77642]/18 blur-3xl" />
        <div className="absolute right-[-5rem] top-1/4 h-80 w-80 rounded-full bg-[#5f8f82]/18 blur-3xl" />
        <div className="app-grid absolute inset-0 opacity-30" />
      </div>

      <div className="relative mx-auto grid min-h-[calc(100vh-2.5rem)] max-w-7xl gap-6 lg:grid-cols-[1.02fr_0.98fr]">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="app-surface flex flex-col justify-between rounded-[34px] px-6 py-8 sm:px-8 sm:py-10 lg:px-10"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#17332d] px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#fffaf4]">
              <Sparkles size={14} />
              CogniSense
            </div>

            <h1 className="mt-6 max-w-2xl text-4xl font-semibold leading-tight text-[#17332d] sm:text-5xl lg:text-6xl">
              A study interface that feels calm, clear, and actually usable.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-[#60716b] sm:text-lg">
              Tell the system what you want to learn and it will shape the workspace around your goal,
              time, and pace instead of dumping everything on one screen.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <FeatureCard
                icon={Compass}
                title="Guided path"
                description="Turn a topic and timeline into a structured next step."
              />
              <FeatureCard
                icon={BookOpenCheck}
                title="Focused workspace"
                description="Keep chat, plan, and follow-up prompts in one place."
              />
              <FeatureCard
                icon={Sparkles}
                title="Low-noise UI"
                description="Readable hierarchy, softer surfaces, and better spacing."
              />
            </div>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="app-panel rounded-[28px] p-5 sm:p-6">
              <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#60716b]">
                Prompt examples
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                {samplePrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => {
                      setIsFreeMode(true);
                      setFreeText(prompt);
                    }}
                    className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#17332d] transition hover:bg-[#17332d] hover:text-[#fffaf4]"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            <div className="app-panel rounded-[28px] p-5 sm:p-6">
              <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#60716b]">
                Current design goal
              </div>
              <p className="mt-3 text-lg font-bold text-[#17332d]">
                Replace clutter with a single, readable learning flow.
              </p>
              <p className="mt-3 text-sm leading-6 text-[#60716b]">
                This version prioritizes spacing, contrast, and visual rhythm over decorative outlines.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="app-surface relative rounded-[34px] p-5 sm:p-6 lg:p-8"
        >
          <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#60716b]">
                Start session
              </div>
              <h2 className="mt-2 text-2xl font-semibold text-[#17332d] sm:text-3xl">
                Shape your learning brief
              </h2>
            </div>

            <div className="rounded-full bg-[#f1ebdf] p-1">
              <button
                onClick={() => setIsFreeMode(false)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  isFreeMode ? 'text-[#60716b]' : 'bg-[#17332d] text-[#fffaf4]'
                }`}
              >
                Guided
              </button>
              <button
                onClick={() => setIsFreeMode(true)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  isFreeMode ? 'bg-[#17332d] text-[#fffaf4]' : 'text-[#60716b]'
                }`}
              >
                Free ask
              </button>
            </div>
          </div>

          <div className="mt-6 app-panel rounded-[30px] p-5 sm:p-6">
            {isFreeMode ? (
              <div>
                <label className="text-sm font-bold uppercase tracking-[0.2em] text-[#60716b]">
                  What do you want to learn?
                </label>
                <textarea
                  placeholder="Describe the topic, your situation, and what kind of help you want."
                  value={freeText}
                  onChange={(e) => setFreeText(e.target.value)}
                  className="mt-4 min-h-[280px] w-full rounded-[28px] border border-[#17332d]/10 bg-white/80 px-5 py-5 text-lg leading-8 text-[#17332d] outline-none transition placeholder:text-[#7b8a84] focus:border-[#17332d]/20 focus:bg-white"
                />
              </div>
            ) : (
              <div className="grid gap-4">
                <Field
                  label="Topic"
                  value={topic}
                  onChange={setTopic}
                  placeholder="Examples: algebra, French speaking, climate science"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Goal"
                    value={goal}
                    onChange={setGoal}
                    placeholder="Examples: pass an exam, build confidence, finish a project"
                  />
                  <Field
                    label="Study time"
                    value={time}
                    onChange={setTime}
                    placeholder="Examples: 20 min/day, 3 weeks, weekends only"
                  />
                </div>
                <div className="rounded-[24px] bg-[#17332d] px-5 py-4 text-sm leading-6 text-[#fffaf4]/86">
                  The workspace will use this brief to generate a cleaner plan, suggested questions, and
                  a more relevant chat context.
                </div>
              </div>
            )}
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-sm leading-6 text-[#60716b]">
              Start with a rough prompt if needed. The next screen is designed to refine it rather than
              punish incomplete input.
            </p>

            <button
              onClick={handleNext}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d77642] px-6 py-3 text-sm font-bold text-[#fffaf4] transition hover:bg-[#c96a38]"
            >
              Continue to workspace
              <ArrowRight size={18} />
            </button>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Compass;
  title: string;
  description: string;
}) => (
  <div className="app-panel rounded-[28px] p-5">
    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#17332d] text-[#fffaf4]">
      <Icon size={18} />
    </div>
    <h3 className="mt-4 text-lg font-semibold text-[#17332d]">{title}</h3>
    <p className="mt-2 text-sm leading-6 text-[#60716b]">{description}</p>
  </div>
);

const Field = ({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) => (
  <label className="app-panel block rounded-[26px] p-5">
    <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#60716b]">{label}</span>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="mt-3 w-full rounded-[18px] border border-[#17332d]/10 bg-white/82 px-4 py-4 text-base text-[#17332d] outline-none transition placeholder:text-[#7b8a84] focus:border-[#17332d]/20 focus:bg-white"
    />
  </label>
);
