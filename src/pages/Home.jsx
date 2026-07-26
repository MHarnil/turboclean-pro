import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Container, Grid, Typography, Button, Paper,
  Avatar, Rating, Divider, Chip,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VerifiedIcon from '@mui/icons-material/Verified';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import SectionTitle from '../components/ui/SectionTitle';
import ProductCard from '../components/ui/ProductCard';
import CategoryCard from '../components/ui/CategoryCard';
import { companyInfo, companyStats, companyFeatures, testimonials, faqs, businessProcess } from '../data/company';
import { getFeaturedProducts } from '../data/products';
import { getFeaturedCategories } from '../data/categories';
import StatCounter from '../components/sections/StatCounter';
import FAQ from '../components/sections/FAQ';

const heroSlides = [
  {
    id: 1,
    overline: 'GST Verified Trader & Retailer',
    title: 'Premium Quality\nProducts at Wholesale Price',
    subtitle: 'From personal care to kitchen essentials, baby toys to fragrances — discover 10+ categories of curated products from Surat, India.',
    cta: 'Explore Products',
    ctaPath: '/products',
    badge: '🇮🇳 Made & Traded in India',
  },
  {
    id: 2,
    overline: 'Personal Care & Beauty',
    title: 'Elevate Your\nBeauty Business',
    subtitle: 'Face ice bowls, manicure kits, and makeup organizers — premium beauty products for parlours, salons, and retail.',
    cta: 'Shop Beauty',
    ctaPath: '/categories/personal-care',
    badge: '💆 Beauty Professionals',
  },
  {
    id: 3,
    overline: 'Kitchen & Storage',
    title: 'Smart Storage\nSolutions for Every Kitchen',
    subtitle: 'Zip lock bags, egg containers, vegetable peelers — practical kitchen products for home and commercial use.',
    cta: 'Shop Kitchen',
    ctaPath: '/categories/kitchen-storage',
    badge: '🍳 Kitchen Essentials',
  },
];

const featureIcons = {
  verified: '✅',
  high_quality: '🏆',
  local_shipping: '🚚',
  price_check: '💰',
  diversity_3: '🛍️',
  support_agent: '💬',
};

export default function Home() {
  const featuredProducts = getFeaturedProducts();
  const featuredCategories = getFeaturedCategories();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <>
      <Helmet>
        <title>Dobariya Enterprise - GST Verified B2B Trader & Retailer | Surat, Gujarat</title>
        <meta name="description" content="Dobariya Enterprise - Premium quality Zip Lock Bags, Face Ice Bowl, Manicure Kit, Baby Toys, Attars and more. GST verified trader from Surat, Gujarat. Get wholesale prices." />
        <meta property="og:title" content="Dobariya Enterprise - B2B Trader & Retailer | Surat" />
        <meta property="og:description" content="GST Verified Trader & Retailer from Surat, Gujarat dealing in premium household, personal care, kitchen, baby products and fragrances." />
        <meta name="keywords" content="Dobariya Enterprise, zip lock bags, face ice bowl, manicure kit, baby toys, kasturi attar, surat trader, wholesale" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Dobariya Enterprise",
          "description": companyInfo.description,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": companyInfo.address,
            "addressLocality": companyInfo.city,
            "addressRegion": companyInfo.state,
            "postalCode": companyInfo.pincode,
            "addressCountry": "IN"
          },
          "telephone": companyInfo.phone,
          "url": "https://dobariyaenterprise.com"
        })}</script>
      </Helmet>

      {/* ---- HERO SECTION ---- */}
      <Box
        ref={heroRef}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #0F172A 0%, #1565C0 60%, #0D47A1 100%)',
          minHeight: { xs: '90vh', md: '85vh' },
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Background blobs */}
        <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', top: '-10%', right: '-5%',
              width: '45%', aspectRatio: '1',
              background: 'radial-gradient(circle, rgba(66,165,245,0.15) 0%, transparent 70%)',
              borderRadius: '50%',
            }}
          />
          <motion.div
            animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            style={{
              position: 'absolute', bottom: '-5%', left: '-5%',
              width: '35%', aspectRatio: '1',
              background: 'radial-gradient(circle, rgba(21,101,192,0.3) 0%, transparent 70%)',
              borderRadius: '50%',
            }}
          />
        </Box>

        {/* Grid pattern */}
        <Box sx={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }} />

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: { xs: 8, md: 4 } }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true, dynamicBullets: true }}
                loop
                style={{ paddingBottom: '48px' }}
              >
                {heroSlides.map((slide) => (
                  <SwiperSlide key={slide.id}>
                    <motion.div
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      <Chip
                        label={slide.badge}
                        sx={{
                          bgcolor: 'rgba(255,255,255,0.1)',
                          color: 'white',
                          fontWeight: 600,
                          mb: 2.5,
                          border: '1px solid rgba(255,255,255,0.2)',
                          backdropFilter: 'blur(8px)',
                        }}
                      />
                      <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 700, letterSpacing: '0.15em', mb: 1.5, display: 'block' }}>
                        {slide.overline}
                      </Typography>
                      <Typography
                        variant="h1"
                        sx={{
                          color: 'white',
                          fontWeight: 900,
                          mb: 2.5,
                          whiteSpace: 'pre-line',
                          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                          lineHeight: 1.15,
                          textShadow: '0 2px 20px rgba(0,0,0,0.3)',
                        }}
                      >
                        {slide.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: 'rgba(255,255,255,0.8)',
                          mb: 4,
                          fontSize: '1.05rem',
                          lineHeight: 1.8,
                          maxWidth: 520,
                        }}
                      >
                        {slide.subtitle}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        <Button
                          variant="contained"
                          size="large"
                          component={Link}
                          to={slide.ctaPath}
                          id={`hero-cta-${slide.id}`}
                          endIcon={<ArrowForwardIcon />}
                          sx={{
                            bgcolor: 'white',
                            color: 'primary.main',
                            fontWeight: 700,
                            px: 3.5,
                            '&:hover': {
                              bgcolor: 'rgba(255,255,255,0.9)',
                              boxShadow: '0 8px 24px rgba(255,255,255,0.3)',
                            },
                          }}
                        >
                          {slide.cta}
                        </Button>
                        <Button
                          variant="outlined"
                          size="large"
                          href={companyInfo.socialLinks.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          startIcon={<WhatsAppIcon />}
                          id={`hero-whatsapp-${slide.id}`}
                          sx={{
                            color: 'white',
                            borderColor: 'rgba(255,255,255,0.4)',
                            px: 3,
                            '&:hover': {
                              borderColor: 'white',
                              bgcolor: 'rgba(255,255,255,0.1)',
                            },
                          }}
                        >
                          WhatsApp Us
                        </Button>
                      </Box>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Grid>

            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 2,
                  }}
                >
                  {getFeaturedProducts().slice(0, 4).map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    >
                      <Box
                        component={Link}
                        to={`/products/${product.slug}`}
                        sx={{
                          display: 'block',
                          bgcolor: 'rgba(255,255,255,0.08)',
                          backdropFilter: 'blur(12px)',
                          border: '1px solid rgba(255,255,255,0.12)',
                          borderRadius: 3,
                          p: 2,
                          textDecoration: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            bgcolor: 'rgba(255,255,255,0.14)',
                            transform: 'translateY(-4px)',
                            borderColor: 'rgba(255,255,255,0.25)',
                          },
                        }}
                      >
                        <Box
                          component="img"
                          src={product.thumbnail}
                          alt={product.name}
                          sx={{
                            width: '100%',
                            height: 110,
                            objectFit: 'contain',
                            borderRadius: 1.5,
                            bgcolor: 'rgba(255,255,255,0.95)',
                            p: 1,
                            mb: 1.5,
                          }}
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        <Typography variant="caption" fontWeight={700} color="white" sx={{ display: 'block', lineHeight: 1.3 }}>
                          {product.shortName}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.7rem' }}>
                          {product.priceRange}
                        </Typography>
                      </Box>
                    </motion.div>
                  ))}
                </Box>

                {/* Trust badges */}
                <Box sx={{ display: 'flex', gap: 1.5, mt: 2.5, flexWrap: 'wrap' }}>
                  {[
                    { icon: '✅', text: 'GST Verified' },
                    { icon: '🏆', text: 'Quality Assured' },
                    { icon: '🚚', text: 'Pan-India Delivery' },
                  ].map((badge) => (
                    <Box
                      key={badge.text}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.75,
                        bgcolor: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: 2,
                        px: 1.5,
                        py: 0.75,
                      }}
                    >
                      <Typography sx={{ fontSize: '0.875rem' }}>{badge.icon}</Typography>
                      <Typography variant="caption" color="white" fontWeight={600}>{badge.text}</Typography>
                    </Box>
                  ))}
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ---- STATS SECTION ---- */}
      <Box sx={{ bgcolor: 'white', py: 5, borderBottom: '1px solid', borderColor: 'grey.100' }}>
        <Container maxWidth="xl">
          <StatCounter stats={companyStats} />
        </Container>
      </Box>

      {/* ---- FEATURED PRODUCTS ---- */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'grey.50' }}>
        <Container maxWidth="xl">
          <SectionTitle
            overline="Our Best Sellers"
            title="Featured Products"
            subtitle="Explore our most popular products, trusted by retailers and businesses across India."
          />
          <Grid container spacing={3}>
            {featuredProducts.map((product, i) => (
              <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={product} index={i} />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 5 }}>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/products"
              id="view-all-products-btn"
              endIcon={<ArrowForwardIcon />}
            >
              View All Products
            </Button>
          </Box>
        </Container>
      </Box>

      {/* ---- CATEGORIES ---- */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'white' }}>
        <Container maxWidth="xl">
          <SectionTitle
            overline="Browse by Category"
            title="Product Categories"
            subtitle="Find the exact products you need from our carefully curated categories."
          />
          <Grid container spacing={3}>
            {featuredCategories.map((cat, i) => (
              <Grid key={cat.id} item xs={12} sm={6} md={3}>
                <CategoryCard category={cat} index={i} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ---- WHY CHOOSE US ---- */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          background: 'linear-gradient(135deg, #0F172A 0%, #1565C0 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box sx={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }} />
        <Container maxWidth="xl" sx={{ position: 'relative' }}>
          <SectionTitle
            overline="Why Choose Us"
            title="The Dobariya Difference"
            subtitle="6 reasons why businesses across India trust Dobariya Enterprise for their sourcing needs."
            light
          />
          <Grid container spacing={3}>
            {companyFeatures.map((feature, i) => (
              <Grid key={feature.title} item xs={12} sm={6} md={4}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <Box
                    sx={{
                      p: 3.5,
                      bgcolor: 'rgba(255,255,255,0.06)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 3,
                      height: '100%',
                      transition: 'all 0.3s',
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.1)',
                        transform: 'translateY(-4px)',
                        borderColor: 'rgba(255,255,255,0.2)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 52,
                        height: 52,
                        borderRadius: '14px',
                        bgcolor: `${feature.color}20`,
                        border: `1px solid ${feature.color}40`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        mb: 2.5,
                      }}
                    >
                      {featureIcons[feature.icon] || '⭐'}
                    </Box>
                    <Typography variant="h6" fontWeight={700} color="white" mb={1}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
                      {feature.description}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ---- BUSINESS PROCESS ---- */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'grey.50' }}>
        <Container maxWidth="xl">
          <SectionTitle
            overline="How It Works"
            title="Our Business Process"
            subtitle="From browse to delivery — simple and transparent at every step."
          />
          <Grid container spacing={3} position="relative">
            {businessProcess.map((step, i) => (
              <Grid key={step.step} item xs={12} sm={6} md={4} lg={2}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #1565C0, #42A5F5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                        boxShadow: '0 8px 24px rgba(21,101,192,0.25)',
                        position: 'relative',
                        fontSize: '1.5rem',
                      }}
                    >
                      {['🔍', '📩', '📋', '✅', '📦', '🏠'][i]}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: -4,
                          right: -4,
                          width: 22,
                          height: 22,
                          borderRadius: '50%',
                          bgcolor: 'primary.dark',
                          color: 'white',
                          fontSize: '0.7rem',
                          fontWeight: 900,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '2px solid white',
                        }}
                      >
                        {step.step}
                      </Box>
                    </Box>
                    <Typography variant="subtitle2" fontWeight={700} mb={0.75}>
                      {step.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                      {step.description}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ---- TESTIMONIALS ---- */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'white' }}>
        <Container maxWidth="xl">
          <SectionTitle
            overline="Customer Reviews"
            title="What Our Clients Say"
            subtitle="Real feedback from businesses who source from Dobariya Enterprise."
          />
          <Grid container spacing={3}>
            {testimonials.map((t, i) => (
              <Grid key={t.id} item xs={12} sm={6} md={3}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      border: '1px solid',
                      borderColor: 'grey.100',
                      borderRadius: 3,
                      height: '100%',
                      transition: 'all 0.3s',
                      '&:hover': {
                        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                        borderColor: 'primary.light',
                        transform: 'translateY(-3px)',
                      },
                    }}
                  >
                    <Rating value={t.rating} readOnly precision={0.5} size="small" sx={{ mb: 1.5 }} />
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 2.5, fontStyle: 'italic' }}>
                      "{t.review}"
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar
                        sx={{
                          bgcolor: 'primary.main',
                          width: 40,
                          height: 40,
                          fontSize: '1rem',
                          fontWeight: 700,
                        }}
                      >
                        {t.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={700} lineHeight={1.2}>
                          {t.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {t.company}, {t.city}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ---- FAQ ---- */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'grey.50' }}>
        <Container maxWidth="md">
          <SectionTitle
            overline="Frequently Asked Questions"
            title="Got Questions? We've Got Answers"
          />
          <FAQ faqs={faqs.slice(0, 5)} />
        </Container>
      </Box>

      {/* ---- CONTACT CTA ---- */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          background: 'linear-gradient(135deg, #1565C0 0%, #42A5F5 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            top: '-30%',
            right: '-10%',
            width: '400px',
            height: '400px',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '50%',
          }}
        />
        <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <VerifiedIcon sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 48, mb: 2 }} />
            <Typography variant="h2" color="white" fontWeight={800} mb={2}>
              Ready to Place a Bulk Order?
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.85)', mb: 4, fontSize: '1.1rem', lineHeight: 1.8 }}>
              Contact us today for competitive wholesale pricing, GST invoices, and pan-India delivery. Our team responds within 24 hours.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/inquiry"
                id="home-inquiry-cta"
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  fontWeight: 700,
                  px: 4,
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
                }}
              >
                Send Inquiry
              </Button>
              <Button
                variant="outlined"
                size="large"
                href={companyInfo.socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<WhatsAppIcon />}
                id="home-whatsapp-cta"
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.5)',
                  px: 3,
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                Chat on WhatsApp
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </>
  );
}
