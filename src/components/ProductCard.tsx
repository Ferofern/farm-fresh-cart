import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, ShoppingCart, Award, Leaf, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export interface Product {
  id: string;
  name: string;
  image: string;
  pricePerKg: number;
  transportIncluded: boolean;
  transporterName?: string;
  description: string;
  isPremium?: boolean;
  isOrganic?: boolean;
  isProductOfYear?: boolean;
  sellerId: string;
  sellerName: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, kg: number) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [kg, setKg] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleIncrement = () => setKg((prev) => Math.min(prev + 1, 1000));
  const handleDecrement = () => setKg((prev) => Math.max(prev - 1, 1));
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    setKg(Math.max(1, Math.min(value, 1000)));
  };

  const handleCardClick = () => {
    navigate(`/vendedor/${product.sellerId}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, kg);
    toast.success(`${kg} kg de ${product.name} agregado al carrito`);
  };

  const handleQuantityClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Card
      className={`group overflow-hidden transition-all duration-300 cursor-pointer ${
        product.isPremium
          ? "border-2 border-premium shadow-premium hover:shadow-premium/60"
          : "hover:shadow-card"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden h-48 bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? "scale-110 -translate-y-2" : "scale-100"
          }`}
        />
        
        {product.isPremium && (
          <div className="absolute top-3 right-3 bg-premium text-premium-foreground px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
            <Award className="w-3 h-3" />
            PREMIUM
          </div>
        )}

        {isHovered && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 animate-fade-in">
            <div className="flex gap-2 justify-center">
              {product.isOrganic && (
                <div className="bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                  <Leaf className="w-3 h-3" />
                  Orgánico
                </div>
              )}
              {product.isProductOfYear && (
                <div className="bg-premium text-premium-foreground px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Producto del Año
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg text-card-foreground">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.sellerName}</p>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-primary">${product.pricePerKg.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground">por kilogramo</p>
          </div>
          
          {product.transportIncluded && (
            <div className="bg-accent/10 text-accent px-2 py-1 rounded text-xs font-semibold">
              Transporte incluido
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2" onClick={handleQuantityClick}>
        <div className="flex items-center border rounded-md">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={(e) => {
              e.stopPropagation();
              handleDecrement();
            }}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <Input
            type="number"
            value={kg}
            onChange={handleInputChange}
            onClick={(e) => e.stopPropagation()}
            className="w-16 h-9 text-center border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            min="1"
            max="1000"
          />
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={(e) => {
              e.stopPropagation();
              handleIncrement();
            }}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        
        <Button onClick={handleAddToCart} className="flex-1 bg-primary hover:bg-primary/90">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Agregar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
