import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';

const GlassCard = styled(Paper)({
  background: 'var(--glass-background)',
  backdropFilter: 'var(--glass-blur)',
  border: 'var(--glass-border)',
  borderRadius: '12px',
  boxShadow: 'var(--glass-shadow)',
  transition: 'all var(--animation-medium) ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: 'var(--glass-hover-shadow)',
    border: 'var(--glass-hover-border)'
  }
});

export default GlassCard;