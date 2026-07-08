import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card group cursor-pointer border border-transparent hover:border-black/5 rounded-2xl transition-colors duration-300 p-2 -m-2">
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#f0f0f0] mb-5 isolate mask">
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-brand-950 text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full z-20 shadow-sm border border-black/5">
            New
          </span>
        )}

        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0 z-10"
          loading="lazy"
        />
        <img
          src={product.hoverImage}
          alt={`${product.name} alt view`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 z-0"
          loading="lazy"
        />

        <button
          onClick={(e) => { e.stopPropagation(); addToCart(product); }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md text-brand-950 text-sm font-medium px-6 py-3 rounded-full opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 z-20 hover:bg-brand-950 hover:text-white flex items-center shadow-xl w-[calc(100%-2rem)] max-w-[220px] justify-center hover:scale-[1.02]"
        >
          Quick Add <i className="ph ph-plus ml-2"></i>
        </button>
      </div>
      <div className="flex justify-between items-start px-1">
        <div>
          <h3 className="font-medium text-brand-950 group-hover:text-brand-600 transition-colors">{product.name}</h3>
          <p className="text-sm text-brand-500 mt-0.5">{product.category}</p>
        </div>
        <span className="font-medium text-brand-950 bg-brand-50 px-2 py-1 rounded-md text-sm">${product.price}</span>
      </div>
    </div>
  );
}
