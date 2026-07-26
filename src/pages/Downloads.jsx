import { Box, Container, Grid, Typography, Paper, Button, Breadcrumbs, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import DownloadIcon from '@mui/icons-material/Download';
import SectionTitle from '../components/ui/SectionTitle';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const docs = [
  {
    id: 1,
    name: 'Dobariya Enterprise Sourcing Catalog 2026',
    type: 'PDF Catalog',
    size: '4.8 MB',
    description: 'Complete high-resolution document featuring product photos, specifications, and primary packaging details.',
  },
  {
    id: 2,
    name: 'Kitchen & Storage Sourcing Guide',
    type: 'PDF Sheet',
    size: '1.2 MB',
    description: 'Detailed specs sheet covering zip-lock storage bags, egg container units, and peeler bulk orders.',
  },
  {
    id: 3,
    name: 'Personal Care & Beauty Product Specs',
    type: 'PDF Catalog',
    size: '2.5 MB',
    description: 'Includes structural and ingredient analysis for face ice bowls, manicure sets, and brush organizers.',
  },
];

export default function Downloads() {
  const handleDownload = (docName) => {
    alert(`Downloading simulated file for: ${docName}. In production, this links to your actual PDF document.`);
  };

  return (
    <>
      <Helmet>
        <title>Downloads & Product Catalogs | Dobariya Enterprise Surat</title>
        <meta name="description" content="Download wholesale product lists, catalogs, and kitchen/beauty specifications in PDF format from Dobariya Enterprise." />
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
            <Typography sx={{ color: 'white', fontWeight: 600 }}>Downloads</Typography>
          </Breadcrumbs>
          <Typography variant="h3" fontWeight={800} color="white">
            Document Center
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mt: 1, maxWidth: 600 }}>
            Download PDF files and catalog lists offline for physical product review.
          </Typography>
        </Container>
      </Box>

      {/* Grid */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <SectionTitle
          overline="OFFLINE DOCUMENTS"
          title="Catalog & Specification sheets"
          subtitle="Explore product descriptions and MOQs offline by downloading PDF catalogs."
        />
        <Grid container spacing={4}>
          {docs.map((doc) => (
            <Grid item xs={12} md={4} key={doc.id}>
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
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
                    <PictureAsPdfIcon sx={{ color: 'error.main', fontSize: 32 }} />
                    <Box>
                      <Typography variant="subtitle2" fontWeight={700}>
                        {doc.type}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Size: {doc.size}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="h6" fontWeight={700} mb={1.5}>
                    {doc.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, mb: 3 }}>
                    {doc.description}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<DownloadIcon />}
                  id={`download-doc-${doc.id}`}
                  onClick={() => handleDownload(doc.name)}
                  sx={{ mt: 'auto', alignSelf: 'flex-start' }}
                >
                  Download PDF
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
