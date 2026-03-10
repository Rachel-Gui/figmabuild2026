import { motion } from 'motion/react';
import { useLocation } from 'react-router';
import {
  AlertCircle,
  Bot,
  BookOpenCheck,
  Dna,
  FlaskConical,
  Check,
  Leaf,
  Lightbulb,
  Microscope,
  Orbit,
  Paperclip,
  Send,
  User,
  X,
} from 'lucide-react';
import { type ChangeEvent, useEffect, useRef, useState } from 'react';
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

type BoardSection = 'definition' | 'examples' | 'mistakes';

interface KnowledgePage {
  id: string;
  title: string;
  subtitle: string;
  definition: string;
  focus: string;
  mistake: string;
  exampleTitle: string;
  exampleBody: string;
  keyPoints: string[];
}

const buildKnowledgePages = (
  topicName: string,
  goalText: string,
  estimatedTime: string
): KnowledgePage[] => [
  {
    id: 'overview',
    title: topicName,
    subtitle: 'Core concept overview',
    definition:
      `This page explains ${topicName} in plain language so the learner can understand the big idea before asking detailed questions.`,
    focus: goalText,
    mistake:
      'Do not jump straight to exercises. Read the concept once, restate it, and then test your understanding.',
    exampleTitle: 'Worked example',
    exampleBody:
      `Start with one simple case, explain each step slowly, and use ${estimatedTime} to move from explanation to practice and review.`,
    keyPoints: [
      `Understand the main idea behind ${topicName}.`,
      'Connect the idea to one concrete use case.',
      'End with a short retrieval check.',
    ],
  },
  {
    id: 'summary',
    title: 'Key Ideas Summary',
    subtitle: 'Condensed study page',
    definition:
      'This page compresses the lesson into the smallest set of ideas the learner must keep in working memory.',
    focus: 'Remember the structure first, then fill in the details.',
    mistake:
      'Memorizing isolated facts without the structure makes review harder and transfer weaker.',
    exampleTitle: 'Use it in one sentence',
    exampleBody:
      'Ask the learner to explain the topic in one sentence, then add one supporting detail and one exception.',
    keyPoints: [
      'State the concept clearly.',
      'Identify the supporting idea.',
      'Recall one example without notes.',
    ],
  },
  {
    id: 'examples',
    title: 'Worked Examples',
    subtitle: 'Application-first page',
    definition:
      'This page is for learning by example. It shows how the concept behaves in practice before the learner attempts it alone.',
    focus: 'Translate theory into one visible process.',
    mistake:
      'Looking at the answer too early prevents the learner from noticing where their reasoning broke down.',
    exampleTitle: 'Practice sequence',
    exampleBody:
      'Read the prompt, predict the result, compare with the worked solution, then explain why the correct answer makes sense.',
    keyPoints: [
      'Predict before checking.',
      'Compare your reasoning with the model answer.',
      'Write down the step that changed your answer.',
    ],
  },
];

const buildNewKnowledgePage = (
  index: number,
  topicName: string,
  goalText: string,
  estimatedTime: string
): KnowledgePage => {
  const pageTypes = [
    {
      suffix: 'Review Page',
      subtitle: 'Recall and review board',
      definition:
        'This page is optimized for review. It should help the learner revisit the topic quickly and notice weak spots.',
      focus: 'Review the highest-value idea first, then the weakest point.',
      mistake: 'Reviewing passively without retrieval gives a false sense of mastery.',
      exampleTitle: 'Quick review routine',
      exampleBody:
        `Spend ${estimatedTime} revisiting definitions, then answer three short prompts without looking back at notes.`,
      keyPoints: ['Recall from memory.', 'Check accuracy.', 'Mark one weak spot for tomorrow.'],
    },
    {
      suffix: 'Question Bank',
      subtitle: 'Prompt and self-check page',
      definition:
        'This page collects the best learner questions and self-check prompts for the topic.',
      focus: goalText,
      mistake: 'Questions that are too broad make it harder to identify what is actually unclear.',
      exampleTitle: 'Ask sharper questions',
      exampleBody:
        'Turn a vague question into a target question by naming the exact step, concept, or example that feels unclear.',
      keyPoints: ['Name the confusion.', 'Ask for one example.', 'Check your answer after reading.'],
    },
    {
      suffix: 'Practice Notes',
      subtitle: 'Action and reflection page',
      definition:
        'This page is for practice notes, quick reflections, and what the learner should do next.',
      focus: 'Convert understanding into one visible action.',
      mistake: 'Finishing practice without reflection makes it easy to repeat the same mistake later.',
      exampleTitle: 'Close the loop',
      exampleBody:
        'After one exercise, write what worked, what failed, and what you will change on the next attempt.',
      keyPoints: ['Do one action.', 'Record one mistake.', 'Define one next step.'],
    },
  ];

  const variant = pageTypes[(index - 1) % pageTypes.length];

  return {
    id: `page-${Date.now()}-${index}`,
    title: `${topicName} ${variant.suffix}`,
    subtitle: variant.subtitle,
    definition: variant.definition,
    focus: variant.focus,
    mistake: variant.mistake,
    exampleTitle: variant.exampleTitle,
    exampleBody: variant.exampleBody,
    keyPoints: variant.keyPoints,
  };
};

const scienceVisualNodes = [
  {
    label: 'Observation',
    detail: 'Notice structure, color, and change over time.',
    icon: Microscope,
    tone: 'bg-[#e5e0d7] text-[#313238]',
  },
  {
    label: 'Cell process',
    detail: 'Track what moves, transforms, or reacts.',
    icon: Dna,
    tone: 'bg-[#d0c6b8] text-[#313238]',
  },
  {
    label: 'Environment',
    detail: 'Connect the organism to habitat and conditions.',
    icon: Leaf,
    tone: 'bg-[#ceb3a1] text-[#313238]',
  },
  {
    label: 'Experiment',
    detail: 'Change one factor and compare the outcome.',
    icon: FlaskConical,
    tone: 'bg-[#ceb3a1] text-[#313238]',
  },
];

export const WorkspaceView = () => {
  const location = useLocation();
  const state = location.state as LocationState | null;
  const estimatedTime = state?.time || '15-20 minutes';
  const topicName = state?.topic || 'Knowledge topic';
  const goalText = state?.goal || 'Build understanding step by step';
  const progressValue = state?.isFreeMode ? 32 : state?.topic || state?.goal || state?.time ? 46 : 24;
  const completedSteps = state?.isFreeMode ? 1 : 2;

  const initialPages = buildKnowledgePages(topicName, goalText, estimatedTime);

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [knowledgePages, setKnowledgePages] = useState<KnowledgePage[]>(initialPages);
  const [activePageId, setActivePageId] = useState<string>(initialPages[0].id);
  const [activeBoardSection, setActiveBoardSection] = useState<BoardSection>('definition');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const handleAddPage = () => {
    const newPage = buildNewKnowledgePage(
      knowledgePages.length + 1,
      topicName,
      goalText,
      estimatedTime
    );
    setKnowledgePages((prev) => [...prev, newPage]);
    setActivePageId(newPage.id);
    setActiveBoardSection('definition');
  };

  const handleRemovePage = (pageId: string) => {
    if (knowledgePages.length <= 1) return;

    const pageIndex = knowledgePages.findIndex((page) => page.id === pageId);
    if (pageIndex === -1) return;

    const nextPages = knowledgePages.filter((page) => page.id !== pageId);
    setKnowledgePages(nextPages);

    if (activePageId === pageId) {
      const fallbackPage = nextPages[Math.max(0, pageIndex - 1)] ?? nextPages[0];
      setActivePageId(fallbackPage.id);
      setActiveBoardSection('definition');
    }
  };

  const activePage = knowledgePages.find((page) => page.id === activePageId) ?? knowledgePages[0];

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFileName(file?.name ?? '');
  };

  const recordItems = [
    { label: 'Topic', value: topicName, completed: true },
    { label: 'Goal', value: goalText, completed: true },
    { label: 'Completed', value: `${completedSteps}/4 milestones logged`, completed: completedSteps >= 2 },
    { label: 'Active page', value: activePage.title, completed: activePageId !== initialPages[0].id },
    {
      label: 'Suggested pace',
      value: `Use ${estimatedTime}, then save one short reflection before ending`,
      completed: progressValue >= 40,
    },
  ];

  const sectionButtons: { id: BoardSection; label: string }[] = [
    { id: 'definition', label: 'Definition' },
    { id: 'examples', label: 'Examples' },
    { id: 'mistakes', label: 'Common mistakes' },
  ];

  const quickPrompts = [
    'Explain the core concept in simple terms',
    'Give me a 20-minute study plan',
    'Quiz me on the most important ideas',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid h-full min-h-[calc(100vh-14rem)] gap-5 xl:grid-cols-[minmax(360px,1fr)_minmax(0,2fr)]"
    >
      <div className="flex min-h-0 flex-col gap-3">
        <section className="app-surface relative shrink-0 overflow-hidden rounded-[32px] p-3.5">
          <div className="pointer-events-none absolute right-[-1.5rem] top-[-1.5rem] h-20 w-20 rounded-full bg-white/20 blur-2xl" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(190,125,98,0.18)_0%,rgba(208,198,184,0.08)_100%)]" />
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#7a7063]">Auto record</div>
              <h3 className="mt-1 text-[1.2rem] font-semibold text-[#313238]">Learning progress</h3>
            </div>
            <div className="app-frost rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#7a7063]">
              To do list
            </div>
          </div>

          <div className="app-frost mt-3 rounded-[22px] p-2.5">
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="rounded-[18px] bg-white/38 px-3 py-2.5 backdrop-blur-xl">
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7a7063]">
                  Current progress
                </div>
                <div className="mt-1 text-[1.55rem] font-semibold leading-none text-[#313238]">
                  {progressValue}%
                </div>
              </div>
              <div className="rounded-[18px] bg-white/38 px-3 py-2.5 backdrop-blur-xl sm:text-right">
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7a7063]">
                  Estimated time
                </div>
                <div className="mt-1 text-[1.2rem] font-semibold leading-none text-[#313238]">
                  {estimatedTime}
                </div>
              </div>
            </div>

            <div className="mt-2.5 h-2 rounded-full bg-[#e5e0d7]">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-[#313238] via-[#d0c6b8] to-[#be7d62]"
                style={{ width: `${progressValue}%` }}
              />
            </div>
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {recordItems.map((item) => (
              <RecordRow
                key={item.label}
                label={item.label}
                value={item.value}
                completed={item.completed}
              />
            ))}
          </div>
        </section>

        <section className="app-surface relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-[32px]">
          <img
            src={doodle}
            alt=""
            className="pointer-events-none absolute right-[-2rem] top-[-3rem] w-64 rotate-[10deg] opacity-[0.05]"
          />

          <div className="border-b border-[#313238]/8 bg-[linear-gradient(180deg,rgba(208,198,184,0.12)_0%,rgba(208,198,184,0)_100%)] px-5 py-5">
            <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#7a7063]">
              Live conversation
            </div>
            <h2 className="mt-2 text-2xl font-semibold text-[#313238]">Learning workspace</h2>
            <p className="mt-2 text-sm leading-6 text-[#7a7063]">
              This area is only for questions, follow-ups, and clarification.
            </p>
          </div>

          <div className="flex min-h-0 flex-1 flex-col px-4 py-4">
            <div className="mb-4 flex flex-wrap gap-2">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => setInputText(prompt)}
                  className="rounded-full bg-[#e5e0d7] px-4 py-2 text-sm font-semibold text-[#313238] shadow-[0_8px_16px_rgba(49,50,56,0.05)] transition hover:bg-[#313238] hover:text-[#f4f1eb]"
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
                    <div className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#313238] text-[#f4f1eb]">
                      <Bot size={18} />
                    </div>
                  )}

                  <div
                    className={clsx(
                      'max-w-[85%] rounded-[24px] px-5 py-4 text-[15px] leading-7 shadow-[0_16px_34px_rgba(18,38,34,0.06)] sm:text-base',
                      msg.role === 'user'
                        ? 'rounded-br-[10px] bg-[#313238] text-[#f4f1eb]'
                        : 'rounded-bl-[10px] bg-[#f3efe8] text-[#313238]'
                    )}
                  >
                    {msg.text}
                  </div>

                  {msg.role === 'user' && (
                    <div className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#be7d62] text-[#f4f1eb]">
                      <User size={18} />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="app-frost mt-4 rounded-[28px] p-2">
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="flex items-end gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-[22px] bg-white/42 text-[#313238] transition hover:bg-white/58"
                  aria-label="Upload file"
                >
                  <Paperclip size={18} />
                </button>
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
                  className="max-h-36 min-h-[120px] flex-1 resize-none rounded-[22px] bg-white/42 px-4 py-4 text-base text-[#313238] outline-none placeholder:text-[#8f857a] backdrop-blur-xl"
                />
                <button
                  onClick={handleSend}
                  className="inline-flex h-14 w-14 items-center justify-center rounded-[22px] bg-[#313238] text-[#f4f1eb] transition hover:bg-[#7a7063]"
                  aria-label="Send message"
                >
                  <Send size={18} />
                </button>
              </div>
              {selectedFileName && (
                <div className="app-frost mt-3 rounded-[18px] px-4 py-3 text-sm font-semibold text-[#7a7063]">
                  Attached: {selectedFileName}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      <section className="app-surface relative flex min-h-0 flex-col overflow-hidden rounded-[32px]">
        <img
          src={doodle}
          alt=""
          className="pointer-events-none absolute right-[-3rem] top-[-2rem] w-80 rotate-[12deg] opacity-[0.04]"
        />

        <div className="border-b border-[#313238]/8 bg-[linear-gradient(180deg,rgba(212,202,186,0.92)_0%,rgba(212,202,186,0.72)_100%)] px-5 py-4">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-end gap-1 overflow-x-auto pb-1">
              {knowledgePages.map((page) => (
                <div
                  key={page.id}
                  className={clsx(
                    'flex max-w-[260px] items-center gap-2 rounded-t-[18px] px-3 py-2 text-left text-sm font-semibold whitespace-nowrap transition',
                    activePageId === page.id
                      ? 'bg-[#f3efe8] text-[#313238] shadow-[0_-1px_0_rgba(255,255,255,0.7),0_8px_20px_rgba(49,50,56,0.08)]'
                      : 'bg-[#d4caba] text-[#7a7063] hover:bg-[#e5e0d7]'
                  )}
                >
                  <button
                    onClick={() => setActivePageId(page.id)}
                    className="min-w-0 flex-1 py-1 text-left"
                  >
                    <span className="block overflow-hidden text-ellipsis">{page.title}</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemovePage(page.id);
                    }}
                    disabled={knowledgePages.length <= 1}
                    className={clsx(
                      'inline-flex h-7 w-7 items-center justify-center rounded-full transition',
                      knowledgePages.length <= 1
                        ? 'cursor-not-allowed text-[#aaa5bf]'
                        : activePageId === page.id
                          ? 'text-[#7a7063] hover:bg-[#e5e0d7]'
                          : 'text-[#8f857a] hover:bg-[#ddd8ee] hover:text-[#313238]'
                    )}
                    aria-label={`Delete ${page.title}`}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddPage}
                className="ml-1 rounded-t-[18px] bg-[#f3efe8] px-4 py-3 text-sm font-bold text-[#7a7063] transition hover:bg-white"
                aria-label="Create new page"
              >
                +
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {sectionButtons.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveBoardSection(section.id)}
                  className={clsx(
                    'rounded-full px-4 py-2 text-sm font-semibold transition',
                    activeBoardSection === section.id
                      ? 'bg-[#313238] text-[#f4f1eb]'
                      : 'bg-[#f3efe8] text-[#7a7063] hover:bg-white'
                  )}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="min-h-0 flex-1 bg-[linear-gradient(180deg,rgba(242,239,232,0.84)_0%,rgba(255,250,240,0.76)_100%)] p-4">
          <div className="rounded-[28px] bg-[#f3efe8] p-5 shadow-[0_18px_34px_rgba(49,50,56,0.06)]">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#7a7063]">
              Knowledge board
            </div>
            <h2 className="mt-2 text-3xl font-semibold text-[#313238] sm:text-4xl">
              {activePage.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#7a7063]">{activePage.subtitle}</p>

            <div className="mt-6 rounded-[24px] bg-[linear-gradient(180deg,#e5e0d7_0%,#f3efe8_100%)] p-5">
              {activeBoardSection === 'definition' && (
                <>
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[#7a7063]">
                    <Lightbulb size={16} />
                    Core idea
                  </div>
                  <div className="mt-4 rounded-[20px] bg-[#f3efe8] p-5 shadow-[0_10px_22px_rgba(49,50,56,0.04)]">
                    <div className="text-lg font-semibold text-[#313238]">Plain-language explanation</div>
                    <div className="mt-2 text-sm leading-7 text-[#7a7063]">{activePage.definition}</div>
                  </div>

                  <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_320px]">
                    <div className="rounded-[24px] bg-[#f3efe8] p-5 shadow-[0_10px_22px_rgba(49,50,56,0.04)]">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#7a7063]">
                            Science visual case
                          </div>
                          <div className="mt-2 text-xl font-semibold text-[#313238]">
                            Biology concept map
                          </div>
                        </div>
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#313238] text-[#f4f1eb]">
                          <Orbit size={20} />
                        </div>
                      </div>

                      <div className="mt-6 grid gap-4 sm:grid-cols-[minmax(0,1fr)_220px]">
                        <div className="grid gap-3 sm:grid-cols-2">
                          {scienceVisualNodes.map((node) => {
                            const Icon = node.icon;

                            return (
                              <div
                                key={node.label}
                                className={`rounded-[20px] p-4 shadow-[0_8px_18px_rgba(49,50,56,0.05)] ${node.tone}`}
                              >
                                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/55">
                                  <Icon size={18} />
                                </div>
                                <div className="mt-3 text-sm font-semibold">{node.label}</div>
                                <div className="mt-2 text-sm leading-6 text-[#7a7063]">
                                  {node.detail}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        <div className="rounded-[24px] bg-[radial-gradient(circle_at_center,#e5e0d7_0%,#e5e0d7_44%,#f3efe8_45%,#f3efe8_100%)] p-4">
                          <div className="flex h-full min-h-[260px] items-center justify-center">
                            <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-[#313238]/10 bg-[#313238] text-[#f4f1eb] shadow-[0_18px_34px_rgba(49,50,56,0.18)]">
                              <div className="text-center">
                                <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/16">
                                  <Dna size={28} />
                                </div>
                                <div className="mt-3 text-sm font-bold uppercase tracking-[0.16em]">
                                  Living system
                                </div>
                                <div className="mt-1 text-xs text-white/78">{topicName}</div>
                              </div>

                              <div className="absolute left-[-0.75rem] top-6 h-4 w-4 rounded-full bg-[#d0c6b8]" />
                              <div className="absolute right-[-0.5rem] top-9 h-3 w-3 rounded-full bg-[#be7d62]" />
                              <div className="absolute bottom-5 left-1 h-3 w-3 rounded-full bg-[#ceb3a1]" />
                              <div className="absolute bottom-7 right-2 h-4 w-4 rounded-full bg-[#e5e0d7]" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[24px] bg-[#313238] p-5 text-[#f4f1eb] shadow-[0_12px_24px_rgba(49,50,56,0.14)]">
                      <div className="text-xs font-bold uppercase tracking-[0.18em] text-white/70">
                        Interactive case
                      </div>
                      <div className="mt-3 text-xl font-semibold">
                        Explore one organism from four angles
                      </div>
                      <div className="mt-3 text-sm leading-7 text-white/78">
                        Start from one living thing, observe its structure, identify the process inside
                        it, connect it to habitat, then test one variable with a simple experiment.
                      </div>

                      <div className="mt-5 space-y-3">
                        {[
                          'Choose a plant, insect, or cell diagram.',
                          'Tap one icon to open a focused explanation path.',
                          'Compare what changes when the environment shifts.',
                        ].map((item, index) => (
                          <div key={item} className="rounded-[18px] bg-white/10 px-4 py-3">
                            <div className="text-xs font-bold uppercase tracking-[0.16em] text-white/56">
                              Path 0{index + 1}
                            </div>
                            <div className="mt-1 text-sm leading-6 text-white/84">{item}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    {activePage.keyPoints.map((point, index) => (
                      <div
                        key={point}
                        className={clsx(
                          'rounded-[20px] p-4 shadow-[0_10px_22px_rgba(18,38,34,0.04)]',
                          index === 0 && 'bg-[#be7d62] text-[#f4f1eb]',
                          index === 1 && 'bg-[#e5e0d7] text-[#313238]',
                          index === 2 && 'bg-[#d0c6b8] text-[#f4f1eb]'
                        )}
                      >
                        <div className="text-base font-semibold">Key point 0{index + 1}</div>
                        <div className={clsx('mt-2 text-sm leading-6', index === 1 ? 'text-[#313238]' : 'text-[#f4f1eb]')}>{point}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {activeBoardSection === 'examples' && (
                <>
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[#7a7063]">
                    <BookOpenCheck size={16} />
                    Worked examples
                  </div>
                  <div className="mt-4 rounded-[20px] bg-[#f3efe8] p-5 shadow-[0_10px_22px_rgba(49,50,56,0.04)]">
                    <div className="text-lg font-semibold text-[#313238]">{activePage.exampleTitle}</div>
                    <div className="mt-2 text-sm leading-7 text-[#7a7063]">{activePage.exampleBody}</div>
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    {[
                      'Read the prompt carefully',
                      'Predict the answer before checking',
                      'Compare your reasoning with the solution',
                    ].map((step, index) => (
                      <div key={step} className="rounded-[20px] bg-[#f3efe8] p-4 shadow-[0_10px_22px_rgba(49,50,56,0.04)]">
                        <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#7a7063]">
                          Step 0{index + 1}
                        </div>
                        <div className="mt-2 text-sm font-semibold leading-6 text-[#313238]">{step}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {activeBoardSection === 'mistakes' && (
                <>
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[#7a7063]">
                    <AlertCircle size={16} />
                    Common mistakes
                  </div>
                  <div className="mt-4 rounded-[20px] bg-[#f3efe8] p-5 shadow-[0_10px_22px_rgba(49,50,56,0.04)]">
                    <div className="text-lg font-semibold text-[#313238]">What often goes wrong</div>
                    <div className="mt-2 text-sm leading-7 text-[#7a7063]">{activePage.mistake}</div>
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <div className="rounded-[20px] bg-[#e5e0d7] p-4 shadow-[0_10px_22px_rgba(49,50,56,0.04)]">
                      <div className="text-sm font-semibold text-[#313238]">Correction strategy</div>
                      <div className="mt-2 text-sm leading-6 text-[#7a7063]">
                        Slow down, restate the concept once, and ask one specific question instead of
                        switching immediately into more practice.
                      </div>
                    </div>
                    <div className="rounded-[20px] bg-[#ceb3a1] p-4 shadow-[0_10px_22px_rgba(49,50,56,0.04)]">
                      <div className="text-sm font-semibold text-[#313238]">Self-check</div>
                      <div className="mt-2 text-sm leading-6 text-[#7a7063]">
                        Can you explain the concept without notes and identify where the common mistake
                        begins?
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

    </motion.div>
  );
};

const RecordRow = ({
  label,
  value,
  completed,
}: {
  label: string;
  value: string;
  completed: boolean;
}) => (
  <div className="app-panel rounded-[22px] px-3.5 py-3">
    <div className="flex items-start gap-2.5">
      <div
        className={clsx(
          'mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border transition',
          completed
            ? 'border-[#313238] bg-[#313238] text-[#f4f1eb]'
            : 'border-[#7a7063]/45 bg-transparent text-transparent'
        )}
      >
        <Check size={12} strokeWidth={3} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7a7063]">{label}</div>
        <div className="mt-1.5 text-sm leading-5 text-[#313238]">{value}</div>
      </div>
    </div>
  </div>
);
