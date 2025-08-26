import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Clock, Sparkles, Search } from "lucide-react";
import heroImage from "@/assets/sardinia-hero.jpg";

const PlacesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const places = [
    {
      title: "Alghero",
      type: "Historic City",
      image: heroImage,
      history: "Founded by the Genoese in 1102, later ruled by Catalans. Known as 'Little Barcelona' for its Catalan heritage and architecture.",
      funFact: "The city walls were built by the Spanish in the 16th century and are still largely intact today."
    },
    {
      title: "Costa Smeralda",
      type: "Beach Resort",
      image: heroImage,
      history: "Developed in the 1960s by Prince Karim Aga Khan IV as an exclusive resort destination for the international jet set.",
      funFact: "Building regulations require all structures to blend with the natural landscape - no building can be taller than the surrounding trees."
    },
    {
      title: "Su Nuraxi, Barumini",
      type: "Archaeological Site",
      image: heroImage,
      history: "Built around 1500 BCE by the Nuragic civilization. This UNESCO World Heritage site represents one of Europe's finest prehistoric monuments.",
      funFact: "The central tower originally stood 18-20 meters high and the complex housed up to 200 people."
    },
    {
      title: "Cagliari",
      type: "Capital City",
      image: heroImage,
      history: "Founded by Phoenicians around 8th century BCE. The historic Castello district preserves medieval and Renaissance architecture.",
      funFact: "The city's Poetto beach stretches for 8 kilometers and is one of the longest urban beaches in Europe."
    },
    {
      title: "Cala Goloritze",
      type: "Natural Monument",
      image: heroImage,
      history: "This pristine beach was formed by a landslide in 1962. Now protected as a natural monument since 1995.",
      funFact: "The 143-meter limestone spire next to the beach is a popular destination for rock climbers from around the world."
    },
    {
      title: "Tharros",
      type: "Ancient Ruins",
      image: heroImage,
      history: "Ancient Phoenician city founded in 8th century BCE, later expanded by Romans. Abandoned in 11th century due to Saracen raids.",
      funFact: "The site contains one of the best-preserved Phoenician tophet (sacred burial grounds) in the Mediterranean."
    },
    {
      title: "Orgosolo",
      type: "Mountain Village",
      image: heroImage,
      history: "Traditional pastoral village famous for its murals depicting social and political themes, started in the 1960s.",
      funFact: "The village has over 150 murals painted on building walls, making it an open-air art gallery."
    },
    {
      title: "Maddalena Archipelago",
      type: "National Park",
      image: heroImage,
      history: "Strategic naval base for centuries. Garibaldi lived in exile on Caprera island from 1855 until his death in 1882.",
      funFact: "The pink sand beach of Budelli gets its color from microscopic fragments of coral and shells."
    },
    {
      title: "Sassari",
      type: "University City",
      image: heroImage,
      history: "Free commune in medieval times, later ruled by Pisans and Aragonese. Founded its university in 1562, one of Italy's oldest.",
      funFact: "The Cavalcata Sarda festival in May features over 3,000 participants in traditional costumes from across Sardinia."
    }
  ];

  const getFilteredPlaces = () => {
    if (searchTerm.trim() === "") {
      return places;
    }

    return places.filter(place => 
      place.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.history.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.funFact.toLowerCase().includes(searchTerm.toLowerCase())
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
          {getFilteredPlaces().length > 0 ? (
            getFilteredPlaces().map((place, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-mediterranean transition-all duration-300 transform hover:-translate-y-1">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={place.image} 
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
                        {place.funFact}
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