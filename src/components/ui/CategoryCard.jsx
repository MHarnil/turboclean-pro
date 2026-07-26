import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { motion } from 'framer-motion';

const iconMap = {
  spa: '💆',
  kitchen: '🍳',
  child_care: '👶',
  local_florist: '🌺',
  home: '🏠',
};

export default function CategoryCard({ category, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      style={{ height: '100%' }}
    >
      <Card
        component={Link}
        to={`/categories/${category.slug}`}
        id={`category-card-${category.id}`}
        aria-label={`Browse ${category.name}`}
        sx={{
          height: '100%',
          textDecoration: 'none',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '20px',
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'grey.100',
          position: 'relative',
          cursor: 'pointer',
          transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
          '&:hover': {
            boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
            transform: 'translateY(-6px)',
            '& .cat-arrow': {
              transform: 'translateX(4px)',
              opacity: 1,
            },
            '& .cat-bg': {
              opacity: 1,
            },
          },
        }}
      >
        {/* Gradient overlay background */}
        <Box
          className="cat-bg"
          sx={{
            position: 'absolute',
            inset: 0,
            background: category.gradient,
            opacity: 0,
            transition: 'opacity 0.35s ease',
            zIndex: 0,
          }}
        />

        <CardContent sx={{ flex: 1, p: 3, position: 'relative', zIndex: 1 }}>
          {/* Icon */}
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: '16px',
              background: category.gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.75rem',
              mb: 2.5,
              boxShadow: `0 8px 24px ${category.color}30`,
              transition: 'all 0.3s ease',
            }}
          >
            {iconMap[category.icon] || '📦'}
          </Box>

          <Chip
            label={`${category.productCount} Products`}
            size="small"
            sx={{
              bgcolor: `${category.color}15`,
              color: category.color,
              fontWeight: 700,
              fontSize: '0.7rem',
              mb: 1.5,
              height: 22,
              transition: 'all 0.3s ease',
              '.MuiCard-root:hover &': {
                bgcolor: 'rgba(255,255,255,0.2)',
                color: 'white',
              },
            }}
          />

          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              mb: 1,
              fontSize: '1rem',
              transition: 'color 0.3s',
              '.MuiCard-root:hover &': { color: 'white' },
            }}
          >
            {category.name}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              lineHeight: 1.6,
              mb: 2,
              fontSize: '0.85rem',
              transition: 'color 0.3s',
              '.MuiCard-root:hover &': { color: 'rgba(255,255,255,0.8)' },
            }}
          >
            {category.description}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              color: category.color,
              fontWeight: 600,
              fontSize: '0.875rem',
              transition: 'color 0.3s',
              '.MuiCard-root:hover &': { color: 'white' },
            }}
          >
            Explore Category
            <ArrowForwardIcon
              className="cat-arrow"
              sx={{
                fontSize: 16,
                opacity: 0.7,
                transition: 'all 0.3s ease',
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}
