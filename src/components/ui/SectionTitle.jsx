import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

export default function SectionTitle({ overline, title, subtitle, align = 'center', light = false }) {
  return (
    <Box sx={{ textAlign: align, mb: 6 }}>
      {overline && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="overline"
            sx={{
              color: light ? 'rgba(255,255,255,0.7)' : 'primary.main',
              fontWeight: 700,
              letterSpacing: '0.15em',
              mb: 1,
              display: 'block',
            }}
          >
            {overline}
          </Typography>
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Typography
          variant="h2"
          sx={{
            color: light ? 'white' : 'text.primary',
            fontWeight: 800,
            mb: subtitle ? 2 : 0,
          }}
        >
          {title}
        </Typography>
      </motion.div>
      {subtitle && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Typography
            variant="body1"
            sx={{
              color: light ? 'rgba(255,255,255,0.7)' : 'text.secondary',
              maxWidth: 620,
              mx: align === 'center' ? 'auto' : 0,
              fontSize: '1.05rem',
              lineHeight: 1.8,
            }}
          >
            {subtitle}
          </Typography>
        </motion.div>
      )}
    </Box>
  );
}
