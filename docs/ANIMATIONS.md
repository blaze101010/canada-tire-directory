# Animation System Documentation

This document outlines the comprehensive animation system implemented in the tire shop directory application.

## Overview

The application uses a sophisticated animation system built on:
- **Tailwind CSS** custom animations
- **CSS keyframe animations** for complex movements
- **React Hooks** for scroll-triggered animations
- **Intersection Observer API** for performance
- **Accessibility** support (respects prefers-reduced-motion)

---

## Available Animations

### 1. Entrance Animations

#### Fade In
```tsx
<div className="animate-fade-in">Content</div>
```
- Fades in from 0% opacity with slight upward movement
- Duration: 500ms
- Use for: General content reveal

#### Slide In (from left)
```tsx
<div className="animate-slide-in">Content</div>
```
- Slides in from left with fade
- Duration: 600ms
- Use for: Side panels, navigation items

#### Slide Up
```tsx
<div className="animate-slide-up">Content</div>
```
- Slides up from bottom with fade
- Duration: 500ms
- Use for: Cards, modals, bottom sheets

#### Slide In Right
```tsx
<div className="animate-slide-in-right">Content</div>
```
- Slides in from right with fade
- Duration: 500ms
- Use for: Right-side panels, notifications

#### Scale In
```tsx
<div className="animate-scale-in">Content</div>
```
- Scales from 95% to 100% with fade
- Duration: 400ms
- Use for: Buttons, icons, badges

#### Bounce In
```tsx
<div className="animate-bounce-in">Content</div>
```
- Bouncy entrance with elastic easing
- Duration: 600ms
- Use for: CTAs, important notifications

#### Rotate In
```tsx
<div className="animate-rotate-in">Content</div>
```
- Rotates in with scale effect
- Duration: 500ms
- Use for: Icons, decorative elements

#### Fade In Blur
```tsx
<div className="animate-fade-in-blur">Content</div>
```
- Fades in with blur effect (modern browsers)
- Duration: 700ms
- Use for: Hero sections, background images

---

### 2. Continuous Animations

#### Pulse Glow
```tsx
<button className="animate-pulse-glow">Click Me</button>
```
- Pulsing box-shadow effect
- Duration: 2s infinite
- Use for: Drawing attention to CTAs

#### Gradient Shift
```tsx
<div className="bg-gradient-to-r from-blue-500 to-purple-500 animate-gradient">
  Background
</div>
```
- Animated gradient background
- Duration: 3s infinite
- Use for: Hero sections, premium features

#### Float
```tsx
<div className="animate-float">Floating Element</div>
```
- Gentle up/down floating motion
- Duration: 3s infinite
- Use for: Icons, decorative elements

---

### 3. Interaction Animations

#### Shake (for errors)
```tsx
<div className="animate-shake">Error Message</div>
```
- Horizontal shake animation
- Duration: 500ms (one-time)
- Use for: Form validation errors

#### Count Up
```tsx
<div className="animate-count-up">1,234</div>
```
- Bouncy count-up animation
- Duration: 800ms
- Use for: Statistics, numbers

---

### 4. Staggered Animations

Apply delays to create staggered effects:

```tsx
<div className="grid grid-cols-3">
  <div className="animate-fade-in stagger-1">Item 1</div>
  <div className="animate-fade-in stagger-2">Item 2</div>
  <div className="animate-fade-in stagger-3">Item 3</div>
</div>
```

**Available stagger classes:**
- `.stagger-1` through `.stagger-10` (desktop: 100-1000ms)
- Automatically reduced on mobile for better performance

---

### 5. Hover Effects

#### Lift Effect
```tsx
<div className="hover-lift">
  Lifts up on hover
</div>
```
- Translates up 5px
- Adds enhanced shadow
- Smooth transition

#### Scale Effect
```tsx
<button className="hover-scale">
  Scales on hover
</button>
```
- Scales to 105%
- Smooth transition

#### Glow Effect
```tsx
<button className="hover-glow">
  Glows on hover
</button>
```
- Blue glow box-shadow
- Smooth transition

---

## React Hooks for Scroll Animations

### useScrollAnimation

Basic hook for scroll-triggered animations:

```tsx
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

function MyComponent() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className={isVisible ? 'animate-fade-in' : 'opacity-0'}>
      Content appears when scrolled into view
    </div>
  );
}
```

**Options:**
```tsx
useScrollAnimation({
  threshold: 0.1,           // % of element that must be visible
  rootMargin: '0px 0px -100px 0px', // Offset for trigger
  triggerOnce: true         // Only trigger once (default: true)
})
```

---

### useScrollAnimationClass

Simplified version that returns className directly:

```tsx
import { useScrollAnimationClass } from '@/hooks/useScrollAnimation';

function MyComponent() {
  const { ref, className } = useScrollAnimationClass('animate-slide-up');

  return (
    <div ref={ref} className={className}>
      Slides up when visible
    </div>
  );
}
```

---

### useStaggeredAnimation

For list animations with incremental delays:

```tsx
import { useStaggeredAnimation } from '@/hooks/useScrollAnimation';

function MyList({ items }: { items: string[] }) {
  const { ref, getItemClassName, getItemStyle } = useStaggeredAnimation(
    items.length,
    100 // 100ms delay between items
  );

  return (
    <div ref={ref}>
      {items.map((item, index) => (
        <div
          key={index}
          className={getItemClassName(index, 'animate-fade-in')}
          style={getItemStyle(index)}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
```

---

### useAccessibleAnimation

Respects user's motion preferences:

```tsx
import { useAccessibleAnimation } from '@/hooks/useScrollAnimation';

function MyComponent() {
  const { ref, className, prefersReducedMotion } = useAccessibleAnimation(
    'animate-bounce-in'
  );

  return (
    <div ref={ref} className={className}>
      {/* Animations disabled if user prefers reduced motion */}
      Content
    </div>
  );
}
```

---

### usePrefersReducedMotion

Check if user prefers reduced motion:

```tsx
import { usePrefersReducedMotion } from '@/hooks/useScrollAnimation';

function MyComponent() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className={prefersReducedMotion ? '' : 'animate-float'}>
      Floats only if animations are enabled
    </div>
  );
}
```

---

## Custom Transition Utilities

### Smooth Transitions
```tsx
<button className="transition-smooth">
  Smooth transition (300ms cubic-bezier)
</button>
```

### Bounce Transitions
```tsx
<button className="transition-bounce">
  Bouncy transition (500ms elastic)
</button>
```

---

## ShopCard Enhanced Animations

The ShopCard component uses several animation techniques:

```tsx
<div className="group">
  {/* Main card with lift effect */}
  <div className="transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">

    {/* Gradient background appears on hover */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    </div>

    {/* Content */}
    <div className="relative z-10">
      {/* Card content */}
    </div>
  </div>
</div>
```

**Effects Applied:**
1. Lifts up 8px on hover (`-translate-y-2`)
2. Enhanced shadow on hover (`hover:shadow-2xl`)
3. Gradient background fades in
4. Border color changes to indigo
5. All transitions are smooth (300ms)

---

## Glass Morphism Effect

Create modern glass-style UI:

```tsx
<div className="glass p-6 rounded-xl">
  Content with glass effect
</div>
```

**CSS:**
- Semi-transparent white background
- Backdrop blur (10px)
- Subtle border
- Works on modern browsers

---

## Loading Animations

### Skeleton Loader
```tsx
<div className="skeleton h-20 w-full rounded-lg"></div>
```
- Shimmer animation
- Gray gradient background
- Use for content loading states

### Loading Dots
```tsx
<div className="loading-dots">
  <span>•</span>
  <span>•</span>
  <span>•</span>
</div>
```
- Three dots flashing in sequence
- Common loading indicator

---

## Performance Best Practices

### 1. Use `will-change` for Heavy Animations

For frequently animated elements:

```tsx
<div style={{ willChange: 'transform, opacity' }} className="animate-float">
  Optimized animation
</div>
```

### 2. Limit Concurrent Animations

- Don't animate more than 10-15 elements simultaneously
- Use staggered delays instead of all-at-once
- Reduce motion on mobile devices

### 3. Use Transform and Opacity

These properties are GPU-accelerated:
- ✅ `transform: translateX(10px)`
- ✅ `opacity: 0.5`
- ❌ `margin-left: 10px` (causes reflow)
- ❌ `width: 50%` (causes reflow)

### 4. Disable Animations Conditionally

```tsx
const prefersReducedMotion = usePrefersReducedMotion();

<div className={prefersReducedMotion ? '' : 'animate-bounce-in'}>
  Respects user preferences
</div>
```

---

## Accessibility

### Respects prefers-reduced-motion

All animations are automatically disabled for users who prefer reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Focus Visible Styles

Clear focus indicators for keyboard navigation:

```css
*:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
```

---

## Animation Timing Reference

| Duration | Use Case |
|----------|----------|
| 150ms | Micro-interactions (hover, click) |
| 300ms | Standard transitions |
| 500ms | Entrance animations |
| 800ms | Complex/bouncy animations |
| 2s+ | Ambient/background animations |

### Easing Functions

| Timing Function | Use Case |
|----------------|----------|
| `ease-out` | Entrances, objects entering |
| `ease-in` | Exits, objects leaving |
| `ease-in-out` | Movements, transformations |
| `cubic-bezier(0.68, -0.55, 0.265, 1.55)` | Bouncy/playful animations |

---

## Examples in the App

### Statistics Section (Homepage)
```tsx
<div className="animate-count-up stagger-1">
  <div className="text-5xl font-bold">6,730+</div>
  <div className="text-gray-700">Tire Shops</div>
</div>
```

### Shop Cards (Search Results)
```tsx
<div className="group hover-lift animate-fade-in">
  <ShopCard shop={shop} />
</div>
```

### Filter Panel
```tsx
<div className="animate-slide-up">
  {showFilters && <FilterPanel />}
</div>
```

### Hero Section
```tsx
<div className="animate-fade-in-blur">
  <h1>Find a Tire Shop Near Me</h1>
</div>
```

---

## Browser Support

- **Modern browsers**: All animations work perfectly
- **Older browsers**: Graceful degradation (content still visible, just no animation)
- **Intersection Observer**: Fallback to immediate display if not supported

**Tested On:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Future Enhancements

1. **Page transitions** using Framer Motion
2. **Parallax scrolling** for hero sections
3. **Morphing animations** between states
4. **Gesture-based animations** for mobile (swipe, pinch)
5. **SVG path animations** for icons and illustrations
6. **Particle effects** for celebrations/milestones

---

## Resources

- [MDN: CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
- [MDN: Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [Tailwind CSS: Animation](https://tailwindcss.com/docs/animation)
- [Cubic Bezier Generator](https://cubic-bezier.com/)
- [Easings Reference](https://easings.net/)
