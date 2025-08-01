import { useState } from "react";
import { Upload, Heart, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PhotoAlbumProps {
  pairCode: string;
}

interface Photo {
  id: string;
  url: string;
  caption: string;
  timestamp: Date;
}

const PhotoAlbum = ({ pairCode }: PhotoAlbumProps) => {
  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400&h=400&fit=crop',
      caption: 'Our first sunset together 🌅',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)
    },
    {
      id: '2', 
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=400&fit=crop',
      caption: 'Coffee date vibes ☕💕',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3)
    }
  ]);
  const [caption, setCaption] = useState('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newPhoto: Photo = {
        id: Date.now().toString(),
        url,
        caption: caption || 'A beautiful moment together',
        timestamp: new Date()
      };
      
      setPhotos(prev => [newPhoto, ...prev]);
      setCaption('');
    }
  };

  const deletePhoto = (id: string) => {
    setPhotos(prev => prev.filter(photo => photo.id !== id));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="font-serif text-2xl text-center flex items-center justify-center gap-2">
            <Heart className="h-6 w-6 text-primary fill-current" />
            Our Photo Album
            <Heart className="h-6 w-6 text-primary fill-current" />
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="caption">Caption for your photo</Label>
              <Input
                id="caption"
                placeholder="A beautiful memory..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>
            
            <div className="flex items-end">
              <Label htmlFor="photo-upload" className="w-full">
                <Button className="btn-romantic w-full cursor-pointer" asChild>
                  <span>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Photo
                  </span>
                </Button>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <Card key={photo.id} className="glass-card overflow-hidden group">
            <div className="relative">
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-64 object-cover transition-transform group-hover:scale-105"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button size="icon" variant="secondary" className="glass-card">
                  <Download className="h-4 w-4" />
                </Button>
                <Button 
                  size="icon" 
                  variant="destructive"
                  onClick={() => deletePhoto(photo.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <CardContent className="p-4">
              <p className="text-sm text-foreground mb-2 font-medium">
                {photo.caption}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDate(photo.timestamp)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {photos.length === 0 && (
        <Card className="glass-card">
          <CardContent className="text-center py-12">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-serif text-xl mb-2">No photos yet</h3>
            <p className="text-muted-foreground">
              Start creating beautiful memories together by uploading your first photo!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PhotoAlbum;