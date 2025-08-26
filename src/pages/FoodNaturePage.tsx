import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Utensils, Trees, Zap, Search } from "lucide-react";
import sardinianFood from "@/assets/sardinian-food.jpg";
import sardinianVegetation from "@/assets/sardinian-vegetation.jpg";
import sardinianWildlife from "@/assets/sardinian-wildlife.jpg";

const FoodNaturePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"food" | "vegetation" | "fauna">("food");
  const [searchTerm, setSearchTerm] = useState("");

  const foodItems = [
    {
      title: "Pane Carasau",
      image: sardinianFood,
      description: "Traditional crispy flatbread, thin as paper and incredibly versatile. Often called 'carta da musica' (music paper) for its thinness."
    },
    {
      title: "Pecorino Sardo",
      image: sardinianFood,
      description: "Aged sheep's milk cheese with a distinctive sharp flavor. One of Italy's most prized cheeses with DOP protection."
    },
    {
      title: "Culurgiones",
      image: sardinianFood,
      description: "Hand-pleated pasta dumplings filled with potato, cheese, and mint. The pleating technique is UNESCO-recognized cultural heritage."
    },
    {
      title: "Seadas",
      image: sardinianFood,
      description: "Crispy pastry filled with fresh cheese and lemon zest, drizzled with honey. A perfect sweet ending to any meal."
    },
    {
      title: "Bottarga",
      image: sardinianFood,
      description: "Cured fish roe, often called 'Mediterranean caviar'. Grated over pasta or eaten with olive oil and bread."
    }
  ];

  const vegetationItems = [
    {
      title: "Mediterranean Macchia",
      image: sardinianVegetation,
      description: "Dense shrubland covering much of Sardinia. Contains aromatic herbs like rosemary, myrtle, and juniper that perfume the air."
    },
    {
      title: "Cork Oak (Quercus suber)",
      image: sardinianVegetation,
      description: "Iconic trees with thick, spongy bark harvested for cork production. These ancient trees can live for several centuries."
    },
    {
      title: "Wild Myrtle",
      image: sardinianVegetation,
      description: "Aromatic shrub used to make Mirto liqueur, Sardinia's traditional digestif. The purple berries ripen in autumn."
    },
    {
      title: "Prickly Pear Cactus",
      image: sardinianVegetation,
      description: "Widespread succulent with edible fruits. The colorful flowers and fruits add vibrant colors to the landscape."
    },
    {
      title: "Wild Fennel",
      image: sardinianVegetation,
      description: "Aromatic herb growing wild across the island. Used in traditional cooking and recognizable by its feathery leaves."
    }
  ];

  const faunaItems = [
    {
      title: "Mouflon (Ovis orientalis)",
      image: sardinianWildlife,
      description: "Wild sheep endemic to Sardinia and Corsica. These agile animals roam the mountainous regions with their distinctive curved horns."
    },
    {
      title: "Wild Boar (Sus scrofa)",
      image: sardinianWildlife,
      description: "Intelligent and adaptable mammals found throughout Sardinia's forests. They play a crucial role in the island's ecosystem."
    },
    {
      title: "Flamingos",
      image: sardinianWildlife,
      description: "Pink flamingos gather in large flocks in coastal lagoons, especially around Cagliari. A spectacular sight during migration seasons."
    },
    {
      title: "Sardinian Deer",
      image: sardinianWildlife,
      description: "Endemic subspecies that was nearly extinct but has recovered thanks to conservation efforts. Now thriving in protected areas."
    },
    {
      title: "Mediterranean Monk Seal",
      image: sardinianWildlife,
      description: "One of the world's most endangered marine mammals, occasionally spotted in remote coastal caves around Sardinia."
    }
  ];

  const getCurrentItems = () => {
    let items;
    switch (activeTab) {
      case "food":
        items = foodItems;
        break;
      case "vegetation":
        items = vegetationItems;
        break;
      case "fauna":
        items = faunaItems;
        break;
      default:
        items = foodItems;
    }

    // Filter items based on search term
    if (searchTerm.trim() === "") {
      return items;
    }

    return items.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case "food":
        return <Utensils className="w-5 h-5" />;
      case "vegetation":
        return <Trees className="w-5 h-5" />;
      case "fauna":
        return <Zap className="w-5 h-5" />;
      default:
        return <Utensils className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-sardinian-green to-accent py-12">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-4 text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-4xl font-bold text-white mb-4">Food, Vegetation & Fauna</h1>
          <p className="text-white/90 text-lg">Explore the natural wonders and culinary traditions of Sardinia</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <Button
            variant={activeTab === "food" ? "default" : "sardinian"}
            onClick={() => setActiveTab("food")}
            className="flex items-center gap-2"
          >
            {getTabIcon("food")}
            Traditional Foods
          </Button>
          <Button
            variant={activeTab === "vegetation" ? "default" : "sardinian"}
            onClick={() => setActiveTab("vegetation")}
            className="flex items-center gap-2"
          >
            {getTabIcon("vegetation")}
            Vegetation & Plants
          </Button>
          <Button
            variant={activeTab === "fauna" ? "default" : "sardinian"}
            onClick={() => setActiveTab("fauna")}
            className="flex items-center gap-2"
          >
            {getTabIcon("fauna")}
            Fauna & Wildlife
          </Button>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {getCurrentItems().length > 0 ? (
            getCurrentItems().map((item, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-mediterranean transition-all duration-300 transform hover:-translate-y-1">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No items found matching "{searchTerm}"</p>
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

export default FoodNaturePage;