import { Box, Container, Typography, Breadcrumbs, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function Terms() {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions | Dobariya Enterprise Surat</title>
        <meta name="description" content="Review trading terms, payment schedules, shipment timelines, and invoice policies of Dobariya Enterprise." />
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
            <Typography sx={{ color: 'white', fontWeight: 600 }}>Terms</Typography>
          </Breadcrumbs>
          <Typography variant="h3" fontWeight={800} color="white">
            Terms & Conditions
          </Typography>
        </Container>
      </Box>

      {/* Content */}
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          1. B2B Sourcing Parameters
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          All listings presented represent trade offers. Minimum Order Quantities (MOQs) apply for all product categories. Prices depend on ordering volumes and logistics destinations.
        </Typography>

        <Typography variant="h5" fontWeight={700} gutterBottom sx={{ mt: 4 }}>
          2. Billing & GST Invoicing
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          We issue appropriate tax invoices containing HSN codes and verified GSTIN identifiers. Buyers must supply correct GST records if claiming Input Tax Credit (ITC).
        </Typography>

        <Typography variant="h5" fontWeight={700} gutterBottom sx={{ mt: 4 }}>
          3. Deliveries & Shipping
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          Shipping timelines depend on dispatch parameters and shipping services. Standard shipping takes 3-7 working days. Dobariya Enterprise is not liable for delay contingencies caused by transport carriers.
        </Typography>

        <Typography variant="h5" fontWeight={700} gutterBottom sx={{ mt: 4 }}>
          4. Dispute Settlements
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          All legal transactions and disputes are subject to the exclusive jurisdiction of the competent courts in Surat, Gujarat, India.
        </Typography>
      </Container>
    </>
  );
}
