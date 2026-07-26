import { Box, Container, Typography, Breadcrumbs, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SectionTitle from '../components/ui/SectionTitle';
import FAQ from '../components/sections/FAQ';
import { faqs } from '../data/company';

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions | Dobariya Enterprise B2B Help</title>
        <meta name="description" content="Read FAQs regarding order placement, MOQs, payment modes, GST invoices, and shipping timelines with Dobariya Enterprise Surat." />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
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
            <Typography sx={{ color: 'white', fontWeight: 600 }}>FAQs</Typography>
          </Breadcrumbs>
          <Typography variant="h3" fontWeight={800} color="white">
            FAQ Help Center
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mt: 1, maxWidth: 600 }}>
            Quick solutions to our trading parameters, payment modes, and delivery channels.
          </Typography>
        </Container>
      </Box>

      {/* Accordions */}
      <Container maxWidth="md" sx={{ py: 8 }}>
        <SectionTitle
          overline="KNOWLEDGE BASE"
          title="Common Inquiries & Sourcing Policies"
          subtitle="Everything you need to know about processing bulk shipments with us."
        />
        <FAQ faqs={faqs} />
      </Container>
    </>
  );
}
