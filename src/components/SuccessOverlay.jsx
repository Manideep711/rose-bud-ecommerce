import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';

export default function SuccessOverlay() {
  const { successOpen, closeSuccess } = useCart();
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (successOpen) {
      const t = setTimeout(() => setAnimateIn(true), 100);
      return () => clearTimeout(t);
    }
    setAnimateIn(false);
  }, [successOpen]);

  return (
    <div className={`fixed inset-0 bg-brand-950 z-[70] flex flex-col items-center justify-center text-white transition-all duration-700 ${successOpen ? 'opacity-100' : 'opacity-0 invisible'}`}>
      <div className={`w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-8 transition-transform duration-700 delay-300 border border-white/20 ${animateIn ? '' : 'scale-0'}`}>
        <i className="ph ph-check text-5xl font-light text-accent-light"></i>
      </div>
      <h2 className={`font-serif text-4xl md:text-5xl mb-4 transition-all duration-700 delay-500 ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        Order Confirmed
      </h2>
      <p className={`text-brand-400 mb-10 transition-all duration-700 delay-[600ms] text-center max-w-sm ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        Thank you. Your receipt and tracking details have been sent to your email.
      </p>
      <button
        onClick={closeSuccess}
        className={`px-8 py-4 bg-white text-brand-950 rounded-full text-sm font-medium hover:bg-brand-100 transition-all duration-700 delay-[700ms] ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
      >
        Return to Store
      </button>
    </div>
  );
}
