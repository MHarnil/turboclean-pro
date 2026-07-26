import { Box, Container, Grid, Typography, Paper, Button, Breadcrumbs, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import DownloadIcon from '@mui/icons-material/Download';
import VerifiedIcon from '@mui/icons-material/Verified';
import SectionTitle from '../components/ui/SectionTitle';
import { companyInfo } from '../data/company';

const certs = [
  {
    id: 1,
    name: 'Goods & Services Tax Registration Certificate (Form GST REG-06)',
    authority: 'Government of India',
    idNumber: `GSTIN: ${companyInfo.gstin}`,
    status: 'Active & Verified',
    description: 'Statutory tax registration enabling legitimate nationwide interstate sales and B2B ITC claims.',
  },
  {
    id: 2,
    name: 'IndiaMART Verified Sourcing Profile Certificate',
    authority: 'IndiaMART InterMESH Ltd.',
    idNumber: 'Member ID: 243057454',
    status: 'Verified Member',
    description: 'Certification validating physical verification of business address, owner identification, and phone contact.',
  },
  {
    id: 3,
    name: 'Surat Municipal Trade License & Incorporation',
    authority: 'Surat Municipal Corporation',
    idNumber: 'Reg: SMC-GUJ-2020-001',
    status: 'Certified Sourcing Unit',
    description: 'Authorized retail and wholesale trading registration within the state of Gujarat.',
  },
];

export default function Certificates() {
  return (
    <>
      <Helmet>
        <title>Business Registrations & Certificates | Dobariya Enterprise Surat</title>
        <meta name="description" content="Verify GST registrations, trade licenses, and IndiaMART verified profiles of Dobariya Enterprise. Legit B2B transactions from Surat, Gujarat." />
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
            <Typography sx={{ color: 'white', fontWeight: 600 }}>Certificates</Typography>
          </Breadcrumbs>
          <Typography variant="h3" fontWeight={800} color="white">
            Licenses & Certifications
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mt: 1, maxWidth: 600 }}>
            Review legitimate business details ensuring verified B2B trading integrity.
          </Typography>
        </Container>
      </Box>

      {/* Grid */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <SectionTitle
          overline="VERIFIED TRUST"
          title="Credibility Check & Registration Licenses"
          subtitle="All transactions are fully invoiced with appropriate HSN codes and GST margins."
        />
        <Grid container spacing={4} justifyContent="center">
          {certs.map((c) => (
            <Grid item xs={12} md={4} key={c.id}>
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
                    transform: 'translateY(-4px)',
                    borderColor: 'primary.light',
                    boxShadow: '0 12px 32px rgba(21,101,192,0.05)',
                  },
                }}
              >
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
                    <VerifiedIcon sx={{ color: 'success.main', fontSize: 24 }} />
                    <Typography variant="caption" fontWeight={700} color="success.main" sx={{ textTransform: 'uppercase' }}>
                      {c.status}
                    </Typography>
                  </Box>
                  <Typography variant="h6" fontWeight={700} mb={1}>
                    {c.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    Authority: <strong>{c.authority}</strong>
                  </Typography>
                  <Typography variant="subtitle2" color="primary.main" fontWeight={700} mb={2}>
                    {c.idNumber}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, mb: 3 }}>
                    {c.description}
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<DownloadIcon />}
                  id={`download-cert-${c.id}`}
                  onClick={() => alert('Verification details are publicly hosted under GST Portal and IndiaMART.')}
                  sx={{ mt: 'auto', alignSelf: 'flex-start' }}
                >
                  Verify Online
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
