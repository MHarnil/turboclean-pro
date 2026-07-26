import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Box, Container, Grid, Typography, Button, Paper, Chip, Divider,
  Table, TableBody, TableCell, TableContainer, TableRow, List, ListItem,
  ListItemIcon, ListItemText, TextField, Alert, Breadcrumbs, Link as MuiLink,
} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Helmet } from 'react-helmet-async';
import { getProductBySlug, getRelatedProducts } from '../data/products';
import { companyInfo } from '../data/company';
import ProductCard from '../components/ui/ProductCard';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = getProductBySlug(slug);

  // Redirect if product not found
  useEffect(() => {
    if (!product) {
      navigate('/404');
    }
  }, [product, navigate]);

  if (!product) return null;

  const [activeImage, setActiveImage] = useState(product.images[0] || product.thumbnail);
  const [inquirySent, setInquirySent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    quantity: '10',
    message: `Hello, I am interested in purchasing ${product.name}. Please provide a bulk quotation and shipping timelines.`,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Simulate sending inquiry
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        quantity: '10',
        message: `Hello, I am interested in purchasing ${product.name}. Please provide a bulk quotation and shipping timelines.`,
      });
    }, 4000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello,\n\nI found your website. I am interested in:\n\n*${product.name}*\n\nPlease share price quote and shipping time for ${formData.quantity || product.moq || 'bulk'} units.\n\nThank you.`
  );

  const related = getRelatedProducts(product.id, product.category, 4);

  return (
    <>
      <Helmet>
        <title>{product.name} Wholesale Quote | Dobariya Enterprise Surat</title>
        <meta name="description" content={`Get wholesale quotation for ${product.name}. Minimum order quantity is ${product.moq || '10 units'}. GST-verified supplier Dobariya Enterprise, Gujarat.`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": product.name,
          "image": product.images,
          "description": product.description,
          "brand": {
            "@type": "Brand",
            "name": product.brand
          },
          "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "INR",
            "lowPrice": "50",
            "highPrice": "500",
            "offerCount": "10"
          }
        })}</script>
      </Helmet>

      {/* Breadcrumb section */}
      <Box sx={{ bgcolor: 'grey.50', py: 3, borderBottom: '1px solid', borderColor: 'grey.200' }}>
        <Container maxWidth="xl">
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <MuiLink component={Link} to="/" sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
              Home
            </MuiLink>
            <MuiLink component={Link} to="/products" sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
              Products
            </MuiLink>
            <MuiLink component={Link} to={`/categories/${product.category}`} sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
              {product.categoryName}
            </MuiLink>
            <Typography color="text.primary" fontWeight={600}>
              {product.shortName}
            </Typography>
          </Breadcrumbs>
        </Container>
      </Box>

      {/* Product Detail Grid */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Grid container spacing={5}>
          {/* Gallery Column */}
          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 2, borderRadius: 4, border: '1px solid', borderColor: 'grey.200', boxShadow: 'none' }}>
              <Box
                component="img"
                src={activeImage}
                alt={product.name}
                sx={{
                  width: '100%',
                  height: 350,
                  objectFit: 'contain',
                  borderRadius: 2,
                  mb: 2,
                }}
              />
              <Grid container spacing={2}>
                {product.images.map((img, index) => (
                  <Grid item xs={3} key={index}>
                    <Box
                      component="img"
                      src={img}
                      alt="Product thumbnail"
                      onClick={() => setActiveImage(img)}
                      sx={{
                        width: '100%',
                        height: 70,
                        objectFit: 'contain',
                        borderRadius: 1.5,
                        border: '2px solid',
                        borderColor: activeImage === img ? 'primary.main' : 'grey.200',
                        cursor: 'pointer',
                        p: 0.5,
                        '&:hover': { borderColor: 'primary.light' },
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          {/* Core Specs & Actions */}
          <Grid item xs={12} md={4}>
            <Box>
              <Chip label={product.categoryName} color="primary" variant="outlined" sx={{ mb: 2, fontWeight: 700 }} />
              <Typography variant="h4" fontWeight={800} mb={1}>
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                Brand: <strong>{product.brand}</strong> | Country: <strong>{product.country}</strong>
              </Typography>

              <Box sx={{ bgcolor: 'rgba(21,101,192,0.04)', p: 3, borderRadius: 3, mb: 4, border: '1px solid', borderColor: 'rgba(21,101,192,0.08)' }}>
                <Typography variant="caption" color="text.secondary" display="block">
                  Wholesale Price Range
                </Typography>
                <Typography variant="h4" fontWeight={800} color="primary.main" mb={1}>
                  {product.priceRange}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Minimum Order Quantity (MOQ): <strong>{product.moq}</strong>
                </Typography>
              </Box>

              <Typography variant="h6" fontWeight={700} mb={1.5}>
                Key Features
              </Typography>
              <List disablePadding sx={{ mb: 4 }}>
                {product.features.map((feature, idx) => (
                  <ListItem key={idx} disablePadding sx={{ mb: 1, alignItems: 'flex-start' }}>
                    <ListItemIcon sx={{ minWidth: 28, mt: 0.25 }}>
                      <CheckCircleIcon sx={{ color: 'success.main', fontSize: 18 }} />
                    </ListItemIcon>
                    <ListItemText primary={feature} primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }} />
                  </ListItem>
                ))}
              </List>

              <Typography variant="h6" fontWeight={700} mb={1.5}>
                Specifications Table
              </Typography>
              <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'grey.200', borderRadius: 2 }}>
                <Table size="small">
                  <TableBody>
                    {Object.entries(product.specifications).map(([key, val]) => (
                      <TableRow key={key}>
                        <TableCell sx={{ fontWeight: 600, color: 'text.secondary', width: '40%' }}>{key}</TableCell>
                        <TableCell>{val}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>

          {/* Sticky Inquiry Form Sidebar */}
          <Grid item xs={12} md={3}>
            <Box sx={{ position: 'sticky', top: 100 }}>
              <Paper sx={{ p: 3, borderRadius: 4, border: '1px solid', borderColor: 'grey.200', boxShadow: 'none', mb: 3 }}>
                <Typography variant="h6" fontWeight={700} mb={2}>
                  Direct Sourcing Quote
                </Typography>

                {inquirySent && (
                  <Alert severity="success" sx={{ mb: 2.5 }}>
                    Your quotation request has been sent! We will connect via Phone or Email shortly.
                  </Alert>
                )}

                <Box component="form" onSubmit={handleFormSubmit}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    size="small"
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Mobile Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    size="small"
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Quantity"
                    name="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    required
                    size="small"
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Requirement Message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    multiline
                    rows={3}
                    size="small"
                    sx={{ mb: 2.5 }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    id="submit-detail-quote"
                    startIcon={<EmailIcon />}
                    sx={{ mb: 1.5 }}
                  >
                    Request Quotation
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    href={`https://wa.me/${companyInfo.whatsapp}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="whatsapp-detail-chat"
                    startIcon={<WhatsAppIcon sx={{ color: '#25D366' }} />}
                  >
                    Quick WhatsApp Quote
                  </Button>
                </Box>
              </Paper>

              <Paper sx={{ p: 2.5, borderRadius: 3, bgcolor: 'grey.50', border: '1px solid', borderColor: 'grey.200', boxShadow: 'none' }}>
                <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                  🏢 Dobariya Enterprise
                </Typography>
                <Typography variant="caption" display="block" color="text.secondary">
                  GST Verified: {companyInfo.gstin}
                </Typography>
                <Typography variant="caption" display="block" color="text.secondary">
                  Location: Surat, Gujarat, India
                </Typography>
              </Paper>
            </Box>
          </Grid>
        </Grid>

        {/* Detailed Description */}
        <Box sx={{ mt: 8, p: 4, bgcolor: 'grey.50', borderRadius: 4, border: '1px solid', borderColor: 'grey.200' }}>
          <Typography variant="h5" fontWeight={700} mb={2}>
            Product Description
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
            {product.description}
          </Typography>
          {product.applications && (
            <>
              <Typography variant="h6" fontWeight={700} sx={{ mt: 4, mb: 1.5 }}>
                Primary Applications
              </Typography>
              <Grid container spacing={2}>
                {product.applications.map((app, idx) => (
                  <Grid item xs={12} sm={6} md={4} key={idx}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircleIcon sx={{ color: 'primary.main', fontSize: 16 }} />
                      <Typography variant="body2">{app}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Box>

        {/* Related Products */}
        {related.length > 0 && (
          <Box sx={{ mt: 8 }}>
            <Typography variant="h5" fontWeight={700} mb={4}>
              Related Products
            </Typography>
            <Grid container spacing={3}>
              {related.map((p) => (
                <Grid item xs={12} sm={6} md={3} key={p.id}>
                  <ProductCard product={p} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </>
  );
}
