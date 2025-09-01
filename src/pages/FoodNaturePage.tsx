import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Utensils, Trees, Zap, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import sardinianFood from "@/assets/sardinian-food.jpg";
import sardinianVegetation from "@/assets/sardinian-vegetation.jpg";
import sardinianWildlife from "@/assets/sardinian-wildlife.jpg";

interface ContentItem {
  id: string;
  title: string;
  description: string;
  category: 'food' | 'vegetation' | 'fauna';
  image_url: string | null;
  is_active: boolean;
}

const FoodNaturePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"food" | "vegetation" | "fauna">("food");
  const [searchTerm, setSearchTerm] = useState("");
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContentItems();
  }, []);

  const fetchContentItems = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('content_items')
        .select('*')
        .eq('is_active', true)
        .order('title');
      
      if (error) throw error;
      setContentItems(data || []);
    } catch (error) {
      console.error('Error fetching content items:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDefaultImage = (category: string) => {
    switch (category) {
      case 'food':
        return sardinianFood;
      case 'vegetation':
        return sardinianVegetation;
      case 'fauna':
        return sardinianWildlife;
      default:
        return sardinianFood;
    }
  };

  const getCurrentItems = () => {
    const filteredByCategory = contentItems.filter(item => item.category === activeTab);
    
    // Filter items based on search term
    if (searchTerm.trim() === "") {
      return filteredByCategory;
    }

    return filteredByCategory.filter(item => 
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
          {loading ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">Loading content...</p>
            </div>
          ) : getCurrentItems().length > 0 ? (
            getCurrentItems().map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-mediterranean transition-all duration-300 transform hover:-translate-y-1">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={item.image_url || getDefaultImage(item.category)} 
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