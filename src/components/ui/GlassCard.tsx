import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';

const GlassCard = styled(Paper)({
  background: 'rgba(26, 26, 46, 0.3)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '12px',
  boxShadow: '0 8px 32px rgba(0, 255, 255, 0.1)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(0, 255, 255, 0.2)',
    border: '1px solid rgba(0, 255, 255, 0.3)'
  }
});

export default GlassCard;