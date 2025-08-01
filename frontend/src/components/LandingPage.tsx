import { useState } from "react";
import { Heart, Shield, MessageCircle, Camera, BookHeart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import FloatingHearts from "./FloatingHearts";
import ThemeToggle from "./ThemeToggle";
import GoogleAuth from "./GoogleAuth";

interface GoogleUser {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

interface LandingPageProps {
  onEnterSpace: (code: string, user: GoogleUser) => void;
}

const LandingPage = ({ onEnterSpace }: LandingPageProps) => {
  const [pairCode, setPairCode] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [user, setUser] = useState<GoogleUser | null>(null);

  const handleAuthChange = (userData: GoogleUser | null) => {
    setUser(userData);
  };

  const generatePairCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setPairCode(code);
    setIsCreating(true);
  };

  const enterSpace = () => {
    if (pairCode.trim() && user) {
      onEnterSpace(pairCode.trim().toUpperCase(), user);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingHearts />
      
      {/* Header */}
      <header className="relative z-10 p-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Heart className="h-8 w-8 text-primary fill-current" />
          <h1 className="text-2xl font-serif font-bold text-foreground">Forever Us</h1>
        </div>
        <ThemeToggle />
      </header>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-6 pt-12">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-6 leading-tight">
            Your Private Space
            <br />
            <span className="bg-gradient-romantic bg-clip-text text-transparent">
              for Two Hearts
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Connect, share memories, and stay close with complete privacy and security. 
            Your love story deserves a special place.
          </p>

          {/* Authentication */}
          {!user ? (
            <div className="max-w-md mx-auto mb-8">
              <GoogleAuth onAuthChange={handleAuthChange} />
            </div>
          ) : (
            <>
              {/* User Welcome */}
              <div className="max-w-md mx-auto mb-8">
                <Card className="glass-card">
                  <CardContent className="text-center p-4">
                    <p className="text-muted-foreground">
                      Welcome back, <span className="font-medium text-foreground">{user.name}</span>! 💕
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Pairing Section */}
              <Card className="glass-card max-w-md mx-auto mb-16">
                <CardHeader className="text-center">
                  <CardTitle className="font-serif text-2xl">Enter Your Private Space</CardTitle>
                  <CardDescription>
                    {isCreating 
                      ? "Share this code with your partner to connect"
                      : "Enter your pairing code or create a new space"
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter pairing code"
                      value={pairCode}
                      onChange={(e) => setPairCode(e.target.value.toUpperCase())}
                      className="text-center text-lg font-mono tracking-widest"
                      maxLength={6}
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button 
                      onClick={enterSpace}
                      disabled={!pairCode.trim()}
                      className="btn-romantic w-full text-lg"
                    >
                      <Heart className="h-5 w-5 mr-2" />
                      Enter Our Space
                    </Button>
                    
                    <Button 
                      onClick={generatePairCode}
                      variant="outline"
                      className="glass-card border-0"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Create New Space
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <Card className="glass-card">
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-2" />
                <CardTitle className="font-serif">End-to-End Privacy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your conversations and memories are completely private with encryption and secure pairing.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="text-center">
                <MessageCircle className="h-12 w-12 text-primary mx-auto mb-2" />
                <CardTitle className="font-serif">Intimate Chat</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Real-time messaging with video calls, just for the two of you.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="text-center">
                <Camera className="h-12 w-12 text-primary mx-auto mb-2" />
                <CardTitle className="font-serif">Shared Memories</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Create a beautiful photo album of your special moments together.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="text-center">
                <BookHeart className="h-12 w-12 text-primary mx-auto mb-2" />
                <CardTitle className="font-serif">Love Journal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Write together in your private journal and save your favorite memories.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="text-center">
                <Sparkles className="h-12 w-12 text-primary mx-auto mb-2" />
                <CardTitle className="font-serif">Surprise Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Random love quotes, mini-games, and sweet surprises to brighten your day.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="text-center">
                <Heart className="h-12 w-12 text-primary mx-auto mb-2 fill-current" />
                <CardTitle className="font-serif">Made for Love</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Thoughtfully designed for couples who want to stay emotionally connected.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center p-6 text-muted-foreground">
        <p className="font-serif">
          Built with 💗 for couples who treasure their privacy and connection
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;