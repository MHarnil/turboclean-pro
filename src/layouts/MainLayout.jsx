import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import FloatingButtons from '../components/common/FloatingButtons';
import BackToTop from '../components/common/BackToTop';

function MainLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingButtons />
      <BackToTop />
    </>
  );
}

export default MainLayout;
