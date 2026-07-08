import { useToast } from '../context/ToastContext';

export default function Footer() {
  const { showToast } = useToast();

  return (
    <footer className="bg-brand-950 text-white pt-24 pb-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-800/30 rounded-full filter blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          <div className="md:col-span-5">
            <h2 className="font-serif text-3xl font-semibold tracking-tighter mb-6">Rose Bud.</h2>
            <p className="text-brand-400 text-sm leading-relaxed mb-8 max-w-sm">
              Elevating everyday life through meticulously designed objects. Quality without compromise, designed for the modern era.
            </p>
            <div className="flex space-x-5">
              {['instagram-logo', 'twitter-logo', 'pinterest-logo'].map((icon) => (
                <a key={icon} href="#" className="w-10 h-10 rounded-full border border-brand-800 flex items-center justify-center text-brand-400 hover:text-white hover:border-brand-500 hover:bg-brand-800 transition-all">
                  <i className={`ph ph-${icon} text-lg`}></i>
                </a>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-6 text-brand-500">Shop</h4>
            <ul className="space-y-4 text-sm text-brand-300">
              <li><a href="#" className="hover:text-white transition">All Products</a></li>
              <li><a href="#" className="hover:text-white transition">New Arrivals</a></li>
              <li><a href="#" className="hover:text-white transition">Tech Accessories</a></li>
              <li><a href="#" className="hover:text-white transition">Home Goods</a></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-6 text-brand-500">Support</h4>
            <ul className="space-y-4 text-sm text-brand-300">
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-white transition">Track Order</a></li>
              <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-6 text-brand-500">Newsletter</h4>
            <p className="text-brand-400 text-sm mb-6">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form
              className="flex flex-col space-y-3"
              onSubmit={(e) => { e.preventDefault(); showToast('Subscribed to newsletter!'); }}
            >
              <input type="email" placeholder="Email address" required
                className="bg-brand-900/50 text-white px-5 py-3 w-full focus:outline-none focus:ring-1 focus:ring-white rounded-lg text-sm border border-brand-800 transition-all" />
              <button type="submit" className="bg-white text-brand-950 px-5 py-3 font-medium text-sm rounded-lg hover:bg-brand-100 transition-colors w-full">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-brand-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-brand-500">
          <p>&copy; 2026 Rose Bud Boutique. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-brand-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
