import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, TrendingUp, Star, Zap } from "lucide-react";

const PremiumPlanSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-premium/5 via-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 bg-premium/10 text-premium px-4 py-2 rounded-full">
            <Award className="w-5 h-5" />
            <span className="font-semibold">Plan Premium</span>
          </div>
          <h2 className="text-4xl font-bold text-foreground">
            Destaca tus Productos con Premium
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Aumenta tu visibilidad y ventas con beneficios exclusivos
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-premium shadow-premium overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-premium/10 rounded-bl-full" />
            
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl mb-2">Plan Premium</CardTitle>
              <CardDescription className="text-lg">
                Para agricultores que buscan maximizar su alcance
              </CardDescription>
              <div className="mt-6">
                <span className="text-5xl font-bold text-primary">$20</span>
                <span className="text-muted-foreground text-lg">/mes</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-premium/10 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-premium" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Sello de Calidad Premium</h4>
                    <p className="text-sm text-muted-foreground">
                      Distintivo dorado que destaca tus productos
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-premium/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-premium" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Prioridad en Resultados</h4>
                    <p className="text-sm text-muted-foreground">
                      Aparece siempre primero en búsquedas
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-premium/10 rounded-lg flex items-center justify-center">
                    <Star className="w-5 h-5 text-premium" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Perfil Destacado</h4>
                    <p className="text-sm text-muted-foreground">
                      Tu perfil con diseño especial y mayor visibilidad
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-premium/10 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-premium" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Análisis Avanzado</h4>
                    <p className="text-sm text-muted-foreground">
                      Estadísticas detalladas de tus ventas
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-center pb-8">
              <Button size="lg" className="bg-premium hover:bg-premium/90 text-premium-foreground px-8">
                Actualizar a Premium
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PremiumPlanSection;
