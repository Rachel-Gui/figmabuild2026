import { motion } from 'motion/react';
import { Trophy, Star, Target, Award, TrendingUp, Zap } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
}

const allAchievements: Achievement[] = [
  {
    id: 'first-chat',
    title: '初次对话',
    description: '与AI助手开始第一次对话',
    icon: Star,
    color: 'from-blue-400 to-cyan-400'
  },
  {
    id: 'explored-1',
    title: '宇宙探索者',
    description: '探索了宇宙话题',
    icon: Trophy,
    color: 'from-purple-400 to-pink-400'
  },
  {
    id: 'explored-2',
    title: 'AI 学习者',
    description: '探索了人工智能话题',
    icon: Zap,
    color: 'from-blue-400 to-indigo-400'
  },
  {
    id: 'streak-3',
    title: '连胜高手',
    description: '答题连对3题',
    icon: Target,
    color: 'from-yellow-400 to-orange-400'
  },
  {
    id: 'quiz-master',
    title: '知识达人',
    description: '挑战中答对80%以上',
    icon: Award,
    color: 'from-green-400 to-emerald-400'
  }
];

interface ProfileViewProps {
  points: number;
  achievements: string[];
}

export function ProfileView({ points, achievements }: ProfileViewProps) {
  const level = Math.floor(points / 100) + 1;
  const pointsToNextLevel = 100 - (points % 100);
  const levelProgress = (points % 100);

  const earnedAchievements = allAchievements.filter(a => 
    achievements.includes(a.id)
  );
  const lockedAchievements = allAchievements.filter(a => 
    !achievements.includes(a.id)
  );

  return (
    <div className="pb-24 max-w-4xl mx-auto">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="p-8 mb-6 bg-gradient-to-br from-purple-600 to-pink-600 text-white border-0">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl backdrop-blur-sm">
              🎓
            </div>
            <div className="flex-1">
              <h2 className="text-3xl mb-2">学习者</h2>
              <div className="flex items-center gap-3 mb-3">
                <Badge className="bg-white/20 text-white border-white/30">
                  等级 {level}
                </Badge>
                <span className="text-purple-100 text-sm">
                  还需 {pointsToNextLevel} 积分升级
                </span>
              </div>
              <Progress value={levelProgress} className="h-2 bg-white/20" />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl mb-1">{points}</div>
            <div className="text-sm text-gray-600">总积分</div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl mb-1">{level}</div>
            <div className="text-sm text-gray-600">当前等级</div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl mb-1">{earnedAchievements.length}</div>
            <div className="text-sm text-gray-600">成就</div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl mb-1">{Math.floor(points / 10)}</div>
            <div className="text-sm text-gray-600">学习次数</div>
          </Card>
        </motion.div>
      </div>

      {/* Achievements */}
      <div className="mb-6">
        <h3 className="text-xl mb-4">🏆 已获得成就</h3>
        {earnedAchievements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {earnedAchievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-4 border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${achievement.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{achievement.title}</h4>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                      <Star className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <Card className="p-8 text-center text-gray-500">
            <Trophy className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>还没有获得成就，继续探索吧！</p>
          </Card>
        )}
      </div>

      {/* Locked Achievements */}
      {lockedAchievements.length > 0 && (
        <div>
          <h3 className="text-xl mb-4">🔒 待解锁成就</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lockedAchievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-4 opacity-60 hover:opacity-80 transition-opacity">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-7 h-7 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-1 text-gray-700">{achievement.title}</h4>
                        <p className="text-sm text-gray-500">{achievement.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
