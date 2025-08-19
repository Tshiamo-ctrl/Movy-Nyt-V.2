import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Avatar, 
  Stack, 
  Chip, 
  Badge,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  AvatarGroup,
  Divider
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import {
  Search,
  PersonAdd,
  Message,
  PlayCircle,
  MoreVert,
  Block,
  Report,
  Settings,
  Favorite,
  Share,
  TrendingUp,
  Group,
  Star,
  Movie,
  Close,
  Check,
  AccessTime,
  ThumbUp,
  Visibility
} from '@mui/icons-material';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

// Keyframe animations
const cardReveal = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const activityPulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
`;

const slideInStagger = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const heartBeat = keyframes`
  0%, 100% { transform: scale(1); }
  25% { transform: scale(1.1); }
  50% { transform: scale(1.2); }
  75% { transform: scale(1.1); }
`;

// Main container with asymmetric layout
const FriendsContainer = styled(Box)(() => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, var(--color-background) 0%, var(--color-surface) 30%, var(--color-background) 70%)',
  padding: 'calc(var(--grid-base) * 4) var(--grid-margin-mobile)',
  
  '@media (min-width: var(--breakpoint-sm))': {
    padding: 'calc(var(--grid-base) * 6) var(--grid-margin-tablet)',
  },
  '@media (min-width: var(--breakpoint-lg))': {
    padding: 'calc(var(--grid-base) * 8) var(--grid-margin-desktop)',
  },
}));

const AsymmetricGrid = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  gridTemplateRows: 'auto auto auto auto',
  gap: 'calc(var(--grid-base) * 3)',
  maxWidth: '1600px',
  margin: '0 auto',
  gridTemplateAreas: `
    "header header header header header header search search search discovery discovery discovery"
    "connections connections connections connections connections connections connections discovery discovery discovery discovery discovery"
    "connections connections connections connections connections connections connections requests requests requests requests requests"
    "activity activity activity activity activity activity activity activity activity activity activity activity"
  `,
  
  '@media (max-width: var(--breakpoint-lg))': {
    gridTemplateColumns: 'repeat(8, 1fr)',
    gridTemplateAreas: `
      "header header header header search search search search"
      "connections connections connections connections discovery discovery discovery discovery"
      "connections connections connections connections requests requests requests requests"
      "activity activity activity activity activity activity activity activity"
    `,
  },
  
  '@media (max-width: var(--breakpoint-md))': {
    gridTemplateColumns: 'repeat(6, 1fr)',
    gridTemplateAreas: `
      "header header header search search search"
      "connections connections connections connections connections connections"
      "discovery discovery discovery requests requests requests"
      "activity activity activity activity activity activity"
    `,
  },
  
  '@media (max-width: var(--breakpoint-sm))': {
    gridTemplateColumns: '1fr',
    gridTemplateAreas: `
      "header"
      "search"
      "connections"
      "discovery"
      "requests"
      "activity"
    `,
    gap: 'calc(var(--grid-base) * 2)',
  },
}));

// Header section
const HeaderSection = styled(Box)(() => ({
  gridArea: 'header',
  animation: `${slideInStagger} 1s var(--ease-out-expo)`,
}));

const GradientTitle = styled(Typography)(() => ({
  background: 'var(--gradient-brand)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 700,
  letterSpacing: '-0.02em',
}));

// Search section
const SearchSection = styled(Box)(() => ({
  gridArea: 'search',
  animation: `${slideInStagger} 1s var(--ease-out-expo) 0.1s both`,
}));

const EnhancedSearchField = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    background: 'var(--glass-background)',
    backdropFilter: 'var(--glass-blur)',
    border: 'var(--glass-border)',
    borderRadius: 'calc(var(--grid-base) * 3)',
    fontSize: '1.125rem',
    transition: 'all var(--animation-medium) var(--ease-out-expo)',
    
    '&:hover': {
      border: 'var(--glass-hover-border)',
      boxShadow: 'var(--glass-hover-shadow)',
    },
    
    '&.Mui-focused': {
      border: 'var(--glass-active-border)',
      boxShadow: 'var(--glass-active-shadow)',
    },
    
    '& fieldset': {
      border: 'none',
    },
  },
  
  '& .MuiInputBase-input': {
    color: 'var(--color-text-primary)',
    '&::placeholder': {
      color: 'var(--color-text-secondary)',
      opacity: 0.7,
    },
  },
}));

// Friend connections main area
const ConnectionsArea = styled(Box)(() => ({
  gridArea: 'connections',
  animation: `${slideInStagger} 1s var(--ease-out-expo) 0.2s both`,
}));

const FriendConnectionsGrid = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: 'calc(var(--grid-base) * 3)',
  
  '@media (max-width: var(--breakpoint-lg))': {
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 'calc(var(--grid-base) * 2.5)',
  },
  
  '@media (max-width: var(--breakpoint-sm))': {
    gridTemplateColumns: '1fr',
    gap: 'calc(var(--grid-base) * 2)',
  },
}));

// Dynamic friend card with priority-based sizing
const FriendCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'priority' && prop !== 'isOnline'
})<{ priority?: number; isOnline?: boolean }>(({ priority = 5, isOnline }) => {
  const priorityScale = priority >= 8 ? 'var(--priority-scale-8)' : priority >= 6 ? 'var(--priority-scale-6)' : 'var(--priority-scale-5)';
  const cardHeight = priority >= 8 ? '300px' : priority >= 6 ? '250px' : '200px';
  
  return {
    background: isOnline ? 'var(--glass-background-strong)' : 'var(--glass-background)',
    backdropFilter: 'var(--glass-blur)',
    border: isOnline ? 'var(--glass-border-strong)' : 'var(--glass-border)',
    borderRadius: 'calc(var(--grid-base) * 2)',
    padding: 'calc(var(--grid-base) * 3)',
    minHeight: cardHeight,
    cursor: 'pointer',
    transition: 'all var(--animation-medium) var(--ease-out-expo)',
    animation: `${cardReveal} 0.8s var(--ease-out-expo)`,
    position: 'relative',
    overflow: 'hidden',
    marginBottom: 'calc(var(--grid-base) * 2)', // Prevent overlap
    
    // Mobile-first responsive sizing
    '@media (max-width: var(--breakpoint-sm))': {
      padding: 'calc(var(--grid-base) * 2)',
      minHeight: priority >= 8 ? '240px' : priority >= 6 ? '200px' : '160px',
      transform: 'none', // Remove scaling on mobile for better readability
      marginBottom: 'calc(var(--grid-base) * 1.5)',
    },
    
    // Tablet sizing
    '@media (min-width: var(--breakpoint-sm)) and (max-width: var(--breakpoint-lg))': {
      transform: `scale(${priorityScale})`,
      transformOrigin: 'center top',
    },
    
    // Desktop sizing
    '@media (min-width: var(--breakpoint-lg))': {
      transform: `scale(${priorityScale})`,
      transformOrigin: 'center top',
    },
    
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: priority >= 8 ? 'var(--gradient-overlay-hero)' : 'var(--gradient-overlay-feature)',
      opacity: 0,
      transition: 'opacity var(--animation-medium) var(--ease-out-expo)',
      pointerEvents: 'none',
    },
    
    '&:hover': {
      transform: `scale(calc(${priorityScale} * 1.02)) translateY(-4px)`,
      boxShadow: 'var(--glass-hover-shadow)',
      border: 'var(--glass-hover-border)',
      '&::before': {
        opacity: 1,
      },
    },
  };
});

const ActivityIndicator = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isActive'
})<{ isActive?: boolean }>(({ isActive }) => ({
  position: 'absolute',
  top: 'calc(var(--grid-base) * 2)',
  right: 'calc(var(--grid-base) * 2)',
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  background: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
  boxShadow: isActive ? '0 0 12px var(--color-primary)' : 'none',
  animation: isActive ? `${activityPulse} 2s ease-in-out infinite` : 'none',
  zIndex: 2,
}));

// Discovery section
const DiscoverySection = styled(Box)(() => ({
  gridArea: 'discovery',
  background: 'var(--glass-background)',
  backdropFilter: 'var(--glass-blur)',
  border: 'var(--glass-border)',
  borderRadius: 'calc(var(--grid-base) * 2)',
  padding: 'calc(var(--grid-base) * 3)',
  animation: `${slideInStagger} 1s var(--ease-out-expo) 0.3s both`,
}));

// Friend requests section
const RequestsSection = styled(Box)(() => ({
  gridArea: 'requests',
  background: 'var(--glass-background)',
  backdropFilter: 'var(--glass-blur)',
  border: 'var(--glass-border)',
  borderRadius: 'calc(var(--grid-base) * 2)',
  padding: 'calc(var(--grid-base) * 3)',
  animation: `${slideInStagger} 1s var(--ease-out-expo) 0.4s both`,
}));

// Activity feed section
const ActivityFeedSection = styled(Box)(() => ({
  gridArea: 'activity',
  background: 'var(--glass-background)',
  backdropFilter: 'var(--glass-blur)',
  border: 'var(--glass-border)',
  borderRadius: 'calc(var(--grid-base) * 2)',
  padding: 'calc(var(--grid-base) * 3)',
  animation: `${slideInStagger} 1s var(--ease-out-expo) 0.5s both`,
}));

const ActivityCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'importance'
})<{ importance?: 'high' | 'medium' | 'low' }>(({ importance = 'medium' }) => {
  const cardStyles = {
    high: {
      background: 'var(--glass-background-strong)',
      border: 'var(--glass-border-strong)',
      padding: 'calc(var(--grid-base) * 3)',
    },
    medium: {
      background: 'var(--glass-background)',
      border: 'var(--glass-border)',
      padding: 'calc(var(--grid-base) * 2.5)',
    },
    low: {
      background: 'var(--glass-background-subtle)',
      border: 'var(--glass-border)',
      padding: 'calc(var(--grid-base) * 2)',
    },
  };
  
  return {
    ...cardStyles[importance],
    borderRadius: 'calc(var(--grid-base) * 1.5)',
    marginBottom: 'calc(var(--grid-base) * 2)',
    transition: 'all var(--animation-medium) var(--ease-out-expo)',
    cursor: 'pointer',
    
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: 'var(--glass-hover-shadow)',
    },
  };
});

const SectionTitle = styled(Typography)(() => ({
  color: 'var(--color-text-primary)',
  fontWeight: 700,
  marginBottom: 'calc(var(--grid-base) * 2)',
  display: 'flex',
  alignItems: 'center',
  gap: 'calc(var(--grid-base) * 1)',
}));

const QuickActionButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'variant'
})<{ variant?: 'primary' | 'secondary' | 'success' }>(({ variant = 'primary' }) => {
  const variants = {
    primary: 'var(--gradient-brand)',
    secondary: 'var(--color-secondary)',
    success: 'var(--color-success)',
  };
  
  return {
    background: variants[variant],
    color: 'white',
    width: 40,
    height: 40,
    transition: 'all var(--animation-medium) var(--ease-out-expo)',
    
    '&:hover': {
      transform: 'scale(1.1)',
      boxShadow: `0 4px 16px ${variants[variant]}40`,
    },
  };
});

// Component interfaces
interface Friend {
  id: number;
  name: string;
  avatar: string;
  online: boolean;
  lastSeen: string;
  mutualFriends: number;
  sharedInterests: string[];
  recentActivity: string;
  watchingNow?: string;
  priority: number;
  relationship: 'close' | 'regular' | 'acquaintance';
}

interface FriendRequest {
  id: number;
  name: string;
  avatar: string;
  mutualFriends: number;
  sharedInterests: string[];
  mutualConnections: string[];
}

interface ActivityItem {
  id: string;
  type: 'watch_party' | 'recommendation' | 'achievement' | 'joined';
  user: string;
  avatar: string;
  content: string;
  timestamp: string;
  importance: 'high' | 'medium' | 'low';
  details?: Record<string, unknown>;
}

const AsymmetricFriendsSection: React.FC = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState('');

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  // Scroll animations
  const { elementRef: feedRef, isInView: feedInView } = useScrollAnimation({ threshold: 0.3 });

  // Sample data with enhanced information
  const [friends] = useState<Friend[]>([
    {
      id: 1,
      name: 'Alex Johnson',
      avatar: 'https://i.pravatar.cc/150?img=1',
      online: true,
      lastSeen: 'Online',
      mutualFriends: 12,
      sharedInterests: ['Action Movies', 'Sci-Fi', 'Documentaries'],
      recentActivity: 'Watched Spider-Man: Into the Spider-Verse',
      watchingNow: 'The Matrix Reloaded',
      priority: 9,
      relationship: 'close'
    },
    {
      id: 2,
      name: 'Sarah Chen',
      avatar: 'https://i.pravatar.cc/150?img=2',
      online: true,
      lastSeen: 'Online',
      mutualFriends: 8,
      sharedInterests: ['Comedy', 'Drama', 'K-Dramas'],
      recentActivity: 'Hosted watch party for "Parasite"',
      priority: 8,
      relationship: 'close'
    },
    {
      id: 3,
      name: 'Mike Rodriguez',
      avatar: 'https://i.pravatar.cc/150?img=3',
      online: false,
      lastSeen: '2 hours ago',
      mutualFriends: 15,
      sharedInterests: ['Horror', 'Thriller', 'True Crime'],
      recentActivity: 'Completed horror movie marathon',
      priority: 6,
      relationship: 'regular'
    },
    {
      id: 4,
      name: 'Emma Wilson',
      avatar: 'https://i.pravatar.cc/150?img=4',
      online: true,
      lastSeen: 'Online',
      mutualFriends: 6,
      sharedInterests: ['Animation', 'Family', 'Disney'],
      recentActivity: 'Added 5 movies to watchlist',
      priority: 7,
      relationship: 'regular'
    },
    {
      id: 5,
      name: 'David Kim',
      avatar: 'https://i.pravatar.cc/150?img=5',
      online: false,
      lastSeen: '1 day ago',
      mutualFriends: 10,
      sharedInterests: ['Sci-Fi', 'Action'],
      recentActivity: 'Joined the platform',
      priority: 4,
      relationship: 'acquaintance'
    },
    {
      id: 6,
      name: 'Lisa Thompson',
      avatar: 'https://i.pravatar.cc/150?img=6',
      online: true,
      lastSeen: 'Online',
      mutualFriends: 9,
      sharedInterests: ['Romance', 'Comedy', 'International'],
      recentActivity: 'Shared recommendation for "Amélie"',
      priority: 6,
      relationship: 'regular'
    }
  ]);

  const [friendRequests] = useState<FriendRequest[]>([
    {
      id: 7,
      name: 'James Brown',
      avatar: 'https://i.pravatar.cc/150?img=7',
      mutualFriends: 3,
      sharedInterests: ['Action', 'Adventure'],
      mutualConnections: ['Alex Johnson', 'Mike Rodriguez', 'David Kim']
    },
    {
      id: 8,
      name: 'Anna Davis',
      avatar: 'https://i.pravatar.cc/150?img=8',
      mutualFriends: 7,
      sharedInterests: ['Drama', 'Independent Films', 'Documentaries'],
      mutualConnections: ['Sarah Chen', 'Emma Wilson']
    }
  ]);

  const [suggestedFriends] = useState([
    {
      id: 9,
      name: 'Chris Martinez',
      avatar: 'https://i.pravatar.cc/150?img=9',
      mutualFriends: 5,
      sharedInterests: ['Horror', 'Thriller'],
      reason: 'Watches similar content'
    },
    {
      id: 10,
      name: 'Taylor Swift',
      avatar: 'https://i.pravatar.cc/150?img=10',
      mutualFriends: 2,
      sharedInterests: ['Music Documentaries', 'Concerts'],
      reason: 'In your network'
    }
  ]);

  const [activityFeed] = useState<ActivityItem[]>([
    {
      id: '1',
      type: 'watch_party',
      user: 'Sarah Chen',
      avatar: 'https://i.pravatar.cc/150?img=2',
      content: 'hosted a watch party for "Parasite" with 8 friends',
      timestamp: '2 hours ago',
      importance: 'high',
      details: { participants: 8, rating: 4.9 }
    },
    {
      id: '2',
      type: 'recommendation',
      user: 'Alex Johnson',
      avatar: 'https://i.pravatar.cc/150?img=1',
      content: 'recommended "Dune: Part Two" and rated it 5 stars',
      timestamp: '5 hours ago',
      importance: 'medium',
      details: { rating: 5, genre: 'Sci-Fi' }
    },
    {
      id: '3',
      type: 'achievement',
      user: 'Emma Wilson',
      avatar: 'https://i.pravatar.cc/150?img=4',
      content: 'completed the Disney Classics collection!',
      timestamp: '1 day ago',
      importance: 'medium',
      details: { collection: 'Disney Classics', count: 24 }
    },
    {
      id: '4',
      type: 'joined',
      user: 'Mike Rodriguez',
      avatar: 'https://i.pravatar.cc/150?img=3',
      content: 'joined your Horror Movie Marathon group',
      timestamp: '2 days ago',
      importance: 'low'
    }
  ]);

  const handleFriendAction = (action: string, friendId: number) => {
    console.log(`${action} action for friend ${friendId}`);
    // Implement friend actions (invite, message, etc.)
  };

  const handleRequestAction = (action: 'accept' | 'decline', requestId: number) => {
    console.log(`${action} friend request ${requestId}`);
    // Implement request handling
  };

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'watch_party':
        return <Group sx={{ color: 'var(--color-primary)' }} />;
      case 'recommendation':
        return <Star sx={{ color: 'var(--color-primary)' }} />;
      case 'achievement':
        return <TrendingUp sx={{ color: 'var(--color-success)' }} />;
      case 'joined':
        return <PersonAdd sx={{ color: 'var(--color-secondary)' }} />;
      default:
        return <Movie sx={{ color: 'var(--color-text-secondary)' }} />;
    }
  };

  return (
    <FriendsContainer>
      <AsymmetricGrid>
        {/* Header Section */}
        <HeaderSection>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <GradientTitle variant="h2">
              Friends & Social Discovery
            </GradientTitle>
            <Button
              variant="contained"
              startIcon={<PersonAdd />}
              sx={{
                background: 'var(--gradient-brand)',
                color: 'white',
                borderRadius: 'calc(var(--grid-base) * 2)',
                padding: 'calc(var(--grid-base) * 1.5) calc(var(--grid-base) * 3)',
                fontWeight: 600,
                '&:hover': {
                  background: 'var(--gradient-brand-hover)',
                  transform: 'scale(1.05)',
                }
              }}
            >
              Add Friends
            </Button>
          </Stack>
        </HeaderSection>

        {/* Search Section */}
        <SearchSection>
          <EnhancedSearchField
            fullWidth
            placeholder="Search friends, discover connections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ color: 'var(--color-primary)', mr: 1 }} />,
            }}
          />
        </SearchSection>

        {/* Friend Connections Main Area */}
        <ConnectionsArea>
          <SectionTitle variant="h4">
            <Group sx={{ color: 'var(--color-primary)' }} />
            Your Connections ({friends.length})
          </SectionTitle>
          
          <FriendConnectionsGrid>
            {friends.map((friend) => (
              <FriendCard
                key={friend.id}
                priority={friend.priority}
                isOnline={friend.online}
                onMouseEnter={() => setHoveredCard(friend.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <ActivityIndicator isActive={friend.online} />
                
                {/* Friend Avatar and Status */}
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2, position: 'relative', zIndex: 2 }}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      friend.online ? (
                        <Box sx={{ 
                          width: 12, 
                          height: 12, 
                          backgroundColor: 'var(--color-success)', 
                          borderRadius: '50%',
                          border: '2px solid var(--color-background)' 
                        }} />
                      ) : null
                    }
                  >
                    <Avatar 
                      src={friend.avatar} 
                      sx={{ 
                        width: friend.priority >= 8 ? 70 : 60, 
                        height: friend.priority >= 8 ? 70 : 60,
                        border: friend.relationship === 'close' ? '3px solid var(--color-primary)' : '2px solid rgba(255, 255, 255, 0.2)'
                      }} 
                    />
                  </Badge>
                  
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 0.5 }}>
                      {friend.name}
                      {friend.relationship === 'close' && (
                        <Favorite 
                          sx={{ 
                            ml: 1, 
                            fontSize: '16px', 
                            color: 'var(--color-primary)',
                            animation: hoveredCard === friend.id ? `${heartBeat} 0.6s ease-in-out` : 'none'
                          }} 
                        />
                      )}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)' }}>
                      {friend.online ? 'Online now' : friend.lastSeen}
                    </Typography>
                  </Box>
                  
                  <IconButton
                    size="small"
                    onClick={(e) => setMenuAnchor(e.currentTarget)}
                    sx={{ color: 'var(--color-text-secondary)' }}
                  >
                    <MoreVert />
                  </IconButton>
                </Stack>

                {/* Current Activity */}
                {friend.watchingNow && (
                  <Box sx={{ 
                    background: 'var(--glass-background-subtle)', 
                    borderRadius: 'calc(var(--grid-base) * 1)', 
                    padding: 'calc(var(--grid-base) * 1.5)', 
                    mb: 2,
                    position: 'relative',
                    zIndex: 2
                  }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Movie sx={{ color: 'var(--color-primary)', fontSize: '16px' }} />
                      <Typography variant="caption" sx={{ color: 'var(--color-text-primary)' }}>
                        Watching: {friend.watchingNow}
                      </Typography>
                    </Stack>
                  </Box>
                )}

                {/* Shared Interests */}
                <Stack direction="row" flexWrap="wrap" gap={0.5} sx={{ mb: 2, position: 'relative', zIndex: 2 }}>
                  {friend.sharedInterests.slice(0, 3).map((interest) => (
                    <Chip
                      key={interest}
                      label={interest}
                      size="small"
                      sx={{
                        backgroundColor: 'var(--glass-background-subtle)',
                        color: 'var(--color-text-primary)',
                        fontSize: '0.75rem',
                        height: '24px',
                      }}
                    />
                  ))}
                </Stack>

                {/* Recent Activity */}
                <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)', mb: 2, position: 'relative', zIndex: 2 }}>
                  {friend.recentActivity}
                </Typography>

                {/* Quick Actions */}
                <Stack direction="row" spacing={1} sx={{ position: 'relative', zIndex: 2 }}>
                  <QuickActionButton
                    variant="primary"
                    onClick={() => handleFriendAction('message', friend.id)}
                  >
                    <Message />
                  </QuickActionButton>
                  
                  {friend.online && (
                    <QuickActionButton
                      variant="success"
                      onClick={() => handleFriendAction('invite', friend.id)}
                    >
                      <PlayCircle />
                    </QuickActionButton>
                  )}
                  
                  <QuickActionButton
                    variant="secondary"
                    onClick={() => handleFriendAction('share', friend.id)}
                  >
                    <Share />
                  </QuickActionButton>
                </Stack>

                {/* Mutual Friends Indicator */}
                <Box sx={{ 
                  position: 'absolute', 
                  bottom: 'calc(var(--grid-base) * 1)', 
                  right: 'calc(var(--grid-base) * 1)',
                  zIndex: 2
                }}>
                  <Tooltip title={`${friend.mutualFriends} mutual friends`}>
                    <Chip
                      size="small"
                      label={`+${friend.mutualFriends}`}
                      sx={{
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                        fontSize: '0.75rem',
                        height: '20px',
                      }}
                    />
                  </Tooltip>
                </Box>
              </FriendCard>
            ))}
          </FriendConnectionsGrid>
        </ConnectionsArea>

        {/* Friend Discovery Section */}
        <DiscoverySection>
          <SectionTitle variant="h5">
            <TrendingUp sx={{ color: 'var(--color-primary)' }} />
            Discover Friends
          </SectionTitle>
          
          <Stack spacing={2}>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, fontSize: '1rem' }}>
              Suggested Connections
            </Typography>
            
            {suggestedFriends.map((suggestion) => (
              <Box
                key={suggestion.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 2,
                  background: 'var(--glass-background-subtle)',
                  borderRadius: 'calc(var(--grid-base) * 1)',
                  transition: 'all var(--animation-medium) var(--ease-out-expo)',
                  '&:hover': {
                    background: 'var(--glass-background)',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                <Avatar src={suggestion.avatar} sx={{ width: 40, height: 40 }} />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                    {suggestion.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'var(--color-text-secondary)' }}>
                    {suggestion.reason} • {suggestion.mutualFriends} mutual friends
                  </Typography>
                </Box>
                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    background: 'var(--gradient-brand)',
                    minWidth: 'auto',
                    px: 2,
                    '&:hover': {
                      background: 'var(--gradient-brand-hover)',
                    }
                  }}
                >
                  Add
                </Button>
              </Box>
            ))}
          </Stack>
        </DiscoverySection>

        {/* Friend Requests Section */}
        <RequestsSection>
          <SectionTitle variant="h5">
            <PersonAdd sx={{ color: 'var(--color-primary)' }} />
            Friend Requests ({friendRequests.length})
          </SectionTitle>
          
          <Stack spacing={2}>
            {friendRequests.map((request) => (
              <Box
                key={request.id}
                sx={{
                  p: 2,
                  background: 'var(--glass-background-subtle)',
                  borderRadius: 'calc(var(--grid-base) * 1)',
                  border: '1px solid var(--color-primary)',
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                  <Avatar src={request.avatar} sx={{ width: 48, height: 48 }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
                      {request.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'var(--color-text-secondary)' }}>
                      {request.mutualFriends} mutual friends
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" flexWrap="wrap" gap={0.5} sx={{ mb: 2 }}>
                  {request.sharedInterests.slice(0, 2).map((interest) => (
                    <Chip
                      key={interest}
                      label={interest}
                      size="small"
                      sx={{
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                        fontSize: '0.75rem',
                      }}
                    />
                  ))}
                </Stack>

                <AvatarGroup max={3} sx={{ mb: 2 }}>
                  {request.mutualConnections.slice(0, 3).map((connection, index) => (
                    <Avatar 
                      key={connection} 
                      src={`https://i.pravatar.cc/150?img=${index + 11}`}
                      sx={{ width: 24, height: 24 }}
                    />
                  ))}
                </AvatarGroup>

                <Stack direction="row" spacing={1}>
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<Check />}
                    onClick={() => handleRequestAction('accept', request.id)}
                    sx={{
                      background: 'var(--color-success)',
                      '&:hover': {
                        background: 'var(--color-success-dark)',
                      }
                    }}
                  >
                    Accept
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<Close />}
                    onClick={() => handleRequestAction('decline', request.id)}
                    sx={{
                      borderColor: 'var(--color-text-secondary)',
                      color: 'var(--color-text-secondary)',
                      '&:hover': {
                        borderColor: 'var(--color-error)',
                        color: 'var(--color-error)',
                      }
                    }}
                  >
                    Decline
                  </Button>
                </Stack>
              </Box>
            ))}
          </Stack>
        </RequestsSection>

        {/* Activity Feed Section */}
        <ActivityFeedSection ref={feedRef}>
          <SectionTitle variant="h5">
            <AccessTime sx={{ color: 'var(--color-primary)' }} />
            Friend Activity
          </SectionTitle>
          
          <Box sx={{
            opacity: feedInView ? 1 : 0,
            transform: feedInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 1s var(--ease-out-expo)',
          }}>
            {activityFeed.map((activity, index) => (
              <ActivityCard 
                key={activity.id} 
                importance={activity.importance}
                sx={{
                  animation: `${cardReveal} 0.6s var(--ease-out-expo) ${index * 0.1}s both`,
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar src={activity.avatar} sx={{ width: 40, height: 40 }} />
                  <Box sx={{ flex: 1 }}>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                      {getActivityIcon(activity.type)}
                      <Typography variant="body2" sx={{ color: 'white' }}>
                        <strong>{activity.user}</strong> {activity.content}
                      </Typography>
                    </Stack>
                    <Typography variant="caption" sx={{ color: 'var(--color-text-secondary)' }}>
                      {activity.timestamp}
                    </Typography>
                  </Box>
                  
                  {activity.importance === 'high' && (
                    <IconButton size="small" sx={{ color: 'var(--color-primary)' }}>
                      <ThumbUp />
                    </IconButton>
                  )}
                </Stack>
              </ActivityCard>
            ))}
          </Box>
        </ActivityFeedSection>
      </AsymmetricGrid>

      {/* Context Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
        sx={{
          '& .MuiPaper-root': {
            background: 'var(--glass-background-strong)',
            backdropFilter: 'var(--glass-blur)',
            border: 'var(--glass-border)',
          }
        }}
      >
        <MenuItem onClick={() => setMenuAnchor(null)}>
          <Visibility sx={{ mr: 1 }} />
          View Profile
        </MenuItem>
        <MenuItem onClick={() => setMenuAnchor(null)}>
          <Settings sx={{ mr: 1 }} />
          Privacy Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => setMenuAnchor(null)}>
          <Block sx={{ mr: 1 }} />
          Block User
        </MenuItem>
        <MenuItem onClick={() => setMenuAnchor(null)}>
          <Report sx={{ mr: 1 }} />
          Report User
        </MenuItem>
      </Menu>
    </FriendsContainer>
  );
};

export default AsymmetricFriendsSection;