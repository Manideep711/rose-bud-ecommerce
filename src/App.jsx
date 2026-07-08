import { useLenisSetup } from './lib/lenis';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedMarquee from './components/FeaturedMarquee';
import Catalog from './components/Catalog';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import SuccessOverlay from './components/SuccessOverlay';
import Toast from './components/Toast';
import Chatbot from './components/Chatbot';

export default function App() {
  useLenisSetup();

  return (
    <ToastProvider>
      <CartProvider>
        <Navbar />
        <Hero />
        <FeaturedMarquee />
        <Catalog />
        <Footer />

        <CartDrawer />
        <CheckoutModal />
        <SuccessOverlay />
        <Toast />
        <Chatbot />
      </CartProvider>
    </ToastProvider>
  );
}
