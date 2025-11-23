import { useState, useEffect } from "react";
import ProductCard, { Product } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductCarouselProps {
  products: Product[];
  onAddToCart: (product: Product, kg: number) => void;
}

const ProductCarousel = ({ products, onAddToCart }: ProductCarouselProps) => {
  const [startIndex, setStartIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const canGoNext = startIndex + cardsPerView < products.length;
  const canGoPrev = startIndex > 0;

  const handleNext = () => {
    if (canGoNext) {
      setStartIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (canGoPrev) {
      setStartIndex(prev => prev - 1);
    }
  };

  const visibleProducts = products.slice(startIndex, startIndex + cardsPerView);

  return (
    <section id="productos" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Productos Frescos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Selecciona tus productos favoritos directamente de agricultores locales
          </p>
        </div>

        <div className="relative">
          <div className="flex items-center gap-4">
            <Button
              onClick={handlePrev}
              disabled={!canGoPrev}
              size="icon"
              variant="outline"
              className="hidden md:flex h-12 w-12 rounded-full shadow-md disabled:opacity-30"
              aria-label="Producto anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <div className="flex-1 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleProducts.map((product) => (
                  <div key={product.id} className="animate-fade-in">
                    <ProductCard product={product} onAddToCart={onAddToCart} />
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={handleNext}
              disabled={!canGoNext}
              size="icon"
              variant="outline"
              className="hidden md:flex h-12 w-12 rounded-full shadow-md disabled:opacity-30"
              aria-label="Producto siguiente"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          <div className="flex md:hidden justify-center gap-2 mt-6">
            <Button
              onClick={handlePrev}
              disabled={!canGoPrev}
              size="icon"
              variant="outline"
              className="h-10 w-10 rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canGoNext}
              size="icon"
              variant="outline"
              className="h-10 w-10 rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: Math.ceil(products.length / cardsPerView) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setStartIndex(index * cardsPerView)}
                className={`h-2 rounded-full transition-all ${
                  Math.floor(startIndex / cardsPerView) === index
                    ? "bg-primary w-8"
                    : "bg-border w-2"
                }`}
                aria-label={`Ir a página ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
