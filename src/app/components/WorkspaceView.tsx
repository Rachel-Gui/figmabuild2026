import { motion } from 'motion/react';
import { useLocation } from 'react-router';
import {
  AlertCircle,
  Check,
  Dna,
  FlaskConical,
  Leaf,
  Lightbulb,
  Microscope,
  Send,
  User,
  X,
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

type BoardSection = 'definition' | 'summary' | 'examples';

const todoProgressRingRadius = 28;
const todoProgressRingCircumference = 2 * Math.PI * todoProgressRingRadius;

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

const isHealthScienceTopic = (topicName: string) =>
  /knowledge topic|bio|health|brain|neuro|cell|disease|science/i.test(topicName);

const buildKnowledgePages = (
  topicName: string,
  goalText: string,
  estimatedTime: string
): KnowledgePage[] => [
  {
    id: 'overview',
    title: topicName,
    subtitle: isHealthScienceTopic(topicName)
      ? 'Scientific biology and health overview'
      : 'Core concept overview',
    definition:
      isHealthScienceTopic(topicName)
        ? 'Neuroinflammation is a biological state in which immune signaling inside the nervous system remains active for too long or at the wrong intensity. In the short term, inflammation helps protect tissue. In the long term, persistent activation of microglia, astrocytes, stress hormones, and inflammatory cytokines can interfere with synaptic plasticity, sleep regulation, memory formation, and emotional stability.'
        : `This page explains ${topicName} in plain language so the learner can understand the big idea before asking detailed questions.`,
    focus: isHealthScienceTopic(topicName)
      ? 'Understand how inflammation, stress, sleep, and neural repair influence brain health.'
      : goalText,
    mistake:
      isHealthScienceTopic(topicName)
        ? 'Do not treat inflammation as purely harmful. Acute immune signaling can be protective; the clinical concern is persistent dysregulation that disrupts neural repair and cognition.'
        : 'Do not jump straight to exercises. Read the concept once, restate it, and then test your understanding.',
    exampleTitle: isHealthScienceTopic(topicName) ? 'Clinical interpretation' : 'Worked example',
    exampleBody:
      isHealthScienceTopic(topicName)
        ? `Use ${estimatedTime} to move from mechanism to application: read the pathway once, compare inflammatory vs recovery markers, and then explain how sleep, stress, and exercise alter brain resilience.`
        : `Start with one simple case, explain each step slowly, and use ${estimatedTime} to move from explanation to practice and review.`,
    keyPoints: isHealthScienceTopic(topicName)
      ? [
          'Microglia and astrocytes coordinate the immune response inside the brain.',
          'Stress, poor sleep, and metabolic strain can amplify inflammatory signaling.',
          'Recovery depends on reducing inflammatory load while preserving neural repair.',
        ]
      : [
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

const embeddedArticle = {
  title: 'How does age standardization make health metrics comparable?',
  url: 'https://ourworldindata.org/age-standardization',
  domain: 'ourworldindata.org',
  note: 'Embedded article for guided reading and knowledge analysis',
};

const articleKnowledgeGaps = [
  {
    title: 'Age standardization',
    body: 'A statistical method that adjusts health rates to a standard population so comparisons are not distorted by different age structures.',
    icon: AlertCircle,
  },
  {
    title: 'Crude rate',
    body: 'The unadjusted rate of a health outcome before any age standardization is applied.',
    icon: Dna,
  },
  {
    title: 'Standard population',
    body: 'A reference population with a defined age structure used to recalculate age-specific rates into one comparable summary rate.',
    icon: FlaskConical,
  },
  {
    title: 'Age-specific rate',
    body: 'The rate of a health outcome within one age group, such as people aged 60-64, before combining groups into an age-standardized rate.',
    icon: Microscope,
  },
  {
    title: 'Why comparability changes',
    body: 'Countries with older populations can have higher crude death rates even when the underlying health risk is not worse, so standardization helps separate age structure from outcome patterns.',
    icon: Microscope,
  },
];

const normalizeTopicName = (value?: string) => {
  if (!value?.trim()) return 'Knowledge topic';

  const compact = value.replace(/\s+/g, ' ').trim();
  const shortClause = compact.split(/[,.!?]/)[0]?.trim() || compact;

  if (shortClause.length <= 42) return shortClause;
  return `${shortClause.slice(0, 39).trim()}...`;
};

const resolveBoardSection = (pageId: string): BoardSection => {
  if (pageId === 'overview') return 'definition';
  if (pageId === 'examples') return 'examples';
  return 'summary';
};

export const WorkspaceView = () => {
  const location = useLocation();
  const state = location.state as LocationState | null;
  const estimatedTime = state?.time || '15-20 minutes';
  const topicName = normalizeTopicName(state?.topic || state?.freeText);
  const goalText = state?.goal || 'Build understanding step by step';

  const initialPages = buildKnowledgePages(topicName, goalText, estimatedTime);

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [knowledgePages, setKnowledgePages] = useState<KnowledgePage[]>(initialPages);
  const [activePageId, setActivePageId] = useState<string>(initialPages[0].id);

  useEffect(() => {
    if (messages.length > 0) return;

    let initialBotMessage = "Let's start building your study plan.";
    let initialUserMessage = '';

    if (state) {
      if (state.isFreeMode && state.freeText) {
        initialUserMessage = state.freeText;
        initialBotMessage = "I have your learning request. Let's start building your study plan.";
      } else if (!state.isFreeMode && (state.topic || state.goal || state.time)) {
        initialUserMessage = `Hi Cogi, I want to learn ${state.topic || 'something new'}. My goal is to ${state.goal || 'improve'}, and I plan to study for ${state.time || 'some time'}.`;
        initialBotMessage = "I have your topic, goal, and study time. Let's start building your study plan.";
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

  const handleRemovePage = (pageId: string) => {
    if (knowledgePages.length <= 1) return;

    const pageIndex = knowledgePages.findIndex((page) => page.id === pageId);
    if (pageIndex === -1) return;

    const nextPages = knowledgePages.filter((page) => page.id !== pageId);
    setKnowledgePages(nextPages);

    if (activePageId === pageId) {
      const fallbackPage = nextPages[Math.max(0, pageIndex - 1)] ?? nextPages[0];
      setActivePageId(fallbackPage.id);
    }
  };

  const activePage = knowledgePages.find((page) => page.id === activePageId) ?? knowledgePages[0];
  const activeBoardSection = resolveBoardSection(activePage.id);
  const todoItems = [
    { label: 'Topic', value: topicName, completed: true },
    { label: 'Goal', value: goalText, completed: true },
    { label: 'Active page', value: activePage.title, completed: activePageId !== initialPages[0].id },
    { label: 'Suggested pace', value: `${estimatedTime} + reflection`, completed: true },
  ];
  const completedTodoCount = todoItems.filter((item) => item.completed).length;
  const todoProgress = Math.round((completedTodoCount / todoItems.length) * 100);
  const todoRingOffset = todoProgressRingCircumference * (1 - todoProgress / 100);

  const examplePanels = [
    {
      title: 'Case review',
      text: 'Start from one concrete case and identify the biological mechanism that best explains it.',
      icon: Microscope,
    },
    {
      title: 'Mechanism link',
      text: 'Connect the symptom, the tissue-level process, and the broader system effect in one chain.',
      icon: Dna,
    },
    {
      title: 'Self-check',
      text: 'Explain the pathway back in your own words before moving on to the next concept.',
      icon: FlaskConical,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="app-page-shell grid h-full min-h-0 gap-3 overflow-hidden xl:grid-cols-[minmax(360px,1fr)_minmax(0,2fr)] xl:grid-rows-[minmax(0,1fr)]"
    >
      <div className="flex min-h-0 flex-col gap-3 overflow-hidden">
        <section className="app-surface shrink-0 rounded-[26px]">
          <div className="app-content">
            <div className="grid gap-3 sm:grid-cols-[112px_minmax(0,1fr)]">
              <div className="app-frost flex min-h-[132px] flex-col items-center justify-center rounded-[18px] px-3 py-3">
                <div className="relative h-22 w-22">
                  <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r={todoProgressRingRadius}
                      fill="none"
                      stroke="rgba(49,50,56,0.08)"
                      strokeWidth="8"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r={todoProgressRingRadius}
                      fill="none"
                      stroke="#34268C"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={todoProgressRingCircumference}
                      strokeDashoffset={todoRingOffset}
                    />
                  </svg>

                  <div className="absolute inset-[0.9rem] flex items-center justify-center rounded-full bg-white">
                    <div className="text-center">
                      <div className="text-lg font-semibold leading-none text-[#1E1C59]">{todoProgress}%</div>
                      <div className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#6B6794]">
                        done
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6B6794]">
                  {completedTodoCount}/{todoItems.length} complete
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-semibold text-[#1E1C59]">To do list</div>
                  <div className="text-[12px] font-semibold text-[#6B6794]">{todoItems.length} items</div>
                </div>

                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {todoItems.map((item) => (
                    <TodoRow
                      key={item.label}
                      label={item.label}
                      value={item.value}
                      completed={item.completed}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="app-surface relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-[26px]">
          <img
            src={doodle}
            alt=""
            className="pointer-events-none absolute bottom-[-3rem] left-[-2rem] w-80 rotate-[10deg] opacity-[0.06] [filter:hue-rotate(210deg)_saturate(0.55)_brightness(1.12)]"
          />

          <div className="app-content flex min-h-0 flex-1 flex-col overflow-hidden">
            <div className="min-h-0 flex-1 overflow-y-auto pr-1">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={clsx('flex gap-3', msg.role === 'user' ? 'justify-end' : 'justify-start')}
                  >
                    {msg.role === 'bot' && (
                      <div className="mt-1 inline-flex h-10 w-10 overflow-hidden rounded-xl bg-white/90">
                        <img src={doodle} alt="Chatbot avatar" className="h-full w-full object-cover" />
                      </div>
                    )}

                    <div
                      className={clsx(
                        'max-w-[85%] rounded-[18px] px-5 py-4 text-[15px] leading-7 sm:text-base',
                        msg.role === 'user'
                          ? 'rounded-br-[10px] bg-[#34268C] text-[#F2F2F2]'
                          : 'app-panel rounded-bl-[10px] text-[#1E1C59]'
                      )}
                    >
                      {msg.text}
                    </div>

                    {msg.role === 'user' && (
                      <div className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#0CF25D] text-[#1E1C59]">
                        <User size={18} />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="app-frost sticky bottom-0 z-10 mt-4 rounded-[22px] p-2">
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
                  className="app-glass-field min-h-[56px] max-h-32 flex-1 resize-none rounded-[16px] px-4 py-2.5 text-base text-[#1E1C59] outline-none placeholder:text-[#6B6794]"
                />
                <button
                  onClick={handleSend}
                  className="inline-flex h-14 w-14 items-center justify-center rounded-[16px] bg-[var(--brand-strong)] text-[var(--brand-strong-foreground)] transition hover:bg-[var(--brand-strong-hover)]"
                  aria-label="Send message"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section
        className={clsx(
          'relative flex min-h-0 flex-col overflow-hidden rounded-[26px]',
          'app-surface'
        )}
      >
        <div
          className={clsx(
            'border-b border-[#1E1C59]/8 px-5',
            activeBoardSection === 'definition'
              ? 'app-frost px-0 pt-4 pb-0'
              : 'bg-[#34268C]/6 py-4'
          )}
        >
          <div className="flex flex-col gap-3">
            <div
              className={clsx(
                'flex flex-wrap items-end gap-1 overflow-x-auto',
                activeBoardSection === 'definition' ? 'pb-0' : 'pb-1'
              )}
            >
              {knowledgePages.map((page) => (
                <div
                  key={page.id}
                  className={clsx(
                    'relative -mb-px flex max-w-[260px] items-center gap-2 rounded-t-[14px] px-3 py-2 text-left text-sm font-semibold whitespace-nowrap transition',
                    activePageId === page.id
                      ? 'app-panel text-[#1E1C59]'
                      : 'app-frost text-[#8B879D] hover:text-[#5C5874]'
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
                          ? 'text-[#6B6794] hover:bg-[#34268C]/8'
                          : 'text-[#A39FB5] hover:bg-[#34268C]/12 hover:text-[#676381]'
                    )}
                    aria-label={`Delete ${page.title}`}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>

        <div
          className={clsx(
            'min-h-0 flex-1 overflow-hidden',
            activeBoardSection === 'definition'
              ? 'bg-[#34268C]/6'
              : 'bg-[#34268C]/6',
            'p-0'
          )}
        >
          <div
            className={clsx(
              'h-full',
              activeBoardSection === 'definition'
                ? 'flex min-h-0 flex-col overflow-hidden rounded-none bg-transparent p-0'
                : 'overflow-y-auto rounded-[22px] p-5'
            )}
          >
            <div
              className={clsx(
                activeBoardSection === 'definition'
                  ? 'flex min-h-0 flex-1 flex-col bg-transparent p-0'
                  : 'app-panel rounded-[18px] p-5'
              )}
            >
              {activeBoardSection === 'definition' && (
                <>
                  <div className="grid min-h-0 flex-1 items-stretch gap-4 overflow-hidden xl:gap-0 xl:grid-cols-[minmax(0,1.45fr)_320px]">
                    <div className="flex min-h-0 h-full flex-col overflow-hidden bg-white">
                      <div className="border-b border-[#1E1C59]/8 bg-[#F2F2F2] px-5 py-3">
                        <a
                          href={embeddedArticle.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-[#6B6794] underline-offset-4 transition hover:text-[#1E1C59] hover:underline"
                        >
                          {embeddedArticle.url}
                        </a>
                      </div>

                      <div className="min-h-0 flex-1 overflow-hidden bg-white">
                        <iframe
                          src={embeddedArticle.url}
                          title={embeddedArticle.title}
                          className="h-full w-full bg-white"
                        />
                      </div>
                    </div>

                    <div className="flex min-h-0 h-full flex-col overflow-hidden rounded-[18px] bg-[#1E1C59] text-[#F2F2F2] xl:rounded-l-none">
                      <div className="border-b border-white/10 px-5 py-5">
                        <div className="text-xs font-bold uppercase tracking-[0.18em] text-white/82">
                          Learning recap
                        </div>
                        <div className="mt-3 text-xl font-semibold">
                          Key ideas from this reading
                        </div>
                        <div className="mt-3 text-sm leading-7 text-white/78">
                          A short summary of the main terms and concepts worth keeping after the article.
                        </div>
                      </div>

                      <div className="min-h-0 flex-1 overflow-y-auto">
                        {articleKnowledgeGaps.map((item) => {
                          const Icon = item.icon;

                          return (
                            <div key={item.title} className="border-b border-white/8 px-5 py-4 last:border-b-0">
                              <div className="flex items-center gap-3">
                                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/12">
                                  <Icon size={18} />
                                </div>
                                <div className="text-sm font-semibold text-white">{item.title}</div>
                              </div>
                              <div className="mt-3 text-sm leading-6 text-white/78">{item.body}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                </>
              )}

              {activeBoardSection === 'summary' && (
                <>
                  <div className="app-panel rounded-[20px] p-5">
                    <div className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#6B6794]">
                      {activePage.title}
                    </div>
                    <div className="mt-3 text-2xl font-semibold text-[#1E1C59]">{activePage.subtitle}</div>
                    <div className="mt-3 max-w-3xl text-sm leading-7 text-[#6B6794]">
                      {activePage.definition}
                    </div>
                  </div>

                  <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,1.15fr)_320px]">
                    <div className="app-panel rounded-[20px] p-5">
                      <div className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#6B6794]">
                        Key points
                      </div>
                      <div className="mt-4 space-y-3">
                        {activePage.keyPoints.map((point, index) => (
                          <div key={point} className="app-panel rounded-[16px] px-4 py-4">
                            <div className="flex items-start gap-3">
                              <div className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#34268C] text-[12px] font-bold text-[#F2F2F2]">
                                {index + 1}
                              </div>
                              <div className="text-sm leading-6 text-[#1E1C59]">{point}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-3">
                      <div className="app-panel rounded-[20px] p-5">
                        <div className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#6B6794]">
                          Study focus
                        </div>
                        <div className="mt-3 text-sm leading-7 text-[#1E1C59]">{activePage.focus}</div>
                      </div>

                      <div className="app-panel rounded-[20px] p-5">
                        <div className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#6B6794]">
                          Watch out
                        </div>
                        <div className="mt-3 text-sm leading-7 text-[#1E1C59]">{activePage.mistake}</div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeBoardSection === 'examples' && (
                <>
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[#6B6794]">
                    <BookOpenCheck size={16} />
                    Worked examples
                  </div>
                  <div className="app-panel mt-3 rounded-[16px] p-5">
                    <div className="text-lg font-semibold text-[#1E1C59]">{activePage.exampleTitle}</div>
                    <div className="mt-2 text-sm leading-7 text-[#6B6794]">{activePage.exampleBody}</div>
                  </div>

                  <div className="mt-3 grid gap-3 md:grid-cols-3">
                    {[
                      'Read the prompt carefully',
                      'Predict the answer before checking',
                      'Compare your reasoning with the solution',
                    ].map((step, index) => {
                      const icons = [Microscope, Dna, FlaskConical];
                      const Icon = icons[index];

                      return (
                        <div key={step} className="app-panel rounded-[16px] p-4">
                          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#E2F263]/32 text-[#1E1C59]">
                            <Icon size={18} />
                          </div>
                          <div className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-[#6B6794]">
                            Step 0{index + 1}
                          </div>
                          <div className="mt-2 text-sm font-semibold leading-6 text-[#1E1C59]">{step}</div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-3 grid gap-3 lg:grid-cols-3">
                    {examplePanels.map((item) => {
                      const Icon = item.icon;

                      return (
                        <div key={item.title} className="app-panel rounded-[16px] p-5">
                          <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#0CF25D]/18 text-[#1E1C59]">
                            <Icon size={19} />
                          </div>
                          <div className="mt-4 text-lg font-semibold text-[#1E1C59]">{item.title}</div>
                          <div className="mt-2 text-sm leading-6 text-[#6B6794]">{item.text}</div>
                        </div>
                      );
                    })}
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

const TodoRow = ({
  label,
  value,
  completed,
}: {
  label: string;
  value: string;
  completed: boolean;
}) => (
  <div className="app-panel rounded-[18px] px-3 py-2">
    <div className="flex items-start gap-2">
      <div
        className={clsx(
          'mt-0.5 inline-flex h-4.5 w-4.5 items-center justify-center rounded-full border transition',
          completed
            ? 'border-[#34268C] bg-[#34268C] text-[#F2F2F2]'
            : 'border-[#1E1C59]/22 bg-transparent text-transparent'
        )}
      >
        <Check size={11} strokeWidth={3} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#6B6794]">{label}</div>
        <div className="mt-1 text-[13px] leading-4.5 text-[#1E1C59]">{value}</div>
      </div>
    </div>
  </div>
);
