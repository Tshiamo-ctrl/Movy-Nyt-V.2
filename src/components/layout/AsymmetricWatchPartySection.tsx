import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  TextField, 
  IconButton, 
  Stack, 
  Chip, 
  Button,
  Slider,
  Menu,
  MenuItem,
  Tooltip,
  LinearProgress,
  Collapse
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import {
  Send,
  PlayArrow,
  Pause,
  VolumeUp,
  VolumeOff,
  Fullscreen,
  FullscreenExit,
  Favorite,
  ThumbUp,
  EmojiEmotions,
  Settings,
  Subtitles,
  Hd,
  Group,
  Lock,
  Public,
  VideoCall
} from '@mui/icons-material';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

// Keyframe animations
const pulseRing = keyframes`
  0% {
    transform: scale(0.33);
    opacity: 1;
  }
  80%, 100% {
    transform: scale(2);
    opacity: 0;
  }
`;

const floatUp = keyframes`
  0% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) scale(1.2);
    opacity: 0;
  }
`;

const slideInFromRight = keyframes`
  0% { opacity: 0; transform: translateX(100px); }
  100% { opacity: 1; transform: translateX(0); }
`;

const slideInFromLeft = keyframes`
  0% { opacity: 0; transform: translateX(-100px); }
  100% { opacity: 1; transform: translateX(0); }
`;

const messageAppear = keyframes`
  0% { 
    opacity: 0; 
    transform: translateY(20px) scale(0.8); 
  }
  100% { 
    opacity: 1; 
    transform: translateY(0) scale(1); 
  }
`;

const backgroundShift = keyframes`
  0%, 100% { filter: hue-rotate(0deg) brightness(1); }
  25% { filter: hue-rotate(15deg) brightness(1.1); }
  50% { filter: hue-rotate(30deg) brightness(0.9); }
  75% { filter: hue-rotate(15deg) brightness(1.1); }
`;

// Main container with asymmetric layout
const WatchPartyContainer = styled(Box)(() => ({
  minHeight: '100vh',
  background: 'var(--color-background)',
  display: 'grid',
  gridTemplateColumns: '1fr 400px',
  gridTemplateRows: '1fr auto',
  gridTemplateAreas: `
    "session sidebar"
    "discovery sidebar"
  `,
  gap: 'calc(var(--grid-base) * 2)',
  padding: 'calc(var(--grid-base) * 2)',
  
  '@media (max-width: var(--breakpoint-lg))': {
    gridTemplateColumns: '1fr 350px',
  },
  
  '@media (max-width: var(--breakpoint-md))': {
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto auto auto',
    gridTemplateAreas: `
      "session"
      "sidebar"
      "discovery"
    `,
  },
}));

// Active session area
const SessionArea = styled(Box)(() => ({
  gridArea: 'session',
  position: 'relative',
  borderRadius: 'calc(var(--grid-base) * 3)',
  overflow: 'hidden',
  background: 'var(--glass-background-strong)',
  backdropFilter: 'var(--glass-blur-strong)',
  border: 'var(--glass-border-strong)',
  minHeight: '70vh',
  display: 'flex',
  flexDirection: 'column',
}));

const DynamicVideoBackground = styled(Box)<{ contentType?: string; isPlaying?: boolean }>(({ contentType, isPlaying }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: contentType === 'cyberpunk' 
    ? 'url("https://images.unsplash.com/photo-1518709414768-a88981a4515d?crop=entropy&cs=srgb&fm=jpg&w=1920&h=1080")'
    : 'url("https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?crop=entropy&cs=srgb&fm=jpg&w=1920&h=1080")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  filter: isPlaying ? 'brightness(0.7) contrast(1.2)' : 'brightness(0.5)',
  transition: 'all var(--animation-slow) var(--ease-out-expo)',
  animation: isPlaying ? `${backgroundShift} 20s ease-in-out infinite` : 'none',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'var(--gradient-overlay-dark)',
    zIndex: 1,
  },
}));

const VideoPlayerArea = styled(Box)(() => ({
  flex: 1,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2,
}));

// Floating participants
const FloatingParticipants = styled(Box)(() => ({
  position: 'absolute',
  top: 'calc(var(--grid-base) * 3)',
  left: 'calc(var(--grid-base) * 3)',
  zIndex: 10,
  display: 'flex',
  gap: 'calc(var(--grid-base) * 1)',
}));

const ParticipantAvatar = styled(Avatar, {
  shouldForwardProp: (prop) => prop !== 'isActive' && prop !== 'isReacting'
})<{ isActive?: boolean; isReacting?: boolean }>(({ isActive, isReacting }) => ({
  width: 56,
  height: 56,
  border: isActive ? '3px solid var(--color-primary)' : '2px solid rgba(255, 255, 255, 0.3)',
  cursor: 'pointer',
  transition: 'all var(--animation-medium) var(--ease-out-expo)',
  position: 'relative',
  
  '&:hover': {
    transform: 'scale(1.1)',
    border: '3px solid var(--color-primary)',
  },
  
  ...(isActive && {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: -4,
      left: -4,
      right: -4,
      bottom: -4,
      border: '2px solid var(--color-primary)',
      borderRadius: '50%',
      animation: `${pulseRing} 2s infinite`,
    },
  }),
  
  ...(isReacting && {
    animation: 'bounce 0.6s ease-in-out',
    '@keyframes bounce': {
      '0%, 100%': { transform: 'scale(1)' },
      '50%': { transform: 'scale(1.2)' },
    },
  }),
}));

// Enhanced controls
const FloatingControls = styled(Box)(() => ({
  position: 'absolute',
  bottom: 'calc(var(--grid-base) * 3)',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  alignItems: 'center',
  gap: 'calc(var(--grid-base) * 2)',
  background: 'var(--glass-background-strong)',
  backdropFilter: 'var(--glass-blur)',
  border: 'var(--glass-border)',
  borderRadius: 'calc(var(--grid-base) * 4)',
  padding: 'calc(var(--grid-base) * 2)',
  zIndex: 10,
  transition: 'all var(--animation-medium) var(--ease-out-expo)',
  
  '&:hover': {
    background: 'var(--glass-background-strong)',
    boxShadow: 'var(--glass-hover-shadow)',
  },
}));

const ControlButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'isActive'
})<{ isActive?: boolean }>(({ isActive }) => ({
  background: isActive ? 'var(--gradient-brand)' : 'var(--glass-background-subtle)',
  color: isActive ? 'white' : 'var(--color-text-primary)',
  width: 48,
  height: 48,
  transition: 'all var(--animation-medium) var(--ease-out-expo)',
  
  '&:hover': {
    background: isActive ? 'var(--gradient-brand-hover)' : 'var(--glass-background)',
    transform: 'scale(1.1)',
  },
}));

// Social sidebar
const SocialSidebar = styled(Box)(() => ({
  gridArea: 'sidebar',
  display: 'flex',
  flexDirection: 'column',
  gap: 'calc(var(--grid-base) * 2)',
  animation: `${slideInFromRight} 1s var(--ease-out-expo)`,
}));

const ChatContainer = styled(Box)(() => ({
  background: 'var(--glass-background)',
  backdropFilter: 'var(--glass-blur)',
  border: 'var(--glass-border)',
  borderRadius: 'calc(var(--grid-base) * 2)',
  height: '400px',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
}));

const ChatMessages = styled(Box)(() => ({
  flex: 1,
  padding: 'calc(var(--grid-base) * 2)',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 'calc(var(--grid-base) * 1.5)',
  
  '&::-webkit-scrollbar': {
    width: '4px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'var(--gradient-brand)',
    borderRadius: '2px',
  },
}));

const MessageCluster = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isOwn'
})<{ isOwn?: boolean }>(({ isOwn }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 'calc(var(--grid-base) * 1)',
  flexDirection: isOwn ? 'row-reverse' : 'row',
  animation: `${messageAppear} 0.4s var(--ease-out-expo)`,
}));

const MessageBubble = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isOwn'
})<{ isOwn?: boolean }>(({ isOwn }) => ({
  background: isOwn ? 'var(--gradient-brand)' : 'var(--glass-background-subtle)',
  color: isOwn ? 'white' : 'var(--color-text-primary)',
  padding: 'calc(var(--grid-base) * 1.5)',
  borderRadius: 'calc(var(--grid-base) * 2)',
  maxWidth: '80%',
  fontSize: '0.875rem',
  lineHeight: 1.4,
  position: 'relative',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    [isOwn ? 'right' : 'left']: '-6px',
    transform: 'translateY(-50%)',
    width: 0,
    height: 0,
    borderTop: '6px solid transparent',
    borderBottom: '6px solid transparent',
    [isOwn ? 'borderLeft' : 'borderRight']: `6px solid ${isOwn ? 'var(--color-primary)' : 'var(--glass-background-subtle)'}`,
  },
}));

// Quick invite section
const QuickInviteContainer = styled(Box)(() => ({
  background: 'var(--glass-background)',
  backdropFilter: 'var(--glass-blur)',
  border: 'var(--glass-border)',
  borderRadius: 'calc(var(--grid-base) * 2)',
  padding: 'calc(var(--grid-base) * 3)',
}));

// Room discovery section
const RoomDiscoveryArea = styled(Box)(() => ({
  gridArea: 'discovery',
  background: 'var(--glass-background)',
  backdropFilter: 'var(--glass-blur)',
  border: 'var(--glass-border)',
  borderRadius: 'calc(var(--grid-base) * 2)',
  padding: 'calc(var(--grid-base) * 3)',
  animation: `${slideInFromLeft} 1s var(--ease-out-expo) 0.3s both`,
}));

const RoomCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isPrivate'
})<{ isPrivate?: boolean }>(({ isPrivate }) => ({
  background: 'var(--glass-background-subtle)',
  border: isPrivate ? '1px solid var(--color-secondary)' : 'var(--glass-border)',
  borderRadius: 'calc(var(--grid-base) * 1.5)',
  padding: 'calc(var(--grid-base) * 2)',
  cursor: 'pointer',
  transition: 'all var(--animation-medium) var(--ease-out-expo)',
  
  '&:hover': {
    background: 'var(--glass-background)',
    transform: 'translateY(-2px)',
    boxShadow: 'var(--glass-hover-shadow)',
  },
}));

// Reaction overlay
const ReactionOverlay = styled(Box)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none',
  zIndex: 5,
}));

const FloatingReaction = styled(Box)<{ x: number; y: number }>(({ x, y }) => ({
  position: 'absolute',
  left: `${x}%`,
  top: `${y}%`,
  fontSize: '2rem',
  animation: `${floatUp} 3s ease-out forwards`,
  pointerEvents: 'none',
}));

// Component interfaces
interface Participant {
  id: number;
  name: string;
  avatar: string;
  online: boolean;
  isActive?: boolean;
  isReacting?: boolean;
  lastReaction?: string;
}

interface Message {
  id: number;
  user: string;
  avatar: string;
  message: string;
  time: string;
  isOwn: boolean;
  reactions?: string[];
}

interface WatchRoom {
  id: string;
  title: string;
  thumbnail: string;
  participants: number;
  isPrivate: boolean;
  category: string;
  activity: string;
  host: string;
}

// Session states
type SessionState = 'waiting' | 'watching' | 'paused' | 'ended';

const AsymmetricWatchPartySection: React.FC = () => {
  // State management
  const [sessionState, setSessionState] = useState<SessionState>('waiting');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [message, setMessage] = useState('');
  const [showControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(2732); // 45:32 in seconds
  const [duration] = useState(8100); // 2:15:00 in seconds
  const [reactions, setReactions] = useState<Array<{id: number, x: number, y: number, emoji: string}>>([]);
  const [settingsAnchor, setSettingsAnchor] = useState<null | HTMLElement>(null);
  
  // Scroll animations
  const { elementRef: discoveryRef, isInView: discoveryInView } = useScrollAnimation({ threshold: 0.3 });

  // Sample data
  const [participants, setParticipants] = useState<Participant[]>([
    { id: 1, name: 'You', avatar: 'https://i.pravatar.cc/150?img=1', online: true, isActive: true },
    { id: 2, name: 'Sarah', avatar: 'https://i.pravatar.cc/150?img=2', online: true, isReacting: false },
    { id: 3, name: 'Mike', avatar: 'https://i.pravatar.cc/150?img=3', online: true },
    { id: 4, name: 'Emma', avatar: 'https://i.pravatar.cc/150?img=4', online: true },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, user: 'Sarah', avatar: 'https://i.pravatar.cc/150?img=2', message: 'This movie looks amazing! 🍿', time: '2:34 PM', isOwn: false },
    { id: 2, user: 'Mike', avatar: 'https://i.pravatar.cc/150?img=3', message: 'Ready when you are!', time: '2:35 PM', isOwn: false },
    { id: 3, user: 'You', avatar: 'https://i.pravatar.cc/150?img=1', message: 'Starting in 3... 2... 1...', time: '2:36 PM', isOwn: true },
    { id: 4, user: 'Emma', avatar: 'https://i.pravatar.cc/150?img=4', message: '❤️ Love this scene!', time: '2:45 PM', isOwn: false },
  ]);

  const trendingRooms: WatchRoom[] = [
    {
      id: '1',
      title: 'Marvel Movie Marathon',
      thumbnail: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?crop=entropy&cs=srgb&fm=jpg&w=300&h=200',
      participants: 12,
      isPrivate: false,
      category: 'Action',
      activity: 'Watching Iron Man',
      host: 'MovieBuff92'
    },
    {
      id: '2',
      title: 'Friends & Comedy Night',
      thumbnail: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?crop=entropy&cs=srgb&fm=jpg&w=300&h=200',
      participants: 6,
      isPrivate: true,
      category: 'Comedy',
      activity: 'Starting soon',
      host: 'ComedyFan'
    },
    {
      id: '3',
      title: 'Sci-Fi Saturday',
      thumbnail: 'https://images.unsplash.com/photo-1518709414768-a88981a4515d?crop=entropy&cs=srgb&fm=jpg&w=300&h=200',
      participants: 24,
      isPrivate: false,
      category: 'Sci-Fi',
      activity: 'Watching Blade Runner',
      host: 'SciFiExplorer'
    }
  ];

  const suggestedFriends = [
    { id: 5, name: 'Alex', avatar: 'https://i.pravatar.cc/150?img=5', mutual: 3 },
    { id: 6, name: 'Jordan', avatar: 'https://i.pravatar.cc/150?img=6', mutual: 8 },
    { id: 7, name: 'Casey', avatar: 'https://i.pravatar.cc/150?img=7', mutual: 2 },
  ];

  // Auto-update current time when playing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && sessionState === 'watching') {
      interval = setInterval(() => {
        setCurrentTime(prev => Math.min(prev + 1, duration));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, sessionState, duration]);

  // Session state transitions
  useEffect(() => {
    if (isPlaying && sessionState === 'waiting') {
      setSessionState('watching');
    } else if (!isPlaying && sessionState === 'watching') {
      setSessionState('paused');
    }
  }, [isPlaying, sessionState]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // Simulate participant reactions
    setTimeout(() => {
      setParticipants(prev => prev.map(p => 
        p.id === 2 ? { ...p, isReacting: true, lastReaction: '👍' } : p
      ));
    }, 500);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        user: 'You',
        avatar: 'https://i.pravatar.cc/150?img=1',
        message: message.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      };
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
    }
  };

  const addReaction = (emoji: string) => {
    const newReaction = {
      id: Date.now(),
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 20,
      emoji
    };
    setReactions(prev => [...prev, newReaction]);
    
    // Remove reaction after animation
    setTimeout(() => {
      setReactions(prev => prev.filter(r => r.id !== newReaction.id));
    }, 3000);
  };

  const inviteFriend = (friendId: number) => {
    // Simulate sending invite
    console.log(`Invited friend ${friendId}`);
  };

  const joinRoom = (roomId: string) => {
    // Simulate joining room
    console.log(`Joining room ${roomId}`);
  };

  const renderSessionContent = () => {
    switch (sessionState) {
      case 'waiting':
        return (
          <Box sx={{ textAlign: 'center', zIndex: 3 }}>
            <Typography variant="h3" sx={{ color: 'white', mb: 2, fontWeight: 700 }}>
              Cyberpunk Thriller
            </Typography>
            <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 4 }}>
              Waiting for {participants.length - 1} friends to join...
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<PlayArrow />}
              onClick={handlePlayPause}
              sx={{
                background: 'var(--gradient-brand)',
                color: 'white',
                fontWeight: 600,
                padding: '16px 32px',
                borderRadius: '28px',
                fontSize: '1.125rem',
                '&:hover': {
                  background: 'var(--gradient-brand-hover)',
                  transform: 'scale(1.05)',
                }
              }}
            >
              Start Watching
            </Button>
          </Box>
        );
      
      case 'watching':
      case 'paused':
        return (
          <Box sx={{ textAlign: 'center', zIndex: 3 }}>
            <Typography variant="h4" sx={{ color: 'white', mb: 1, fontWeight: 700 }}>
              Cyberpunk Thriller
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 3 }}>
              {sessionState === 'watching' ? 'Now watching' : 'Paused'} with {participants.length} friends
            </Typography>
            <LinearProgress
              variant="determinate"
              value={(currentTime / duration) * 100}
              sx={{
                width: '300px',
                height: '6px',
                borderRadius: '3px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: 'var(--color-primary)',
                  borderRadius: '3px',
                }
              }}
            />
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mt: 1 }}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </Typography>
          </Box>
        );
      
      default:
        return null;
    }
  };

  return (
    <WatchPartyContainer>
      {/* Active Session Area */}
      <SessionArea>
        <DynamicVideoBackground 
          contentType="cyberpunk" 
          isPlaying={isPlaying}
        />
        
        {/* Floating Participants */}
        <FloatingParticipants>
          {participants.map((participant) => (
            <Tooltip 
              key={participant.id} 
              title={`${participant.name} ${participant.isActive ? '(Active)' : ''}`}
              arrow
            >
              <ParticipantAvatar
                src={participant.avatar}
                isActive={participant.isActive}
                isReacting={participant.isReacting}
              >
                {participant.name[0]}
              </ParticipantAvatar>
            </Tooltip>
          ))}
        </FloatingParticipants>

        {/* Video Player Area */}
        <VideoPlayerArea>
          {renderSessionContent()}
        </VideoPlayerArea>

        {/* Floating Controls */}
        <Collapse in={showControls}>
          <FloatingControls>
            <ControlButton
              isActive={isPlaying}
              onClick={handlePlayPause}
            >
              {isPlaying ? <Pause /> : <PlayArrow />}
            </ControlButton>

            <ControlButton onClick={() => setIsMuted(!isMuted)}>
              {isMuted ? <VolumeOff /> : <VolumeUp />}
            </ControlButton>

            <Box sx={{ width: 80 }}>
              <Slider
                size="small"
                value={volume}
                onChange={(_, value) => setVolume(value as number)}
                sx={{
                  color: 'var(--color-primary)',
                  '& .MuiSlider-thumb': {
                    backgroundColor: 'var(--color-primary)',
                  },
                }}
              />
            </Box>

            <ControlButton>
              <Subtitles />
            </ControlButton>

            <ControlButton>
              <Hd />
            </ControlButton>

            <ControlButton
              onClick={() => setSettingsAnchor(event?.currentTarget as HTMLElement)}
            >
              <Settings />
            </ControlButton>

            <ControlButton
              isActive={isFullscreen}
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
            </ControlButton>
          </FloatingControls>
        </Collapse>

        {/* Settings Menu */}
        <Menu
          anchorEl={settingsAnchor}
          open={Boolean(settingsAnchor)}
          onClose={() => setSettingsAnchor(null)}
          sx={{
            '& .MuiPaper-root': {
              background: 'var(--glass-background-strong)',
              backdropFilter: 'var(--glass-blur)',
              border: 'var(--glass-border)',
            }
          }}
        >
          <MenuItem>
            <Hd sx={{ mr: 1 }} />
            Quality: 1080p
          </MenuItem>
          <MenuItem>
            <Subtitles sx={{ mr: 1 }} />
            Subtitles: English
          </MenuItem>
          <MenuItem>
            <VideoCall sx={{ mr: 1 }} />
            Video Chat: Off
          </MenuItem>
        </Menu>

        {/* Reaction Overlay */}
        <ReactionOverlay>
          {reactions.map((reaction) => (
            <FloatingReaction
              key={reaction.id}
              x={reaction.x}
              y={reaction.y}
            >
              {reaction.emoji}
            </FloatingReaction>
          ))}
        </ReactionOverlay>
      </SessionArea>

      {/* Social Sidebar */}
      <SocialSidebar>
        {/* Chat Container */}
        <ChatContainer>
          <Box sx={{ 
            p: 2, 
            borderBottom: 'var(--glass-border)',
            background: 'var(--glass-background-subtle)'
          }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                Live Chat
              </Typography>
              <Stack direction="row" spacing={1}>
                <IconButton 
                  size="small" 
                  onClick={() => addReaction('❤️')}
                  sx={{ color: 'var(--color-primary)' }}
                >
                  <Favorite />
                </IconButton>
                <IconButton 
                  size="small" 
                  onClick={() => addReaction('👍')}
                  sx={{ color: 'var(--color-primary)' }}
                >
                  <ThumbUp />
                </IconButton>
                <IconButton 
                  size="small" 
                  onClick={() => addReaction('😂')}
                  sx={{ color: 'var(--color-primary)' }}
                >
                  <EmojiEmotions />
                </IconButton>
              </Stack>
            </Stack>
          </Box>

          <ChatMessages>
            {messages.map((msg) => (
              <MessageCluster key={msg.id} isOwn={msg.isOwn}>
                {!msg.isOwn && (
                  <Avatar src={msg.avatar} sx={{ width: 32, height: 32 }} />
                )}
                <Box>
                  {!msg.isOwn && (
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: 'var(--color-text-secondary)', 
                        mb: 0.5, 
                        display: 'block',
                        fontWeight: 500
                      }}
                    >
                      {msg.user}
                    </Typography>
                  )}
                  <MessageBubble isOwn={msg.isOwn}>
                    {msg.message}
                  </MessageBubble>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: 'var(--color-text-secondary)', 
                      mt: 0.5, 
                      display: 'block',
                      textAlign: msg.isOwn ? 'right' : 'left'
                    }}
                  >
                    {msg.time}
                  </Typography>
                </Box>
              </MessageCluster>
            ))}
          </ChatMessages>

          <Box sx={{ p: 2, borderTop: 'var(--glass-border)' }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <TextField
                fullWidth
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    background: 'var(--glass-background-subtle)',
                    borderRadius: '20px',
                    '& fieldset': {
                      borderColor: 'var(--glass-border)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'var(--color-primary)',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'var(--color-text-primary)',
                  },
                }}
              />
              <IconButton 
                onClick={handleSendMessage}
                sx={{ 
                  background: 'var(--gradient-brand)',
                  color: 'white',
                  '&:hover': {
                    background: 'var(--gradient-brand-hover)',
                  }
                }}
              >
                <Send />
              </IconButton>
            </Stack>
          </Box>
        </ChatContainer>

        {/* Quick Invite */}
        <QuickInviteContainer>
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
            Invite Friends
          </Typography>
          <Stack spacing={1.5}>
            {suggestedFriends.map((friend) => (
              <Box
                key={friend.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 1.5,
                  background: 'var(--glass-background-subtle)',
                  borderRadius: 'calc(var(--grid-base) * 1)',
                  transition: 'all var(--animation-medium) var(--ease-out-expo)',
                  '&:hover': {
                    background: 'var(--glass-background)',
                  }
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Avatar src={friend.avatar} sx={{ width: 36, height: 36 }} />
                  <Box>
                    <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                      {friend.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'var(--color-text-secondary)' }}>
                      {friend.mutual} mutual friends
                    </Typography>
                  </Box>
                </Stack>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => inviteFriend(friend.id)}
                  sx={{
                    background: 'var(--gradient-brand)',
                    minWidth: 'auto',
                    px: 2,
                    '&:hover': {
                      background: 'var(--gradient-brand-hover)',
                    }
                  }}
                >
                  Invite
                </Button>
              </Box>
            ))}
          </Stack>
        </QuickInviteContainer>
      </SocialSidebar>

      {/* Room Discovery Section */}
      <RoomDiscoveryArea ref={discoveryRef}>
        <Typography variant="h5" sx={{ color: 'white', fontWeight: 700, mb: 3 }}>
          Discover Watch Parties
        </Typography>
        
        <Stack spacing={2}>
          <Typography variant="h6" sx={{ color: 'var(--color-primary)', fontWeight: 600 }}>
            Trending Now
          </Typography>
          
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: 2,
            opacity: discoveryInView ? 1 : 0,
            transform: discoveryInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 1s var(--ease-out-expo)',
          }}>
            {trendingRooms.map((room) => (
              <RoomCard key={room.id} isPrivate={room.isPrivate}>
                <Box sx={{ position: 'relative', mb: 2 }}>
                  <img 
                    src={room.thumbnail} 
                    alt={room.title}
                    style={{ 
                      width: '100%', 
                      height: '120px', 
                      objectFit: 'cover', 
                      borderRadius: 'calc(var(--grid-base) * 1)' 
                    }}
                  />
                  <Box sx={{ 
                    position: 'absolute', 
                    top: 8, 
                    right: 8,
                    display: 'flex',
                    gap: 1
                  }}>
                    {room.isPrivate ? (
                      <Chip 
                        icon={<Lock />} 
                        label="Private" 
                        size="small"
                        sx={{ 
                          background: 'var(--color-secondary)',
                          color: 'white',
                          fontSize: '0.75rem'
                        }}
                      />
                    ) : (
                      <Chip 
                        icon={<Public />} 
                        label="Public" 
                        size="small"
                        sx={{ 
                          background: 'var(--color-primary)',
                          color: 'white',
                          fontSize: '0.75rem'
                        }}
                      />
                    )}
                  </Box>
                  <Box sx={{ 
                    position: 'absolute', 
                    bottom: 8, 
                    left: 8,
                    background: 'rgba(0, 0, 0, 0.7)',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5
                  }}>
                    <Group sx={{ fontSize: '14px', color: 'white' }} />
                    <Typography variant="caption" sx={{ color: 'white' }}>
                      {room.participants}
                    </Typography>
                  </Box>
                </Box>
                
                <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                  {room.title}
                </Typography>
                
                <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)', mb: 1 }}>
                  Host: {room.host}
                </Typography>
                
                <Typography variant="body2" sx={{ color: 'var(--color-primary)', mb: 2 }}>
                  {room.activity}
                </Typography>
                
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => joinRoom(room.id)}
                  sx={{
                    background: room.isPrivate ? 'var(--color-secondary)' : 'var(--gradient-brand)',
                    '&:hover': {
                      background: room.isPrivate ? 'var(--color-secondary-dark)' : 'var(--gradient-brand-hover)',
                    }
                  }}
                >
                  {room.isPrivate ? 'Request to Join' : 'Join Now'}
                </Button>
              </RoomCard>
            ))}
          </Box>
        </Stack>
      </RoomDiscoveryArea>
    </WatchPartyContainer>
  );
};

export default AsymmetricWatchPartySection;
