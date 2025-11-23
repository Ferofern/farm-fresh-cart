import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, MapPin, Phone, Mail, Award, Star } from "lucide-react";

const SellerProfile = () => {
  const { sellerId } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app, fetch from API
  const seller = {
    id: sellerId,
    name: "Hacienda Valle Verde",
    description: "Productores orgánicos certificados con 25 años de experiencia en cultivos tropicales. Especialistas en banano, cacao y café de exportación.",
    location: "Santo Domingo de los Tsáchilas",
    phone: "+593 99 123 4567",
    email: "contacto@valleverde.com",
    isPremium: true,
    rating: 4.8,
    reviewCount: 156,
    products: 12,
    yearsInBusiness: 25,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary via-primary/90 to-accent/90 text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            className="mb-4 text-primary-foreground hover:bg-background/10"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-32 h-32 bg-background/20 rounded-lg flex items-center justify-center">
              <Award className="w-16 h-16" />
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="flex items-start gap-3">
                <h1 className="text-4xl font-bold">{seller.name}</h1>
                {seller.isPremium && (
                  <div className="bg-premium text-premium-foreground px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    PREMIUM
                  </div>
                )}
              </div>
              
              <p className="text-lg text-primary-foreground/90">
                {seller.description}
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {seller.location}
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-current" />
                  {seller.rating} ({seller.reviewCount} reseñas)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Productos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-center text-primary">{seller.products}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center">Años de Experiencia</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-center text-primary">{seller.yearsInBusiness}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center">Calificación</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-center text-primary">{seller.rating}/5</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Información de Contacto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary" />
              <span>{seller.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary" />
              <span>{seller.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <span>{seller.location}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SellerProfile;
