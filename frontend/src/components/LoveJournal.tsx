import { useState } from "react";
import { Heart, Plus, Calendar, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface LoveJournalProps {
  pairCode: string;
}

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  author: 'you' | 'partner';
  timestamp: Date;
  mood?: string;
}

const LoveJournal = ({ pairCode }: LoveJournalProps) => {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      title: 'Our First Entry',
      content: 'Starting this beautiful journey together in our private space. I love how we can share our thoughts and feelings here, just the two of us. This feels so special and intimate. 💕',
      author: 'partner',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      mood: '💕'
    },
    {
      id: '2',
      title: 'Grateful Heart',
      content: 'Today I was thinking about how lucky I am to have you in my life. You make even the ordinary days feel magical. Thank you for being you.',
      author: 'you',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      mood: '🥰'
    }
  ]);
  
  const [isWriting, setIsWriting] = useState(false);
  const [newEntry, setNewEntry] = useState({ title: '', content: '', mood: '💕' });

  const moods = ['💕', '🥰', '😊', '🌟', '✨', '💗', '🌸', '🦋', '🌈', '☀️'];

  const saveEntry = () => {
    if (newEntry.title.trim() && newEntry.content.trim()) {
      const entry: JournalEntry = {
        id: Date.now().toString(),
        title: newEntry.title.trim(),
        content: newEntry.content.trim(),
        author: 'you',
        timestamp: new Date(),
        mood: newEntry.mood
      };
      
      setEntries(prev => [entry, ...prev]);
      setNewEntry({ title: '', content: '', mood: '💕' });
      setIsWriting(false);
    }
  };

  const deleteEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="font-serif text-2xl text-center flex items-center justify-center gap-2">
            <Heart className="h-6 w-6 text-primary fill-current" />
            Our Love Journal
            <Heart className="h-6 w-6 text-primary fill-current" />
          </CardTitle>
        </CardHeader>
        
        {!isWriting ? (
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              Share your thoughts, feelings, and beautiful moments together in your private journal.
            </p>
            <Button 
              onClick={() => setIsWriting(true)}
              className="btn-romantic"
            >
              <Plus className="h-4 w-4 mr-2" />
              Write New Entry
            </Button>
          </CardContent>
        ) : (
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="entry-title">Title</Label>
              <Input
                id="entry-title"
                placeholder="What's on your heart today?"
                value={newEntry.title}
                onChange={(e) => setNewEntry(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="entry-mood">How are you feeling?</Label>
              <div className="flex gap-2 mt-2">
                {moods.map((mood) => (
                  <button
                    key={mood}
                    onClick={() => setNewEntry(prev => ({ ...prev, mood }))}
                    className={`text-2xl p-2 rounded-lg transition-all ${
                      newEntry.mood === mood 
                        ? 'bg-primary/20 scale-110' 
                        : 'hover:bg-muted hover:scale-105'
                    }`}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <Label htmlFor="entry-content">Your thoughts</Label>
              <Textarea
                id="entry-content"
                placeholder="Pour your heart out..."
                value={newEntry.content}
                onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
                rows={6}
                className="resize-none"
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={saveEntry}
                disabled={!newEntry.title.trim() || !newEntry.content.trim()}
                className="btn-romantic flex-1"
              >
                <Heart className="h-4 w-4 mr-2" />
                Save Entry
              </Button>
              <Button 
                onClick={() => {
                  setIsWriting(false);
                  setNewEntry({ title: '', content: '', mood: '💕' });
                }}
                variant="outline"
                className="glass-card border-0"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Journal Entries */}
      <div className="space-y-4">
        {entries.map((entry) => (
          <Card key={entry.id} className="glass-card">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-serif text-lg font-semibold">
                      {entry.title}
                    </h3>
                    {entry.mood && (
                      <span className="text-xl">{entry.mood}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(entry.timestamp)}</span>
                    <span>•</span>
                    <span>{formatTime(entry.timestamp)}</span>
                    <Badge variant={entry.author === 'you' ? 'default' : 'secondary'} className="text-xs">
                      {entry.author === 'you' ? 'You' : 'Partner'}
                    </Badge>
                  </div>
                </div>
                
                {entry.author === 'you' && (
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => deleteEntry(entry.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                {entry.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {entries.length === 0 && (
        <Card className="glass-card">
          <CardContent className="text-center py-12">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-serif text-xl mb-2">Your journal awaits</h3>
            <p className="text-muted-foreground">
              Start documenting your love story with your first journal entry.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LoveJournal;