import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Stack, Chip, InputAdornment, Tab, Tabs } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ContentCard from '../ui/ContentCard';
import ContentGrid from '../ui/ContentGrid';

const WatchContainer = styled(Box)(() => ({
  minHeight: '100vh',
  padding: 'calc(var(--grid-base) * 4) 0',
  background: `linear-gradient(135deg, var(--color-background) 0%, var(--color-surface) 50%, var(--color-background) 100%)`,
}));

const StyledTabs = styled(Tabs)({
  '& .MuiTabs-indicator': {
    backgroundColor: 'var(--color-primary)',
    height: 3,
  },
  '& .MuiTab-root': {
    color: 'var(--color-text-secondary)',
    '&.Mui-selected': {
      color: 'var(--color-primary)',
    },
  },
});

const WatchSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<any[]>([]);

  const tabs = ['All Content', 'Movies', 'TV Shows', 'Documentaries', 'My List'];
  const allFilters = ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror', 'Family', 'Trending', 'New Releases'];

  // Simulate content loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setContent([
        {
          id: '1',
          title: 'Cosmic Odyssey',
          image: 'https://images.unsplash.com/photo-1596727147705-61a532a659bd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMG1vdmllJTIwcG9zdGVyfGVufDB8MHx8fDE3NTUxMzE0MzN8MA&ixlib=rb-4.1.0&q=85',
          description: 'A journey through the cosmos that challenges our understanding of time and space.',
          size: 'hero',
          priority: 10,
        },
        {
          id: '2',
          title: 'Neon Nights',
          image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxuZW9uJTIwY2l0eSUyMG5pZ2h0fGVufDB8MHx8fDE3NTUxMzE0MzN8MA&ixlib=rb-4.1.0&q=85',
          description: 'In a dystopian future, a detective uncovers a conspiracy that threatens the city.',
          size: 'feature',
          priority: 8,
        },
        {
          id: '3',
          title: 'Ocean Depths',
          image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMGRlZXB8ZW58MHwwfHx8MTc1NTEzMTQzM3ww&ixlib=rb-4.1.0&q=85',
          description: 'A documentary exploring the mysterious creatures of the deep sea.',
          size: 'standard',
          priority: 6,
        },
        {
          id: '4',
          title: 'Mountain Peak',
          image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHBlYWt8ZW58MHwwfHx8MTc1NTEzMTQzM3ww&ixlib=rb-4.1.0&q=85',
          description: 'The harrowing tale of survival against the elements on the world\'s highest peaks.',
          size: 'standard',
          priority: 5,
        },
        {
          id: '5',
          title: 'Desert Mirage',
          image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBtaXJhZ2V8ZW58MHwwfHx8MTc1NTEzMTQzM3ww&ixlib=rb-4.1.0&q=85',
          description: 'A psychological thriller set in the unforgiving desert landscape.',
          size: 'compact',
          priority: 4,
        },
        {
          id: '6',
          title: 'Urban Jungle',
          image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGp1bmdsZXxlbnwwfDB8fHwxNzU1MTMxNDMzfDA&ixlib=rb-4.1.0&q=85',
          description: 'A coming-of-age story about finding one\'s place in the concrete jungle.',
          size: 'compact',
          priority: 3,
        },
        {
          id: '7',
          title: 'Temporal Shift',
          image: 'https://images.unsplash.com/photo-1501700493788-fa1a4fc9fe62?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHx0aW1lJTIwY2xvY2t8ZW58MHwwfHx8MTc1NTEzMTQzM3ww&ixlib=rb-4.1.0&q=85',
          description: 'A scientist discovers a way to manipulate time, with unforeseen consequences.',
          size: 'feature',
          priority: 7,
        },
        {
          id: '8',
          title: 'Forgotten Realms',
          image: 'https://images.unsplash.com/photo-1518709414768-a88981a4515d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwbGFuZHNjYXBlfGVufDB8MHx8fDE3NTUxMzE0MzN8MA&ixlib=rb-4.1.0&q=85',
          description: 'An epic fantasy adventure in a world of magic and mythical creatures.',
          size: 'wide',
          priority: 9,
        },
      ]);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleFilterToggle = (filter: string) => {
    setSelectedFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
    setLoading(true);
    // Simulate filter delay
    setTimeout(() => setLoading(false), 800);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setLoading(true);
    // Simulate search delay
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <WatchContainer>
      <Box sx={{ maxWidth: '1400px', mx: 'auto' }}>
        {/* Header */}
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{ 
            textAlign: 'center',
            mb: 2,
            background: 'var(--gradient-brand)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Watch
        </Typography>
        
        <Typography 
          variant="body1" 
          sx={{ 
            textAlign: 'center', 
            mb: 4, 
            color: 'var(--color-text-secondary)',
            maxWidth: '600px',
            mx: 'auto'
          }}
        >
          Discover and share content from all your favorite streaming platforms in one place.
        </Typography>

        {/* Navigation Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <StyledTabs 
            value={activeTab} 
            onChange={(_, newValue) => setActiveTab(newValue)}
            centered
          >
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab} />
            ))}
          </StyledTabs>
        </Box>

        {/* Search and Filters */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 4, px: { xs: 2, md: 0 } }}>
          <TextField
            placeholder="Search movies, shows, videos..."
            value={searchQuery}
            onChange={handleSearch}
            InputProps={{
              startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: 'text.secondary' }} /></InputAdornment>
            }}
            sx={{
              flex: 1,
              '& .MuiOutlinedInput-root': {
                background: 'var(--glass-background)',
                backdropFilter: 'var(--glass-blur)',
                borderRadius: '8px'
              }
            }}
          />
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}>
            {allFilters.map((filter) => (
              <Chip 
                key={filter}
                label={filter} 
                variant={selectedFilters.includes(filter) ? "filled" : "outlined"}
                clickable
                onClick={() => handleFilterToggle(filter)}
                sx={{ 
                  borderColor: 'var(--color-primary)',
                  color: selectedFilters.includes(filter) ? 'var(--color-background)' : 'var(--color-primary)',
                  backgroundColor: selectedFilters.includes(filter) ? 'var(--color-primary)' : 'transparent',
                  '&:hover': {
                    backgroundColor: selectedFilters.includes(filter) ? 'var(--color-primary-light)' : 'rgba(0, 255, 255, 0.1)'
                  }
                }}
              />
            ))}
          </Stack>
        </Stack>

        {/* Results count */}
        {searchQuery && (
          <Typography 
            variant="body2" 
            sx={{ mb: 2, px: { xs: 2, md: 0 } }}
          >
            Showing results for "{searchQuery}"
          </Typography>
        )}

        {/* Content Grid */}
        <Box sx={{ px: { xs: 2, md: 0 } }}>
          <ContentGrid 
            spacing={3} 
            overlap={true} 
            asymmetric={true}
          >
          {loading ? (
            // Loading skeletons
            Array.from(new Array(8)).map((_, index) => (
              <ContentCard
                key={`loading-${index}`}
                id={`loading-${index}`}
                title=""
                image=""
                loading={true}
                size={index === 0 ? 'hero' : index < 3 ? 'feature' : index === 7 ? 'wide' : 'standard'}
                priority={5}
              />
            ))
          ) : (
            // Actual content
            content.map((item) => (
              <ContentCard
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                description={item.description}
                size={item.size}
                priority={item.priority}
                onClick={() => console.log(`Clicked on ${item.title}`)}
              />
            ))
          )}
          </ContentGrid>
        </Box>
      </Box>
    </WatchContainer>
  );
};

export default WatchSection;