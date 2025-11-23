import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Truck, X, Plus, Minus } from "lucide-react";
import { toast } from "sonner";

export interface Product {
  id: string;
  name: string;
  image: string;
  pricePerKg: number;
  transportIncluded: boolean;
  transporterName?: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, kg: number) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [kg, setKg] = useState(1);

  const handleAddToCart = () => {
    if (kg > 0) {
      onAddToCart(product, kg);
      toast.success(`${kg} kg de ${product.name} agregado al carrito`);
      setKg(1);
    }
  };

  const incrementKg = () => setKg(prev => Math.min(prev + 1, 100));
  const decrementKg = () => setKg(prev => Math.max(prev - 1, 0.5));

  return (
    <Card className="group relative overflow-hidden bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      <div className="relative h-56 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3">
          {product.transportIncluded ? (
            <div className="flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-md">
              <Truck className="h-3.5 w-3.5" />
              <span>Transporte incluido</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-md">
              <X className="h-3.5 w-3.5" />
              <span>Sin transporte</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {product.description}
          </p>
          {product.transporterName && (
            <p className="text-xs text-muted-foreground mb-3">
              Transportista: <span className="font-medium">{product.transporterName}</span>
            </p>
          )}
          <div className="text-3xl font-bold text-primary mb-4">
            ${product.pricePerKg.toFixed(2)}
            <span className="text-base text-muted-foreground ml-1">/kg</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={decrementKg}
              className="h-9 w-9"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              min="0.5"
              step="0.5"
              max="100"
              value={kg}
              onChange={(e) => setKg(Math.max(0.5, parseFloat(e.target.value) || 0.5))}
              className="text-center font-medium"
            />
            <Button
              size="icon"
              variant="outline"
              onClick={incrementKg}
              className="h-9 w-9"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground whitespace-nowrap">kg</span>
          </div>

          <Button
            onClick={handleAddToCart}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            size="lg"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Agregar ${(product.pricePerKg * kg).toFixed(2)}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
