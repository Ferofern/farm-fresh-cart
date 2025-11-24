import { useState, useMemo } from "react";
import Hero from "@/components/Hero";
import ProductCarousel from "@/components/ProductCarousel";
import SearchBar from "@/components/SearchBar";
import PremiumPlanSection from "@/components/PremiumPlanSection";
import SellerBanner from "@/components/SellerBanner";
import { Product } from "@/components/ProductCard";
import { useCartStore } from "@/lib/CartContext"; // Importamos el hook global
import { useToast } from "@/components/ui/use-toast"; // Usamos el toast de shadcn para feedback

// Ecuadorian agricultural products (mantener solo la data, no la logica)
const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Banano Premium",
    image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400&h=300&fit=crop",
    pricePerKg: 1.20,
    transportIncluded: true,
    transporterName: "Transportes del Pacífico",
    description: "Banano ecuatoriano de exportación, dulce y de textura perfecta",
    isPremium: true,
    isOrganic: true,
    isProductOfYear: true,
    sellerId: "seller-1",
    sellerName: "Hacienda Valle Verde",
  },
  {
    id: "2",
    name: "Cacao Fino de Aroma",
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=400&h=300&fit=crop",
    pricePerKg: 8.50,
    transportIncluded: true,
    transporterName: "Logística Agro Express",
    description: "Cacao ecuatoriano reconocido mundialmente por su calidad premium",
    isPremium: true,
    isOrganic: true,
    sellerId: "seller-2",
    sellerName: "Cacaoteros del Sur",
  },
  {
    id: "3",
    name: "Café Arábigo",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop",
    pricePerKg: 12.00,
    transportIncluded: false,
    description: "Café de altura cultivado en las montañas andinas",
    isPremium: false,
    isOrganic: true,
    sellerId: "seller-3",
    sellerName: "Café de los Andes",
  },
  {
    id: "4",
    name: "Arroz Premium",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
    pricePerKg: 2.80,
    transportIncluded: true,
    transporterName: "Distribuidora Nacional",
    description: "Arroz de grano largo, ideal para todo tipo de platillos",
    isPremium: true,
    sellerId: "seller-4",
    sellerName: "Arrocera San Luis",
  },
  {
    id: "5",
    name: "Maíz Amarillo",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=300&fit=crop",
    pricePerKg: 1.50,
    transportIncluded: false,
    description: "Maíz fresco de la costa ecuatoriana",
    sellerId: "seller-5",
    sellerName: "Agrícola Costa Dorada",
  },
  {
    id: "6",
    name: "Papa Chola",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop",
    pricePerKg: 1.80,
    transportIncluded: true,
    transporterName: "Transporte Sierra",
    description: "Papa de altura de la sierra ecuatoriana, perfecta para locro y fritada",
    isPremium: false,
    isProductOfYear: true,
    sellerId: "seller-6",
    sellerName: "Papas del Chimborazo",
  },
  {
    id: "7",
    name: "Tomate Riñón",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop",
    pricePerKg: 2.20,
    transportIncluded: false,
    description: "Tomate riñón fresco y jugoso",
    sellerId: "seller-7",
    sellerName: "Hortalizas del Valle",
  },
  {
    id: "8",
    name: "Piña Golden",
    image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&h=300&fit=crop",
    pricePerKg: 1.80,
    transportIncluded: true,
    transporterName: "Frutas Express",
    description: "Piña dulce y aromática, perfecta para jugos y postres",
    isPremium: true,
    isOrganic: false,
    sellerId: "seller-8",
    sellerName: "Tropical Fruits Co.",
  },
  {
    id: "9",
    name: "Mango de Exportación",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=300&fit=crop",
    pricePerKg: 3.20,
    transportIncluded: true,
    transporterName: "Logística Tropical",
    description: "Mango ecuatoriano de pulpa dulce y jugosa",
    isPremium: false,
    isOrganic: true,
    sellerId: "seller-9",
    sellerName: "Mangos del Guayas",
  },
  {
    id: "10",
    name: "Aguacate Hass",
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=300&fit=crop",
    pricePerKg: 4.50,
    transportIncluded: false,
    description: "Aguacate Hass cremoso y nutritivo",
    isPremium: true,
    isOrganic: true,
    isProductOfYear: false,
    sellerId: "seller-10",
    sellerName: "Aguacates Premium",
  },
];


const Index = () => {
  // HOOKS y Estado: SOLO mantenemos el estado local NO relacionado con el carrito
  const { handleAddToCart, setIsCartOpen } = useCartStore(); 
  const { toast } = useToast(); // Hook para mostrar notificaciones

  const [searchQuery, setSearchQuery] = useState("");
  const [userType, setUserType] = useState<"buyer" | "seller" | null>(null);

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return PRODUCTS;
    
    const query = searchQuery.toLowerCase();
    return PRODUCTS.filter(product => 
      product.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (a.isPremium && !b.isPremium) return -1;
      if (!a.isPremium && b.isPremium) return 1;
      return 0;
    });
  }, [filteredProducts]);

  // Nueva función para añadir con feedback al usuario
  const handleAddToCartWithFeedback = (product: Product, kg: number) => {
    handleAddToCart(product, kg);
    toast({
      title: "Producto Añadido",
      description: `${kg} kg de ${product.name} agregados al carrito.`,
      duration: 3000,
    });
  };

  // TODA LA LÓGICA DE MANEJO DE CARRITO FUE MOVIDA AL CARTCONTEXT

  return (
    <div className="min-h-screen bg-background">
      <Hero 
        onCartClick={() => setIsCartOpen(true)} // Llama a la funcion del contexto
        userType={userType}
        onUserTypeChange={setUserType}
      />
      
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
      </section>

      <section id="productos">
        <ProductCarousel products={sortedProducts} onAddToCart={handleAddToCartWithFeedback} />
      </section>
      
      {sortedProducts.length === 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <p className="text-xl text-muted-foreground">
              No se encontraron productos que coincidan con "{searchQuery}"
            </p>
          </div>
        </section>
      )}

      <PremiumPlanSection />

      <SellerBanner />
      
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">¿Cómo Funciona?</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
            <div className="space-y-3">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-2xl font-bold text-primary">
                1
              </div>
              <h3 className="text-xl font-semibold">Busca lo que necesitas</h3>
              <p className="text-muted-foreground">
                Encuentra productos agrícolas de calidad premium
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-2xl font-bold text-primary">
                2
              </div>
              <h3 className="text-xl font-semibold">Contacta al proveedor</h3>
              <p className="text-muted-foreground">
                Negocia directamente con agricultores verificados
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-2xl font-bold text-primary">
                3
              </div>
              <h3 className="text-xl font-semibold">Recibe tu pedido</h3>
              <p className="text-muted-foreground">
                Productos frescos con logística incluida
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">AgroConnect</h3>
          <p className="text-background/80 mb-6">
            Conectando agricultores con PYMEs de Ecuador
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-background/70">
            <a href="#" className="hover:text-background transition-colors">Sobre Nosotros</a>
            <a href="#" className="hover:text-background transition-colors">Términos y Condiciones</a>
            <a href="#" className="hover:text-background transition-colors">Política de Privacidad</a>
            <a href="#" className="hover:text-background transition-colors">Contacto</a>
          </div>
          <p className="text-xs text-background/60 mt-8">
            © 2025 AgroConnect. Todos los derechos reservados.
          </p>
        </div>
      </footer>
      {/* EL COMPONENTE SHOPPINGCART y PAYMENTMODAL SE ELIMINAN DE AQUÍ Y SE MUEVEN AL CARTCONTEXT/APP.TSX */}
    </div>
  );
};

export default Index;