import { motion } from 'motion/react';
import { useLocation } from 'react-router';
import {
  AlertCircle,
  Bot,
  BookOpenCheck,
  Lightbulb,
  Send,
  Sparkles,
  User,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import doodle from '@/assets/c66905e9277bdd045c5911a8ef1f9bc6131f4a00.png';

interface LocationState {
  isFreeMode?: boolean;
  topic?: string;
  goal?: string;
  time?: string;
  freeText?: string;
}

interface Message {
  id: string;
  role: 'bot' | 'user';
  text: string;
}

export const WorkspaceView = () => {
  const location = useLocation();
  const state = location.state as LocationState | null;
  const estimatedTime = state?.time || '15-20 minutes';
  const topicName = state?.topic || 'Knowledge topic';
  const goalText = state?.goal || 'Build understanding step by step';
  const progressValue = state?.isFreeMode ? 32 : state?.topic || state?.goal || state?.time ? 46 : 24;
  const completedSteps = state?.isFreeMode ? 1 : 2;

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    if (messages.length > 0) return;

    let initialBotMessage = "I'm ready. Tell me where you're stuck and I'll help organize the next step.";
    let initialUserMessage = '';

    if (state) {
      if (state.isFreeMode && state.freeText) {
        initialUserMessage = state.freeText;
        initialBotMessage = `I mapped your request into a working brief. We can break "${state.freeText}" into a clear study sequence and start with the part that matters most.`;
      } else if (!state.isFreeMode && (state.topic || state.goal || state.time)) {
        initialUserMessage = `I want to study ${state.topic || 'something new'} so I can ${state.goal || 'improve'}, and I have ${state.time || 'some time'} available.`;
        initialBotMessage = `Good brief. I set up a focused workspace for ${state.topic || 'your topic'}, with your goal and study window guiding the recommendations.`;
      }
    }

    const initMsgs: Message[] = [];

    if (initialUserMessage) {
      initMsgs.push({ id: '0', role: 'user', text: initialUserMessage });
    }

    initMsgs.push({ id: '1', role: 'bot', text: initialBotMessage });

    setMessages(initMsgs);
  }, [messages.length, state]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMsg: Message = { id: Date.now().toString(), role: 'user', text: inputText };
    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-bot`,
          role: 'bot',
          text: 'Useful direction. I would turn that into a smaller target, a short explanation, and one practice step. Which of those do you want first?',
        },
      ]);
    }, 700);
  };

  const quickPrompts = [
    'Explain the core concept in simple terms',
    'Give me a 20-minute study plan',
    'Quiz me on the most important ideas',
  ];

  const conceptCards = [
    {
      title: 'Key point 01',
      text: topicName,
      tone: 'bg-[#e8ecfb] text-[#4f629b]',
    },
    {
      title: 'Key point 02',
      text: goalText,
      tone: 'bg-[#fde9ef] text-[#af5f78]',
    },
    {
      title: 'Key point 03',
      text: `Use ${estimatedTime} to explain first, then practice, then review.`,
      tone: 'bg-[#edf6ef] text-[#55735c]',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid h-full min-h-[calc(100vh-14rem)] gap-4 xl:grid-cols-[420px_minmax(0,1fr)_260px]"
    >
      <section className="app-surface relative flex min-h-0 flex-col overflow-hidden rounded-[32px]">
        <img
          src={doodle}
          alt=""
          className="pointer-events-none absolute right-[-2rem] top-[-3rem] w-64 rotate-[10deg] opacity-[0.06]"
        />

        <div className="border-b border-[#17332d]/8 px-5 py-5">
          <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#60716b]">
            Live conversation
          </div>
          <h2 className="mt-2 text-2xl font-semibold text-[#17332d]">Learning workspace</h2>
          <p className="mt-2 text-sm leading-6 text-[#60716b]">
            This area is only for questions, follow-ups, and clarification.
          </p>
        </div>

        <div className="flex min-h-0 flex-1 flex-col px-4 py-4">
          <div className="mb-4 flex flex-wrap gap-2">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => setInputText(prompt)}
                className="rounded-full bg-white/82 px-4 py-2 text-sm font-semibold text-[#17332d] transition hover:bg-[#17332d] hover:text-[#fffaf4]"
              >
                {prompt}
              </button>
            ))}
          </div>

          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className={clsx('flex gap-3', msg.role === 'user' ? 'justify-end' : 'justify-start')}
              >
                {msg.role === 'bot' && (
                  <div className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#17332d] text-[#fffaf4]">
                    <Bot size={18} />
                  </div>
                )}

                <div
                  className={clsx(
                    'max-w-[85%] rounded-[24px] px-5 py-4 text-[15px] leading-7 shadow-[0_16px_34px_rgba(18,38,34,0.06)] sm:text-base',
                    msg.role === 'user'
                      ? 'rounded-br-[10px] bg-[#17332d] text-[#fffaf4]'
                      : 'rounded-bl-[10px] bg-white/88 text-[#17332d]'
                  )}
                >
                  {msg.text}
                </div>

                {msg.role === 'user' && (
                  <div className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#d77642] text-[#fffaf4]">
                    <User size={18} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-4 rounded-[28px] bg-[#f4efe5] p-2">
            <div className="flex items-end gap-2">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                rows={1}
                placeholder="Ask a follow-up..."
                className="max-h-36 min-h-[120px] flex-1 resize-none rounded-[22px] bg-white/84 px-4 py-4 text-base text-[#17332d] outline-none placeholder:text-[#7b8a84]"
              />
              <button
                onClick={handleSend}
                className="inline-flex h-14 w-14 items-center justify-center rounded-[22px] bg-[#d77642] text-[#fffaf4] transition hover:bg-[#c96a38]"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="app-surface relative flex min-h-0 flex-col overflow-hidden rounded-[32px]">
        <img
          src={doodle}
          alt=""
          className="pointer-events-none absolute right-[-3rem] top-[-2rem] w-80 rotate-[12deg] opacity-[0.05]"
        />

        <div className="border-b border-[#17332d]/8 bg-[#dde3fb]/65 px-5 py-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              {['Knowledge board', 'Explanation view', topicName].map((chip, index) => (
                <div
                  key={chip}
                  className={clsx(
                    'rounded-full px-4 py-2 text-sm font-semibold',
                    index === 0 ? 'bg-white/84 text-[#17332d]' : 'bg-[#edf2ff] text-[#5b6fa5]'
                  )}
                >
                  {chip}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {['Definition', 'Examples', 'Common mistakes'].map((chip) => (
                <div key={chip} className="rounded-full bg-white/76 px-4 py-2 text-sm font-semibold text-[#50639b]">
                  {chip}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid min-h-0 flex-1 gap-4 bg-white/28 p-4 lg:grid-cols-[minmax(0,1fr)_240px]">
          <div className="rounded-[28px] bg-white/84 p-5 shadow-[0_14px_30px_rgba(18,38,34,0.05)]">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#7d7f89]">
              Knowledge board
            </div>
            <h2 className="mt-2 text-3xl font-semibold text-[#17332d] sm:text-4xl">
              {topicName}
            </h2>

            <div className="mt-6 rounded-[24px] bg-[linear-gradient(180deg,#f8fbff_0%,#eef3ff_100%)] p-5">
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[#60716b]">
                <Lightbulb size={16} />
                Core idea
              </div>
              <div className="mt-4 rounded-[20px] bg-white/88 p-5 shadow-[0_10px_22px_rgba(18,38,34,0.04)]">
                <div className="text-lg font-semibold text-[#17332d]">Plain-language explanation</div>
                <div className="mt-2 text-sm leading-7 text-[#51615c]">
                  This panel is fully separate from chat and acts like a reading board. It explains the
                  concept in a structured way so the learner can study without conversation noise.
                </div>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {conceptCards.map((card) => (
                  <div
                    key={card.title}
                    className={clsx(
                      'rounded-[20px] p-4 shadow-[0_10px_22px_rgba(18,38,34,0.04)]',
                      card.tone
                    )}
                  >
                    <div className="text-base font-semibold">{card.title}</div>
                    <div className="mt-2 text-sm leading-6 text-[#17332d]/80">{card.text}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-[24px] bg-[#fff7fa] p-5">
              <div className="text-sm font-bold uppercase tracking-[0.18em] text-[#60716b]">
                Worked example
              </div>
              <div className="mt-3 text-base font-semibold text-[#17332d]">Think of it like this</div>
              <div className="mt-2 text-sm leading-7 text-[#51615c]">
                Start with the simplest version of the idea, run through one example slowly, and compare
                each step with the explanation board before moving back to questions.
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[26px] bg-[#f3f7ef] p-5 shadow-[0_12px_28px_rgba(18,38,34,0.04)]">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#8b8d98]">Focus</div>
              <div className="mt-2 text-sm font-semibold leading-6 text-[#17332d]">{goalText}</div>
            </div>

            <div className="rounded-[26px] bg-[#fdf4ee] p-5 shadow-[0_12px_28px_rgba(18,38,34,0.04)]">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#8b8d98]">
                <AlertCircle size={14} />
                Common mistake
              </div>
              <div className="mt-2 text-sm font-semibold leading-6 text-[#17332d]">
                Learners often jump back into chat too early. Read the explanation panel once, mark the
                key point you still do not understand, then ask a focused question.
              </div>
            </div>

            <div className="rounded-[26px] bg-[#eef2ff] p-5 shadow-[0_12px_28px_rgba(18,38,34,0.04)]">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#8b8d98]">
                <BookOpenCheck size={14} />
                Study instruction
              </div>
              <div className="mt-2 text-sm font-semibold leading-6 text-[#17332d]">
                Use the board first for reading and synthesis, then use chat only for clarification,
                examples, and follow-up prompts.
              </div>
            </div>

            <div className="rounded-[26px] bg-[#fffdf7] p-5 shadow-[0_12px_28px_rgba(18,38,34,0.04)]">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#8b8d98]">
                <Sparkles size={14} />
                Reading mode
              </div>
              <div className="mt-2 text-sm font-semibold leading-6 text-[#17332d]">
                The board is intentionally independent from chat so the learner can scan, read, and review
                without the message stream competing for attention.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[32px] bg-[#f8edf2] p-5 shadow-[0_18px_40px_rgba(18,38,34,0.06)]">
        <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#8b8d98]">Auto record</div>
        <h3 className="mt-2 text-2xl font-semibold text-[#17332d]">Learning progress</h3>

        <div className="mt-5 rounded-[24px] bg-white/78 p-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#60716b]">
                Current progress
              </div>
              <div className="mt-2 text-3xl font-semibold text-[#17332d]">{progressValue}%</div>
            </div>
            <div className="text-right">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#60716b]">
                Estimated time
              </div>
              <div className="mt-2 text-lg font-semibold text-[#17332d]">{estimatedTime}</div>
            </div>
          </div>

          <div className="mt-4 h-3 rounded-full bg-[#eef1f6]">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-[#ef9fb0] via-[#d9c7ea] to-[#8ea2db]"
              style={{ width: `${progressValue}%` }}
            />
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <RecordRow label="Topic" value={topicName} />
          <RecordRow label="Goal" value={goalText} />
          <RecordRow label="Completed" value={`${completedSteps}/4 milestones logged`} />
          <RecordRow
            label="Next checkpoint"
            value="Finish one explanation, one example, and one recall check"
          />
          <RecordRow
            label="Suggested pace"
            value={`Use ${estimatedTime}, then save one short reflection before ending`}
          />
        </div>
      </section>
    </motion.div>
  );
};

const RecordRow = ({ label, value }: { label: string; value: string }) => (
  <div className="app-panel rounded-[24px] p-4">
    <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#60716b]">{label}</div>
    <div className="mt-2 text-sm leading-6 text-[#17332d]">{value}</div>
  </div>
);
