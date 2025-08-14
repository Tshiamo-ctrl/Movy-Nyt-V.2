import { styled } from '@mui/material/styles';
import { Button, ButtonProps } from '@mui/material';
import { ReactNode, forwardRef } from 'react';

interface GlowButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: ReactNode;
}

const StyledButton = styled(Button)<{ glowVariant?: 'primary' | 'secondary' | 'outline' }>(({ theme, glowVariant = 'primary' }) => {
  const getVariantStyles = () => {
    switch (glowVariant) {
      case 'primary':
        return {
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          color: theme.palette.primary.contrastText,
          boxShadow: `0 4px 20px rgba(0, 255, 255, 0.4)`,
          '&:hover': {
            background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
            boxShadow: `0 6px 30px rgba(0, 255, 255, 0.6)`,
            transform: 'translateY(-2px) scale(1.02)'
          }
        };
      case 'secondary':
        return {
          background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
          color: theme.palette.text.primary,
          boxShadow: `0 4px 20px rgba(65, 105, 225, 0.4)`,
          '&:hover': {
            background: `linear-gradient(135deg, ${theme.palette.secondary.light}, ${theme.palette.primary.light})`,
            boxShadow: `0 6px 30px rgba(65, 105, 225, 0.6)`,
            transform: 'translateY(-2px) scale(1.02)'
          }
        };
      case 'outline':
        return {
          background: 'transparent',
          border: `2px solid ${theme.palette.primary.main}`,
          color: theme.palette.primary.main,
          boxShadow: `0 0 20px rgba(0, 255, 255, 0.3)`,
          '&:hover': {
            background: `rgba(0, 255, 255, 0.1)`,
            boxShadow: `0 0 30px rgba(0, 255, 255, 0.5)`,
            transform: 'translateY(-2px) scale(1.02)'
          }
        };
      default:
        return {};
    }
  };

  return {
    borderRadius: '8px',
    padding: '12px 32px',
    fontSize: '1rem',
    fontWeight: 600,
    textTransform: 'none',
    transition: 'all 0.3s ease-in-out',
    position: 'relative',
    overflow: 'hidden',
    ...getVariantStyles(),
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
      transition: 'left 0.5s ease-in-out'
    },
    '&:hover::before': {
      left: '100%'
    }
  };
});

const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ variant, children, ...props }, ref) => {
    return (
      <StyledButton
        ref={ref}
        glowVariant={variant}
        {...props}
      >
        {children}
      </StyledButton>
    );
  }
);

GlowButton.displayName = 'GlowButton';

export default GlowButton;