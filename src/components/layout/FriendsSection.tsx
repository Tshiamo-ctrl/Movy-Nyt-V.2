import React from 'react';
import { Box, Typography, TextField, Avatar, Stack, Chip, Badge } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MessageIcon from '@mui/icons-material/Message';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import GlowButton from '../ui/GlowButton';
import GlassCard from '../ui/GlassCard';

const FriendsContainer = styled(Box)(({ theme }) => ({
  padding: '80px 20px',
  background: `radial-gradient(ellipse at top, rgba(26, 26, 46, 0.6) 0%, ${theme.palette.background.default} 70%)`,
  minHeight: '100vh'
}));

const SearchBar = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    background: 'rgba(26, 26, 46, 0.5)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.2)'
    },
    '&:hover fieldset': {
      borderColor: 'rgba(0, 255, 255, 0.5)'
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 20px rgba(0, 255, 255, 0.3)`
    }
  }
}));

const FriendCard = styled(GlassCard)({
  padding: '20px',
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 40px rgba(0, 255, 255, 0.15)'
  }
});

const OnlineBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.main,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""'
    }
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0
    }
  }
}));

const FriendsSection: React.FC = () => {
  const friends = [
    { id: 1, name: 'Alex Johnson', avatar: 'https://i.pravatar.cc/150?img=1', online: true, mutualFriends: 12, lastSeen: 'Online' },
    { id: 2, name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?img=2', online: true, mutualFriends: 8, lastSeen: 'Online' },
    { id: 3, name: 'Mike Rodriguez', avatar: 'https://i.pravatar.cc/150?img=3', online: false, mutualFriends: 15, lastSeen: '2 hours ago' },
    { id: 4, name: 'Emma Wilson', avatar: 'https://i.pravatar.cc/150?img=4', online: true, mutualFriends: 6, lastSeen: 'Online' },
    { id: 5, name: 'David Kim', avatar: 'https://i.pravatar.cc/150?img=5', online: false, mutualFriends: 10, lastSeen: '1 day ago' },
    { id: 6, name: 'Lisa Thompson', avatar: 'https://i.pravatar.cc/150?img=6', online: true, mutualFriends: 9, lastSeen: 'Online' }
  ];

  const friendRequests = [
    { id: 7, name: 'James Brown', avatar: 'https://i.pravatar.cc/150?img=7', mutualFriends: 3 },
    { id: 8, name: 'Anna Davis', avatar: 'https://i.pravatar.cc/150?img=8', mutualFriends: 7 }
  ];

  return (
    <FriendsContainer>
      <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
        {/* Header */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="center" sx={{ mb: 4 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              background: 'linear-gradient(135deg, #ffffff, #b8b8b8)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              flex: 1
            }}
          >
            Friends & Connections
          </Typography>
          
          <GlowButton variant="primary" startIcon={<PersonAddIcon />}>
            Add Friends
          </GlowButton>
        </Stack>

        {/* Search Bar */}
        <SearchBar
          fullWidth
          placeholder="Search friends..."
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
          }}
          sx={{ mb: 4 }}
        />

        {/* Friend Requests */}
        {friendRequests.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h3" sx={{ mb: 2, color: 'text.primary' }}>
              Friend Requests ({friendRequests.length})
            </Typography>
            <Stack spacing={2}>
              {friendRequests.map((request) => (
                <FriendCard key={request.id}>
                  <Avatar src={request.avatar} sx={{ width: 50, height: 50 }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ color: 'text.primary' }}>
                      {request.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {request.mutualFriends} mutual friends
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1}>
                    <GlowButton variant="primary" size="small">Accept</GlowButton>
                    <GlowButton variant="outline" size="small">Decline</GlowButton>
                  </Stack>
                </FriendCard>
              ))}
            </Stack>
          </Box>
        )}

        {/* Online Friends */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ mb: 2, color: 'text.primary' }}>
            Online Now ({friends.filter(f => f.online).length})
          </Typography>
          <Stack spacing={2}>
            {friends.filter(f => f.online).map((friend) => (
              <FriendCard key={friend.id}>
                <OnlineBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                >
                  <Avatar src={friend.avatar} sx={{ width: 50, height: 50 }} />
                </OnlineBadge>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ color: 'text.primary' }}>
                    {friend.name}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip 
                      label="Online" 
                      size="small" 
                      sx={{ 
                        backgroundColor: 'success.main', 
                        color: 'background.default',
                        fontSize: '0.75rem'
                      }} 
                    />
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {friend.mutualFriends} mutual friends
                    </Typography>
                  </Stack>
                </Box>
                <Stack direction="row" spacing={1}>
                  <GlowButton variant="secondary" size="small" startIcon={<MessageIcon />}>
                    Message
                  </GlowButton>
                  <GlowButton variant="primary" size="small" startIcon={<PlayCircleIcon />}>
                    Watch
                  </GlowButton>
                </Stack>
              </FriendCard>
            ))}
          </Stack>
        </Box>

        {/* All Friends */}
        <Box>
          <Typography variant="h3" sx={{ mb: 2, color: 'text.primary' }}>
            All Friends ({friends.length})
          </Typography>
          <Stack spacing={2}>
            {friends.map((friend) => (
              <FriendCard key={friend.id}>
                {friend.online ? (
                  <OnlineBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                  >
                    <Avatar src={friend.avatar} sx={{ width: 50, height: 50 }} />
                  </OnlineBadge>
                ) : (
                  <Avatar src={friend.avatar} sx={{ width: 50, height: 50 }} />
                )}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ color: 'text.primary' }}>
                    {friend.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Last seen: {friend.lastSeen} • {friend.mutualFriends} mutual friends
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1}>
                  <GlowButton variant="outline" size="small" startIcon={<MessageIcon />}>
                    Message
                  </GlowButton>
                  {friend.online && (
                    <GlowButton variant="primary" size="small" startIcon={<PlayCircleIcon />}>
                      Invite
                    </GlowButton>
                  )}
                </Stack>
              </FriendCard>
            ))}
          </Stack>
        </Box>
      </Box>
    </FriendsContainer>
  );
};

export default FriendsSection;