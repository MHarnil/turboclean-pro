import { Box, Container, Grid, Typography, Paper, Rating, Avatar, Divider, Breadcrumbs, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SectionTitle from '../components/ui/SectionTitle';
import { testimonials } from '../data/company';

export default function Testimonials() {
  return (
    <>
      <Helmet>
        <title>Customer Testimonials | Dobariya Enterprise B2B Reviews</title>
        <meta name="description" content="Read reviews and testimonials from our wholesale clients and retail partners dealing in kitchen tools, cosmetics, and toys." />
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
            <Typography sx={{ color: 'white', fontWeight: 600 }}>Testimonials</Typography>
          </Breadcrumbs>
          <Typography variant="h3" fontWeight={800} color="white">
            Client Testimonials
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mt: 1, maxWidth: 600 }}>
            Read feedback from stores and retail shops sourcing inventory from us.
          </Typography>
        </Container>
      </Box>

      {/* Grid */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <SectionTitle
          overline="CLIENT VERDICT"
          title="Reviews from Sourcing Partners"
          subtitle="Real reviews from businesses who trust our product catalog and shipping timelines."
        />
        <Grid container spacing={4}>
          {testimonials.map((t) => (
            <Grid item xs={12} sm={6} md={3} key={t.id}>
              <Paper
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'grey.100',
                  boxShadow: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.3s',
                  '&:hover': {
                    boxShadow: '0 12px 32px rgba(0,0,0,0.06)',
                    borderColor: 'primary.light',
                  },
                }}
              >
                <Box>
                  <Rating value={t.rating} readOnly precision={0.5} size="small" sx={{ mb: 2 }} />
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 3, fontStyle: 'italic' }}>
                    "{t.review}"
                  </Typography>
                </Box>
                <Box>
                  <Divider sx={{ mb: 2 }} />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', fontWeight: 700 }}>{t.avatar}</Avatar>
                    <Box>
                      <Typography variant="subtitle2" fontWeight={700} lineHeight={1.2}>
                        {t.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {t.company}, {t.city}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
