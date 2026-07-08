import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ProductCard from './ProductCard';

function Skeleton({ extraClass = '' }) {
  return (
    <div className={`animate-pulse ${extraClass}`}>
      <div className="bg-brand-50 aspect-[4/5] rounded-2xl mb-4"></div>
      <div className="h-4 bg-brand-50 rounded w-2/3 mb-2"></div>
      <div className="h-4 bg-brand-50 rounded w-1/3"></div>
    </div>
  );
}

export default function ProductGrid({ loading, items, onResetFilters }) {
  const gridRef = useRef(null);

  // Aceternity-style spotlight: track cursor position per-card via a single delegated listener
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    function onMove(e) {
      const target = e.target.closest('.product-card');
      if (!target) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      target.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    }
    grid.addEventListener('mousemove', onMove);
    return () => grid.removeEventListener('mousemove', onMove);
  }, []);

  // GSAP stagger entrance whenever the visible items change
  useEffect(() => {
    if (loading || !gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.product-card');
    if (cards.length === 0) return;
    gsap.fromTo(
      cards,
      { y: 30, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.05, ease: 'back.out(1.2)', clearProps: 'all' }
    );
  }, [loading, items]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        <Skeleton />
        <Skeleton extraClass="hidden sm:block" />
        <Skeleton extraClass="hidden lg:block" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center bg-brand-50 rounded-3xl">
        <i className="ph ph-magnifying-glass text-4xl text-brand-300 mb-4"></i>
        <h3 className="text-xl font-serif text-brand-950 mb-2">No matching objects</h3>
        <p className="text-brand-500 mb-6 max-w-sm">Try adjusting your filters or search terms to find what you're looking for.</p>
        <button onClick={onResetFilters} className="px-6 py-2.5 border border-brand-200 rounded-full text-sm font-medium hover:bg-white hover:shadow-sm transition">
          Clear all filters
        </button>
      </div>
    );
  }

  return (
    <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 pb-10">
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
