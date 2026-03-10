import { motion } from 'motion/react';
import { MessageSquareMore, Sparkles, WandSparkles } from 'lucide-react';

import doodle from '@/assets/c66905e9277bdd045c5911a8ef1f9bc6131f4a00.png';

const promptCards = [
  {
    title: 'Clarify a concept',
    body: 'Explain photosynthesis like I am 12, then give me one analogy and one quick check question.',
  },
  {
    title: 'Plan a study block',
    body: 'I have 30 minutes for linear algebra. Split that time into explanation, practice, and review.',
  },
  {
    title: 'Repair confusion',
    body: 'I keep mixing velocity and acceleration. Compare them clearly and show one worked example.',
  },
];

export const ChatView = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_360px]">
      <section className="app-surface relative overflow-hidden rounded-[32px] p-6 sm:p-8">
        <img
          src={doodle}
          alt=""
          className="pointer-events-none absolute right-[-3rem] top-[-2rem] w-64 rotate-[14deg] opacity-[0.06]"
        />

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#17332d] px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#fffaf4]">
            <MessageSquareMore size={14} />
            Prompt lab
          </div>
          <h2 className="mt-5 text-3xl font-semibold text-[#17332d] sm:text-4xl">
            Better prompts, better answers, less wandering.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#60716b]">
            This space is designed for prompt drafting, question refinement, and turning broad curiosity into focused AI conversations.
          </p>
        </div>

        <div className="mt-8 grid gap-4">
          {promptCards.map((card) => (
            <div key={card.title} className="app-panel rounded-[28px] p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#17332d] text-[#fffaf4]">
                  <WandSparkles size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#17332d]">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#60716b]">{card.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <aside className="grid gap-4">
        <section className="app-surface rounded-[30px] p-5">
          <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#60716b]">Prompt checklist</div>
          <div className="mt-4 space-y-3">
            {[
              'State the topic and the exact part you do not understand.',
              'Ask for the format you want: example, plan, quiz, or summary.',
              'Set a level and time limit so the answer fits your context.',
            ].map((item) => (
              <div key={item} className="app-panel rounded-[24px] p-4 text-sm leading-6 text-[#17332d]">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="app-surface rounded-[30px] p-5">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#d77642] text-[#fffaf4]">
            <Sparkles size={18} />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-[#17332d]">Design direction</h3>
          <p className="mt-3 text-sm leading-6 text-[#60716b]">
            The chat route now behaves like a prompt studio instead of a blank placeholder. It gives users a starting structure before the actual AI layer is wired in.
          </p>
        </section>
      </aside>
    </motion.div>
  );
};
