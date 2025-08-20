import React from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  Stack, 
  Chip, 
  Badge,
  IconButton,
  Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  Message, 
  PlayCircle, 
  MoreVert,
  PersonAdd,
  Check,
  Close
} from '@mui/icons-material';


// Types
export interface FriendCardProps {
  id: number;
  name: string;
  avatar: string;
  online?: boolean;
  lastSeen?: string;
  mutualFriends?: number;
  recentActivity?: string;
  type?: 'friend' | 'request' | 'suggestion';
  actions?: {
    onMessage?: () => void;
    onInvite?: () => void;
    onAccept?: () => void;
    onDecline?: () => void;
    onAdd?: () => void;
    onMore?: () => void;
  };
  sharedInterests?: string[];
  className?: string;
}

// Styled components
const CardContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  background: 'var(--glass-background)',
  backdropFilter: 'var(--glass-blur)',
  border: 'var(--glass-border)',
  borderRadius: 'calc(var(--grid-base) * 2)',
  padding: 'calc(var(--grid-base) * 2.5)',
  transition: 'all var(--animation-medium) var(--ease-out-expo)',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  minHeight: '160px',
  
  '&:hover': {
    transform: 'translateY(-4px)',
    border: 'var(--glass-hover-border)',
    boxShadow: 'var(--glass-hover-shadow)',
    
    '& .friend-avatar': {
      transform: 'scale(1.05)',
    },
    
    '& .friend-name': {
      color: 'var(--color-primary)',
    },
    
    '& .action-buttons': {
      opacity: 1,
      transform: 'translateY(0)',
    }
  },
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'var(--gradient-overlay-feature)',
    opacity: 0,
    transition: 'opacity var(--animation-medium) var(--ease-out-expo)',
    pointerEvents: 'none',
    zIndex: 0,
  },
  
  '&:hover::before': {
    opacity: 0.3,
  },
  
  '& > *': {
    position: 'relative',
    zIndex: 1,
  }
}));

const OnlineBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: 'var(--color-success)',
    color: 'var(--color-success)',
    boxShadow: `0 0 0 2px ${theme.palette.background.default}`,
    width: 14,
    height: 14,
    borderRadius: '50%',
    
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

const FriendAvatar = styled(Avatar)(() => ({
  width: 60,
  height: 60,
  transition: 'transform var(--animation-medium) var(--ease-out-expo)',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
}));

const FriendInfo = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: 'calc(var(--grid-base) * 0.5)',
  minHeight: 0, // Important for text truncation
}));

const FriendName = styled(Typography)(() => ({
  color: 'var(--color-text-primary)',
  fontWeight: 600,
  fontSize: '1.1rem',
  lineHeight: 1.2,
  transition: 'color var(--animation-medium) var(--ease-out-expo)',
}));

const FriendDetails = styled(Typography)(() => ({
  color: 'var(--color-text-secondary)',
  fontSize: '0.875rem',
  lineHeight: 1.3,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
}));

const StatusChip = styled(Chip)<{ isOnline?: boolean }>(({ isOnline }) => ({
  fontSize: '0.75rem',
  height: 20,
  backgroundColor: isOnline ? 'var(--color-success)' : 'var(--color-surface)',
  color: isOnline ? 'var(--color-background)' : 'var(--color-text-secondary)',
  '& .MuiChip-label': {
    padding: '0 8px',
    fontWeight: 500,
  }
}));

const InterestChip = styled(Chip)(() => ({
  fontSize: '0.7rem',
  height: 18,
  backgroundColor: 'rgba(0, 255, 255, 0.1)',
  color: 'var(--color-primary)',
  border: '1px solid rgba(0, 255, 255, 0.2)',
  '& .MuiChip-label': {
    padding: '0 6px',
  }
}));

const ActionButtons = styled(Stack)(() => ({
  opacity: 0,
  transform: 'translateY(8px)',
  transition: 'all var(--animation-medium) var(--ease-out-expo)',
}));

const ActionButton = styled(IconButton)<{ variant?: 'primary' | 'secondary' | 'success' | 'error' }>(({ variant = 'primary' }) => {
  const variants: Record<string, { background: string; color: string; shadow: string }> = {
    primary: {
      background: 'var(--gradient-brand)',
      color: 'white',
      shadow: '0 2px 8px rgba(0, 255, 255, 0.3)',
    },
    secondary: {
      background: 'var(--color-secondary)',
      color: 'white',
      shadow: '0 2px 8px rgba(65, 105, 225, 0.3)',
    },
    success: {
      background: 'var(--color-success)',
      color: 'white',
      shadow: '0 2px 8px rgba(0, 255, 136, 0.3)',
    },
    error: {
      background: 'var(--color-error)',
      color: 'white',
      shadow: '0 2px 8px rgba(244, 67, 54, 0.3)',
    },
  };
  
  return {
    width: 32,
    height: 32,
    background: variants[variant].background,
    color: variants[variant].color,
    boxShadow: variants[variant].shadow,
    transition: 'all var(--animation-fast) var(--ease-out-expo)',
    
    '&:hover': {
      transform: 'scale(1.1)',
      boxShadow: `0 4px 16px ${variants[variant].shadow}`,
    },
  };
});


const FriendCard: React.FC<FriendCardProps> = ({
  name,
  avatar,
  online = false,
  lastSeen,
  mutualFriends,
  recentActivity,
  type = 'friend',
  actions = {},
  sharedInterests = [],
  className,
}) => {
  const {
    onMessage,
    onInvite,
    onAccept,
    onDecline,
    onAdd,
    onMore,
  } = actions;

  const renderActionButtons = () => {
    switch (type) {
      case 'request':
        return (
          <Stack direction="row" spacing={1} className="action-buttons">
            {onAccept && (
              <Button 
                size="small"
                variant="contained"
                startIcon={<Check />} 
                onClick={onAccept}
                sx={{
                  background: 'var(--color-success)',
                  minWidth: 'auto',
                  px: 1.5,
                  py: 0.5,
                  fontSize: '0.75rem',
                  '&:hover': {
                    background: 'var(--color-success-dark)',
                  }
                }}
              >
                Accept
              </Button>
            )}
            {onDecline && (
              <Button
                size="small"
                variant="outlined"
                startIcon={<Close />}
                onClick={onDecline}
                sx={{
                  minWidth: 'auto',
                  px: 1.5,
                  py: 0.5,
                  fontSize: '0.75rem',
                  borderColor: 'var(--color-text-secondary)',
                  color: 'var(--color-text-secondary)',
                  '&:hover': {
                    borderColor: 'var(--color-error)',
                    color: 'var(--color-error)',
                    background: 'rgba(244, 67, 54, 0.1)',
                  }
                }}
              >
                Decline
              </Button>
            )}
          </Stack>
        );
      
      case 'suggestion':
        return (
          <Stack direction="row" spacing={1} className="action-buttons">
            {onAdd && (
              <Button
                size="small"
                variant="contained"
                startIcon={<PersonAdd />}
                onClick={onAdd}
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
                Add Friend
              </Button>
            )}
          </Stack>
        );
      
      default:
        return (
          <ActionButtons direction="row" spacing={0.5} className="action-buttons">
            {onMessage && (
              <ActionButton variant="secondary" onClick={onMessage} size="small">
                <Message fontSize="small" />
              </ActionButton>
            )}
            {onInvite && online && (
              <ActionButton variant="primary" onClick={onInvite} size="small">
                <PlayCircle fontSize="small" />
              </ActionButton>
            )}
            {onMore && (
              <ActionButton variant="secondary" onClick={onMore} size="small">
                <MoreVert fontSize="small" />
              </ActionButton>
            )}
          </ActionButtons>
        );
    }
  };

  return (
    <CardContainer className={className}>
      {/* Header with Avatar and Status */}
      <Stack direction="row" spacing={2} sx={{ mb: 1.5 }}>
        {online ? (
          <OnlineBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <FriendAvatar src={avatar} className="friend-avatar" />
          </OnlineBadge>
        ) : (
          <FriendAvatar src={avatar} className="friend-avatar" />
        )}
        
        <FriendInfo>
          <FriendName className="friend-name">
            {name}
          </FriendName>
          
          <Stack direction="row" spacing={1} alignItems="center">
            <StatusChip
              label={online ? 'Online' : lastSeen || 'Offline'}
              size="small"
              isOnline={online}
            />
            {mutualFriends && (
              <FriendDetails>
                {mutualFriends} mutual
              </FriendDetails>
            )}
          </Stack>
        </FriendInfo>
      </Stack>
      
      {/* Activity or Description */}
      {recentActivity && (
        <FriendDetails sx={{ mb: 1 }}>
          {recentActivity}
        </FriendDetails>
      )}
      
      {/* Shared Interests */}
      {sharedInterests.length > 0 && (
        <Stack direction="row" spacing={0.5} sx={{ mb: 1.5, flexWrap: 'wrap', gap: 0.5 }}>
          {sharedInterests.slice(0, 2).map((interest) => (
            <InterestChip
              key={interest}
              label={interest}
              size="small"
            />
          ))}
        </Stack>
      )}
      
      {/* Action Buttons */}
      {renderActionButtons()}
    </CardContainer>
  );
};

export default FriendCard;
