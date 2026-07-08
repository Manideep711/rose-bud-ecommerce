import { colorMap } from '../data/products';

const PRICE_OPTIONS = [
  { value: 'all', label: 'All Prices' },
  { value: 'under50', label: 'Under $50' },
  { value: '50to150', label: '$50 - $150' },
  { value: 'over150', label: 'Over $150' },
];

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest Arrivals' },
];

export default function FilterSidebar({
  categories, colors, activeCategories, activeColors, price, sort,
  onToggleCategory, onToggleColor, onPriceChange, onSortChange, showMobileSort,
}) {
  return (
    <aside className="w-full md:w-64 flex-shrink-0 space-y-10 pb-8 md:pb-0 border-b md:border-b-0 border-brand-100 filter-sidebar">
      {showMobileSort && (
        <div className="md:hidden space-y-3 pb-6 border-b border-brand-100">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-950">Sort By</h3>
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full p-3 border border-brand-200 rounded-lg bg-white text-sm"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      )}

      <div className="space-y-5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-950 flex justify-between items-center">Category</h3>
        <div className="space-y-4">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={activeCategories.includes(cat)}
                onChange={() => onToggleCategory(cat)}
                className="filter-checkbox rounded"
              />
              <span className="text-sm text-brand-600 group-hover:text-brand-950 transition-colors">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-950">Color</h3>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => {
            const checked = activeColors.includes(color);
            return (
              <label key={color} className="cursor-pointer group relative" title={color}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggleColor(color)}
                  className="sr-only"
                />
                <div
                  className={`w-8 h-8 rounded-full ${colorMap[color]} ring-offset-2 transition-all duration-300 group-hover:scale-110 group-hover:ring-brand-300 shadow-sm ${
                    checked ? 'ring-2 ring-brand-950 scale-100' : 'ring-1 ring-black/5'
                  }`}
                ></div>
              </label>
            );
          })}
        </div>
      </div>

      <div className="space-y-5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-950">Price Range</h3>
        <div className="space-y-4">
          {PRICE_OPTIONS.map((opt) => (
            <label key={opt.value} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="radio"
                name="price"
                value={opt.value}
                checked={price === opt.value}
                onChange={() => onPriceChange(opt.value)}
                className="filter-checkbox rounded-full"
              />
              <span className="text-sm text-brand-600 group-hover:text-brand-950 transition">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}

export { SORT_OPTIONS };
