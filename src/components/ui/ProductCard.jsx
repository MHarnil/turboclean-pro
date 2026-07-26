import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card, CardMedia, CardContent, CardActions,
  Typography, Button, Chip, Box, Skeleton, IconButton, Tooltip,
} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import { motion } from 'framer-motion';
import { companyInfo } from '../../data/company';

export default function ProductCard({ product, index = 0 }) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const whatsappMessage = encodeURIComponent(
    `Hello,\n\nI found your website and I'm interested in:\n\n*${product.name}*\n\nPlease share product details, pricing, and availability.\n\nThank you.`
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      style={{ height: '100%' }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'grey.100',
          position: 'relative',
          '&:hover .product-image': {
            transform: 'scale(1.06)',
          },
        }}
      >
        {/* Badges */}
        <Box sx={{ position: 'absolute', top: 12, left: 12, zIndex: 1, display: 'flex', flexDirection: 'column', gap: 0.75 }}>
          {product.isNew && (
            <Chip
              label="NEW"
              size="small"
              icon={<FiberNewIcon sx={{ fontSize: '14px !important' }} />}
              sx={{
                bgcolor: '#10B981',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.65rem',
                height: 22,
              }}
            />
          )}
          {product.isFeatured && (
            <Chip
              label="FEATURED"
              size="small"
              sx={{
                background: 'linear-gradient(135deg, #1565C0, #42A5F5)',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.65rem',
                height: 22,
              }}
            />
          )}
        </Box>

        {/* Product Image */}
        <Box sx={{ position: 'relative', overflow: 'hidden', bgcolor: 'grey.50' }}>
          {!imgLoaded && (
            <Skeleton
              variant="rectangular"
              width="100%"
              height={220}
              sx={{ position: 'absolute', top: 0, left: 0 }}
            />
          )}
          {!imgError ? (
            <Box
              component="img"
              src={product.thumbnail}
              alt={product.name}
              className="product-image"
              onError={() => setImgError(true)}
              onLoad={() => setImgLoaded(true)}
              sx={{
                width: '100%',
                height: 220,
                objectFit: 'contain',
                p: 2,
                transition: 'transform 0.4s ease',
                display: imgLoaded ? 'block' : 'none',
              }}
            />
          ) : (
            <Box
              sx={{
                width: '100%',
                height: 220,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'grey.100',
                fontSize: '3rem',
              }}
            >
              📦
            </Box>
          )}
        </Box>

        <CardContent sx={{ flex: 1, p: 2.5, pb: 1.5 }}>
          <Chip
            label={product.categoryName}
            size="small"
            sx={{
              bgcolor: 'rgba(21,101,192,0.08)',
              color: 'primary.main',
              fontWeight: 600,
              fontSize: '0.7rem',
              mb: 1.25,
              height: 22,
            }}
          />
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              fontSize: '0.95rem',
              lineHeight: 1.4,
              mb: 1,
              color: 'text.primary',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {product.name}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1.5, mb: 1.5, flexWrap: 'wrap' }}>
            {product.material && (
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                📦 {product.material.split('/')[0].trim()}
              </Typography>
            )}
            {product.moq && (
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                📦 MOQ: {product.moq}
              </Typography>
            )}
          </Box>

          <Box
            sx={{
              bgcolor: 'rgba(21,101,192,0.04)',
              border: '1px solid rgba(21,101,192,0.12)',
              borderRadius: 1.5,
              px: 1.5,
              py: 1,
            }}
          >
            <Typography variant="caption" color="text.secondary" display="block" sx={{ fontWeight: 500 }}>
              Price Range
            </Typography>
            <Typography variant="body2" fontWeight={700} color="primary.main">
              {product.priceRange}
            </Typography>
          </Box>
        </CardContent>

        <CardActions sx={{ p: 2.5, pt: 1.5, gap: 1 }}>
          <Button
            variant="contained"
            size="small"
            component={Link}
            to={`/products/${product.slug}`}
            id={`view-product-${product.id}`}
            aria-label={`View ${product.name}`}
            sx={{ flex: 1, fontSize: '0.8rem', py: 1 }}
          >
            View Details
          </Button>
          <Tooltip title="Inquire on WhatsApp">
            <IconButton
              href={`https://wa.me/${companyInfo.whatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              id={`whatsapp-product-${product.id}`}
              aria-label={`WhatsApp inquiry for ${product.name}`}
              size="small"
              sx={{
                bgcolor: 'rgba(37,211,102,0.1)',
                color: '#25D366',
                border: '1px solid rgba(37,211,102,0.2)',
                '&:hover': { bgcolor: '#25D366', color: 'white' },
                transition: 'all 0.2s',
              }}
            >
              <WhatsAppIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </motion.div>
  );
}
