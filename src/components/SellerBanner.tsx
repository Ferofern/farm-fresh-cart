import { Button } from "@/components/ui/button";
import { Sprout, TrendingUp, Users, Shield } from "lucide-react";

const SellerBanner = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary via-primary/95 to-accent/90 text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px]" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              ¿Eres Agricultor o Productor?
            </h2>
            <p className="text-xl md:text-2xl text-primary-foreground/90">
              Únete a nuestra plataforma y conecta con PYMEs de todo el país
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 py-8">
            <div className="flex flex-col items-center gap-3 p-6 bg-background/10 rounded-lg backdrop-blur-sm">
              <div className="w-12 h-12 bg-background/20 rounded-full flex items-center justify-center">
                <Sprout className="w-6 h-6" />
              </div>
              <h3 className="font-semibold">Vende Directo</h3>
              <p className="text-sm text-primary-foreground/80 text-center">
                Sin intermediarios, mejores márgenes
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 p-6 bg-background/10 rounded-lg backdrop-blur-sm">
              <div className="w-12 h-12 bg-background/20 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-semibold">Red de Compradores</h3>
              <p className="text-sm text-primary-foreground/80 text-center">
                Acceso a PYMEs verificadas
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 p-6 bg-background/10 rounded-lg backdrop-blur-sm">
              <div className="w-12 h-12 bg-background/20 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-semibold">Crece tu Negocio</h3>
              <p className="text-sm text-primary-foreground/80 text-center">
                Herramientas para escalar ventas
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 p-6 bg-background/10 rounded-lg backdrop-blur-sm">
              <div className="w-12 h-12 bg-background/20 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-semibold">Pagos Seguros</h3>
              <p className="text-sm text-primary-foreground/80 text-center">
                Transacciones protegidas
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-background text-foreground hover:bg-background/90 text-lg px-8">
              Registrarme como Vendedor
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-background/10 border-primary-foreground/20 text-primary-foreground hover:bg-background/20 text-lg px-8"
            >
              Ver Más Información
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellerBanner;
