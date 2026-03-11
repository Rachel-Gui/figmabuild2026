import { motion } from 'motion/react';
import {
  BookmarkCheck,
  Clock3,
  FileClock,
  FolderGit2,
  FolderOpen,
  History,
  Search,
  Target,
} from 'lucide-react';

import doodle from '@/assets/c66905e9277bdd045c5911a8ef1f9bc6131f4a00.png';

const folders = [
  {
    title: 'Biology review',
    count: '12 records',
    updated: 'Updated 2 hours ago',
    tone: 'bg-[#e5e0d7]',
  },
  {
    title: 'Math practice',
    count: '9 records',
    updated: 'Updated yesterday',
    tone: 'bg-[#f3efe8]',
  },
  {
    title: 'Writing feedback',
    count: '7 records',
    updated: 'Updated 3 days ago',
    tone: 'bg-[#d0c6b8]',
  },
  {
    title: 'Physics concepts',
    count: '15 records',
    updated: 'Updated this week',
    tone: 'bg-[#ceb3a1]',
  },
];

const historyRecords = [
  {
    title: 'Cell respiration summary',
    folder: 'Biology review',
    time: 'Today, 4:20 PM',
    note: 'Saved concept notes, one worked example, and a follow-up quiz prompt.',
  },
  {
    title: 'Quadratic equations error log',
    folder: 'Math practice',
    time: 'Today, 11:10 AM',
    note: 'Recorded two common mistakes and one corrected solution path.',
  },
  {
    title: 'Essay outline revision',
    folder: 'Writing feedback',
    time: 'Yesterday, 8:45 PM',
    note: 'Stored the revised structure, thesis options, and teacher feedback summary.',
  },
  {
    title: 'Newton laws recap',
    folder: 'Physics concepts',
    time: 'Mar 8, 6:05 PM',
    note: 'Kept the simplified definition set and three application questions.',
  },
];

const pinnedItems = [
  'Saved boards stay here after each session.',
  'Use folders to revisit past topics without opening the workspace first.',
  'Recent notes, explanations, and examples are grouped by subject.',
];

const archiveStats = [
  { label: 'Folders', value: '04' },
  { label: 'Saved boards', value: '43' },
  { label: 'This week', value: '11' },
];

const futureGoals = [
  {
    title: 'Build a steady weekly review habit',
    note: 'Turn saved folders into a lightweight rhythm for revisiting key topics.',
  },
  {
    title: 'Connect short sessions into one track',
    note: 'Keep notes, examples, and corrections tied to the same long-term subject.',
  },
  {
    title: 'Spot progress earlier',
    note: 'Use past boards to notice stronger recall, cleaner reasoning, and fewer repeated mistakes.',
  },
];

export const ChatView = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid h-full min-h-0 gap-4 overflow-hidden lg:grid-cols-[minmax(0,1.2fr)_360px]"
    >
      <section className="app-surface relative flex min-h-0 flex-col overflow-hidden rounded-[32px] p-6 sm:p-8">
        <img
          src={doodle}
          alt=""
          className="pointer-events-none absolute right-[-3rem] top-[-2rem] w-64 rotate-[14deg] opacity-[0.06]"
        />
        <div className="pointer-events-none absolute inset-x-8 top-0 h-24 rounded-b-[32px] bg-[linear-gradient(180deg,rgba(208,198,184,0.16)_0%,rgba(208,198,184,0)_100%)]" />

        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#313238] px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#f4f1eb]">
              <FolderOpen size={14} />
              Folder
            </div>
            <h2 className="mt-5 text-3xl font-semibold text-[#313238] sm:text-4xl">
              Previous learning records, saved in one place.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#5f564c]">
              This page works like a study archive. Each folder keeps past explanations, saved notes,
              worked examples, and review history from earlier sessions.
            </p>
          </div>

          <div className="mt-8 rounded-[28px] bg-[#e5e0d7] p-3">
            <div className="flex items-center gap-3 rounded-[22px] bg-[#f3efe8] px-4 py-4 text-sm text-[#5f564c]">
              <Search size={18} className="text-[#313238]" />
              Search previous topics, notes, or saved boards
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {archiveStats.map((item) => (
              <div key={item.label} className="app-frost rounded-[22px] px-4 py-4">
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#5f564c]">
                  {item.label}
                </div>
                <div className="mt-2 text-2xl font-semibold text-[#313238]">{item.value}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {folders.map((folder) => (
              <div key={folder.title} className={`rounded-[28px] p-5 shadow-[0_14px_32px_rgba(49,50,56,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(49,50,56,0.08)] ${folder.tone}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#313238] text-[#f4f1eb] shadow-[0_12px_20px_rgba(49,50,56,0.14)]">
                    <FolderGit2 size={18} />
                  </div>
                  <div className="rounded-full bg-white/65 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#5f564c]">
                    {folder.count}
                  </div>
                </div>

                <h3 className="mt-5 text-xl font-semibold text-[#313238]">{folder.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#5f564c]">{folder.updated}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[30px] bg-[#f3efe8] p-5 shadow-[0_14px_30px_rgba(49,50,56,0.05)]">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#be7d62] text-[#f4f1eb]">
                <History size={18} />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#5f564c]">
                  Recent history
                </div>
                <div className="text-xl font-semibold text-[#313238]">Saved learning records</div>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {historyRecords.map((record) => (
                <div key={record.title} className="app-panel rounded-[24px] p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-base font-semibold text-[#313238]">{record.title}</div>
                      <div className="mt-1 text-sm font-semibold text-[#5f564c]">{record.folder}</div>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#f3efe8] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#5f564c]">
                      <Clock3 size={12} />
                      {record.time}
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[#5f564c]">{record.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <aside className="grid min-h-0 content-start gap-4 overflow-y-auto pr-1">
        <section className="app-surface shrink-0 rounded-[30px] p-5">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e5e0d7] text-[#313238] shadow-[0_10px_18px_rgba(49,50,56,0.08)]">
            <BookmarkCheck size={18} />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-[#313238]">Pinned notes</h3>
          <div className="mt-4 space-y-3">
            {pinnedItems.map((item) => (
              <div key={item} className="app-panel rounded-[24px] p-4 text-sm leading-6 text-[#313238]">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="app-surface shrink-0 rounded-[30px] p-5">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#d0c6b8] text-[#313238] shadow-[0_10px_18px_rgba(49,50,56,0.08)]">
            <FileClock size={18} />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-[#313238]">Archive logic</h3>
          <p className="mt-3 text-sm leading-6 text-[#5f564c]">
            Each saved board acts like a snapshot of an earlier session, so the learner can reopen
            explanations and past mistakes without mixing them into the live workspace.
          </p>
        </section>

        <section className="app-surface shrink-0 rounded-[30px] p-5">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ceb3a1] text-[#313238] shadow-[0_10px_18px_rgba(49,50,56,0.08)]">
            <Target size={18} />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-[#313238]">Future learning goals</h3>
          <div className="mt-4 space-y-3">
            {futureGoals.map((goal) => (
              <div key={goal.title} className="app-panel rounded-[24px] p-4">
                <div className="text-sm font-semibold leading-6 text-[#313238]">{goal.title}</div>
                <p className="mt-2 text-sm leading-6 text-[#5f564c]">{goal.note}</p>
              </div>
            ))}
          </div>
        </section>
      </aside>
    </motion.div>
  );
};
