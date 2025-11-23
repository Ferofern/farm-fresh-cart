import { Button } from "@/components/ui/button";
import { ShoppingCart, Building2 } from "lucide-react";

interface HeroProps {
  onCartClick: () => void;
  userType: "buyer" | "seller" | null;
  onUserTypeChange: (type: "buyer" | "seller") => void;
}

const Hero = ({ onCartClick, userType, onUserTypeChange }: HeroProps) => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById("productos");
    productsSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
      
      <nav className="relative container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Building2 className="w-8 h-8" />
          <h1 className="text-2xl font-bold">AgroConnect</h1>
        </div>
        
        <div className="flex items-center gap-4">
          {!userType ? (
            <>
              <Button
                variant="outline"
                className="bg-background/10 border-primary-foreground/20 text-primary-foreground hover:bg-background/20"
                onClick={() => onUserTypeChange("buyer")}
              >
                Soy Comprador
              </Button>
              <Button
                variant="outline"
                className="bg-background/10 border-primary-foreground/20 text-primary-foreground hover:bg-background/20"
                onClick={() => onUserTypeChange("seller")}
              >
                Soy Vendedor
              </Button>
            </>
          ) : (
            <>
              <span className="text-sm font-medium">
                {userType === "buyer" ? "Comprador" : "Vendedor"}
              </span>
              <Button
                variant="outline"
                size="sm"
                className="bg-background/10 border-primary-foreground/20 text-primary-foreground hover:bg-background/20"
                onClick={() => onUserTypeChange(userType === "buyer" ? "seller" : "buyer")}
              >
                Cambiar a {userType === "buyer" ? "Vendedor" : "Comprador"}
              </Button>
            </>
          )}
          
          {userType === "buyer" && (
            <Button
              variant="outline"
              size="icon"
              className="bg-background/10 border-primary-foreground/20 text-primary-foreground hover:bg-background/20"
              onClick={onCartClick}
            >
              <ShoppingCart className="w-5 h-5" />
            </Button>
          )}
        </div>
      </nav>

      <div className="relative container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold leading-tight">
            Conectamos Agricultores con PYMEs
          </h2>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto">
            La plataforma B2B que une la producción agrícola directamente con las empresas que la necesitan
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              onClick={scrollToProducts}
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8"
            >
              Explorar Productos
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-background/10 border-primary-foreground/20 text-primary-foreground hover:bg-background/20 text-lg px-8"
            >
              Ver Proveedores Premium
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </header>
  );
};

export default Hero;
