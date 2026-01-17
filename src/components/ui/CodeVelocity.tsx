import React, { useMemo } from 'react';
import { ActivityCalendar } from 'react-activity-calendar';

type CalendarActivity = {
  date: string;
  count: number;
  level: number;
};

const createVelocityData = (): CalendarActivity[] => {
  const result: CalendarActivity[] = [];
  const now = new Date();

  for (let i = 364; i >= 0; i -= 1) {
    const day = new Date(now);
    day.setDate(now.getDate() - i);
    const isoDate = day.toISOString().slice(0, 10);
    const weekday = day.getDay();
    const intensityBase = weekday === 0 || weekday === 6 ? 1 : 3;
    const cadence = (weekday + i) % 4;
    const level = Math.min(4, intensityBase + cadence);
    const count = level * 8 + (weekday === 0 || weekday === 6 ? 4 : 12);
    result.push({
      date: isoDate,
      count,
      level,
    });
  }

  return result;
};

const CodeVelocity: React.FC = () => {
  const data = useMemo(() => createVelocityData(), []);

  return (
    <div className="rounded-3xl border border-[#40E0D0]/40 bg-[#0f172a]/70 p-6 shadow-[0_0_35px_rgba(64,224,208,0.2)] backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#40E0D0]/70">Code Velocity</p>
          <h3 className="text-2xl font-semibold text-[#40E0D0]">Commit Heatmap</h3>
        </div>
        <span className="text-xs text-[#FFA500]/80 font-mono">365d</span>
      </div>
      <ActivityCalendar
        data={data}
        blockSize={14}
        blockMargin={4}
        blockRadius={4}
        colorScheme="dark"
        maxLevel={4}
        showWeekdayLabels
        theme={{
          dark: ['#0f172a', '#0f172a', '#0f172a', '#40E0D0', '#FFA500'],
        }}
        tooltips={{
          activity: {
            text: (activity) =>
              `${activity.count} telemetry units on ${new Date(activity.date).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}`,
          },
        }}
      />
    </div>
  );
};

export default CodeVelocity;
