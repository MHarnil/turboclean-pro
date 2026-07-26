import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Box, Container, Grid, Typography, TextField, MenuItem,
  Select, FormControl, InputLabel, Slider, Button, Chip,
  Breadcrumbs, Link as MuiLink, Pagination, InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Helmet } from 'react-helmet-async';
import { products } from '../data/products';
import { categories } from '../data/categories';
import ProductCard from '../components/ui/ProductCard';

const ITEMS_PER_PAGE = 8;

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'all';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);

  // Sync state with URL params
  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
    setSelectedCategory(searchParams.get('category') || 'all');
    setCurrentPage(1);
  }, [searchParams]);

  const handleCategoryChange = (slug) => {
    const params = new URLSearchParams(searchParams);
    if (slug === 'all') {
      params.delete('category');
    } else {
      params.set('category', slug);
    }
    params.delete('page');
    setSearchParams(params);
  };

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    const params = new URLSearchParams(searchParams);
    if (val) {
      params.set('search', val);
    } else {
      params.delete('search');
    }
    params.delete('page');
    setSearchParams(params);
  };

  const handleClearFilters = () => {
    setSearchParams({});
    setSearchQuery('');
    setSelectedCategory('all');
    setSortBy('default');
    setCurrentPage(1);
  };

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    // Category filter
    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Sort logic
    if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (e, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Sourcing & Product Catalog | Dobariya Enterprise Surat</title>
        <meta name="description" content="Browse our complete list of products from Personal Care, Kitchen Tools, Storage, Attars and Toys. Competitive bulk wholesale price quote." />
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
            <Typography sx={{ color: 'white', fontWeight: 600 }}>Products</Typography>
          </Breadcrumbs>
          <Typography variant="h3" fontWeight={800} color="white">
            Product Catalog
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mt: 1, maxWidth: 600 }}>
            Browse and query products matching your retail requirements. Click "View Details" to request quote schedules.
          </Typography>
        </Container>
      </Box>

      {/* Main Grid */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Filters Sidebar */}
          <Grid item xs={12} lg={3}>
            <Box
              sx={{
                bgcolor: 'white',
                p: 3,
                borderRadius: 4,
                border: '1px solid',
                borderColor: 'grey.100',
                position: 'sticky',
                top: 100,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" fontWeight={700} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FilterListIcon /> Filters
                </Typography>
                {(searchQuery || selectedCategory !== 'all' || sortBy !== 'default') && (
                  <Button size="small" onClick={handleClearFilters} sx={{ textTransform: 'none' }}>
                    Clear All
                  </Button>
                )}
              </Box>

              {/* Search bar */}
              <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>
                Search Keyword
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Type zip lock, box..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  endAdornment: searchQuery && (
                    <InputAdornment position="end">
                      <CloseIcon
                        sx={{ color: 'text.secondary', fontSize: 18, cursor: 'pointer' }}
                        onClick={() => handleSearchChange('')}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />

              {/* Categories */}
              <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5 }}>
                Category Filter
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
                <Chip
                  label="All Categories"
                  onClick={() => handleCategoryChange('all')}
                  variant={selectedCategory === 'all' ? 'filled' : 'outlined'}
                  color={selectedCategory === 'all' ? 'primary' : 'default'}
                  sx={{ justifyContent: 'flex-start', px: 1, py: 2 }}
                />
                {categories.map((cat) => (
                  <Chip
                    key={cat.slug}
                    label={`${cat.name} (${cat.productCount})`}
                    onClick={() => handleCategoryChange(cat.slug)}
                    variant={selectedCategory === cat.slug ? 'filled' : 'outlined'}
                    color={selectedCategory === cat.slug ? 'primary' : 'default'}
                    sx={{ justifyContent: 'flex-start', px: 1, py: 2 }}
                  />
                ))}
              </Box>

              {/* Sort selector */}
              <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>
                Sort Selection
              </Typography>
              <FormControl fullWidth size="small">
                <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <MenuItem value="default">Default Order</MenuItem>
                  <MenuItem value="name-asc">Alphabetical (A-Z)</MenuItem>
                  <MenuItem value="name-desc">Alphabetical (Z-A)</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>

          {/* Catalog grid */}
          <Grid item xs={12} lg={9}>
            {/* Summary */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Found <strong>{filteredProducts.length}</strong> products matching search settings.
              </Typography>
            </Box>

            {filteredProducts.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 8, bgcolor: 'grey.50', borderRadius: 4 }}>
                <Typography variant="h6" fontWeight={700} mb={1}>
                  No Products Found
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                  We couldn't find matches. Try typing a different keyword or resetting your category choice.
                </Typography>
                <Button variant="contained" onClick={handleClearFilters}>
                  Reset All Filters
                </Button>
              </Box>
            ) : (
              <>
                <Grid container spacing={3}>
                  {paginatedProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                      <ProductCard product={product} />
                    </Grid>
                  ))}
                </Grid>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={handlePageChange}
                      color="primary"
                      size="large"
                    />
                  </Box>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
