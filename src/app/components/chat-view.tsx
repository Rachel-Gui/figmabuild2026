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

// Simple AI response templates for common topics.
const aiResponses: Record<string, string> = {
  space:
    '🚀 Space is full of astonishing scale. There are billions of galaxies, and our Milky Way is only one of them. Sunlight reaches Earth in about 8 minutes. Which part of space would you like to explore next?',
  'black hole':
    '⚫ Black holes are among the most extreme objects in the universe. Their gravity is so strong that even light cannot escape once it crosses the event horizon. They often form after massive stars collapse.',
  ai:
    '🤖 AI is already woven into daily life, from voice assistants to recommendation systems. Machine learning lets computers learn patterns from data instead of relying on every rule being written by hand.',
  quantum:
    '⚛️ Quantum physics describes a world that behaves very differently from everyday experience. Ideas like superposition and entanglement show how particles can behave in ways that feel counterintuitive at first.',
  earth:
    '🌍 Earth is a complex system of oceans, atmosphere, land, and life. Its magnetic field and atmosphere help protect living systems from solar radiation and extreme conditions in space.',
  history:
    '📜 History helps us understand how the present was shaped. Studying past civilizations, inventions, and turning points gives us better context for the world we live in today.',
  default:
    '💡 That is a strong question. Let’s break it down clearly and explore one step at a time. If you want, I can explain the concept, give an example, or compare related ideas.'
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
      content:
        "Hello. I'm your AI learning assistant ✨ I can help you explore any topic you're curious about. Ask me about space, science, history, or anything else you want to understand better.",
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

    // Simulate a short AI response delay.
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
      
      // Award the first chat achievement on the first exchange.
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
    'What is a black hole?',
    'How does AI work?',
    'How big is the universe?',
    'What is quantum computing?'
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
            <h2 className="text-2xl">AI Learning Assistant</h2>
            <p className="text-purple-100 text-sm">Ready to answer questions anytime</p>
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
                <span className="text-gray-600">AI is thinking...</span>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </Card>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">💡 Try these prompts:</p>
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
          placeholder="Type your question..."
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
