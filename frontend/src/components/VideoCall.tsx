import { useState, useRef, useEffect } from "react";
import { Video, VideoOff, Mic, MicOff, Phone, PhoneOff, Copy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface VideoCallProps {
  pairCode: string;
  userEmail?: string;
}

interface CallState {
  isInCall: boolean;
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  meetingCode: string;
  isHost: boolean;
}

const VideoCall = ({ pairCode, userEmail }: VideoCallProps) => {
  const [callState, setCallState] = useState<CallState>({
    isInCall: false,
    isVideoEnabled: true,
    isAudioEnabled: true,
    meetingCode: '',
    isHost: false
  });
  
  const [joinCode, setJoinCode] = useState('');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    return () => {
      // Cleanup stream when component unmounts
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const generateMeetingCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setCallState(prev => ({ ...prev, meetingCode: code, isHost: true }));
    return code;
  };

  const startCall = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      setStream(mediaStream);
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = mediaStream;
      }
      
      const meetingCode = generateMeetingCode();
      
      setCallState(prev => ({ 
        ...prev, 
        isInCall: true,
        meetingCode 
      }));
      
      toast({
        title: "Video call started! 📹",
        description: `Meeting code: ${meetingCode}`,
      });
      
    } catch (error) {
      toast({
        title: "Camera access denied",
        description: "Please allow camera and microphone access",
        variant: "destructive",
      });
    }
  };

  const joinCall = async () => {
    if (!joinCode.trim()) return;
    
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      setStream(mediaStream);
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = mediaStream;
      }
      
      setCallState(prev => ({ 
        ...prev, 
        isInCall: true,
        meetingCode: joinCode.toUpperCase(),
        isHost: false
      }));
      
      toast({
        title: "Joined video call! 💕",
        description: `Connected to meeting: ${joinCode.toUpperCase()}`,
      });
      
    } catch (error) {
      toast({
        title: "Failed to join call",
        description: "Please check your camera and microphone permissions",
        variant: "destructive",
      });
    }
  };

  const endCall = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    
    setCallState({
      isInCall: false,
      isVideoEnabled: true,
      isAudioEnabled: true,
      meetingCode: '',
      isHost: false
    });
    
    setJoinCode('');
    
    toast({
      title: "Call ended",
      description: "Video call has been disconnected",
    });
  };

  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !callState.isVideoEnabled;
        setCallState(prev => ({ ...prev, isVideoEnabled: !prev.isVideoEnabled }));
      }
    }
  };

  const toggleAudio = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !callState.isAudioEnabled;
        setCallState(prev => ({ ...prev, isAudioEnabled: !prev.isAudioEnabled }));
      }
    }
  };

  const copyMeetingCode = () => {
    navigator.clipboard.writeText(callState.meetingCode);
    toast({
      title: "Meeting code copied! 📋",
      description: "Share this code with your partner",
    });
  };

  if (callState.isInCall) {
    return (
      <Card className="glass-card max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="font-serif text-2xl flex items-center justify-center gap-2">
            <Video className="h-6 w-6 text-primary" />
            Video Call - {callState.meetingCode}
            <Video className="h-6 w-6 text-primary" />
          </CardTitle>
          
          <div className="flex items-center justify-center gap-2">
            <Badge variant="secondary">
              <Users className="h-3 w-3 mr-1" />
              {callState.isHost ? 'Host' : 'Joined'}
            </Badge>
            <Button 
              onClick={copyMeetingCode}
              variant="outline" 
              size="sm"
              className="glass-card border-0"
            >
              <Copy className="h-3 w-3 mr-1" />
              Copy Code
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Video Area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Local Video */}
            <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
              <video
                ref={localVideoRef}
                autoPlay
                muted
                className="w-full h-full object-cover"
              />
              {!callState.isVideoEnabled && (
                <div className="absolute inset-0 bg-black flex items-center justify-center">
                  <VideoOff className="h-12 w-12 text-white" />
                </div>
              )}
              <Badge className="absolute top-2 left-2 bg-black/50">
                You ({userEmail || 'Guest'})
              </Badge>
            </div>
            
            {/* Remote Video */}
            <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
              <video
                ref={remoteVideoRef}
                autoPlay
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black flex items-center justify-center">
                <div className="text-center text-white">
                  <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm opacity-75">Waiting for your partner...</p>
                </div>
              </div>
              <Badge className="absolute top-2 left-2 bg-black/50">
                Partner
              </Badge>
            </div>
          </div>
          
          {/* Call Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={toggleVideo}
              variant={callState.isVideoEnabled ? "default" : "destructive"}
              size="icon"
              className="rounded-full h-12 w-12"
            >
              {callState.isVideoEnabled ? (
                <Video className="h-5 w-5" />
              ) : (
                <VideoOff className="h-5 w-5" />
              )}
            </Button>
            
            <Button
              onClick={toggleAudio}
              variant={callState.isAudioEnabled ? "default" : "destructive"}
              size="icon"
              className="rounded-full h-12 w-12"
            >
              {callState.isAudioEnabled ? (
                <Mic className="h-5 w-5" />
              ) : (
                <MicOff className="h-5 w-5" />
              )}
            </Button>
            
            <Button
              onClick={endCall}
              variant="destructive"
              size="icon"
              className="rounded-full h-12 w-12"
            >
              <PhoneOff className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="font-serif text-2xl flex items-center justify-center gap-2">
          <Video className="h-6 w-6 text-primary" />
          Video Call
          <Video className="h-6 w-6 text-primary" />
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Start New Call */}
        <div className="text-center">
          <Button 
            onClick={startCall}
            className="btn-romantic w-full mb-4"
          >
            <Phone className="h-4 w-4 mr-2" />
            Start New Video Call
          </Button>
          <p className="text-xs text-muted-foreground">
            Get a meeting code to share with your partner
          </p>
        </div>
        
        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or
            </span>
          </div>
        </div>
        
        {/* Join Existing Call */}
        <div className="space-y-3">
          <Label htmlFor="join-code">Join with meeting code</Label>
          <div className="flex gap-2">
            <Input
              id="join-code"
              placeholder="Enter 6-digit code"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              className="text-center font-mono tracking-widest"
              maxLength={6}
            />
          </div>
          <Button 
            onClick={joinCall}
            disabled={!joinCode.trim() || joinCode.length !== 6}
            variant="outline"
            className="glass-card border-0 w-full"
          >
            <Users className="h-4 w-4 mr-2" />
            Join Video Call
          </Button>
        </div>
        
        <div className="text-center text-xs text-muted-foreground">
          <p>🔒 All video calls are private and secure</p>
          <p>Your conversations are not recorded or stored</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoCall;