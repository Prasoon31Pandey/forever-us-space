import { useState, useEffect } from "react";
import { LogIn, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";

interface GoogleAuthProps {
  onAuthChange: (user: GoogleUser | null) => void;
}

interface GoogleUser {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

const GoogleAuth = ({ onAuthChange }: GoogleAuthProps) => {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load saved user from localStorage
    const savedUser = localStorage.getItem('google_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      onAuthChange(userData);
    }
  }, [onAuthChange]);

  const signInWithGoogle = async () => {
    setIsLoading(true);
    
    try {
      // Simulate Google OAuth (in real app, use Google OAuth 2.0)
      // For demo purposes, we'll create a mock user
      const mockUser: GoogleUser = {
        id: 'demo_' + Date.now(),
        name: 'Demo User',
        email: 'demo@example.com',
        picture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`
      };
      
      localStorage.setItem('google_user', JSON.stringify(mockUser));
      setUser(mockUser);
      onAuthChange(mockUser);
      
      toast({
        title: "Welcome! 💕",
        description: "Successfully signed in with Google",
      });
    } catch (error) {
      toast({
        title: "Sign-in failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem('google_user');
    setUser(null);
    onAuthChange(null);
    
    toast({
      title: "Signed out",
      description: "See you soon! 💗",
    });
  };

  if (user) {
    return (
      <Card className="glass-card">
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user.picture} alt={user.name} />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
          
          <Button 
            onClick={signOut}
            variant="outline"
            size="sm"
            className="glass-card border-0"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card">
      <CardHeader className="text-center">
        <CardTitle className="font-serif text-xl">Secure Login</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-muted-foreground mb-4">
          Sign in with Google for secure access to your private space
        </p>
        
        <Button 
          onClick={signInWithGoogle}
          disabled={isLoading}
          className="btn-romantic w-full"
        >
          <LogIn className="h-4 w-4 mr-2" />
          {isLoading ? 'Signing in...' : 'Sign in with Google'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default GoogleAuth;