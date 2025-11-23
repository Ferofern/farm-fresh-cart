import { Button } from "@/components/ui/button";
import { Sprout, Truck, ShoppingBasket } from "lucide-react";

const Hero = () => {
  const scrollToProducts = () => {
    document.getElementById("productos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAgMi4yMSAxLjc5IDQgNCA0czQtMS43OSA0LTQtMS43OS00LTQtNC00IDEuNzktNCA0em0wIDI0YzAgMi4yMSAxLjc5IDQgNCA0czQtMS43OSA0LTQtMS43OS00LTQtNC00IDEuNzktNCA0ek0xMiA0MGMwIDIuMjEgMS43OSA0IDQgNHM0LTEuNzkgNC00LTEuNzktNC00LTQtNCAxLjc5LTQgNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
      
      <div className="container relative z-10 mx-auto px-4 py-20 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 flex justify-center gap-4 animate-fade-in">
            <div className="rounded-full bg-white/10 p-3 backdrop-blur-sm">
              <Sprout className="h-8 w-8" />
            </div>
            <div className="rounded-full bg-white/10 p-3 backdrop-blur-sm">
              <Truck className="h-8 w-8" />
            </div>
            <div className="rounded-full bg-white/10 p-3 backdrop-blur-sm">
              <ShoppingBasket className="h-8 w-8" />
            </div>
          </div>
          
          <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Del Campo a Tu Mesa
          </h1>
          
          <p className="mb-10 text-xl md:text-2xl text-primary-foreground/90 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Conectamos agricultores con transportistas para llevarte productos frescos directamente
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button
              size="lg"
              onClick={scrollToProducts}
              className="bg-white text-primary hover:bg-white/90 shadow-lg text-lg px-8 py-6"
            >
              Ver Productos
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6"
            >
              Cómo Funciona
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;
