import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, TextField, Chip, Stack, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GlowButton from '../ui/GlowButton';
import GlassCard from '../ui/GlassCard';

const CatalogContainer = styled(Box)(({ theme }) => ({
  padding: '80px 20px',
  background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, #1a1a2e 50%, ${theme.palette.background.default} 100%)`,
  minHeight: '100vh'
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary.main,
    height: '3px',
    borderRadius: '3px'
  },
  '& .MuiTab-root': {
    color: theme.palette.text.secondary,
    fontWeight: 500,
    fontSize: '1rem',
    textTransform: 'none',
    '&.Mui-selected': {
      color: theme.palette.primary.main
    }
  }
}));

const VideoCard = styled(GlassCard)({
  overflow: 'hidden',
  position: 'relative',
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 20px 60px rgba(0, 255, 255, 0.2)'
  }
});

const VideoThumbnail = styled(Box)({
  position: 'relative',
  paddingTop: '56.25%', // 16:9 aspect ratio
  overflow: 'hidden',
  '& img': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease-in-out'
  },
  '&:hover img': {
    transform: 'scale(1.1)'
  }
});

const PlayOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0, 0, 0, 0.6)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0,
  transition: 'opacity 0.3s ease-in-out',
  '&:hover': {
    opacity: 1
  }
});

const PlatformBadge = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: '12px',
  right: '12px',
  background: 'rgba(0, 0, 0, 0.8)',
  color: theme.palette.text.primary,
  fontSize: '0.75rem',
  height: '24px'
}));

const CatalogSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const videos = [
    {
      id: 1,
      title: 'Cyberpunk Thriller',
      thumbnail: 'https://images.unsplash.com/photo-1617957742236-1b5a6b15182c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHxtb3ZpZSUyMHBvc3RlciUyMGFjdGlvbiUyMHRocmlsbGVyfGVufDB8MXx8fDE3NTUxMzE0MzN8MA&ixlib=rb-4.1.0&q=85',
      alt: 'Cyberpunk thriller poster by roman raizen on Unsplash',
      platform: 'Netflix',
      genre: 'Action',
      rating: 4.5,
      duration: '2h 15m',
      year: 2024
    },
    {
      id: 2,
      title: 'Space Odyssey',
      thumbnail: 'https://images.unsplash.com/photo-1660210550351-a49554365b2a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHxtb3ZpZSUyMHBvc3RlciUyMHNjaS1maSUyMHNwYWNlJTIwZnV0dXJpc3RpY3xlbnwwfDF8fGJsdWV8MTc1NTEzMTQzM3ww&ixlib=rb-4.1.0&q=85',
      alt: 'Space odyssey poster by Paolo Resteghini on Unsplash',
      platform: 'Disney+',
      genre: 'Sci-Fi',
      rating: 4.8,
      duration: '2h 45m',
      year: 2024
    },
    {
      id: 3,
      title: 'Dark Conspiracy',
      thumbnail: 'https://images.unsplash.com/photo-1553940470-748c34b6eea3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw2fHxtb3ZpZSUyMHBvc3RlciUyMGFjdGlvbiUyMHRocmlsbGVyfGVufDB8MXx8fDE3NTUxMzE0MzN8MA&ixlib=rb-4.1.0&q=85',
      alt: 'Dark conspiracy poster by Benjamin Sow on Unsplash',
      platform: 'HBO Max',
      genre: 'Thriller',
      rating: 4.2,
      duration: '1h 58m',
      year: 2023
    },
    {
      id: 4,
      title: 'Future Vision',
      thumbnail: 'https://images.unsplash.com/photo-1617244792573-36042d79659d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHxtb3ZpZSUyMHBvc3RlciUyMHNjaS1maSUyMHNwYWNlJTIwZnV0dXJpc3RpY3xlbnwwfDF8fGJsdWV8MTc1NTEzMTQzM3ww&ixlib=rb-4.1.0&q=85',
      alt: 'Future vision poster by Tiago Catulo on Unsplash',
      platform: 'Prime Video',
      genre: 'Sci-Fi',
      rating: 4.6,
      duration: '2h 22m',
      year: 2024
    },
    {
      id: 5,
      title: 'Neon Nights',
      thumbnail: 'https://images.unsplash.com/photo-1565668506160-fd6253f4a04e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw0fHxtb3ZpZSUyMHBvc3RlciUyMGFjdGlvbiUyMHRocmlsbGVyfGVufDB8MXx8fDE3NTUxMzE0MzN8MA&ixlib=rb-4.1.0&q=85',
      alt: 'Neon nights poster by id23 on Unsplash',
      platform: 'Netflix',
      genre: 'Action',
      rating: 4.3,
      duration: '1h 47m',
      year: 2023
    },
    {
      id: 6,
      title: 'Quantum Reality',
      thumbnail: 'https://images.unsplash.com/photo-1541185933-c43f4922c6f7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw2fHxtb3ZpZSUyMHBvc3RlciUyMHNjaS1maSUyMHNwYWNlJTIwZnV0dXJpc3RpY3xlbnwwfDF8fGJsdWV8MTc1NTEzMTQzM3ww&ixlib=rb-4.1.0&q=85',
      alt: 'Quantum reality poster by SpaceX on Unsplash',
      platform: 'Apple TV+',
      genre: 'Sci-Fi',
      rating: 4.7,
      duration: '2h 8m',
      year: 2024
    }
  ];

  const tabs = ['My Services', 'Shared Libraries', 'YouTube', 'Public Videos'];
  const allFilters = ['Action', 'Sci-Fi', 'Thriller', '2024', '2023', 'Netflix', 'Disney+', 'HBO Max'];

  const handleFilterToggle = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.platform.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilters = selectedFilters.length === 0 || 
                          selectedFilters.some(filter => 
                            video.genre === filter || 
                            video.platform === filter || 
                            video.year.toString() === filter
                          );
    
    return matchesSearch && matchesFilters;
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setLoading(true);
    // Simulate search delay
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <CatalogContainer>
      <Box sx={{ maxWidth: '1400px', mx: 'auto' }}>
        {/* Header */}
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{ 
            textAlign: 'center',
            mb: 2,
            background: 'linear-gradient(135deg, #ffffff, #b8b8b8)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Content Catalog
        </Typography>
        
        <Typography 
          variant="body1" 
          sx={{ 
            textAlign: 'center', 
            mb: 4, 
            color: 'text.secondary',
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
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 4 }}>
          <TextField
            placeholder="Search movies, shows, videos..."
            value={searchQuery}
            onChange={handleSearch}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
            }}
            sx={{
              flex: 1,
              '& .MuiOutlinedInput-root': {
                background: 'rgba(26, 26, 46, 0.5)',
                backdropFilter: 'blur(10px)',
                borderRadius: '8px'
              }
            }}
          />
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {allFilters.map((filter) => (
              <Chip 
                key={filter}
                label={filter} 
                variant={selectedFilters.includes(filter) ? "filled" : "outlined"}
                clickable
                onClick={() => handleFilterToggle(filter)}
                sx={{ 
                  borderColor: 'primary.main',
                  color: selectedFilters.includes(filter) ? 'background.default' : 'primary.main',
                  backgroundColor: selectedFilters.includes(filter) ? 'primary.main' : 'transparent',
                  '&:hover': {
                    backgroundColor: selectedFilters.includes(filter) ? 'primary.light' : 'rgba(0, 255, 255, 0.1)'
                  }
                }}
              />
            ))}
          </Stack>
        </Stack>

        {/* Results count */}
        {searchQuery && (
          <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
            {loading ? 'Searching...' : `Found ${filteredVideos.length} results for "${searchQuery}"`}
          </Typography>
        )}

        {/* Video Grid */}
        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)'
            },
            gap: 3,
            opacity: loading ? 0.5 : 1,
            transition: 'opacity 0.3s ease-in-out'
          }}
        >
          {filteredVideos.map((video, index) => (
            <VideoCard 
              key={video.id}
              sx={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                '@keyframes fadeInUp': {
                  '0%': {
                    opacity: 0,
                    transform: 'translateY(30px)'
                  },
                  '100%': {
                    opacity: 1,
                    transform: 'translateY(0)'
                  }
                }
              }}
            >
              <VideoThumbnail>
                <img src={video.thumbnail} alt={video.alt} />
                <PlatformBadge label={video.platform} />
                <PlayOverlay>
                  <GlowButton variant="primary" startIcon={<PlayCircleIcon />}>
                    Watch Together
                  </GlowButton>
                </PlayOverlay>
              </VideoThumbnail>
              
              <Box sx={{ p: 2 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: 'text.primary',
                    mb: 1,
                    fontWeight: 600
                  }}
                >
                  {video.title}
                </Typography>
                
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                  <Rating 
                    value={video.rating} 
                    precision={0.1} 
                    size="small" 
                    readOnly
                    sx={{ color: 'warning.main' }}
                  />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {video.rating}
                  </Typography>
                </Stack>
                
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Chip 
                    label={video.genre} 
                    size="small"
                    sx={{ 
                      backgroundColor: 'rgba(0, 255, 255, 0.1)',
                      color: 'primary.main',
                      fontSize: '0.75rem'
                    }}
                  />
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <AccessTimeIcon sx={{ fontSize: '0.875rem', color: 'text.secondary' }} />
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {video.duration}
                    </Typography>
                  </Stack>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {video.year}
                  </Typography>
                </Stack>
              </Box>
            </VideoCard>
          ))}
        </Box>
      </Box>
    </CatalogContainer>
  );
};

export default CatalogSection;