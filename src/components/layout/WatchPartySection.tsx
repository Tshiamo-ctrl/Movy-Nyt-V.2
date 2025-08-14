import React, { useState } from 'react';
import { Box, Typography, Avatar, TextField, IconButton, Stack, Chip, Badge } from '@mui/material';
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import GlassCard from '../ui/GlassCard';
import GlowButton from '../ui/GlowButton';

const WatchPartyContainer = styled(Box)(({ theme }) => ({
  height: '100vh',
  background: theme.palette.background.default,
  display: 'flex',
  overflow: 'hidden'
}));

const VideoSection = styled(Box)({
  flex: '0 0 70%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative'
});

const ChatSection = styled(GlassCard)({
  flex: '0 0 30%',
  margin: 0,
  borderRadius: 0,
  background: 'rgba(26, 26, 46, 0.8)',
  backdropFilter: 'blur(20px)',
  display: 'flex',
  flexDirection: 'column',
  borderLeft: '1px solid rgba(255, 255, 255, 0.1)'
});

const VideoPlayer = styled(Box)({
  flex: 1,
  background: '#000',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: 'url("https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw0fHxtb3ZpZSUyMHRoZWF0ZXIlMjBjaW5lbWElMjBzY3JlZW5zJTIwZGFyayUyMGF0bW9zcGhlcmV8ZW58MHwwfHxibGFja3wxNzU1MTMxNDMzfDA&ixlib=rb-4.1.0&q=85")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.3)'
  }
});

const ControlBar = styled(Box)({
  background: 'rgba(10, 10, 15, 0.9)',
  backdropFilter: 'blur(20px)',
  padding: '16px 24px',
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)'
});

const ChatHeader = styled(Box)({
  padding: '20px',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  background: 'rgba(0, 255, 255, 0.05)'
});

const ChatMessages = styled(Box)({
  flex: 1,
  padding: '16px',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px'
});

const ChatInput = styled(Box)({
  padding: '16px',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  background: 'rgba(0, 0, 0, 0.2)'
});

const MessageBubble = styled(Box)<{ isOwn?: boolean }>(({ theme, isOwn }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '8px',
  flexDirection: isOwn ? 'row-reverse' : 'row',
  '& .message-content': {
    background: isOwn 
      ? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
      : 'rgba(255, 255, 255, 0.1)',
    color: isOwn ? theme.palette.background.default : theme.palette.text.primary,
    padding: '8px 12px',
    borderRadius: '12px',
    maxWidth: '70%',
    fontSize: '0.875rem'
  }
}));

const ParticipantChip = styled(Chip)(({ theme }) => ({
  background: 'rgba(0, 255, 255, 0.1)',
  color: theme.palette.primary.main,
  border: '1px solid rgba(0, 255, 255, 0.3)',
  '& .MuiAvatar-root': {
    width: 24,
    height: 24
  }
}));

const WatchPartySection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [message, setMessage] = useState('');

  const participants = [
    { id: 1, name: 'You', avatar: 'https://i.pravatar.cc/150?img=1', online: true },
    { id: 2, name: 'Sarah', avatar: 'https://i.pravatar.cc/150?img=2', online: true },
    { id: 3, name: 'Mike', avatar: 'https://i.pravatar.cc/150?img=3', online: true },
    { id: 4, name: 'Emma', avatar: 'https://i.pravatar.cc/150?img=4', online: true }
  ];

  const messages = [
    { id: 1, user: 'Sarah', avatar: 'https://i.pravatar.cc/150?img=2', message: 'This movie looks amazing! 🍿', time: '2:34 PM', isOwn: false },
    { id: 2, user: 'Mike', avatar: 'https://i.pravatar.cc/150?img=3', message: 'Ready when you are!', time: '2:35 PM', isOwn: false },
    { id: 3, user: 'You', avatar: 'https://i.pravatar.cc/150?img=1', message: 'Starting in 3... 2... 1...', time: '2:36 PM', isOwn: true },
    { id: 4, user: 'Emma', avatar: 'https://i.pravatar.cc/150?img=4', message: '❤️ Love this scene!', time: '2:45 PM', isOwn: false }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle message sending
      setMessage('');
    }
  };

  return (
    <WatchPartyContainer>
      <VideoSection>
        <VideoPlayer>
          <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
            <Typography variant="h3" sx={{ color: 'white', mb: 2 }}>
              Cyberpunk Thriller
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 4 }}>
              Now watching with {participants.length} friends
            </Typography>
            <GlowButton 
              variant="primary" 
              size="large"
              startIcon={isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? 'Pause' : 'Play'}
            </GlowButton>
          </Box>
        </VideoPlayer>

        <ControlBar>
          <IconButton 
            sx={{ color: 'primary.main' }}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          
          <Box sx={{ flex: 1, height: '4px', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '2px', position: 'relative' }}>
            <Box sx={{ width: '35%', height: '100%', background: 'linear-gradient(90deg, #00ffff, #4169e1)', borderRadius: '2px' }} />
          </Box>
          
          <Typography variant="body2" sx={{ color: 'text.secondary', minWidth: '80px' }}>
            45:32 / 2:15:00
          </Typography>
          
          <IconButton sx={{ color: 'text.secondary' }}>
            <VolumeUpIcon />
          </IconButton>
          
          <IconButton sx={{ color: 'text.secondary' }}>
            <FullscreenIcon />
          </IconButton>
        </ControlBar>
      </VideoSection>

      <ChatSection>
        <ChatHeader>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ color: 'text.primary' }}>
              Watch Party
            </Typography>
            <GlowButton variant="outline" size="small" startIcon={<PersonAddIcon />}>
              Invite
            </GlowButton>
          </Stack>
          
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {participants.map((participant) => (
              <ParticipantChip
                key={participant.id}
                avatar={
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                    sx={{
                      '& .MuiBadge-badge': {
                        backgroundColor: '#00ff88',
                        width: 8,
                        height: 8
                      }
                    }}
                  >
                    <Avatar src={participant.avatar} />
                  </Badge>
                }
                label={participant.name}
                size="small"
              />
            ))}
          </Stack>
        </ChatHeader>

        <ChatMessages>
          {messages.map((msg) => (
            <MessageBubble key={msg.id} isOwn={msg.isOwn}>
              {!msg.isOwn && (
                <Avatar src={msg.avatar} sx={{ width: 32, height: 32 }} />
              )}
              <Box>
                {!msg.isOwn && (
                  <Typography variant="caption" sx={{ color: 'text.secondary', mb: 0.5, display: 'block' }}>
                    {msg.user}
                  </Typography>
                )}
                <Box className="message-content">
                  {msg.message}
                </Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5, display: 'block', textAlign: msg.isOwn ? 'right' : 'left' }}>
                  {msg.time}
                </Typography>
              </Box>
            </MessageBubble>
          ))}
        </ChatMessages>

        <Box sx={{ px: 2, py: 1, display: 'flex', gap: 1, justifyContent: 'center' }}>
          <IconButton size="small" sx={{ color: 'primary.main' }}>
            <FavoriteIcon />
          </IconButton>
          <IconButton size="small" sx={{ color: 'primary.main' }}>
            <ThumbUpIcon />
          </IconButton>
        </Box>

        <ChatInput>
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
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '20px',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                  }
                }
              }}
            />
            <IconButton 
              onClick={handleSendMessage}
              sx={{ 
                color: 'primary.main',
                '&:hover': {
                  background: 'rgba(0, 255, 255, 0.1)'
                }
              }}
            >
              <SendIcon />
            </IconButton>
          </Stack>
        </ChatInput>
      </ChatSection>
    </WatchPartyContainer>
  );
};

export default WatchPartySection;