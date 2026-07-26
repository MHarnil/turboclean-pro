import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import PageLoader from './components/ui/PageLoader';
import ScrollToTop from './components/common/ScrollToTop';

// Lazy-loaded pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Products = lazy(() => import('./pages/Products'));
const Categories = lazy(() => import('./pages/Categories'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Industries = lazy(() => import('./pages/Industries'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Certificates = lazy(() => import('./pages/Certificates'));
const Downloads = lazy(() => import('./pages/Downloads'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const Contact = lazy(() => import('./pages/Contact'));
const Inquiry = lazy(() => import('./pages/Inquiry'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:slug" element={<Products />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/inquiry" element={<Inquiry />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
