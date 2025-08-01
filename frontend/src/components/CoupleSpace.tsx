import { useState } from "react";
import { Heart, MessageCircle, Camera, BookHeart, Sparkles, LogOut, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ThemeToggle from "./ThemeToggle";
import Chat from "./Chat";
import PhotoAlbum from "./PhotoAlbum";
import LoveJournal from "./LoveJournal";
import FloatingHearts from "./FloatingHearts";
import VideoCall from "./VideoCall";

interface GoogleUser {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

interface CoupleSpaceProps {
  pairCode: string;
  user: GoogleUser;
  onLeave: () => void;
}

type ActiveTab = 'home' | 'chat' | 'photos' | 'journal' | 'video' | 'surprise';

const CoupleSpace = ({ pairCode, user, onLeave }: CoupleSpaceProps) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  const surprises = [
    "💕 \"The best love is the kind that awakens the soul and makes us reach for more.\" - Nicholas Sparks",
    "🌟 Remember your first date? What made you smile the most?",
    "💝 Send your partner a voice message saying three things you love about them!",
    "🎮 Quick game: Name 5 things that remind you of your partner!",
    "✨ \"In you, I've found the love of my life and my closest, truest friend.\"",
    "💌 Write a tiny love note: Why are you grateful for your partner today?",
  ];

  const getRandomSurprise = () => {
    const randomSurprise = surprises[Math.floor(Math.random() * surprises.length)];
    alert(randomSurprise);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return <Chat pairCode={pairCode} />;
      case 'photos':
        return <PhotoAlbum pairCode={pairCode} />;
      case 'journal':
        return <LoveJournal pairCode={pairCode} />;
      case 'video':
        return <VideoCall pairCode={pairCode} userEmail={user.email} />;
      case 'surprise':
        getRandomSurprise();
        setActiveTab('home');
        return null;
      default:
        return (
          <div className="space-y-8">
            <Card className="glass-card">
              <CardHeader className="text-center">
                <CardTitle className="font-serif text-3xl text-foreground">
                  Welcome to Your Private Space
                </CardTitle>
                <Badge variant="secondary" className="mx-auto w-fit text-lg">
                  {pairCode}
                </Badge>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground text-lg mb-6">
                  This is your exclusive space for two hearts. Everything here is private and secure.
                </p>
                
                <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
                  <Button 
                    onClick={() => setActiveTab('chat')}
                    className="btn-romantic flex flex-col gap-2 h-20"
                  >
                    <MessageCircle className="h-6 w-6" />
                    <span>Chat</span>
                  </Button>
                  
                  <Button 
                    onClick={() => setActiveTab('video')}
                    className="btn-romantic flex flex-col gap-2 h-20"
                  >
                    <Video className="h-6 w-6" />
                    <span>Video Call</span>
                  </Button>
                  
                  <Button 
                    onClick={() => setActiveTab('photos')}
                    className="btn-romantic flex flex-col gap-2 h-20"
                  >
                    <Camera className="h-6 w-6" />
                    <span>Photos</span>
                  </Button>
                  
                  <Button 
                    onClick={() => setActiveTab('journal')}
                    className="btn-romantic flex flex-col gap-2 h-20"
                  >
                    <BookHeart className="h-6 w-6" />
                    <span>Journal</span>
                  </Button>
                </div>
                
                <Button 
                  onClick={() => setActiveTab('surprise')}
                  className="btn-romantic mx-auto block"
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Surprise Me
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="font-serif text-xl flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Quick Video Call
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Start a secure peer-to-peer video call with your partner
                </p>
                <Button 
                  onClick={() => setActiveTab('video')}
                  className="btn-romantic"
                >
                  <Video className="h-4 w-4 mr-2" />
                  Start Video Call
                </Button>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingHearts />
      
      {/* Header */}
      <header className="relative z-10 p-6 flex justify-between items-center glass-card mx-6 mt-6 rounded-lg">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Heart className="h-6 w-6 text-primary fill-current" />
            <span className="font-serif font-bold text-lg">Forever Us</span>
          </button>
          
          <Badge variant="outline" className="font-mono text-sm">
            {pairCode}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button 
            variant="outline" 
            size="icon"
            onClick={onLeave}
            className="glass-card border-0"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Navigation */}
      {activeTab !== 'home' && (
        <nav className="relative z-10 px-6 mt-4">
          <div className="flex gap-2 glass-card p-2 rounded-lg w-fit mx-auto">
            <Button
              variant={activeTab === 'chat' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('chat')}
              className={activeTab === 'chat' ? 'btn-romantic' : ''}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat
            </Button>
            <Button
              variant={activeTab === 'video' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('video')}
              className={activeTab === 'video' ? 'btn-romantic' : ''}
            >
              <Video className="h-4 w-4 mr-2" />
              Video
            </Button>
            <Button
              variant={activeTab === 'photos' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('photos')}
              className={activeTab === 'photos' ? 'btn-romantic' : ''}
            >
              <Camera className="h-4 w-4 mr-2" />
              Photos
            </Button>
            <Button
              variant={activeTab === 'journal' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('journal')}
              className={activeTab === 'journal' ? 'btn-romantic' : ''}
            >
              <BookHeart className="h-4 w-4 mr-2" />
              Journal
            </Button>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default CoupleSpace;