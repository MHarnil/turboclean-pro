import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar, Toolbar, Box, Container, Button, IconButton,
  Drawer, List, ListItem, ListItemText, ListItemButton,
  Menu, MenuItem, useScrollTrigger, Slide, Typography,
  Divider, InputBase, Tooltip, Collapse, ListItemIcon,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { motion, AnimatePresence } from 'framer-motion';
import { companyInfo } from '../../data/company';
import { categories } from '../../data/categories';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  {
    label: 'Products',
    path: '/products',
    children: [
      { label: 'All Products', path: '/products' },
      { label: 'Personal Care & Beauty', path: '/categories/personal-care' },
      { label: 'Kitchen & Storage', path: '/categories/kitchen-storage' },
      { label: 'Baby & Kids Toys', path: '/categories/baby-kids-toys' },
      { label: 'Fragrances & Attars', path: '/categories/fragrances' },
    ],
  },
  { label: 'Categories', path: '/categories' },
  { label: 'Industries', path: '/industries' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
];

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger({ threshold: 100 });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState({});
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
    setSearchOpen(false);
  }, [location]);

  const handleMenuOpen = (e, label) => {
    setAnchorEl(e.currentTarget);
    setActiveMenu(label);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActiveMenu(null);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const toggleMobileExpanded = (label) => {
    setMobileExpanded((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Top Bar */}
      <Box
        sx={{
          bgcolor: 'primary.dark',
          color: 'white',
          py: 0.75,
          display: { xs: 'none', md: 'block' },
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
              🇮🇳 GST Verified Trader & Retailer | Surat, Gujarat, India
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Box component="a" href={`tel:${companyInfo.phone}`} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'white', textDecoration: 'none', fontSize: '0.75rem' }}>
                <PhoneIcon sx={{ fontSize: 14 }} />
                {companyInfo.phone}
              </Box>
              <Box component="a" href={companyInfo.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#25D366', textDecoration: 'none', fontSize: '0.75rem' }}>
                <WhatsAppIcon sx={{ fontSize: 14 }} />
                WhatsApp
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Main Navbar */}
      <HideOnScroll>
        <AppBar
          position="sticky"
          sx={{
            bgcolor: scrolled ? 'rgba(255,255,255,0.95)' : 'white',
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            color: 'text.primary',
            transition: 'all 0.3s ease',
            borderBottom: '1px solid',
            borderColor: 'grey.100',
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ py: 1, gap: 2 }}>
              {/* Logo */}
              <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textDecoration: 'none', flexShrink: 0 }}>
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    background: 'linear-gradient(135deg, #1565C0 0%, #42A5F5 100%)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                    fontSize: '1.2rem',
                    color: 'white',
                    boxShadow: '0 4px 12px rgba(21,101,192,0.3)',
                    flexShrink: 0,
                  }}
                >
                  DE
                </Box>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 800, lineHeight: 1.1, fontSize: '1rem' }}>
                    Dobariya
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, letterSpacing: '0.05em', display: 'block', lineHeight: 1 }}>
                    Enterprise
                  </Typography>
                </Box>
              </Box>

              {/* Desktop Nav Links */}
              <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 0.5, flexGrow: 1, justifyContent: 'center' }}>
                {navLinks.map((link) =>
                  link.children ? (
                    <Box key={link.label}>
                      <Button
                        id={`nav-btn-${link.label}`}
                        onClick={(e) => handleMenuOpen(e, link.label)}
                        endIcon={activeMenu === link.label ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        sx={{
                          color: isActive(link.path) ? 'primary.main' : 'text.primary',
                          fontWeight: isActive(link.path) ? 700 : 500,
                          fontSize: '0.9rem',
                          px: 1.5,
                          '&:hover': { color: 'primary.main', bgcolor: 'rgba(21,101,192,0.04)' },
                        }}
                      >
                        {link.label}
                      </Button>
                      <Menu
                        anchorEl={anchorEl}
                        open={activeMenu === link.label}
                        onClose={handleMenuClose}
                        PaperProps={{
                          sx: {
                            mt: 1,
                            borderRadius: 2,
                            boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
                            border: '1px solid',
                            borderColor: 'grey.100',
                            minWidth: 220,
                          },
                        }}
                      >
                        {link.children.map((child) => (
                          <MenuItem
                            key={child.path}
                            component={Link}
                            to={child.path}
                            onClick={handleMenuClose}
                            sx={{
                              py: 1.25,
                              px: 2.5,
                              fontSize: '0.875rem',
                              fontWeight: 500,
                              '&:hover': { color: 'primary.main', bgcolor: 'rgba(21,101,192,0.04)' },
                            }}
                          >
                            {child.label}
                          </MenuItem>
                        ))}
                      </Menu>
                    </Box>
                  ) : (
                    <Button
                      key={link.label}
                      component={Link}
                      to={link.path}
                      sx={{
                        color: isActive(link.path) ? 'primary.main' : 'text.primary',
                        fontWeight: isActive(link.path) ? 700 : 500,
                        fontSize: '0.9rem',
                        px: 1.5,
                        position: 'relative',
                        '&:hover': { color: 'primary.main', bgcolor: 'rgba(21,101,192,0.04)' },
                        '&::after': isActive(link.path) ? {
                          content: '""',
                          position: 'absolute',
                          bottom: 4,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: 20,
                          height: 2,
                          borderRadius: 1,
                          bgcolor: 'primary.main',
                        } : {},
                      }}
                    >
                      {link.label}
                    </Button>
                  )
                )}
              </Box>

              <Box sx={{ flexGrow: { xs: 1, lg: 0 } }} />

              {/* Search */}
              <Tooltip title="Search Products">
                <IconButton onClick={() => setSearchOpen(true)} id="search-btn" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                  <SearchIcon />
                </IconButton>
              </Tooltip>

              {/* CTA Button */}
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/inquiry"
                id="inquiry-cta-btn"
                sx={{ display: { xs: 'none', md: 'flex' }, whiteSpace: 'nowrap', flexShrink: 0 }}
              >
                Get Quote
              </Button>

              {/* Mobile Menu */}
              <IconButton
                onClick={() => setDrawerOpen(true)}
                sx={{ display: { xs: 'flex', lg: 'none' }, color: 'text.primary' }}
                id="mobile-menu-btn"
                aria-label="Open navigation menu"
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1400,
              background: 'rgba(15,23,42,0.95)',
              backdropFilter: 'blur(20px)',
              padding: '20px 24px',
            }}
          >
            <Container maxWidth="md">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <SearchIcon sx={{ color: 'white', fontSize: 28, flexShrink: 0 }} />
                <InputBase
                  autoFocus
                  placeholder="Search products, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  inputProps={{ id: 'search-input', 'aria-label': 'Search products' }}
                  sx={{
                    flex: 1,
                    color: 'white',
                    fontSize: '1.25rem',
                    fontWeight: 400,
                    '& ::placeholder': { color: 'rgba(255,255,255,0.5)' },
                  }}
                />
                <IconButton onClick={() => setSearchOpen(false)} sx={{ color: 'white' }} id="search-close-btn">
                  <CloseIcon />
                </IconButton>
              </Box>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', mt: 1, display: 'block' }}>
                Press Enter to search. Try "zip lock", "attar", "manicure"
              </Typography>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 300, borderRadius: '16px 0 0 16px' } }}
      >
        <Box sx={{ p: 2.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ width: 36, height: 36, background: 'linear-gradient(135deg, #1565C0, #42A5F5)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: '0.875rem' }}>
                DE
              </Box>
              <Typography fontWeight={700} color="primary.main">Dobariya Enterprise</Typography>
            </Box>
            <IconButton onClick={() => setDrawerOpen(false)} id="drawer-close-btn">
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <List disablePadding>
            {navLinks.map((link) => (
              <Box key={link.label}>
                {link.children ? (
                  <>
                    <ListItemButton
                      onClick={() => toggleMobileExpanded(link.label)}
                      sx={{ borderRadius: 2, mb: 0.5 }}
                    >
                      <ListItemText primary={link.label} primaryTypographyProps={{ fontWeight: 600 }} />
                      {mobileExpanded[link.label] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </ListItemButton>
                    <Collapse in={mobileExpanded[link.label]}>
                      <List disablePadding sx={{ pl: 2 }}>
                        {link.children.map((child) => (
                          <ListItemButton
                            key={child.path}
                            component={Link}
                            to={child.path}
                            sx={{ borderRadius: 1.5, mb: 0.25, py: 0.75 }}
                          >
                            <ListItemText primary={child.label} primaryTypographyProps={{ fontSize: '0.875rem' }} />
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                  </>
                ) : (
                  <ListItemButton
                    component={Link}
                    to={link.path}
                    selected={isActive(link.path)}
                    sx={{
                      borderRadius: 2,
                      mb: 0.5,
                      '&.Mui-selected': { bgcolor: 'rgba(21,101,192,0.08)', color: 'primary.main' },
                    }}
                  >
                    <ListItemText primary={link.label} primaryTypographyProps={{ fontWeight: isActive(link.path) ? 700 : 500 }} />
                  </ListItemButton>
                )}
              </Box>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/inquiry"
              fullWidth
              size="large"
              id="mobile-inquiry-btn"
            >
              Get Quote
            </Button>
            <Button
              variant="outlined"
              color="primary"
              href={companyInfo.socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<WhatsAppIcon />}
              fullWidth
              id="mobile-whatsapp-btn"
            >
              WhatsApp Us
            </Button>
          </Box>

          <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>📍 Location</Typography>
            <Typography variant="body2" fontWeight={500}>{companyInfo.address}</Typography>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
