import { useState } from 'react';
import {
  Box, Container, Grid, Typography, TextField, Button, Paper,
  Alert, Breadcrumbs, Link as MuiLink, List, ListItem, ListItemIcon, ListItemText
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendIcon from '@mui/icons-material/Send';
import { companyInfo } from '../data/company';

export default function Contact() {
  const [inquirySent, setInquirySent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us & Sourcing Address | Dobariya Enterprise Surat</title>
        <meta name="description" content="Get in touch with Dobariya Enterprise. Find phone numbers, verified business address in Surat, email, business hours, or request instant quotes." />
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
            <Typography sx={{ color: 'white', fontWeight: 600 }}>Contact</Typography>
          </Breadcrumbs>
          <Typography variant="h3" fontWeight={800} color="white">
            Contact Sourcing Team
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mt: 1, maxWidth: 600 }}>
            Connect with us for custom catalog quotations, logistics schedules, or sample requests.
          </Typography>
        </Container>
      </Box>

      {/* Grid */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Grid container spacing={5}>
          {/* Sourcing details block */}
          <Grid item xs={12} md={5}>
            <Box>
              <Typography variant="overline" color="primary.main" fontWeight={700} sx={{ letterSpacing: '0.15em', mb: 1, display: 'block' }}>
                GET IN TOUCH
              </Typography>
              <Typography variant="h4" fontWeight={800} mb={3}>
                Dobariya Enterprise Sourcing Hub
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.8 }}>
                We process all wholesale orders, packaging layouts, and dispatch schedules from our trade office in Surat, Gujarat. Feel free to contact our support desk via phone, email, or chat portals.
              </Typography>

              <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'grey.100', boxShadow: 'none', mb: 4 }}>
                <List disablePadding>
                  <ListItem disableGutters sx={{ mb: 2.5, alignItems: 'flex-start' }}>
                    <ListItemIcon sx={{ minWidth: 40, mt: 0.5 }}>
                      <LocationOnIcon sx={{ color: 'primary.main' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Office Address"
                      secondary={companyInfo.address}
                      primaryTypographyProps={{ fontWeight: 700 }}
                      secondaryTypographyProps={{ variant: 'body2', sx: { mt: 0.5 } }}
                    />
                  </ListItem>

                  <ListItem disableGutters sx={{ mb: 2.5 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <PhoneIcon sx={{ color: 'primary.main' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Phone Contact"
                      secondary={companyInfo.phone}
                      primaryTypographyProps={{ fontWeight: 700 }}
                      secondaryTypographyProps={{ variant: 'body2', sx: { mt: 0.5 } }}
                    />
                  </ListItem>

                  <ListItem disableGutters sx={{ mb: 2.5 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <EmailIcon sx={{ color: 'primary.main' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Email Sourcing"
                      secondary={companyInfo.email}
                      primaryTypographyProps={{ fontWeight: 700 }}
                      secondaryTypographyProps={{ variant: 'body2', sx: { mt: 0.5 } }}
                    />
                  </ListItem>

                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <AccessTimeIcon sx={{ color: 'primary.main' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Office Hours"
                      secondary="Mon – Sat: 9:00 AM – 7:00 PM | Sunday Closed"
                      primaryTypographyProps={{ fontWeight: 700 }}
                      secondaryTypographyProps={{ variant: 'body2', sx: { mt: 0.5 } }}
                    />
                  </ListItem>
                </List>
              </Paper>
            </Box>
          </Grid>

          {/* Form block */}
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 4, borderRadius: 4, border: '1px solid', borderColor: 'grey.200', boxShadow: 'none' }}>
              <Typography variant="h5" fontWeight={700} mb={1}>
                Submit Sourcing Query
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                Fill out this quick form. A sales manager will respond with a PDF quotation package.
              </Typography>

              {inquirySent && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  Your query was submitted successfully. Check your email or phone for pricing schedules shortly.
                </Alert>
              )}

              <Box component="form" onSubmit={handleFormSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Detailed Requirement"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      multiline
                      rows={4}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      id="submit-contact-form"
                      startIcon={<SendIcon />}
                      size="large"
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
