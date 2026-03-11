import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, CheckCircle2, XCircle, RefreshCw, Star, Zap } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  points: number;
}

const quizQuestions: Question[] = [
  {
    id: '1',
    question: 'How long does sunlight take to reach Earth?',
    options: ['1 minute', '8 minutes', '1 hour', '1 day'],
    correctAnswer: 1,
    explanation:
      'Light travels at about 300,000 kilometers per second, and the Sun is roughly 150 million kilometers from Earth, so sunlight takes about 8 minutes to arrive.',
    category: 'Astronomy',
    points: 20
  },
  {
    id: '2',
    question: 'Which of the following is not a standard type of machine learning?',
    options: ['Supervised learning', 'Unsupervised learning', 'Reinforcement learning', 'Quantum learning'],
    correctAnswer: 3,
    explanation:
      'Machine learning is commonly grouped into supervised, unsupervised, and reinforcement learning. "Quantum learning" is not a standard core category.',
    category: 'Artificial Intelligence',
    points: 25
  },
  {
    id: '3',
    question: 'What is the deepest ocean trench on Earth?',
    options: ['Mariana Trench', 'Atlantic Trench', 'Pacific Trench', 'Arctic Trench'],
    correctAnswer: 0,
    explanation:
      'The Mariana Trench is the deepest known ocean trench on Earth, reaching roughly 11,000 meters in the western Pacific Ocean.',
    category: 'Geography',
    points: 15
  },
  {
    id: '4',
    question: 'Who first introduced the idea of quantum entanglement?',
    options: ['Newton', 'Einstein', 'Hawking', 'Feynman'],
    correctAnswer: 1,
    explanation:
      'Einstein discussed the idea in 1935 with other physicists and famously described it as "spooky action at a distance."',
    category: 'Physics',
    points: 30
  },
  {
    id: '5',
    question: 'What was the name of the world’s first general-purpose electronic computer?',
    options: ['ENIAC', 'IBM', 'Apple I', 'Colossus'],
    correctAnswer: 0,
    explanation:
      'ENIAC, introduced in 1946, is widely recognized as the first general-purpose electronic computer.',
    category: 'History of Technology',
    points: 20
  }
];

interface QuizViewProps {
  onAddPoints: (points: number) => void;
  onAddAchievement: (achievement: string) => void;
}

export function QuizView({ onAddPoints, onAddAchievement }: QuizViewProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    setShowResult(true);
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      setStreak(prev => prev + 1);
      const bonusPoints = currentQuestion.points + (streak * 5);
      onAddPoints(bonusPoints);
      
      if (streak === 2) {
        onAddAchievement('streak-3');
      }
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
      if (correctCount >= 4) {
        onAddAchievement('quiz-master');
      }
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setCorrectCount(0);
    setStreak(0);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    const score = (correctCount / quizQuestions.length) * 100;
    
    return (
      <div className="pb-24 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Card className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
            <div className="mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-14 h-14 text-white" />
              </div>
              <h2 className="text-3xl mb-2">Challenge Complete!</h2>
              <p className="text-gray-600">Great work. You finished every question.</p>
            </div>

            <div className="mb-8">
              <div className="text-6xl mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {score.toFixed(0)}%
              </div>
              <p className="text-gray-600">
                Correct: {correctCount} / {quizQuestions.length}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-xl p-4">
                <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl mb-1">{correctCount}</div>
                <div className="text-sm text-gray-600">Correct</div>
              </div>
              <div className="bg-white rounded-xl p-4">
                <XCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <div className="text-2xl mb-1">{quizQuestions.length - correctCount}</div>
                <div className="text-sm text-gray-600">Incorrect</div>
              </div>
              <div className="bg-white rounded-xl p-4">
                <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl mb-1">{correctCount * 20}</div>
                <div className="text-sm text-gray-600">Points</div>
              </div>
            </div>

            <button
              onClick={handleRestart}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pb-24 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl">Knowledge Challenge</h2>
            <p className="text-gray-600 text-sm">
              Question {currentQuestionIndex + 1} / {quizQuestions.length}
            </p>
          </div>
          {streak > 0 && (
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-0">
              <Zap className="w-4 h-4 mr-1" />
              {streak} streak
            </Badge>
          )}
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <Card className="p-8 mb-6">
            <Badge variant="outline" className="mb-4">
              {currentQuestion.category}
            </Badge>
            
            <h3 className="text-xl mb-6">
              {currentQuestion.question}
            </h3>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                const showCorrect = showResult && isCorrect;
                const showIncorrect = showResult && isSelected && !isCorrect;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      showCorrect
                        ? 'border-green-500 bg-green-50'
                        : showIncorrect
                        ? 'border-red-500 bg-red-50'
                        : isSelected
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
                    } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showCorrect && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                      {showIncorrect && <XCircle className="w-5 h-5 text-red-500" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-6 p-4 rounded-xl ${
                  selectedAnswer === currentQuestion.correctAnswer
                    ? 'bg-green-50 border-2 border-green-200'
                    : 'bg-blue-50 border-2 border-blue-200'
                }`}
              >
                <p className="text-sm text-gray-700">
                  💡 {currentQuestion.explanation}
                </p>
              </motion.div>
            )}
          </Card>

          <div className="flex gap-3">
            {!showResult ? (
              <button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-medium hover:shadow-lg transition-all"
              >
                {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'See Results'}
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
