import { motion } from 'motion/react';
import doodle from '@/assets/c66905e9277bdd045c5911a8ef1f9bc6131f4a00.png';

export const ExploreView = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="h-full min-h-0 w-full overflow-y-auto bg-[#fcfbf9] border-[3px] border-[#4E3D2E] rounded-[32px] p-8 shadow-[6px_6px_0px_0px_rgba(78,61,46,1)] flex flex-col items-center justify-center relative text-[#4E3D2E]"
    >
      <img src={doodle} alt="" className="absolute -top-10 -right-10 opacity-10 w-64 blur-[2px] rotate-12 pointer-events-none" />
      <h2 className="text-5xl md:text-6xl mb-6 font-bold">Explore Map</h2>
      <p className="text-2xl text-[#4E3D2E]/60 text-center max-w-lg leading-relaxed">
        Interactive learning paths will be displayed here, guiding you to independently explore the knowledge universe through level unlocks and achievement badges.
      </p>
    </motion.div>
  );
};
