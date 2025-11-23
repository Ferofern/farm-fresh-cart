import { useState } from "react";
import Hero from "@/components/Hero";
import ProductCarousel from "@/components/ProductCarousel";
import ShoppingCart, { CartItem } from "@/components/ShoppingCart";
import PaymentModal from "@/components/PaymentModal";
import { Product } from "@/components/ProductCard";

// Sample products
const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Tomates Orgánicos",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop",
    pricePerKg: 3.50,
    transportIncluded: true,
    transporterName: "Transportes Rápidos SA",
    description: "Tomates frescos cultivados orgánicamente, perfectos para ensaladas y salsas",
  },
  {
    id: "2",
    name: "Papas Premium",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop",
    pricePerKg: 2.20,
    transportIncluded: false,
    description: "Papas de primera calidad, ideales para todo tipo de preparaciones",
  },
  {
    id: "3",
    name: "Zanahorias Frescas",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=300&fit=crop",
    pricePerKg: 2.80,
    transportIncluded: true,
    transporterName: "Logística Verde SRL",
    description: "Zanahorias dulces y crujientes, ricas en vitaminas",
  },
  {
    id: "4",
    name: "Lechugas Hidropónicas",
    image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=300&fit=crop",
    pricePerKg: 4.50,
    transportIncluded: true,
    transporterName: "Express Campo SA",
    description: "Lechugas cultivadas en sistema hidropónico, ultra frescas",
  },
  {
    id: "5",
    name: "Cebollas",
    image: "https://images.unsplash.com/photo-1587914801974-c0ffb97a5f10?w=400&h=300&fit=crop",
    pricePerKg: 1.80,
    transportIncluded: false,
    description: "Cebollas de excelente calidad y larga duración",
  },
  {
    id: "6",
    name: "Pimientos Mixtos",
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=300&fit=crop",
    pricePerKg: 4.20,
    transportIncluded: true,
    transporterName: "Distribuidora Regional",
    description: "Variedad de pimientos rojos, verdes y amarillos",
  },
];

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

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

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.pricePerKg * item.kg, 0);
  const transportCost = cartItems.reduce(
    (sum, item) => sum + (item.product.transportIncluded ? 0 : 5 * item.kg),
    0
  );
  const total = subtotal + transportCost;

  const hasTransportIncluded = cartItems.some((item) => item.product.transportIncluded);

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <ProductCarousel products={PRODUCTS} onAddToCart={handleAddToCart} />
      
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">¿Cómo Funciona?</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
            <div className="space-y-3">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-2xl font-bold text-primary">
                1
              </div>
              <h3 className="text-xl font-semibold">Elige tus productos</h3>
              <p className="text-muted-foreground">
                Selecciona productos frescos de agricultores locales
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-2xl font-bold text-primary">
                2
              </div>
              <h3 className="text-xl font-semibold">Agrega al carrito</h3>
              <p className="text-muted-foreground">
                Indica la cantidad en kilogramos que necesitas
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-2xl font-bold text-primary">
                3
              </div>
              <h3 className="text-xl font-semibold">Recibe en tu puerta</h3>
              <p className="text-muted-foreground">
                Te lo llevamos con transporte incluido o sin él
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Marketplace Campo Mesa</h3>
          <p className="text-background/80 mb-6">
            Conectando el campo con tu mesa
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-background/70">
            <a href="#" className="hover:text-background transition-colors">Sobre Nosotros</a>
            <a href="#" className="hover:text-background transition-colors">Términos y Condiciones</a>
            <a href="#" className="hover:text-background transition-colors">Política de Privacidad</a>
            <a href="#" className="hover:text-background transition-colors">Contacto</a>
          </div>
          <p className="text-xs text-background/60 mt-8">
            © 2025 Marketplace Campo Mesa. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      <ShoppingCart
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
        isOpen={isCartOpen}
        onOpenChange={setIsCartOpen}
      />

      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        total={total}
        hasTransport={hasTransportIncluded}
      />
    </div>
  );
};

export default Index;
