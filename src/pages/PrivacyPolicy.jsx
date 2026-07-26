import { Box, Container, Typography, Breadcrumbs, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Dobariya Enterprise Surat</title>
        <meta name="description" content="Read our privacy policies detailing how we secure consumer sourcing requests, query details, and contact credentials." />
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
            <Typography sx={{ color: 'white', fontWeight: 600 }}>Privacy Policy</Typography>
          </Breadcrumbs>
          <Typography variant="h3" fontWeight={800} color="white">
            Privacy Policy
          </Typography>
        </Container>
      </Box>

      {/* Content */}
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          1. Information Collection
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          We collect personal credentials submitted voluntarily via our contact and sourcing forms (such as Name, Company Name, Email Address, and Phone Number). We use these inputs solely to process B2B product catalogs, shipping quotes, and invoicing details.
        </Typography>

        <Typography variant="h5" fontWeight={700} gutterBottom sx={{ mt: 4 }}>
          2. Information Utilization
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          All collected inputs are strictly utilized for communicating B2B quotations. We do not sell, trade, or share user credentials with third-party advertising directories.
        </Typography>

        <Typography variant="h5" fontWeight={700} gutterBottom sx={{ mt: 4 }}>
          3. Security Measures
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          We employ proper security features and hosting systems to protect customer query records from unauthorized access, loss, or disclosure.
        </Typography>

        <Typography variant="h5" fontWeight={700} gutterBottom sx={{ mt: 4 }}>
          4. Contact Details
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          If you have questions regarding this Privacy Policy or seek deletion of your sourcing records, please contact our support desk at dobariyaenterprise@gmail.com.
        </Typography>
      </Container>
    </>
  );
}
