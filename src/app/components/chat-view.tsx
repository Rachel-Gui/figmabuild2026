import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Sparkles, Loader2, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  feedback?: 'up' | 'down';
}

interface ChatViewProps {
  onAddPoints: (points: number) => void;
  onAddAchievement: (achievement: string) => void;
}

// AI 回复模板
const aiResponses: Record<string, string> = {
  '宇宙': '🚀 太空真的很神奇！宇宙中有数以亿计的星系，我们的银河系只是其中之一。你知道吗？光从太阳到达地球需要约8分钟。你对宇宙的哪个方面最感兴趣呢？',
  '黑洞': '⚫ 黑洞是宇宙中最神秘的天体之一！它们的引力如此之强，连光都无法逃脱。黑洞形成于大质量恒星的死亡。有趣的是，靠近黑洞时间会变慢哦！',
  '人工智能': '🤖 人工智能正在改变我们的世界！从你使用的语音助手到自动驾驶汽车，AI无处不在。机器学习让计算机能够从数据中学习，而不需要明确编程每一个步骤。',
  '量子': '⚛️ 量子世界充满了不可思议的现象！量子纠缠让两个粒子无论距离多远都能瞬间互相影响。薛定谔的猫展示了量子叠加态的概念，一个粒子可以同时处于多个状态。',
  '地球': '🌍 地球是我们的家园！它有着复杂的生态系统，从海洋深处到高山之巅。地球的大气层保护我们免受太空辐射，而磁场则保护我们免受太阳风的侵袭。',
  '历史': '📜 历史帮助我们了解过去，指引未来！从古代文明的兴衰到现代科技的发展，每个时代都有其独特的故事。学习历史让我们更好地理解当今世界。',
  default: '💡 这是一个很好的问题！让我们一起探索这个话题。学习的关键是保持好奇心和提出问题。你想深入了解哪个方面呢？我可以为你提供更多信息！'
};

function getAIResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();
  
  for (const [keyword, response] of Object.entries(aiResponses)) {
    if (keyword !== 'default' && lowerMessage.includes(keyword)) {
      return response;
    }
  }
  
  return aiResponses.default;
}

export function ChatView({ onAddPoints, onAddAchievement }: ChatViewProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '你好！我是你的 AI 学习助手 ✨ 我可以帮助你探索任何你感兴趣的知识。试着问我关于宇宙、科学、历史或任何你好奇的事情吧！',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    onAddPoints(5);

    // 模拟 AI 思考延迟
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(input),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      onAddPoints(10);
      
      // 第一次对话成就
      if (messages.length === 1) {
        onAddAchievement('first-chat');
      }
    }, 1500);
  };

  const handleFeedback = (messageId: string, feedback: 'up' | 'down') => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, feedback } : msg
      )
    );
    onAddPoints(2);
  };

  const suggestedQuestions = [
    '黑洞是什么？',
    '人工智能如何工作？',
    '宇宙有多大？',
    '量子计算是什么？'
  ];

  return (
    <div className="pb-24 max-w-4xl mx-auto">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-t-2xl p-6 text-white mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Sparkles className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl">AI 学习助手</h2>
            <p className="text-purple-100 text-sm">随时为你解答疑问</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <Card className="min-h-[500px] max-h-[600px] overflow-y-auto p-6 mb-4 bg-white">
        <div className="space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                  <div
                    className={`rounded-2xl p-4 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        : 'bg-gradient-to-r from-blue-50 to-purple-50 text-gray-800'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                  
                  {message.sender === 'ai' && (
                    <div className="flex items-center gap-2 mt-2 ml-2">
                      <button
                        onClick={() => handleFeedback(message.id, 'up')}
                        className={`p-1 rounded-lg transition-colors ${
                          message.feedback === 'up' 
                            ? 'bg-green-100 text-green-600' 
                            : 'text-gray-400 hover:text-green-600'
                        }`}
                      >
                        <ThumbsUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleFeedback(message.id, 'down')}
                        className={`p-1 rounded-lg transition-colors ${
                          message.feedback === 'down' 
                            ? 'bg-red-100 text-red-600' 
                            : 'text-gray-400 hover:text-red-600'
                        }`}
                      >
                        <ThumbsDown className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
                <span className="text-gray-600">AI 正在思考...</span>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </Card>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">💡 试试这些问题：</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question) => (
              <Badge
                key={question}
                variant="outline"
                className="cursor-pointer hover:bg-purple-50 hover:border-purple-300 transition-colors"
                onClick={() => setInput(question)}
              >
                {question}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="输入你的问题..."
          className="flex-1 px-6 py-4 rounded-full border-2 border-purple-200 focus:border-purple-500 focus:outline-none bg-white"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isTyping}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
