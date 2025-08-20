import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Stack, 
  Button,
  Avatar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Search,
  PersonAdd,
  Group,
  TrendingUp,
  AccessTime,
  Star,
  Movie,
} from '@mui/icons-material';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import FriendCard from '../ui/FriendCard';

// Main container with optimized layout
const FriendsContainer = styled(Box)(() => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, var(--color-background) 0%, var(--color-surface) 30%, var(--color-background) 70%)',
  padding: 'calc(var(--grid-base) * 3) var(--grid-margin-mobile)',
  
  '@media (min-width: var(--breakpoint-sm))': {
    padding: 'calc(var(--grid-base) * 4) var(--grid-margin-tablet)',
  },
  '@media (min-width: var(--breakpoint-lg))': {
    padding: 'calc(var(--grid-base) * 5) var(--grid-margin-desktop)',
  },
}));

const OptimizedGrid = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
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
    gap: 'calc(var(--grid-base) * 2.5)',
    gridTemplateAreas: `
      "header header header header search search search search"
      "connections connections connections connections discovery discovery discovery discovery"
      "connections connections connections connections requests requests requests requests"
      "activity activity activity activity activity activity activity activity"
    `,
  },
  
  '@media (max-width: var(--breakpoint-md))': {
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 'calc(var(--grid-base) * 2)',
    gridTemplateAreas: `
      "header header search search"
      "connections connections connections connections"
      "discovery discovery requests requests"
      "activity activity activity activity"
    `,
  },
  
  '@media (max-width: var(--breakpoint-sm))': {
    gridTemplateColumns: '1fr',
    gap: 'calc(var(--grid-base) * 2)',
    gridTemplateAreas: `
      "header"
      "search"
      "connections"
      "discovery"
      "requests"
      "activity"
    `,
    '&.mobile-single-column': {
      display: 'flex',
      flexDirection: 'column',
      gap: 'calc(var(--grid-base) * 3)',
    }
  },
}));

// Header section
const HeaderSection = styled(Box)(() => ({
  gridArea: 'header',
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
}));

const EnhancedSearchField = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    background: 'var(--glass-background)',
    backdropFilter: 'var(--glass-blur)',
    border: 'var(--glass-border)',
    borderRadius: 'calc(var(--grid-base) * 3)',
    fontSize: '1rem',
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
}));

const FriendConnectionsGrid = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
  gap: 'calc(var(--grid-base) * 2)',
  
  '@media (max-width: var(--breakpoint-lg))': {
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  },
  
  '@media (max-width: var(--breakpoint-md))': {
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 'calc(var(--grid-base) * 1.5)',
  },
  
  '@media (max-width: var(--breakpoint-sm))': {
    gridTemplateColumns: '1fr',
    gap: 'calc(var(--grid-base) * 2)',
  },
}));

// Discovery and requests sections
const SideSection = styled(Box)(() => ({
  background: 'var(--glass-background)',
  backdropFilter: 'var(--glass-blur)',
  border: 'var(--glass-border)',
  borderRadius: 'calc(var(--grid-base) * 2)',
  padding: 'calc(var(--grid-base) * 3)',
}));

const DiscoverySection = styled(SideSection)(() => ({
  gridArea: 'discovery',
}));

const RequestsSection = styled(SideSection)(() => ({
  gridArea: 'requests',
}));

// Activity feed section
const ActivityFeedSection = styled(SideSection)(() => ({
  gridArea: 'activity',
}));

const SectionTitle = styled(Typography)(() => ({
  color: 'var(--color-text-primary)',
  fontWeight: 700,
  marginBottom: 'calc(var(--grid-base) * 2)',
  display: 'flex',
  alignItems: 'center',
  gap: 'calc(var(--grid-base) * 1)',
  fontSize: '1.25rem',
  
  '@media (max-width: var(--breakpoint-sm))': {
    fontSize: '1.125rem',
    marginBottom: 'calc(var(--grid-base) * 1.5)',
  },
}));

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

const OptimizedFriendsSection: React.FC = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  
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
      <OptimizedGrid>
        {/* Header Section */}
        <HeaderSection>
          <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={2}>
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
                id={friend.id}
                name={friend.name}
                avatar={friend.avatar}
                online={friend.online}
                lastSeen={friend.lastSeen}
                mutualFriends={friend.mutualFriends}
                recentActivity={friend.recentActivity}
                sharedInterests={friend.sharedInterests}
                type="friend"
                actions={{
                  onMessage: () => handleFriendAction('message', friend.id),
                  onInvite: () => handleFriendAction('invite', friend.id),
                  onMore: () => handleFriendAction('more', friend.id),
                }}
              />
            ))}
          </FriendConnectionsGrid>
        </ConnectionsArea>

        {/* Friend Discovery Section */}
        <DiscoverySection>
          <SectionTitle variant="h5">
            <TrendingUp sx={{ color: 'var(--color-primary)' }} />
            Discover Friends
          </SectionTitle>
          
          <Stack spacing={1.5}>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, fontSize: '1rem', mb: 1 }}>
              Suggested Connections
            </Typography>
            
            {suggestedFriends.slice(0, 2).map((suggestion) => (
              <Box
                key={suggestion.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  p: 1.5,
                  background: 'var(--glass-background-subtle)',
                  borderRadius: 'calc(var(--grid-base) * 1.5)',
                  transition: 'all var(--animation-medium) var(--ease-out-expo)',
                  '&:hover': {
                    background: 'var(--glass-background)',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                <Avatar src={suggestion.avatar} sx={{ width: 36, height: 36 }} />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body2" sx={{ color: 'white', fontWeight: 600, fontSize: '0.875rem' }}>
                    {suggestion.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem' }}>
                    {suggestion.reason} • {suggestion.mutualFriends} mutual
                  </Typography>
                </Box>
                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    background: 'var(--gradient-brand)',
                    minWidth: 'auto',
                    px: 1.5,
                    py: 0.5,
                    fontSize: '0.75rem',
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
          
          <Stack spacing={1.5}>
            {friendRequests.map((request) => (
              <FriendCard
                key={request.id}
                id={request.id}
                name={request.name}
                avatar={request.avatar}
                mutualFriends={request.mutualFriends}
                sharedInterests={request.sharedInterests}
                type="request"
                actions={{
                  onAccept: () => handleRequestAction('accept', request.id),
                  onDecline: () => handleRequestAction('decline', request.id),
                }}
              />
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
            <Stack spacing={1.5}>
              {activityFeed.map((activity) => (
                <Box
                  key={activity.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    p: 1.5,
                    background: 'var(--glass-background-subtle)',
                    borderRadius: 'calc(var(--grid-base) * 1.5)',
                    border: activity.importance === 'high' ? '1px solid var(--color-primary)' : 'var(--glass-border)',
                    transition: 'all var(--animation-medium) var(--ease-out-expo)',
                    '&:hover': {
                      background: 'var(--glass-background)',
                      transform: 'translateY(-2px)',
                    }
                  }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <Avatar src={activity.avatar} sx={{ width: 36, height: 36 }} />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -2,
                        right: -2,
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        background: activity.importance === 'high' ? 'var(--color-primary)' : 
                                   activity.importance === 'medium' ? 'var(--color-secondary)' : 
                                   'var(--color-text-secondary)',
                      }}
                    />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" sx={{ color: 'white', fontWeight: 600, fontSize: '0.875rem' }}>
                      {activity.user}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: 'var(--color-text-secondary)', 
                        fontSize: '0.75rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {activity.content}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'var(--color-text-secondary)', fontSize: '0.7rem' }}>
                      {activity.timestamp}
                    </Typography>
                  </Box>
                  {getActivityIcon(activity.type)}
                </Box>
              ))}
            </Stack>
          </Box>
        </ActivityFeedSection>
      </OptimizedGrid>
    </FriendsContainer>
  );
};

export default OptimizedFriendsSection;
