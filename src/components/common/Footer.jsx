import { Link } from 'react-router-dom';
import {
  Box, Container, Grid, Typography, Divider, IconButton,
  Button, List, ListItem, ListItemText, TextField, InputAdornment,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SendIcon from '@mui/icons-material/Send';
import VerifiedIcon from '@mui/icons-material/Verified';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { companyInfo } from '../../data/company';
import { categories } from '../../data/categories';
import { products } from '../../data/products';

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'All Products', path: '/products' },
  { label: 'Categories', path: '/categories' },
  { label: 'Industries', path: '/industries' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Certificates', path: '/certificates' },
  { label: 'Downloads', path: '/downloads' },
  { label: 'FAQs', path: '/faq' },
  { label: 'Contact Us', path: '/contact' },
];

const legalLinks = [
  { label: 'Privacy Policy', path: '/privacy-policy' },
  { label: 'Terms & Conditions', path: '/terms' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box component="footer" sx={{ bgcolor: '#0F172A', color: 'white', pt: 8, pb: 0 }}>
      <Container maxWidth="xl">
        <Grid container spacing={5} pb={6}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  background: 'linear-gradient(135deg, #1565C0, #42A5F5)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '1.1rem',
                  color: 'white',
                  boxShadow: '0 4px 16px rgba(21,101,192,0.4)',
                  flexShrink: 0,
                }}
              >
                DE
              </Box>
              <Box>
                <Typography variant="h6" fontWeight={800} color="white">
                  Dobariya Enterprise
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', display: 'block' }}>
                  Trusted B2B Trader & Retailer
                </Typography>
              </Box>
            </Box>

            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, mb: 3 }}>
              {companyInfo.shortDescription}
            </Typography>

            {/* GST Badge */}
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                bgcolor: 'rgba(16,185,129,0.1)',
                border: '1px solid rgba(16,185,129,0.3)',
                borderRadius: 2,
                px: 2,
                py: 1,
                mb: 3,
              }}
            >
              <VerifiedIcon sx={{ color: '#10B981', fontSize: 18 }} />
              <Typography variant="caption" sx={{ color: '#10B981', fontWeight: 600 }}>
                GST Verified | GSTIN: {companyInfo.gstin}
              </Typography>
            </Box>

            {/* Contact Info */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <LocationOnIcon sx={{ color: 'primary.light', fontSize: 18, flexShrink: 0 }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)' }}>
                  {companyInfo.address}
                </Typography>
              </Box>
              <Box
                component="a"
                href={`tel:${companyInfo.phone}`}
                sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: 'rgba(255,255,255,0.65)', textDecoration: 'none', '&:hover': { color: 'primary.light' }, transition: 'color 0.2s' }}
              >
                <PhoneIcon sx={{ color: 'primary.light', fontSize: 18, flexShrink: 0 }} />
                <Typography variant="body2">{companyInfo.phone}</Typography>
              </Box>
              <Box
                component="a"
                href={`mailto:${companyInfo.email}`}
                sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: 'rgba(255,255,255,0.65)', textDecoration: 'none', '&:hover': { color: 'primary.light' }, transition: 'color 0.2s' }}
              >
                <EmailIcon sx={{ color: 'primary.light', fontSize: 18, flexShrink: 0 }} />
                <Typography variant="body2">{companyInfo.email}</Typography>
              </Box>
            </Box>

            {/* Social */}
            <Box sx={{ display: 'flex', gap: 1.5, mt: 3 }}>
              <IconButton
                href={companyInfo.socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                id="footer-whatsapp"
                sx={{
                  bgcolor: 'rgba(37,211,102,0.1)',
                  color: '#25D366',
                  border: '1px solid rgba(37,211,102,0.2)',
                  '&:hover': { bgcolor: '#25D366', color: 'white', transform: 'translateY(-2px)' },
                  transition: 'all 0.2s',
                }}
              >
                <WhatsAppIcon />
              </IconButton>
              <IconButton
                href={companyInfo.indiamart}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="IndiaMART Profile"
                id="footer-indiamart"
                sx={{
                  bgcolor: 'rgba(21,101,192,0.1)',
                  color: 'primary.light',
                  border: '1px solid rgba(21,101,192,0.2)',
                  '&:hover': { bgcolor: 'primary.main', color: 'white', transform: 'translateY(-2px)' },
                  transition: 'all 0.2s',
                }}
              >
                <OpenInNewIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" fontWeight={700} color="white" mb={2.5} sx={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem' }}>
              Quick Links
            </Typography>
            <List disablePadding>
              {quickLinks.map((link) => (
                <ListItem key={link.path} disablePadding sx={{ mb: 0.5 }}>
                  <Box
                    component={Link}
                    to={link.path}
                    sx={{
                      color: 'rgba(255,255,255,0.6)',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      transition: 'color 0.2s',
                      '&:hover': { color: 'primary.light' },
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.75,
                      '&::before': {
                        content: '"›"',
                        color: 'primary.light',
                        fontWeight: 700,
                      },
                    }}
                  >
                    {link.label}
                  </Box>
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Products */}
          <Grid item xs={6} md={3}>
            <Typography variant="subtitle1" fontWeight={700} color="white" mb={2.5} sx={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem' }}>
              Our Products
            </Typography>
            <List disablePadding>
              {products.slice(0, 8).map((product) => (
                <ListItem key={product.id} disablePadding sx={{ mb: 0.5 }}>
                  <Box
                    component={Link}
                    to={`/products/${product.slug}`}
                    sx={{
                      color: 'rgba(255,255,255,0.6)',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      transition: 'color 0.2s',
                      '&:hover': { color: 'primary.light' },
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.75,
                      '&::before': {
                        content: '"›"',
                        color: 'primary.light',
                        fontWeight: 700,
                      },
                    }}
                  >
                    {product.shortName}
                  </Box>
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Newsletter + Business Hours */}
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" fontWeight={700} color="white" mb={2.5} sx={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem' }}>
              Get In Touch
            </Typography>

            <Box sx={{ bgcolor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 2, p: 2.5, mb: 3 }}>
              <Typography variant="body2" fontWeight={600} color="white" mb={0.5}>
                Business Hours
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 0.25 }}>
                Mon – Sat: 9:00 AM – 7:00 PM
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 1.5 }}>
                Sunday: 10:00 AM – 4:00 PM
              </Typography>
              <Button
                variant="contained"
                color="primary"
                href={companyInfo.socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<WhatsAppIcon />}
                size="small"
                fullWidth
                id="footer-whatsapp-cta"
              >
                Chat on WhatsApp
              </Button>
            </Box>

            <Button
              variant="outlined"
              component={Link}
              to="/contact"
              fullWidth
              id="footer-contact-btn"
              sx={{
                color: 'white',
                borderColor: 'rgba(255,255,255,0.2)',
                '&:hover': { borderColor: 'primary.light', bgcolor: 'rgba(21,101,192,0.1)' },
              }}
            >
              Send Inquiry
            </Button>
          </Grid>
        </Grid>
      </Container>

      {/* Bottom Bar */}
      <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.06)', py: 2.5 }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 1.5 }}>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', textAlign: { xs: 'center', md: 'left' } }}>
              © {currentYear} Dobariya Enterprise, Surat, Gujarat, India. All Rights Reserved.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {legalLinks.map((link) => (
                <Box
                  key={link.path}
                  component={Link}
                  to={link.path}
                  sx={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '0.75rem', '&:hover': { color: 'primary.light' }, transition: 'color 0.2s' }}
                >
                  {link.label}
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
