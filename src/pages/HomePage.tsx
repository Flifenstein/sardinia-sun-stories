import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, MapPin, BookOpen } from "lucide-react";
import heroImage from "@/assets/sardinia-hero.jpg";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-sardinian-sand/30">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden rounded-b-3xl">
        <img 
          src={heroImage} 
          alt="Beautiful Sardinian coastline" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sardinian-blue/80 to-transparent flex items-end">
          <div className="p-8 text-white">
            <h1 className="text-5xl font-bold mb-4">Discover Sardinia</h1>
            <p className="text-xl opacity-90">Your complete guide to the jewel of the Mediterranean</p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Explore the Island
          </h2>
          
          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
            {/* Food, Vegetation & Fauna */}
            <div className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-mediterranean transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-sardinian-green to-accent rounded-full flex items-center justify-center mb-6">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-card-foreground">
                  Food, Vegetation & Fauna
                </h3>
                <p className="text-muted-foreground mb-6">
                  Discover the rich culinary traditions, diverse flora, and unique wildlife of Sardinia
                </p>
                <Button 
                  variant="hero" 
                  size="lg"
                  onClick={() => navigate("/food-nature")}
                  className="w-full"
                >
                  Explore Nature
                </Button>
              </div>
            </div>

            {/* Places to Visit & History */}
            <div className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-mediterranean transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-sardinian-blue to-primary rounded-full flex items-center justify-center mb-6">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-card-foreground">
                  Places to Visit & History
                </h3>
                <p className="text-muted-foreground mb-6">
                  Explore ancient sites, stunning beaches, and charming villages with rich histories
                </p>
                <Button 
                  variant="hero" 
                  size="lg"
                  onClick={() => navigate("/places")}
                  className="w-full"
                >
                  Discover Places
                </Button>
              </div>
            </div>

            {/* My Travel Diary */}
            <div className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-mediterranean transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-sardinian-terracotta to-destructive rounded-full flex items-center justify-center mb-6">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-card-foreground">
                  My Travel Diary
                </h3>
                <p className="text-muted-foreground mb-6">
                  Document your journey and memories from your Sardinian adventure
                </p>
                <Button 
                  variant="hero" 
                  size="lg"
                  onClick={() => navigate("/diary")}
                  className="w-full"
                >
                  Open Diary
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;