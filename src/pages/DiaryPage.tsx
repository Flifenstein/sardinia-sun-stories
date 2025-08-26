import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Calendar, Image, Plus, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DiaryEntry {
  id: string;
  date: string;
  notes: string;
  image?: string;
  timestamp: number;
}

const DiaryPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    notes: "",
    image: null as File | null
  });

  // Mock data for demonstration - in real app this would come from Supabase
  const [entries, setEntries] = useState<DiaryEntry[]>([
    {
      id: "1",
      date: "2024-01-15",
      notes: "Arrived in Alghero today! The Catalan architecture is stunning, and the sunset from the city walls was breathtaking. Had my first taste of culurgiones at a local trattoria - absolutely delicious!",
      timestamp: Date.now() - 86400000
    },
    {
      id: "2", 
      date: "2024-01-16",
      notes: "Visited Costa Smeralda. The emerald waters truly live up to the name. Spent the afternoon at Cala di Volpe beach - the sand is incredibly soft and the water crystal clear.",
      timestamp: Date.now() - 43200000
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEntry: DiaryEntry = {
      id: Date.now().toString(),
      date: formData.date,
      notes: formData.notes,
      timestamp: Date.now()
    };

    setEntries([newEntry, ...entries]);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      notes: "",
      image: null
    });

    toast({
      title: "Entry saved!",
      description: "Your travel memory has been added to your diary.",
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDatabaseMessage = () => {
    toast({
      title: "Database Connection Required",
      description: "Connect to Supabase to save your diary entries permanently. Click the green Supabase button to get started!",
      variant: "destructive"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-sardinian-terracotta to-destructive py-12">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-4 text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-4xl font-bold text-white mb-4">My Travel Diary</h1>
          <p className="text-white/90 text-lg">Capture and preserve your Sardinian memories</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* New Entry Form */}
          <div>
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5 text-sardinian-blue" />
                  Add New Entry
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="date" className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4" />
                      Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes" className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-4 h-4" />
                      Your Notes
                    </Label>
                    <Textarea
                      id="notes"
                      placeholder="Share your thoughts, experiences, and memories from today..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="min-h-32"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="image" className="flex items-center gap-2 mb-2">
                      <Image className="w-4 h-4" />
                      Upload Image (Optional)
                    </Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="cursor-pointer"
                    />
                  </div>

                  <Button type="submit" variant="hero" className="w-full">
                    Save Entry
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full" 
                    onClick={handleDatabaseMessage}
                  >
                    Connect Database for Permanent Storage
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Diary Entries */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-6 h-6 text-sardinian-blue" />
              <h2 className="text-2xl font-bold">Your Entries</h2>
            </div>
            
            <div className="space-y-6">
              {entries.map((entry) => (
                <Card key={entry.id} className="shadow-soft hover:shadow-mediterranean transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-sardinian-blue" />
                      {formatDate(entry.date)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {entry.notes}
                    </p>
                    {entry.image && (
                      <div className="mt-4">
                        <img 
                          src={entry.image} 
                          alt="Travel memory"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
              
              {entries.length === 0 && (
                <Card className="shadow-soft">
                  <CardContent className="text-center py-12">
                    <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No entries yet. Start documenting your journey!</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryPage;