import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box, Container, Grid, Typography, TextField, Button, Paper, MenuItem,
  Alert, Breadcrumbs, Link as MuiLink, Stepper, Step, StepLabel
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SendIcon from '@mui/icons-material/Send';
import { products } from '../data/products';
import { companyInfo } from '../data/company';

export default function Inquiry() {
  const [searchParams] = useSearchParams();
  const initialProductSlug = searchParams.get('product') || '';
  const initialProduct = products.find((p) => p.slug === initialProductSlug)?.name || '';

  const [inquirySent, setInquirySent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    city: '',
    state: '',
    country: 'India',
    productName: initialProduct || 'General Sourcing Inquiry',
    quantity: '50',
    requirementType: 'Wholesale Purchase',
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
      setFormData({
        name: '',
        company: '',
        phone: '',
        email: '',
        city: '',
        state: '',
        country: 'India',
        productName: 'General Sourcing Inquiry',
        quantity: '50',
        requirementType: 'Wholesale Purchase',
        message: '',
      });
    }, 4000);
  };

  return (
    <>
      <Helmet>
        <title>Request Sourcing Quotation | Dobariya Enterprise Surat</title>
        <meta name="description" content="Submit a detailed B2B sourcing inquiry to Dobariya Enterprise. Get custom catalog quotation matching your business volume." />
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
            <Typography sx={{ color: 'white', fontWeight: 600 }}>Inquiry</Typography>
          </Breadcrumbs>
          <Typography variant="h3" fontWeight={800} color="white">
            Wholesale Inquiry Form
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mt: 1, maxWidth: 600 }}>
            Enter details of your required products. A sales manager will respond within 24 hours.
          </Typography>
        </Container>
      </Box>

      {/* Grid */}
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper sx={{ p: 4, borderRadius: 4, border: '1px solid', borderColor: 'grey.200', boxShadow: 'none' }}>
          <Typography variant="h5" fontWeight={700} mb={1}>
            Submit B2B Sourcing Specification
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={4}>
            Provide details of target quantity, billing address, and required packaging.
          </Typography>

          {inquirySent && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Your B2B Sourcing inquiry was submitted! We will email you the custom pricing lists.
            </Alert>
          )}

          <Box component="form" onSubmit={handleFormSubmit}>
            <Grid container spacing={2.5}>
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
                  label="Company Name"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
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
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Product Required"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  required
                >
                  <MenuItem value="General Sourcing Inquiry">General Sourcing Inquiry</MenuItem>
                  {products.map((p) => (
                    <MenuItem key={p.id} value={p.name}>
                      {p.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Target Quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Requirement Type"
                  name="requirementType"
                  value={formData.requirementType}
                  onChange={handleInputChange}
                  required
                >
                  <MenuItem value="Wholesale Purchase">Wholesale Purchase</MenuItem>
                  <MenuItem value="Retail / Personal Use">Retail / Personal Use</MenuItem>
                  <MenuItem value="Distributor Sourcing">Distributor Sourcing</MenuItem>
                  <MenuItem value="White Labeling / OEM">White Labeling / OEM</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Detailed Sourcing Message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  multiline
                  rows={4}
                  placeholder="Specify packaging details, expected delivery timeline, or questions."
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  id="submit-inquiry-form"
                  startIcon={<SendIcon />}
                  size="large"
                  fullWidth
                >
                  Submit Inquiry
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
