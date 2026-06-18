import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CountdownTimer = () => {
  const [time, setTime] = useState({ hours: 3, minutes: 47, seconds: 22 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          // Reset
          hours = 3;
          minutes = 47;
          seconds = 22;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="bg-gradient-to-r from-red-600/20 via-orange-600/20 to-red-600/20 border border-red-500/30 rounded-2xl px-6 py-4 inline-flex flex-col items-center gap-3">
      <p className="text-red-400 text-sm font-semibold uppercase tracking-wider animate-pulse">
        ⚡ Limited Time Offer Ends Soon
      </p>
      <div className="flex items-center gap-3">
        {[
          { label: 'Hours', value: time.hours },
          { label: 'Minutes', value: time.minutes },
          { label: 'Seconds', value: time.seconds },
        ].map((item, i) => (
          <React.Fragment key={item.label}>
            <div className="text-center">
              <motion.div
                key={item.value}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="timer-digit"
              >
                <span className="text-2xl md:text-3xl font-display font-black text-white">
                  {pad(item.value)}
                </span>
              </motion.div>
              <p className="text-xs text-white/50 mt-1">{item.label}</p>
            </div>
            {i < 2 && (
              <span className="text-2xl font-bold text-sky-400 animate-pulse pb-4">:</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
