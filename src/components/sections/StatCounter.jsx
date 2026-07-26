import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Typography, Box } from '@mui/material';

export default function StatCounter({ stats }) {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    stats.forEach((stat, idx) => {
      const duration = 1800;
      const steps = 60;
      const increment = stat.value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current = Math.min(current + increment, stat.value);
        setCounts((prev) => {
          const next = [...prev];
          next[idx] = Math.round(current);
          return next;
        });
        if (current >= stat.value) clearInterval(timer);
      }, duration / steps);
    });
  }, [started]);

  const iconMap = {
    inventory: '📦',
    category: '🗂️',
    people: '👥',
    timeline: '📅',
  };

  return (
    <Box
      ref={ref}
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
        gap: 4,
        py: 2,
      }}
    >
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ fontSize: '2rem', mb: 0.5 }}>{iconMap[stat.icon] || '⭐'}</Box>
            <Typography
              variant="h3"
              fontWeight={900}
              sx={{
                background: 'linear-gradient(135deg, #1565C0, #42A5F5)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1,
                mb: 0.5,
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              {counts[i].toLocaleString()}
              {stat.suffix}
            </Typography>
            <Typography variant="body2" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.75rem' }}>
              {stat.label}
            </Typography>
          </Box>
        </motion.div>
      ))}
    </Box>
  );
}
