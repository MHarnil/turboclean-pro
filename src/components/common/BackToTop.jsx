import { useState, useEffect } from 'react';
import { Fab, Zoom, Tooltip } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Zoom in={show}>
      <Tooltip title="Back to Top" placement="left">
        <Fab
          onClick={scrollToTop}
          id="back-to-top-btn"
          aria-label="Back to top"
          size="small"
          sx={{
            position: 'fixed',
            bottom: 90,
            right: 24,
            bgcolor: 'white',
            color: 'primary.main',
            boxShadow: '0 4px 16px rgba(15,23,42,0.15)',
            border: '2px solid',
            borderColor: 'primary.light',
            '&:hover': {
              bgcolor: 'primary.main',
              color: 'white',
              transform: 'scale(1.1)',
            },
            transition: 'all 0.2s ease',
            zIndex: 999,
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Tooltip>
    </Zoom>
  );
}
