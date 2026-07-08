import { useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const glassRef = useRef(null);
  const { toggleCart, totalItems } = useCart();

  useEffect(() => {
    function onScroll() {
      const el = glassRef.current;
      if (!el) return;
      if (window.scrollY > 50) {
        el.classList.add('bg-white/80', 'shadow-sm');
        el.classList.remove('bg-white/60');
      } else {
        el.classList.remove('bg-white/80', 'shadow-sm');
        el.classList.add('bg-white/60');
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className="fixed w-full z-40 top-0 transition-all duration-500 nav-container" id="navbar">
      <div className="glass" ref={glassRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center md:hidden">
              <button className="p-2 text-brand-950 hover:text-brand-600 transition" aria-label="Menu">
                <i className="ph ph-list text-2xl"></i>
              </button>
            </div>

            <div className="flex-shrink-0 flex items-center justify-center flex-1 md:flex-none nav-item">
              <a href="#" className="font-serif text-3xl font-semibold tracking-tighter text-brand-950">Rose Bud.</a>
            </div>

            <div className="hidden md:flex space-x-8 items-center">
              <a href="#featured" className="nav-item text-sm font-medium text-brand-600 hover:text-brand-950 transition">Featured</a>
              <a href="#catalog" className="nav-item text-sm font-medium text-brand-600 hover:text-brand-950 transition">Shop All</a>
              <a href="#about" className="nav-item text-sm font-medium text-brand-600 hover:text-brand-950 transition">Story</a>
            </div>

            <div className="flex items-center space-x-4 md:space-x-6 nav-item">
              <button className="text-brand-950 hover:text-brand-600 transition" aria-label="Search">
                <i className="ph ph-magnifying-glass text-xl"></i>
              </button>
              <button className="text-brand-950 hover:text-brand-600 transition relative group" onClick={toggleCart} aria-label="Cart">
                <i className="ph ph-shopping-bag text-xl group-hover:scale-110 transition-transform duration-300"></i>
                <span
                  className={`absolute -top-1.5 -right-2 bg-brand-950 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center transition-all duration-300 ${totalItems > 0 ? '' : 'opacity-0 scale-50'}`}
                >
                  {totalItems}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
