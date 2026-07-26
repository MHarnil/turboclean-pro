import { useState, useEffect } from 'react';
import { Fab, Zoom, Tooltip } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import { motion, AnimatePresence } from 'framer-motion';
import { companyInfo } from '../../data/company';

export default function FloatingButtons() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const whatsappMessage = encodeURIComponent(
    `Hello,\n\nI found your website and I'm interested in your products.\n\nPlease share product details and quotation.\n\nThank you.`
  );

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            zIndex: 1000,
          }}
        >
          {/* WhatsApp Button */}
          <Tooltip title="Chat on WhatsApp" placement="left" arrow>
            <Fab
              href={`https://wa.me/${companyInfo.whatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              id="floating-whatsapp"
              aria-label="Chat on WhatsApp"
              sx={{
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                color: 'white',
                boxShadow: '0 8px 24px rgba(37,211,102,0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #20BA5A 0%, #0E7A6D 100%)',
                  transform: 'scale(1.1)',
                  boxShadow: '0 12px 32px rgba(37,211,102,0.5)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <WhatsAppIcon sx={{ fontSize: 28 }} />
            </Fab>
          </Tooltip>

          {/* Call Button */}
          <Tooltip title="Call Us Now" placement="left" arrow>
            <Fab
              href={`tel:${companyInfo.phone}`}
              id="floating-call"
              aria-label="Call Us"
              size="medium"
              sx={{
                background: 'linear-gradient(135deg, #1565C0 0%, #42A5F5 100%)',
                color: 'white',
                boxShadow: '0 8px 24px rgba(21,101,192,0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #0D47A1 0%, #1565C0 100%)',
                  transform: 'scale(1.1)',
                  boxShadow: '0 12px 32px rgba(21,101,192,0.5)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <PhoneIcon sx={{ fontSize: 22 }} />
            </Fab>
          </Tooltip>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
