import { Box, Container, Grid, Typography, Paper, Breadcrumbs, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SectionTitle from '../components/ui/SectionTitle';
import { industries } from '../data/company';

const iconMap = {
  store: '🏪',
  spa: '💆',
  child_care: '👶',
  restaurant: '🍳',
  redeem: '🎁',
  shopping_cart: '🛒',
};

export default function Industries() {
  return (
    <>
      <Helmet>
        <title>Industries We Serve | Dobariya Enterprise B2B Supply</title>
        <meta name="description" content="Dobariya Enterprise supplies multiple industries including retail outlets, beauty parlours, online sellers, and daycares. Explore our custom sourcing options." />
      </Helmet>

      {/* Banner */}
      <Box sx={{ bgcolor: 'primary.dark', color: 'white', py: 6, background: 'linear-gradient(135deg, #0F172A 0%, #1565C0 100%)' }}>
        <Container maxWidth="xl">
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" sx={{ color: 'rgba(255,255,255,0.6)' }} />}
            aria-label="breadcrumb"
            sx={{ mb: 2 }}
          >
            <MuiLink component={Link} to="/" sx={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', '&:hover': { color: 'white' } }}>
              Home
            </MuiLink>
            <Typography sx={{ color: 'white', fontWeight: 600 }}>Industries</Typography>
          </Breadcrumbs>
          <Typography variant="h3" fontWeight={800} color="white">
            Industries Served
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mt: 1, maxWidth: 600 }}>
            Discover how we cater customized product schedules across multiple industrial channels.
          </Typography>
        </Container>
      </Box>

      {/* Grid */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <SectionTitle
          overline="MARKET CHANNELS"
          title="Diverse Supply Chains Built for Scalability"
          subtitle="We serve wholesale networks, retail outlets, and online distribution portals with tailored MOQs."
        />
        <Grid container spacing={4}>
          {industries.map((ind) => (
            <Grid item xs={12} sm={6} md={4} key={ind.id}>
              <Paper
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'grey.100',
                  boxShadow: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 32px rgba(21,101,192,0.06)',
                    borderColor: 'primary.light',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '12px',
                    bgcolor: 'rgba(21,101,192,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.75rem',
                    mb: 2.5,
                  }}
                >
                  {iconMap[ind.icon] || '🏢'}
                </Box>
                <Typography variant="h6" fontWeight={700} mb={1}>
                  {ind.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3} sx={{ lineHeight: 1.6 }}>
                  {ind.description}
                </Typography>
                <Typography variant="caption" fontWeight={700} color="primary.main" sx={{ display: 'block' }}>
                  KEY PRODUCTS SUPPLIED:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {ind.products.map((p) => (
                    <Chip key={p} label={p} size="small" sx={{ fontSize: '0.75rem' }} />
                  ))}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
