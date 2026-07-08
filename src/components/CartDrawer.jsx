import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { cart, toggleCart, updateQuantity, openCheckout, totals } = useCart();
  const isEmpty = cart.length === 0;

  return (
    <div id="cart-overlay" className="fixed inset-0 bg-brand-950/20 backdrop-blur-sm z-50 opacity-0 invisible" onClick={toggleCart}>
      <div id="cart-drawer" className="absolute top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-2xl flex flex-col translate-x-full" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-brand-100 bg-white z-10">
          <h2 className="font-serif text-2xl text-brand-950">Your Cart</h2>
          <button onClick={toggleCart} className="text-brand-500 hover:text-brand-950 transition p-2 rounded-full hover:bg-brand-50">
            <i className="ph ph-x text-xl"></i>
          </button>
        </div>

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center flex-1 p-6 text-center bg-[#fafafa]">
            <div className="w-20 h-20 bg-white shadow-sm rounded-full flex items-center justify-center mb-6 text-brand-300 border border-brand-100">
              <i className="ph ph-shopping-bag text-3xl"></i>
            </div>
            <p className="text-brand-950 font-medium text-lg mb-2">Your cart is empty</p>
            <p className="text-brand-500 text-sm mb-8">Looks like you haven't added anything yet.</p>
            <button onClick={toggleCart} className="px-8 py-3.5 bg-brand-950 text-white text-sm font-medium rounded-full hover:bg-brand-800 transition-colors shadow-lg shadow-black/10">
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#fafafa]">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 group bg-white p-3 rounded-xl border border-transparent hover:border-brand-100 transition-colors">
                  <div className="w-20 h-24 bg-brand-50 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-brand-950">{item.name}</h4>
                        <p className="text-xs text-brand-500 mt-1">{item.color}</p>
                      </div>
                      <span className="text-sm font-medium text-brand-950">${item.price * item.quantity}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-brand-200 rounded-lg bg-brand-50/50">
                        <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center text-brand-500 hover:text-brand-950 transition-colors">-</button>
                        <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center text-brand-500 hover:text-brand-950 transition-colors">+</button>
                      </div>
                      <button onClick={() => updateQuantity(item.id, -item.quantity)} className="text-xs text-brand-400 hover:text-red-500 underline underline-offset-4 opacity-0 group-hover:opacity-100 transition-all">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-brand-100 p-6 bg-white z-10 shadow-[0_-10px_20px_rgba(0,0,0,0.03)]">
              <div className="flex justify-between items-center mb-4">
                <span className="text-brand-600 font-medium">Subtotal</span>
                <span className="font-medium text-brand-950 text-xl tracking-tight">${totals.subtotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-brand-400 mb-6">Shipping and taxes calculated at checkout.</p>
              <button onClick={openCheckout} className="w-full py-4 bg-brand-950 text-white text-sm font-medium rounded-2xl hover:bg-brand-800 transition-all shadow-lg shadow-brand-950/20 flex justify-center items-center group hover:-translate-y-0.5">
                Proceed to Checkout <i className="ph ph-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
