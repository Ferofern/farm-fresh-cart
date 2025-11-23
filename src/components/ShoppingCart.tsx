import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart as CartIcon, Trash2, Plus, Minus } from "lucide-react";
import { Product } from "./ProductCard";

export interface CartItem {
  product: Product;
  kg: number;
}

interface ShoppingCartProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, kg: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ShoppingCart = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  isOpen,
  onOpenChange,
}: ShoppingCartProps) => {
  const subtotal = items.reduce((sum, item) => sum + item.product.pricePerKg * item.kg, 0);
  const transportCost = items.reduce(
    (sum, item) => sum + (item.product.transportIncluded ? 0 : 5 * item.kg),
    0
  );
  const total = subtotal + transportCost;

  const totalItems = items.reduce((sum, item) => sum + item.kg, 0);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button
          size="lg"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl z-50 bg-accent hover:bg-accent/90 text-accent-foreground"
          aria-label="Abrir carrito"
        >
          <CartIcon className="h-6 w-6" />
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">Tu Carrito</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <CartIcon className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">Tu carrito está vacío</p>
              <p className="text-sm text-muted-foreground mt-2">
                Agrega productos para comenzar tu compra
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 rounded-lg border bg-card p-4 shadow-sm"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-20 w-20 rounded-md object-cover"
                  />
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-foreground">{item.product.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          ${item.product.pricePerKg.toFixed(2)}/kg
                        </p>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onRemoveItem(item.product.id)}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => onUpdateQuantity(item.product.id, Math.max(0.5, item.kg - 0.5))}
                        className="h-7 w-7"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Input
                        type="number"
                        min="0.5"
                        step="0.5"
                        value={item.kg}
                        onChange={(e) =>
                          onUpdateQuantity(item.product.id, Math.max(0.5, parseFloat(e.target.value) || 0.5))
                        }
                        className="h-7 w-16 text-center text-sm"
                      />
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => onUpdateQuantity(item.product.id, item.kg + 0.5)}
                        className="h-7 w-7"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm text-muted-foreground">kg</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground">
                        Subtotal: ${(item.product.pricePerKg * item.kg).toFixed(2)}
                      </span>
                      {!item.product.transportIncluded && (
                        <span className="text-xs text-muted-foreground">
                          +${(5 * item.kg).toFixed(2)} transporte
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t pt-4 space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal ({totalItems.toFixed(1)} kg)</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Costo de transporte</span>
                <span className="font-medium">${transportCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold pt-2 border-t">
                <span>Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>

            <Button
              onClick={onCheckout}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
              size="lg"
            >
              Proceder al Pago
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCart;
