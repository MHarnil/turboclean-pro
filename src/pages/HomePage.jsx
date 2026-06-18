import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProblemSection from '../components/ProblemSection';
import SolutionSection from '../components/SolutionSection';
import FeaturesSection from '../components/FeaturesSection';
import UseCases from '../components/UseCases';
import ProductGallery from '../components/ProductGallery';
import WhyChooseUs from '../components/WhyChooseUs';
import Reviews from '../components/Reviews';
import Specifications from '../components/Specifications';
import FAQ from '../components/FAQ';
import TrustSection from '../components/TrustSection';
import Footer from '../components/Footer';
import StickyBuyBtn from '../components/StickyBuyBtn';
import ExitIntentPopup from '../components/ExitIntentPopup';
import LiveOrderPopup from '../components/LiveOrderPopup';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-dark-900 text-white font-sans">
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <UseCases />
        <ProductGallery />
        <WhyChooseUs />
        <Reviews />
        <Specifications />
        <FAQ />
        <TrustSection />
      </main>
      <Footer />
      <StickyBuyBtn />
      <ExitIntentPopup />
      <LiveOrderPopup />
    </div>
  );
};

export default HomePage;
