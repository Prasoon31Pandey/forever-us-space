import { useState, useEffect, useRef } from "react";
import { Send, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ChatProps {
  pairCode: string;
}

interface Message {
  id: string;
  text: string;
  sender: 'you' | 'partner';
  timestamp: Date;
}

const Chat = ({ pairCode }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Welcome to your private chat! 💕',
      sender: 'partner',
      timestamp: new Date(Date.now() - 1000 * 60 * 5)
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage.trim(),
        sender: 'you',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, message]);
      setNewMessage('');

      // Simulate partner response (for demo)
      setTimeout(() => {
        const responses = [
          "I love you too! 💗",
          "Missing you so much right now 🥺",
          "Can't wait to see you again! ✨",
          "You always make me smile 😊",
          "Thank you for being amazing 💕"
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const partnerMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: randomResponse,
          sender: 'partner',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, partnerMessage]);
      }, 1000 + Math.random() * 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="glass-card max-w-2xl mx-auto h-[600px] flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="font-serif text-2xl text-center flex items-center justify-center gap-2">
          <Heart className="h-6 w-6 text-primary fill-current" />
          Private Chat
          <Heart className="h-6 w-6 text-primary fill-current" />
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'you' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-end gap-2 max-w-[70%] ${
                message.sender === 'you' ? 'flex-row-reverse' : 'flex-row'
              }`}>
                <Avatar className="w-8 h-8">
                  <AvatarFallback className={`text-xs ${
                    message.sender === 'you' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-accent text-accent-foreground'
                  }`}>
                    {message.sender === 'you' ? 'Y' : 'P'}
                  </AvatarFallback>
                </Avatar>
                
                <div className={`rounded-2xl px-4 py-2 ${
                  message.sender === 'you'
                    ? 'bg-gradient-romantic text-primary-foreground rounded-br-md'
                    : 'glass-card rounded-bl-md'
                }`}>
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'you' 
                      ? 'text-primary-foreground/70' 
                      : 'text-muted-foreground'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="flex-shrink-0 p-6 pt-0">
          <div className="flex gap-2">
            <Input
              placeholder="Type a loving message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button 
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              size="icon"
              className="btn-romantic"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Chat;