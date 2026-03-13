import { motion } from 'motion/react';
import { Award, CalendarRange, Star, Target } from 'lucide-react';

const achievements = [
  'Completed 12 focused sessions this month',
  'Maintained a 6-day learning streak',
  'Unlocked “Consistent Reviewer” badge',
];

export const ProfileView = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="app-page-shell grid h-full min-h-0 gap-3 overflow-hidden lg:grid-cols-[360px_minmax(0,1fr)]">
      <section className="app-surface relative min-h-0 overflow-y-auto rounded-[26px]">
        <div className="app-content">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-[18px] bg-[var(--brand-strong)] text-2xl font-bold text-[var(--brand-strong-foreground)]">
            RG
          </div>
          <h2 className="mt-5 text-2xl font-semibold text-[#1E1C59]">Rachel</h2>
          <p className="mt-2 text-sm leading-6 text-[#6B6794]">
            Building a cleaner, more motivating flow for AI-assisted education.
          </p>

          <div className="mt-6 space-y-3">
            <ProfileMetric icon={Target} label="Current goal" value="Sharper daily study sessions" />
            <ProfileMetric icon={CalendarRange} label="Preferred rhythm" value="20-30 minutes a day" />
            <ProfileMetric icon={Star} label="Focus style" value="Short cycles with visible wins" />
          </div>
        </div>
      </section>

      <div className="grid min-h-0 content-start gap-3 overflow-y-auto pr-1">
        <section className="app-surface shrink-0 rounded-[26px]">
          <div className="app-content">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#D7E5FF] text-[#36538A]">
                <Award size={20} />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#2E7A53]">Achievement signals</div>
              </div>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <StatCard label="Sessions" value="48" detail="+8 this week" />
              <StatCard label="Badges" value="09" detail="3 earned recently" />
              <StatCard label="Reflection notes" value="17" detail="Strong consistency" />
            </div>
          </div>
        </section>

        <section className="app-surface shrink-0 rounded-[26px]">
          <div className="app-content">
            <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#6B6794]">Recent highlights</div>
            <div className="mt-4 space-y-3">
              {achievements.map((item) => (
                <div key={item} className="app-panel rounded-[18px] px-4 py-4 text-sm font-semibold leading-6 text-[#1E1C59]">
                  {item}
                </div>
              ))}
            </div>
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
  <div className="app-panel rounded-[18px] p-4">
    <div className="flex items-start gap-3">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#E2F263]/32 text-[#1E1C59]">
        <Icon size={18} />
      </div>
      <div>
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#6B6794]">{label}</div>
        <div className="mt-2 text-sm font-semibold leading-6 text-[#1E1C59]">{value}</div>
      </div>
    </div>
  </div>
);

const StatCard = ({ label, value, detail }: { label: string; value: string; detail: string }) => (
  <div className="app-panel rounded-[20px] p-5">
    <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#6B6794]">{label}</div>
    <div className="mt-3 text-3xl font-semibold text-[#1E1C59]">{value}</div>
    <div className="mt-2 text-sm leading-6 text-[#6B6794]">{detail}</div>
  </div>
);
