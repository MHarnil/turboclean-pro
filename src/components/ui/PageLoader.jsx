import { Box, CircularProgress, Typography } from '@mui/material';
import { motion } from 'framer-motion';

export default function PageLoader() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)',
      }}
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <Box
          sx={{
            width: 64,
            height: 64,
            background: 'linear-gradient(135deg, #1565C0, #42A5F5)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            fontSize: '1.5rem',
            color: 'white',
            boxShadow: '0 8px 32px rgba(21,101,192,0.3)',
          }}
        >
          DE
        </Box>
      </motion.div>
      <CircularProgress size={28} sx={{ color: 'primary.main' }} />
      <Typography variant="body2" color="text.secondary" fontWeight={500}>
        Loading...
      </Typography>
    </Box>
  );
}
