import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  IconButton, 
  Chip, 
  InputAdornment,
  Fade
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Search,
  Clear,
  TrendingUp,
  History,
  Star
} from '@mui/icons-material';

const SearchContainer = styled(Box)(() => ({
  width: '100%',
  maxWidth: '800px',
  margin: '0 auto',
  padding: 'calc(var(--grid-base) * 3) var(--grid-margin-mobile)',
  
  '@media (min-width: var(--breakpoint-sm))': {
    padding: 'calc(var(--grid-base) * 4) var(--grid-margin-tablet)',
  },
  '@media (min-width: var(--breakpoint-lg))': {
    padding: 'calc(var(--grid-base) * 5) var(--grid-margin-desktop)',
  },
}));

const SearchField = styled(TextField)(() => ({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    background: 'var(--glass-background)',
    backdropFilter: 'var(--glass-blur)',
    border: 'var(--glass-border)',
    borderRadius: 'calc(var(--grid-base) * 3)',
    fontSize: '1.125rem',
    padding: 'calc(var(--grid-base) * 0.5)',
    transition: 'all var(--animation-medium) var(--ease-out-expo)',
    boxShadow: 'var(--glass-shadow)',
    
    '&:hover': {
      border: 'var(--glass-hover-border)',
      boxShadow: 'var(--glass-hover-shadow)',
      transform: 'translateY(-2px)',
    },
    
    '&.Mui-focused': {
      border: 'var(--glass-active-border)',
      boxShadow: 'var(--glass-active-shadow)',
      transform: 'translateY(-2px)',
    },
    
    '& fieldset': {
      border: 'none',
    },
  },
  
  '& .MuiInputBase-input': {
    color: 'var(--color-text-primary)',
    padding: 'calc(var(--grid-base) * 1.5) calc(var(--grid-base) * 1)',
    '&::placeholder': {
      color: 'var(--color-text-secondary)',
      opacity: 0.7,
    },
  },
}));

const SearchSuggestions = styled(Box)(() => ({
  marginTop: 'calc(var(--grid-base) * 2)',
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'calc(var(--grid-base) * 1)',
  justifyContent: 'center',
  
  '@media (max-width: var(--breakpoint-sm))': {
    gap: 'calc(var(--grid-base) * 0.75)',
  },
}));

const SuggestionChip = styled(Chip)(() => ({
  background: 'var(--glass-background-subtle)',
  backdropFilter: 'var(--glass-blur-subtle)',
  border: 'var(--glass-border)',
  color: 'var(--color-text-secondary)',
  cursor: 'pointer',
  transition: 'all var(--animation-fast) var(--ease-out-expo)',
  
  '&:hover': {
    background: 'var(--glass-background)',
    border: 'var(--glass-hover-border)',
    color: 'var(--color-text-primary)',
    transform: 'translateY(-1px)',
  },
  
  '& .MuiChip-icon': {
    color: 'var(--color-primary)',
  },
}));

const SearchStats = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'calc(var(--grid-base) * 2)',
  marginTop: 'calc(var(--grid-base) * 2)',
  opacity: 0.7,
  
  '@media (max-width: var(--breakpoint-sm))': {
    flexDirection: 'column',
    gap: 'calc(var(--grid-base) * 1)',
  },
}));

const StatItem = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 'calc(var(--grid-base) * 0.5)',
  color: 'var(--color-text-secondary)',
  fontSize: '0.875rem',
}));

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Search movies, shows, and documentaries..." 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch?.(searchQuery.trim());
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    onSearch?.(suggestion);
  };

  const suggestions = [
    { text: 'Action Movies', icon: <TrendingUp /> },
    { text: 'Sci-Fi Series', icon: <Star /> },
    { text: 'Recent Releases', icon: <History /> },
    { text: 'Top Rated', icon: <Star /> },
  ];

  return (
    <SearchContainer>
      <SearchField
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setShowSuggestions(e.target.value.length > 0);
        }}
        onKeyPress={handleKeyPress}
        onFocus={() => setShowSuggestions(true)}
        placeholder={placeholder}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search sx={{ color: 'var(--color-primary)' }} />
            </InputAdornment>
          ),
          endAdornment: searchQuery && (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClear}
                size="small"
                sx={{ color: 'var(--color-text-secondary)' }}
              >
                <Clear />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Fade in={showSuggestions}>
        <SearchSuggestions>
          {suggestions.map((suggestion, index) => (
            <SuggestionChip
              key={index}
              label={suggestion.text}
              icon={suggestion.icon}
              onClick={() => handleSuggestionClick(suggestion.text)}
              size="small"
            />
          ))}
        </SearchSuggestions>
      </Fade>

      <SearchStats>
        <StatItem>
          <TrendingUp fontSize="small" />
          <span>Trending Now</span>
        </StatItem>
        <StatItem>
          <Star fontSize="small" />
          <span>Top Rated</span>
        </StatItem>
        <StatItem>
          <History fontSize="small" />
          <span>Recently Added</span>
        </StatItem>
      </SearchStats>
    </SearchContainer>
  );
};

export default SearchBar;
