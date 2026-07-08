import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { getLenis } from '../lib/lenis';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [paying, setPaying] = useState(false);
  const { showToast } = useToast();

  // Body classes drive the CSS transitions for the drawer/modal (see index.css)
  useEffect(() => {
    document.body.classList.toggle('cart-open', cartOpen);
  }, [cartOpen]);

  useEffect(() => {
    document.body.classList.toggle('modal-open', checkoutOpen);
  }, [checkoutOpen]);

  const toggleCart = useCallback(() => {
    setCartOpen((open) => {
      const next = !open;
      const lenis = getLenis();
      if (lenis) next ? lenis.stop() : lenis.start();
      return next;
    });
  }, []);

  const addToCart = useCallback((product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast('Added to cart');
  }, [showToast]);

  const updateQuantity = useCallback((productId, delta) => {
    setCart((prev) => {
      const next = prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + delta } : item
      );
      return next.filter((item) => item.quantity > 0);
    });
  }, []);

  const openCheckout = useCallback(() => {
    if (cart.length === 0) return;
    setCartOpen(false);
    getLenis()?.start();
    setTimeout(() => {
      setCheckoutOpen(true);
      getLenis()?.stop();
    }, 50);
  }, [cart.length]);

  const closeCheckout = useCallback(() => {
    setCheckoutOpen(false);
    getLenis()?.start();
  }, []);

  // Simulated payment — replace with a real payment provider before going live.
  const processPayment = useCallback((e) => {
    e.preventDefault();
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      closeCheckout();
      setSuccessOpen(true);
      setCart([]);
    }, 2000);
  }, [closeCheckout]);

  const closeSuccess = useCallback(() => setSuccessOpen(false), []);

  const totals = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.08;
    return { subtotal, tax, total: subtotal + tax };
  }, [cart]);

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const value = {
    cart, cartOpen, checkoutOpen, successOpen, paying, totals, totalItems,
    toggleCart, addToCart, updateQuantity, openCheckout, closeCheckout,
    processPayment, closeSuccess,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
