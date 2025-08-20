# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Commands

### Development
```powershell
# Start development server (http://localhost:3000)
npm run dev

# Type checking without emitting files
npm run typecheck

# Lint TypeScript/TSX files
npm run lint

# Run pre-deployment tests
npm run predeploy-test
```

### Production
```powershell
# Build for production (includes typecheck and lint)
npm run build

# Preview production build locally (http://localhost:4173)
npm run preview

# Start production server (for Railway deployment)
npm run start
```

### Testing Individual Components
Since this is a frontend-only demo, testing is primarily visual:
- Use `npm run dev` and navigate to specific routes
- Test responsive behavior using browser dev tools
- Key routes: `/`, `/auth`, `/watch-together`, `/friends`, `/watch`

## Architecture

### High-Level Structure
This is a **React 18 + TypeScript** social streaming platform with a **magazine-style asymmetric design system**. The architecture follows a page-component pattern with heavy emphasis on visual effects and responsive design.

### Core Design Philosophy
- **Glass-morphism UI**: Transparent cards with blur effects and cyan/blue gradients
- **Magazine Layout**: Asymmetric, priority-based content scaling and positioning  
- **Mobile-First**: Responsive breakpoints optimized for 16" screens with ~10mm margins
- **Animation-Heavy**: Smooth transitions, floating elements, and interactive feedback

### Key Architectural Patterns

#### 1. Route-Based Page Structure
- **App.tsx**: Main router with loading states and shadow page transitions
- **Pages**: Full-page components (`HomePage`, `AuthPage`, `WatchPage`, etc.)
- **Layout Components**: Reusable sections (`HeroSection`, `FriendsSection`, etc.)
- **UI Components**: Atomic design elements (`ContentCard`, `GlowButton`, `GlassCard`)

#### 2. CSS Custom Properties System
The design system is built on 65+ CSS variables in `index.css`:
- **Grid System**: `--grid-base: 6px` with dynamic scaling
- **Priority Scaling**: `--priority-scale-1` through `--priority-scale-10` for content importance
- **Glassmorphism**: Three tiers (subtle, medium, strong) with blur effects
- **Responsive**: Mobile-specific variables (`--mobile-card-gap`, `--grid-margin-mobile`)

#### 3. Component Architecture
- **Layout Components**: `src/components/layout/` - Page sections and major layouts
- **UI Components**: `src/components/ui/` - Reusable interactive elements
- **Pages**: `src/pages/` - Route-level components
- **Hooks**: `src/hooks/` - Custom React hooks (scroll animations, etc.)

#### 4. State Management
Minimal state management using React hooks:
- **Local State**: Component-level useState for UI interactions
- **Route State**: React Router for navigation and URL parameters
- **Persistent State**: localStorage for first-visit detection
- **No Global State**: Intentionally avoids Redux/Context for this demo scope

### Navigation Flow
- **Primary Navigation**: Home → Watch Together → Friends → Watch → Sign In
- **Route Redirects**: `/catalog` redirects to `/watch` (backward compatibility)
- **Shadow Pages**: Transition animations between routes using `ShadowPage` component

### Content System
#### Priority-Based Scaling
Components can be assigned priority levels (1-10) that affect visual prominence:
```tsx
<ContentCard priority={8} size="hero" />  // Larger, more prominent
<ContentCard priority={3} size="compact" />  // Smaller, less prominent
```

#### Asymmetric Layouts
Magazine-style positioning using CSS transforms and offset variables:
- Components can be offset vertically for visual rhythm
- Content cards scale based on importance algorithms
- Mobile layouts collapse asymmetry for better readability

### Material-UI Integration
- **Custom Theme**: Dark mode with cyan/blue brand colors in `theme.ts`
- **Styled Components**: MUI's `styled()` API for component styling
- **Typography**: Inter, Montserrat, Roboto font stack
- **Responsive**: MUI breakpoints enhanced with custom magazine breakpoints

### Build System (Vite)
- **Code Splitting**: Separate chunks for React/React-DOM and MUI components
- **TypeScript**: Strict mode with comprehensive linting rules
- **Source Maps**: Enabled for production debugging
- **Bundle Size**: ~470KB total, ~143KB gzipped

### Deployment Architecture
- **Railway Platform**: Configured with `railway.toml` and health checks
- **Static Serve**: Production build served using `npx serve`
- **Build Pipeline**: TypeScript check → ESLint → Vite build
- **Port Configuration**: Listens on `$PORT` or defaults to 3000

## Key Implementation Notes

### Responsive Design Strategy
- **Mobile Margins**: 4px (~10mm on 16" screens) for optimal mobile experience
- **Grid Scaling**: Base 6px grid with device-specific multipliers
- **Breakpoint Strategy**: Five breakpoints from mobile (480px) to desktop-large (1920px)

### Performance Considerations
- **Lazy Loading**: Components use `LazyImage` for deferred image loading
- **Animation Optimization**: CSS transforms and GPU-accelerated properties
- **Bundle Optimization**: Tree shaking and manual chunk splitting in Vite config

### ByteRover Integration
The `.cursor/rules/byterover-rules.mdc` indicates this project uses ByteRover MCP:
- Always use `byterover-retrieve-knowledge` before tasks
- Store critical information with `byterover-store-knowledge` after successful tasks

### Demo Limitations
This is a frontend-only demonstration:
- Authentication uses mock responses (no real backend)
- Video streaming is placeholder content
- Chat functionality is display-only
- All data is static or client-side generated
- Friend lists and online status are simulated

For production implementation, these features would require WebSocket connections, video streaming APIs, user authentication services, and real-time database synchronization.
