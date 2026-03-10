import { motion } from 'motion/react';
import { Award, CalendarRange, Star, Target } from 'lucide-react';

const achievements = [
  'Completed 12 focused sessions this month',
  'Maintained a 6-day learning streak',
  'Unlocked “Consistent Reviewer” badge',
];

export const ProfileView = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4 lg:grid-cols-[360px_minmax(0,1fr)]">
      <section className="app-surface rounded-[32px] p-6">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-[24px] bg-[#17332d] text-2xl font-bold text-[#fffaf4]">
          RG
        </div>
        <h2 className="mt-5 text-2xl font-semibold text-[#17332d]">Rachel Gui</h2>
        <p className="mt-2 text-sm leading-6 text-[#60716b]">
          Building a cleaner, more motivating flow for AI-assisted education.
        </p>

        <div className="mt-6 space-y-3">
          <ProfileMetric icon={Target} label="Current goal" value="Sharper daily study sessions" />
          <ProfileMetric icon={CalendarRange} label="Preferred rhythm" value="20-30 minutes a day" />
          <ProfileMetric icon={Star} label="Focus style" value="Short cycles with visible wins" />
        </div>
      </section>

      <div className="grid gap-4">
        <section className="app-surface rounded-[32px] p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d77642] text-[#fffaf4]">
              <Award size={20} />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#60716b]">Achievement signals</div>
              <h3 className="text-2xl font-semibold text-[#17332d]">Progress should feel personal</h3>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <StatCard label="Sessions" value="48" detail="+8 this week" />
            <StatCard label="Badges" value="09" detail="3 earned recently" />
            <StatCard label="Reflection notes" value="17" detail="Strong consistency" />
          </div>
        </section>

        <section className="app-surface rounded-[32px] p-6 sm:p-8">
          <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#60716b]">Recent highlights</div>
          <div className="mt-4 space-y-3">
            {achievements.map((item) => (
              <div key={item} className="app-panel rounded-[24px] px-4 py-4 text-sm font-semibold leading-6 text-[#17332d]">
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
};

const ProfileMetric = ({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Target;
  label: string;
  value: string;
}) => (
  <div className="app-panel rounded-[24px] p-4">
    <div className="flex items-start gap-3">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#17332d] text-[#fffaf4]">
        <Icon size={18} />
      </div>
      <div>
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#60716b]">{label}</div>
        <div className="mt-2 text-sm font-semibold leading-6 text-[#17332d]">{value}</div>
      </div>
    </div>
  </div>
);

const StatCard = ({ label, value, detail }: { label: string; value: string; detail: string }) => (
  <div className="app-panel rounded-[26px] p-5">
    <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#60716b]">{label}</div>
    <div className="mt-3 text-3xl font-semibold text-[#17332d]">{value}</div>
    <div className="mt-2 text-sm leading-6 text-[#60716b]">{detail}</div>
  </div>
);
