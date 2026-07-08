import { useCart } from '../context/CartContext';

export default function CheckoutModal() {
  const { cart, closeCheckout, processPayment, paying, totals } = useCart();

  return (
    <div id="checkout-modal" className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 opacity-0 invisible modal-overlay bg-brand-950/40 backdrop-blur-md">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto modal-content flex flex-col md:flex-row hide-scrollbar relative">

        <div className="p-8 md:p-10 md:w-3/5 order-2 md:order-1 bg-white">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-serif text-2xl text-brand-950">Secure Checkout</h2>
            <button onClick={closeCheckout} className="text-brand-400 hover:text-brand-950 md:hidden p-2 bg-brand-50 rounded-full">
              <i className="ph ph-x text-lg"></i>
            </button>
          </div>

          <form onSubmit={processPayment}>
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-950 mb-3">Contact Information</h3>
                <input type="email" required placeholder="Email Address" className="w-full px-4 py-3.5 rounded-xl border border-brand-200 focus:outline-none focus:border-brand-950 focus:ring-1 focus:ring-brand-950 transition-all text-sm bg-brand-50/50" />
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-950 mb-3">Shipping Details</h3>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <input type="text" required placeholder="First Name" className="w-full px-4 py-3.5 rounded-xl border border-brand-200 focus:outline-none focus:border-brand-950 focus:ring-1 focus:ring-brand-950 transition-all text-sm bg-brand-50/50" />
                  <input type="text" required placeholder="Last Name" className="w-full px-4 py-3.5 rounded-xl border border-brand-200 focus:outline-none focus:border-brand-950 focus:ring-1 focus:ring-brand-950 transition-all text-sm bg-brand-50/50" />
                </div>
                <input type="text" required placeholder="Address" className="w-full px-4 py-3.5 rounded-xl border border-brand-200 focus:outline-none focus:border-brand-950 focus:ring-1 focus:ring-brand-950 transition-all text-sm mb-3 bg-brand-50/50" />
                <div className="grid grid-cols-3 gap-3">
                  <input type="text" required placeholder="City" className="col-span-1 px-4 py-3.5 rounded-xl border border-brand-200 focus:outline-none focus:border-brand-950 transition-all text-sm bg-brand-50/50" />
                  <input type="text" required placeholder="State" className="col-span-1 px-4 py-3.5 rounded-xl border border-brand-200 focus:outline-none focus:border-brand-950 transition-all text-sm bg-brand-50/50" />
                  <input type="text" required placeholder="ZIP" className="col-span-1 px-4 py-3.5 rounded-xl border border-brand-200 focus:outline-none focus:border-brand-950 transition-all text-sm bg-brand-50/50" />
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-950 mb-3 flex items-center justify-between">
                  Payment
                  <span className="flex gap-2 text-brand-400 text-xl">
                    <i className="ph ph-credit-card"></i>
                    <i className="ph ph-apple-logo"></i>
                  </span>
                </h3>
                <div className="bg-white p-1 rounded-xl border border-brand-200 shadow-sm focus-within:border-brand-950 transition-colors">
                  <div className="relative">
                    <input type="text" required placeholder="Card Number" pattern="\d*" maxLength={16} className="w-full px-4 py-3.5 pl-12 rounded-t-lg border-b border-brand-100 focus:outline-none text-sm bg-transparent" />
                    <i className="ph ph-credit-card absolute left-4 top-1/2 -translate-y-1/2 text-brand-400 text-lg"></i>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-brand-100">
                    <input type="text" required placeholder="MM/YY" maxLength={5} className="w-full px-4 py-3.5 rounded-bl-lg focus:outline-none text-sm bg-transparent" />
                    <input type="text" required placeholder="CVC" maxLength={4} className="w-full px-4 py-3.5 rounded-br-lg focus:outline-none text-sm bg-transparent" />
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" disabled={paying} className="mt-8 w-full py-4 bg-brand-950 text-white font-medium rounded-2xl hover:bg-brand-800 transition-all relative overflow-hidden shadow-lg shadow-brand-950/20 group">
              <span className={`flex items-center justify-center ${paying ? 'invisible' : ''}`}>
                Pay <span className="ml-1">${totals.total.toFixed(2)}</span>
              </span>
              {paying && (
                <div className="absolute inset-0 flex items-center justify-center bg-brand-950">
                  <i className="ph ph-spinner-gap animate-spin text-xl"></i>
                </div>
              )}
            </button>
            <p className="text-center text-xs text-brand-400 mt-5 flex items-center justify-center"><i className="ph ph-lock-key mr-1.5"></i> Encrypted & Secure</p>
          </form>
        </div>

        <div className="p-8 md:p-10 md:w-2/5 bg-[#fafafa] order-1 md:order-2 relative border-b md:border-b-0 md:border-l border-brand-100">
          <button onClick={closeCheckout} className="absolute top-6 right-6 text-brand-400 hover:text-brand-950 hidden md:flex items-center justify-center w-8 h-8 rounded-full hover:bg-brand-100 transition-colors">
            <i className="ph ph-x text-lg"></i>
          </button>
          <h3 className="font-serif text-xl text-brand-950 mb-6">Order Summary</h3>

          <div className="space-y-4 mb-8 max-h-[30vh] overflow-y-auto hide-scrollbar pr-2">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 bg-white p-2 rounded-xl">
                <div className="relative w-14 h-14 bg-brand-50 rounded-lg border border-brand-100 overflow-hidden flex-shrink-0">
                  <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                  <span className="absolute -top-1.5 -right-1.5 bg-brand-950 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">{item.quantity}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-brand-950 truncate">{item.name}</p>
                  <p className="text-xs text-brand-500">{item.category}</p>
                </div>
                <span className="text-sm font-medium text-brand-950">${item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3 text-sm border-t border-brand-200 pt-6">
            <div className="flex justify-between text-brand-600"><span>Subtotal</span><span>${totals.subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-brand-600"><span>Shipping</span><span>Complimentary</span></div>
            <div className="flex justify-between text-brand-600"><span>Taxes</span><span>${totals.tax.toFixed(2)}</span></div>
            <div className="flex justify-between font-medium text-xl text-brand-950 pt-4 border-t border-brand-200 mt-4 tracking-tight">
              <span>Total</span><span>${totals.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
