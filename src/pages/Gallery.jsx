import { useState } from 'react';
import { Box, Container, Typography, Breadcrumbs, Link as MuiLink, Dialog, Grid, Paper, Tab, Tabs } from '@mui/material';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SectionTitle from '../components/ui/SectionTitle';
import { products } from '../data/products';

export default function Gallery() {
  const [open, setOpen] = useState(false);
  const [activeImg, setActiveImg] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');

  const allImages = products.reduce((acc, p) => {
    p.images.forEach((img) => {
      acc.push({
        url: img,
        title: p.shortName,
        category: p.category,
        productSlug: p.slug,
      });
    });
    return acc;
  }, []);

  const filteredImages = selectedTab === 'all'
    ? allImages
    : allImages.filter((img) => img.category === selectedTab);

  const handleOpen = (url) => {
    setActiveImg(url);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const uniqueCategories = [
    { label: 'All Images', value: 'all' },
    { label: 'Kitchen & Storage', value: 'kitchen-storage' },
    { label: 'Personal Care & Beauty', value: 'personal-care' },
    { label: 'Baby & Kids Toys', value: 'baby-kids-toys' },
    { label: 'Fragrances & Attars', value: 'fragrances' },
  ];

  return (
    <>
      <Helmet>
        <title>Product Gallery | Dobariya Enterprise B2B Catalog</title>
        <meta name="description" content="View high-resolution product photos and packaging images of Zip Lock Bags, Face Ice Bowls, Manicure Kits, and Toys. Source securely from Surat, Gujarat." />
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
            <Typography sx={{ color: 'white', fontWeight: 600 }}>Gallery</Typography>
          </Breadcrumbs>
          <Typography variant="h3" fontWeight={800} color="white">
            Product Media Gallery
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mt: 1, maxWidth: 600 }}>
            Inspect high-resolution visual listings of our trading products and inventory.
          </Typography>
        </Container>
      </Box>

      {/* Grid */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <SectionTitle
          overline="MEDIA PORTFOLIO"
          title="High Quality Visual Catalog"
          subtitle="Click on any image to zoom and verify specifications or designs."
        />

        {/* Tabs Filter */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 5, display: 'flex', justifyContent: 'center' }}>
          <Tabs
            value={selectedTab}
            onChange={(e, val) => setSelectedTab(val)}
            variant="scrollable"
            scrollButtons="auto"
          >
            {uniqueCategories.map((t) => (
              <Tab key={t.value} label={t.label} value={t.value} sx={{ fontWeight: 700 }} />
            ))}
          </Tabs>
        </Box>

        {/* Gallery Masonry */}
        <Grid container spacing={3}>
          {filteredImages.map((img, idx) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
              <Paper
                sx={{
                  p: 1.5,
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'grey.100',
                  boxShadow: 'none',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.06)',
                  },
                  transition: 'all 0.2s ease',
                }}
                onClick={() => handleOpen(img.url)}
              >
                <Box
                  component="img"
                  src={img.url}
                  alt={img.title}
                  sx={{
                    width: '100%',
                    height: 220,
                    objectFit: 'contain',
                    borderRadius: 2,
                    bgcolor: 'grey.50',
                    p: 1,
                  }}
                />
                <Box sx={{ mt: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle2" fontWeight={700}>
                    {img.title}
                  </Typography>
                  <MuiLink
                    component={Link}
                    to={`/products/${img.productSlug}`}
                    sx={{ fontSize: '0.75rem', fontWeight: 600, color: 'primary.main', textDecoration: 'none' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Details →
                  </MuiLink>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Lightbox Dialog */}
        <Dialog open={open} onClose={handleClose} maxWidth="md" PaperProps={{ sx: { bgcolor: 'transparent', boxShadow: 'none' } }}>
          <Box
            component="img"
            src={activeImg}
            alt="Zoom view"
            sx={{
              maxHeight: '85vh',
              maxWidth: '100%',
              objectFit: 'contain',
              bgcolor: 'white',
              p: 2,
              borderRadius: 3,
            }}
          />
        </Dialog>
      </Container>
    </>
  );
}
