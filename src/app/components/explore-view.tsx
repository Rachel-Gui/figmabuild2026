import { useState } from 'react';
import { motion } from 'motion/react';
import { Brain, Rocket, Globe, Atom, BookOpen, Lightbulb, ChevronRight, Star } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface Topic {
  id: string;
  title: string;
  icon: any;
  color: string;
  gradient: string;
  description: string;
  subtopics: string[];
  difficulty: string;
  points: number;
}

const topics: Topic[] = [
  {
    id: '1',
    title: 'Space Exploration',
    icon: Rocket,
    color: 'text-purple-600',
    gradient: 'from-purple-500 to-pink-500',
    description: 'Explore the mysteries of the universe.',
    subtopics: ['Solar System', 'Black Holes', 'Galaxies', 'Origins of the Universe'],
    difficulty: 'Intermediate',
    points: 50
  },
  {
    id: '2',
    title: 'Artificial Intelligence',
    icon: Brain,
    color: 'text-blue-600',
    gradient: 'from-blue-500 to-cyan-500',
    description: 'See how AI is reshaping the world.',
    subtopics: ['Machine Learning', 'Neural Networks', 'Natural Language Processing', 'Computer Vision'],
    difficulty: 'Advanced',
    points: 75
  },
  {
    id: '3',
    title: 'Earth Science',
    icon: Globe,
    color: 'text-green-600',
    gradient: 'from-green-500 to-emerald-500',
    description: 'Learn more about the planet we live on.',
    subtopics: ['Geology', 'Climate', 'Oceans', 'Ecosystems'],
    difficulty: 'Beginner',
    points: 30
  },
  {
    id: '4',
    title: 'Quantum Physics',
    icon: Atom,
    color: 'text-indigo-600',
    gradient: 'from-indigo-500 to-purple-500',
    description: 'Discover the rules of the microscopic world.',
    subtopics: ['Quantum Mechanics', 'Particle Physics', 'Wave-Particle Duality', 'Quantum Entanglement'],
    difficulty: 'Advanced',
    points: 100
  },
  {
    id: '5',
    title: 'History and Culture',
    icon: BookOpen,
    color: 'text-orange-600',
    gradient: 'from-orange-500 to-red-500',
    description: 'Travel across time to understand human civilization.',
    subtopics: ['Ancient Civilizations', 'The Renaissance', 'The Industrial Revolution', 'Modern History'],
    difficulty: 'Intermediate',
    points: 40
  },
  {
    id: '6',
    title: 'Creative Thinking',
    icon: Lightbulb,
    color: 'text-yellow-600',
    gradient: 'from-yellow-500 to-orange-500',
    description: 'Build creativity and problem-solving ability.',
    subtopics: ['Design Thinking', 'Critical Thinking', 'Idea Methods', 'Brainstorming'],
    difficulty: 'Intermediate',
    points: 60
  }
];

interface ExploreViewProps {
  onSwitchToChat: () => void;
  onAddPoints: (points: number) => void;
  onAddAchievement: (achievement: string) => void;
}

export function ExploreView({ onSwitchToChat, onAddPoints, onAddAchievement }: ExploreViewProps) {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [exploredTopics, setExploredTopics] = useState<Set<string>>(new Set());

  const handleTopicClick = (topic: Topic) => {
    setSelectedTopic(topic);
    
    if (!exploredTopics.has(topic.id)) {
      setExploredTopics(new Set([...exploredTopics, topic.id]));
      onAddPoints(topic.points);
      onAddAchievement(`explored-${topic.id}`);
    }
  };

  const handleSubtopicClick = (subtopic: string) => {
    onAddPoints(10);
  };

  return (
    <div className="pb-24">
      {/* Hero Section */}
      <div className="mb-8 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent"
        >
          Start Your Learning Journey
        </motion.h2>
        <p className="text-gray-600">Click any topic to start exploring.</p>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {topics.map((topic, index) => {
          const Icon = topic.icon;
          const isExplored = exploredTopics.has(topic.id);
          
          return (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 ${
                  selectedTopic?.id === topic.id 
                    ? 'border-purple-500 shadow-lg' 
                    : isExplored
                    ? 'border-green-200'
                    : 'border-transparent'
                }`}
                onClick={() => handleTopicClick(topic)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${topic.gradient} flex items-center justify-center`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  {isExplored && (
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        <Star className="w-3 h-3 mr-1" />
                      Explored
                    </Badge>
                  )}
                </div>
                
                <h3 className={`text-xl mb-2 ${topic.color}`}>
                  {topic.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{topic.description}</p>
                
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {topic.difficulty}
                  </Badge>
                  <span className="text-sm font-medium text-purple-600">
                    +{topic.points} points
                  </span>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Selected Topic Detail */}
      {selectedTopic && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 shadow-xl border-2 border-purple-200"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedTopic.gradient} flex items-center justify-center flex-shrink-0`}>
              <selectedTopic.icon className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl mb-2">{selectedTopic.title}</h3>
              <p className="text-gray-600">{selectedTopic.description}</p>
            </div>
          </div>

          <h4 className="text-lg mb-4 text-gray-700">Explore Subtopics:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {selectedTopic.subtopics.map((subtopic, index) => (
              <motion.button
                key={subtopic}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleSubtopicClick(subtopic)}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:shadow-md transition-all group"
              >
                <span className="font-medium text-gray-700">{subtopic}</span>
                <ChevronRight className="w-5 h-5 text-purple-600 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            ))}
          </div>

          <button
            onClick={onSwitchToChat}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-medium hover:shadow-lg transition-all"
          >
            Ask the AI Assistant
          </button>
        </motion.div>
      )}
    </div>
  );
}
