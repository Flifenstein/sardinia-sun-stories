import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Clock, Sparkles, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/sardinia-hero.jpg";

interface Place {
  id: string;
  title: string;
  type: string;
  image_url: string | null;
  history: string;
  fun_fact: string;
  is_active: boolean;
}

const PlacesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('places')
        .select('*')
        .eq('is_active', true)
        .order('title');
      
      if (error) throw error;
      setPlaces(data || []);
    } catch (error) {
      console.error('Error fetching places:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredPlaces = () => {
    if (searchTerm.trim() === "") {
      return places;
    }

    return places.filter(place => 
      place.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.history.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.fun_fact.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Historic City":
        return "bg-sardinian-terracotta text-white";
      case "Beach Resort":
        return "bg-sardinian-blue text-white";
      case "Archaeological Site":
        return "bg-sardinian-green text-white";
      case "Capital City":
        return "bg-primary text-primary-foreground";
      case "Natural Monument":
        return "bg-accent text-accent-foreground";
      case "Ancient Ruins":
        return "bg-muted text-muted-foreground";
      case "Mountain Village":
        return "bg-secondary text-secondary-foreground";
      case "National Park":
        return "bg-sardinian-sand text-sardinian-blue";
      case "University City":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-sardinian-blue to-primary py-12">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-4 text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-4xl font-bold text-white mb-4">Places to Visit & History</h1>
          <p className="text-white/90 text-lg">Discover the historic sites, natural wonders, and charming destinations of Sardinia</p>
        </div>
      </div>

      {/* Places Grid */}
      <div className="container mx-auto px-4 py-12">
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search places, types, or history..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">Loading places...</p>
            </div>
          ) : getFilteredPlaces().length > 0 ? (
            getFilteredPlaces().map((place) => (
              <Card key={place.id} className="overflow-hidden hover:shadow-mediterranean transition-all duration-300 transform hover:-translate-y-1">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={place.image_url || heroImage} 
                    alt={place.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={getTypeColor(place.type)}>
                      <MapPin className="w-3 h-3 mr-1" />
                      {place.type}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    {place.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 mt-1 text-muted-foreground flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Historical Background</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {place.history}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 mt-1 text-sardinian-terracotta flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm mb-1 text-sardinian-terracotta">Fun Fact</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {place.fun_fact}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No places found matching "{searchTerm}"</p>
              <Button 
                variant="outline" 
                onClick={() => setSearchTerm("")}
                className="mt-4"
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlacesPage;