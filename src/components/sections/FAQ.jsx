import { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion } from 'framer-motion';

export default function FAQ({ faqs }) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box>
      {faqs.map((faq, index) => (
        <motion.div
          key={faq.id}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Accordion
            expanded={expanded === `panel${faq.id}`}
            onChange={handleChange(`panel${faq.id}`)}
            sx={{
              mb: 2,
              borderRadius: '12px !important',
              boxShadow: 'none',
              border: '1px solid',
              borderColor: 'grey.100',
              '&::before': { display: 'none' },
              '&:hover': {
                borderColor: 'primary.light',
              },
              overflow: 'hidden',
              transition: 'border-color 0.2s',
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}
              sx={{
                py: 1,
                px: 3,
                bgcolor: expanded === `panel${faq.id}` ? 'rgba(21,101,192,0.04)' : 'transparent',
                '& .MuiAccordionSummary-content': {
                  margin: 0,
                },
              }}
            >
              <Typography variant="subtitle1" fontWeight={700} color="text.primary">
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 3, py: 2.5, borderTop: '1px solid', borderColor: 'grey.100' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </motion.div>
      ))}
    </Box>
  );
}
