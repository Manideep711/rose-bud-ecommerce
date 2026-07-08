import { useState, useEffect, useMemo } from 'react';
import { products } from '../data/products';
import FilterSidebar, { SORT_OPTIONS } from './FilterSidebar';
import ProductGrid from './ProductGrid';

const categories = [...new Set(products.map((p) => p.category))];
const colors = [...new Set(products.map((p) => p.color))];

export default function Catalog() {
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [activeCategories, setActiveCategories] = useState([]);
  const [activeColors, setActiveColors] = useState([]);
  const [price, setPrice] = useState('all');
  const [sort, setSort] = useState('featured');

  // Simulate initial network load, same as the original page
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const toggleCategory = (cat) => {
    setActiveCategories((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]));
  };
  const toggleColor = (color) => {
    setActiveColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]));
  };
  const resetFilters = () => {
    setActiveCategories([]);
    setActiveColors([]);
    setPrice('all');
    setSort('featured');
  };

  const filteredItems = useMemo(() => {
    let filtered = products.filter((p) => {
      const matchCat = activeCategories.length === 0 || activeCategories.includes(p.category);
      const matchColor = activeColors.length === 0 || activeColors.includes(p.color);
      let matchPrice = true;
      if (price === 'under50') matchPrice = p.price < 50;
      else if (price === '50to150') matchPrice = p.price >= 50 && p.price <= 150;
      else if (price === 'over150') matchPrice = p.price > 150;
      return matchCat && matchColor && matchPrice;
    });

    if (sort === 'price-low') filtered.sort((a, b) => a.price - b.price);
    else if (sort === 'price-high') filtered.sort((a, b) => b.price - a.price);
    else filtered.sort((a, b) => (b.isNew === a.isNew ? 0 : b.isNew ? 1 : -1));

    return filtered;
  }, [activeCategories, activeColors, price, sort]);

  const sharedFilterProps = {
    categories, colors, activeCategories, activeColors, price, sort,
    onToggleCategory: toggleCategory, onToggleColor: toggleColor,
    onPriceChange: setPrice, onSortChange: setSort,
  };

  return (
    <section id="catalog" className="py-24 bg-white relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 section-header gap-6">
          <div>
            <h2 className="font-serif text-4xl text-brand-950 mb-3 tracking-tight">Curated Objects</h2>
            <p className="text-brand-500">Showing <span className="font-medium text-brand-950">{filteredItems.length}</span> items</p>
          </div>

          <div className="hidden md:flex items-center space-x-3 bg-brand-50 rounded-full px-4 py-2 border border-brand-100">
            <i className="ph ph-sort-ascending text-brand-400"></i>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-transparent border-none text-sm font-medium text-brand-950 focus:ring-0 cursor-pointer outline-none"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          className="md:hidden mb-10 flex items-center justify-center w-full py-3 border border-brand-200 rounded-lg text-sm font-medium hover:bg-brand-50 transition"
          onClick={() => setMobileFiltersOpen((v) => !v)}
        >
          <i className="ph ph-faders mr-2"></i> Filters & Sort
        </button>

        <div className="flex flex-col md:flex-row gap-12 border-t border-brand-100 pt-8 md:border-t-0 md:pt-0">
          <div className={`${mobileFiltersOpen ? 'block' : 'hidden'} md:block`}>
            <FilterSidebar {...sharedFilterProps} showMobileSort />
          </div>

          <div className="flex-1 relative">
            <ProductGrid loading={loading} items={filteredItems} onResetFilters={resetFilters} />
          </div>
        </div>
      </div>
    </section>
  );
}
