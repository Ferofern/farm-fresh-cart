import { ShoppingCart, X, Trash2, Minus, Plus, DollarSign } from 'lucide-react';
import { useCartStore } from '@/lib/CartContext';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const ShoppingCartSidebar = () => {
  const { 
    cartItems, 
    total, 
    subtotal, 
    transportCost, 
    isCartOpen, 
    setIsCartOpen, 
    handleRemoveItem, 
    handleUpdateQuantity,
    handleCheckout,
    hasTransportIncluded 
  } = useCartStore();

  const handleKgChange = (productId: string, currentKg: number, change: number) => {
    const newKg = Math.max(0.5, currentKg + change); // Mínimo 0.5kg
    handleUpdateQuantity(productId, newKg);
  };

  return (
    <Drawer 
      open={isCartOpen} 
      onOpenChange={setIsCartOpen}
      direction="right" // Simular la cinta lateral derecha
    >
      <DrawerContent 
        className="fixed inset-y-0 right-0 w-full md:w-[400px] h-full rounded-none bg-card flex flex-col z-[999]"
      >
        <DrawerHeader className="p-4 border-b">
          <DrawerTitle className="flex items-center justify-between text-2xl font-bold text-primary">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-6 h-6" />
              <span>Mi Carrito</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </DrawerTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {cartItems.length} {cartItems.length === 1 ? 'producto' : 'productos'} en la lista
          </p>
        </DrawerHeader>

        <ScrollArea className="flex-1 p-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-primary/50" />
              <p className="text-lg">Tu carrito está vacío.</p>
              <p className="text-sm">¡Añade productos frescos de Ecuador!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex items-center space-x-4 border-b pb-4 last:border-b-0">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover" 
                      onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x300/f0f0f0/666?text=FOTO'; }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ${item.product.pricePerKg.toFixed(2)} / kg
                    </p>
                    <p className="text-sm font-medium text-secondary-foreground">
                      Total: ${(item.product.pricePerKg * item.kg).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <div className="flex items-center border rounded-md">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8" 
                        onClick={() => handleKgChange(item.product.id, item.kg, -0.5)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-10 text-center text-sm font-medium">
                        {item.kg.toFixed(1)} kg
                      </span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8" 
                        onClick={() => handleKgChange(item.product.id, item.kg, 0.5)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-destructive hover:bg-destructive/10"
                      onClick={() => handleRemoveItem(item.product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {cartItems.length > 0 && (
          <div className="p-4 border-t bg-background">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal Productos:</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Costo de Transporte:</span>
                <span className={`font-medium ${transportCost > 0 ? 'text-destructive' : 'text-green-600'}`}>
                  {transportCost > 0 ? `$${transportCost.toFixed(2)}` : 'Incluido'}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between items-center text-lg font-bold text-primary pt-2">
                <span>Total a Pagar:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <Button 
              className="w-full mt-4 h-12 text-lg flex items-center" 
              onClick={handleCheckout}
            >
              <DollarSign className="w-5 h-5 mr-2" />
              Proceder al Pago
            </Button>
            
            {!hasTransportIncluded && transportCost > 0 && (
              <p className="text-xs text-center text-destructive/80 mt-2">
                *Costo de transporte de $5/kg aplicado a productos sin logística incluida.
              </p>
            )}
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default ShoppingCartSidebar;