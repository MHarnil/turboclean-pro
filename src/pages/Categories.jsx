import { Box, Container, Grid, Typography, Breadcrumbs, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SectionTitle from '../components/ui/SectionTitle';
import { categories } from '../data/categories';
import CategoryCard from '../components/ui/CategoryCard';

export default function Categories() {
  return (
    <>
      <Helmet>
        <title>Product Categories | Dobariya Enterprise B2B Catalog</title>
        <meta name="description" content="Explore multiple B2B product categories: Kitchen & Storage, Personal Care, Baby & Kids Toys, Fragrances & Attars. Source bulk goods from Surat, India." />
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
            <Typography sx={{ color: 'white', fontWeight: 600 }}>Categories</Typography>
          </Breadcrumbs>
          <Typography variant="h3" fontWeight={800} color="white">
            Product Categories
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mt: 1, maxWidth: 600 }}>
            Discover our high-demand wholesale collections classified by user utilities.
          </Typography>
        </Container>
      </Box>

      {/* Categories Grid */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <SectionTitle
          overline="OUR PORTFOLIO"
          title="Explore Industry Standard Categories"
          subtitle="We supply certified wholesale units to online sellers, cosmetic outlets, and retail depots."
        />
        <Grid container spacing={4}>
          {categories.map((cat, i) => (
            <Grid item xs={12} sm={6} md={4} key={cat.id}>
              <CategoryCard category={cat} index={i} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
