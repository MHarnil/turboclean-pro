import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import HomeIcon from '@mui/icons-material/Home';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 Page Not Found | Dobariya Enterprise Surat</title>
        <meta name="description" content="This page does not exist or has been relocated. Explore our products catalog for active sourcing opportunities." />
      </Helmet>

      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          px: 3,
        }}
      >
        <Typography variant="h1" color="primary.main" fontWeight={900} sx={{ fontSize: '7rem', lineHeight: 1 }}>
          404
        </Typography>
        <Typography variant="h4" fontWeight={700} sx={{ mt: 2, mb: 1 }}>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, mb: 4 }}>
          The link you navigated to might be broken, or the product has been updated. Return to homepage or browse our complete wholesale list.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" component={Link} to="/" startIcon={<HomeIcon />}>
            Back to Home
          </Button>
          <Button variant="outlined" component={Link} to="/products">
            Browse Products
          </Button>
        </Box>
      </Box>
    </>
  );
}
