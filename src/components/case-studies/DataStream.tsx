import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Event {
  event: string;
  value: number;
  timestamp: string;
  userId?: string;
}

const mockEvents: Event[] = [
  { event: 'purchase', value: 299, timestamp: new Date().toISOString(), userId: 'user_1234' },
  { event: 'generate_lead', value: 0, timestamp: new Date().toISOString(), userId: 'user_5678' },
  { event: 'add_to_cart', value: 149, timestamp: new Date().toISOString(), userId: 'user_9012' },
  { event: 'purchase', value: 499, timestamp: new Date().toISOString(), userId: 'user_3456' },
  { event: 'page_view', value: 0, timestamp: new Date().toISOString(), userId: 'user_7890' },
  { event: 'generate_lead', value: 0, timestamp: new Date().toISOString(), userId: 'user_2468' },
  { event: 'purchase', value: 199, timestamp: new Date().toISOString(), userId: 'user_1357' },
];

const DataStream: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [eventCount, setEventCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomEvent = mockEvents[Math.floor(Math.random() * mockEvents.length)];
      const newEvent: Event = {
        ...randomEvent,
        timestamp: new Date().toISOString(),
        value: randomEvent.value || Math.floor(Math.random() * 500),
        userId: `user_${Math.floor(Math.random() * 10000)}`,
      };

      setEvents(prev => {
        const updated = [newEvent, ...prev].slice(0, 15); // Keep last 15 events
        return updated;
      });
      setEventCount(prev => prev + 1);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const formatEvent = (event: Event) => {
    return JSON.stringify(
      {
        event: event.event,
        value: event.value,
        timestamp: new Date(event.timestamp).toLocaleTimeString(),
        userId: event.userId,
      },
      null,
      2
    );
  };

  return (
    <div className="p-8 bg-brand-surface/80 border border-brand-teal/20 rounded-2xl backdrop-blur-sm">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-brand-teal mb-2">Live Data Stream</h3>
        <p className="text-brand-muted text-sm">Real-time GTM events firing</p>
        <div className="mt-2 inline-block px-4 py-2 bg-brand-teal/10 border border-brand-teal/30 rounded-lg">
          <span className="text-brand-teal font-mono">Events: {eventCount}</span>
        </div>
      </div>
      <div className="bg-[#0a0a0a] rounded-xl overflow-hidden font-mono shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <div className="bg-[#1a1a1a] px-4 py-3 flex items-center gap-4 border-b border-brand-teal/20">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-sm text-white/70">GTM Event Stream</span>
        </div>
        <div className="p-6 max-h-[400px] overflow-y-auto min-h-[300px]">
          <AnimatePresence mode="popLayout">
            {events.map((event, index) => (
              <motion.div
                key={`${event.timestamp}-${index}`}
                initial={{ opacity: 0, y: 20, x: -20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="mb-4"
              >
                <pre className="text-brand-teal text-sm leading-relaxed m-0 bg-brand-teal/5 p-3 rounded border-l-2 border-brand-teal">
                  {formatEvent(event)}
                </pre>
              </motion.div>
            ))}
          </AnimatePresence>
          {events.length === 0 && (
            <div className="flex items-center justify-center h-[200px] text-brand-muted/50">
              <span>Waiting for events...</span>
            </div>
          )}
        </div>
      </div>
      <style>{`
        .data-stream-container pre::-webkit-scrollbar {
          width: 8px;
        }
        .data-stream-container pre::-webkit-scrollbar-track {
          background: #1a1a1a;
        }
        .data-stream-container pre::-webkit-scrollbar-thumb {
          background: rgba(64, 224, 208, 0.3);
          border-radius: 4px;
        }
        .data-stream-container pre::-webkit-scrollbar-thumb:hover {
          background: rgba(64, 224, 208, 0.5);
        }
      `}</style>
    </div>
  );
};

export default DataStream;
