import { Box, Container, Grid, Typography, Paper, Breadcrumbs, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SectionTitle from '../components/ui/SectionTitle';
import { companyInfo } from '../data/company';

const values = [
  {
    title: 'Integrity',
    description: 'We believe in honest dealings, transparent transactions, and standing by our promises to building long-term relations.',
    icon: '🤝',
  },
  {
    title: 'Quality Excellence',
    description: 'We ensure that every item from kitchen storage to beauty tools is manufactured or sourced matching absolute standards.',
    icon: '⭐',
  },
  {
    title: 'Customer-First Approach',
    description: 'We mold our wholesale deals, quantities, packaging, and logistics schedules around our clients requirements.',
    icon: '👤',
  },
  {
    title: 'Continuous Growth',
    description: 'We keep updating our B2B collection based on ongoing market demands, design trends, and user requests.',
    icon: '📈',
  },
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us | Dobariya Enterprise - Surat B2B Wholesale Supplier</title>
        <meta name="description" content="Discover Dobariya Enterprise, a premium GST-verified trader based in Surat, Gujarat. Learn about our mission, vision, values, and household goods catalog." />
      </Helmet>

      {/* Header Banner */}
      <Box
        sx={{
          bgcolor: 'primary.dark',
          color: 'white',
          py: 6,
          background: 'linear-gradient(135deg, #0F172A 0%, #1565C0 100%)',
        }}
      >
        <Container maxWidth="xl">
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" sx={{ color: 'rgba(255,255,255,0.6)' }} />}
            aria-label="breadcrumb"
            sx={{ mb: 2 }}
          >
            <MuiLink component={Link} to="/" sx={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', '&:hover': { color: 'white' } }}>
              Home
            </MuiLink>
            <Typography sx={{ color: 'white', fontWeight: 600 }}>About Us</Typography>
          </Breadcrumbs>
          <Typography variant="h3" fontWeight={800} color="white">
            About Dobariya Enterprise
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mt: 1, maxWidth: 600 }}>
            Your premium household, kitchen, personal care, and toys wholesale partner.
          </Typography>
        </Container>
      </Box>

      {/* Main Section */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Typography variant="overline" color="primary.main" fontWeight={700} sx={{ letterSpacing: '0.15em', mb: 1, display: 'block' }}>
                WHO WE ARE
              </Typography>
              <Typography variant="h3" fontWeight={800} mb={3}>
                Connecting Retailers with Quality Products
              </Typography>
              <Typography variant="body1" paragraph>
                {companyInfo.description}
              </Typography>
              <Typography variant="body1" paragraph sx={{ color: 'text.secondary' }}>
                Located in the thriving industrial hub of Surat, Gujarat, we have successfully developed sourcing networks that allow us to distribute high-grade items under one roof. Our selection is rigorously audited, ensuring all products like zip-lock storage bags, silicon items, attars, and kits meet reliable consumer standards.
              </Typography>
              <Typography variant="body1">
                Whether you run an online retail store (on Amazon, Meesho, Flipkart), a brick-and-mortar cosmetic shop, or a regional distribution company, we welcome you to join hands with us for competitive price catalogs and secure logistics.
              </Typography>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  height: 380,
                  background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  p: 4,
                  textAlign: 'center',
                }}
              >
                <Box>
                  <Typography variant="h1" fontWeight={900} sx={{ opacity: 0.25, fontSize: '5rem', mb: 0 }}>
                    DE
                  </Typography>
                  <Typography variant="h4" fontWeight={700} mb={1}>
                    ESTD 2020
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.8 }}>
                    Dobariya Enterprise has been a hallmark of trust in domestic and B2B trades.
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Vision & Mission */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Paper sx={{ p: 4, height: '100%', borderRadius: 3, border: '1px solid', borderColor: 'grey.100', boxShadow: 'none' }}>
                  <Typography variant="h5" fontWeight={700} gutterBottom color="primary.main">
                    🎯 Our Mission
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '1rem', lineHeight: 1.7 }}>
                    To streamline B2B product sourcing for retailers, e-commerce sellers, and wholesalers by providing highly reliable everyday commodities, personal care products, and household items at cost-effective price margins, supported by verified GST compliance and swift shipping protocols.
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Paper sx={{ p: 4, height: '100%', borderRadius: 3, border: '1px solid', borderColor: 'grey.100', boxShadow: 'none' }}>
                  <Typography variant="h5" fontWeight={700} gutterBottom color="primary.main">
                    👁️ Our Vision
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '1rem', lineHeight: 1.7 }}>
                    To expand our reach globally and emerge as a leading multi-category supplier from India. We aim to continuously widen our product categories while preserving strict product verification processes, supporting young entrepreneurs with low minimum order requirements.
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Core Values */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <SectionTitle
          overline="OUR VALUES"
          title="What Defines Dobariya Enterprise"
          subtitle="We follow a rigid code of operations to serve our B2B network safely."
        />
        <Grid container spacing={3}>
          {values.map((v, i) => (
            <Grid item xs={12} sm={6} md={3} key={v.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Paper
                  sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'grey.100',
                    boxShadow: 'none',
                    textAlign: 'center',
                  }}
                >
                  <Box sx={{ fontSize: '2.5rem', mb: 2 }}>{v.icon}</Box>
                  <Typography variant="h6" fontWeight={700} mb={1}>
                    {v.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                    {v.description}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
