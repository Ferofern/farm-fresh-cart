import React, { createContext, useContext, useState, useMemo, ReactNode } from "react";
import { Product } from "@/components/ProductCard";
import PaymentModal from "@/components/PaymentModal"; // Importamos el modal aquí para gestionarlo

// Definición de tipos basada en tu Index.tsx
export interface CartItem {
  product: Product;
  kg: number;
}

interface CartContextType {
  cartItems: CartItem[];
  subtotal: number;
  transportCost: number;
  total: number;
  isCartOpen: boolean;
  isPaymentOpen: boolean;
  hasTransportIncluded: boolean;
  
  // Funciones de acción
  handleAddToCart: (product: Product, kg: number) => void;
  handleUpdateQuantity: (productId: string, kg: number) => void;
  handleRemoveItem: (productId: string) => void;
  setIsCartOpen: (open: boolean) => void;
  handleCheckout: () => void;
  closePaymentModal: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  // Lógica de cálculo (copiada directamente de tu Index.tsx)
  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.product.pricePerKg * item.kg, 0),
    [cartItems]
  );

  const transportCost = useMemo(
    () => cartItems.reduce((sum, item) => sum + (item.product.transportIncluded ? 0 : 5 * item.kg), 0),
    [cartItems]
  );
  
  const total = subtotal + transportCost;

  const hasTransportIncluded = useMemo(
    () => cartItems.some((item) => item.product.transportIncluded),
    [cartItems]
  );

  const handleAddToCart = (product: Product, kg: number) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, kg: item.kg + kg } : item
        );
      }
      return [...prev, { product, kg }];
    });
    // Abrir el carrito al añadir un producto
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, kg: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, kg } : item))
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };
  
  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsPaymentOpen(true);
  };

  const closePaymentModal = () => setIsPaymentOpen(false);

  const contextValue: CartContextType = {
    cartItems,
    subtotal,
    transportCost,
    total,
    isCartOpen,
    isPaymentOpen,
    hasTransportIncluded,
    handleAddToCart,
    handleUpdateQuantity,
    handleRemoveItem,
    setIsCartOpen,
    handleCheckout,
    closePaymentModal,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
      
      {/* El modal de pago se maneja globalmente */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={closePaymentModal}
        total={total}
        hasTransport={hasTransportIncluded}
      />
    </CartContext.Provider>
  );
};

export const useCartStore = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartStore must be used within a CartProvider');
  }
  return context;
};