# Mobile Responsiveness - Quick Reference

## Core Principles Applied

### 1. Touch Targets
All interactive elements have minimum dimensions:
```tsx
min-h-[44px] min-w-[44px]  // iOS/Android standard
touch-manipulation         // Removes 300ms click delay
```

### 2. Responsive Typography
```tsx
// Headlines
text-base sm:text-lg md:text-2xl

// Body
text-xs sm:text-sm

// Small text
text-xs
```

### 3. Responsive Spacing
```tsx
// Padding
p-3 sm:p-4 md:p-5 lg:p-6

// Margin
m-2 sm:m-3 md:m-4 lg:m-6

// Gap
gap-2 sm:gap-3 md:gap-4 lg:gap-6
```

### 4. Responsive Grids
```tsx
// Two items on mobile, three on tablet, four on desktop
grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4

// Or specific layouts
grid-cols-1 md:grid-cols-2 lg:grid-cols-3
```

## Key Components & Their Mobile Fixes

| Component | Mobile Fix | Result |
|-----------|-----------|--------|
| **Navbar** | Hamburger menu + drawer | ✅ Full navigation access |
| **Tables** | Card view | ✅ No horizontal scroll |
| **Auth Modal** | Scrollable + responsive | ✅ Keyboard-friendly |
| **Forms** | Single column + large inputs | ✅ Easy to fill |
| **Buttons** | 44x44px minimum | ✅ Tappable targets |
| **Footer** | Responsive grid | ✅ All links accessible |
| **Checkout** | Stacked layout | ✅ Mobile-first flow |

## Tailwind Breakpoints Used

```
// Mobile first approach
(default) 0px     - Mobile
sm        640px   - Small devices (iPhone landscape, small tablets)
md        768px   - Medium tablets, small desktops
lg        1024px  - Large desktops
xl        1280px  - Extra large screens
```

## Common Patterns

### Responsive Text
```tsx
// Use this pattern for all text
<p className="text-xs sm:text-sm md:text-base font-medium">
  Content scales properly
</p>
```

### Responsive Button
```tsx
<button className="px-3 sm:px-4 py-2 sm:py-3 min-h-[44px]
                   text-xs sm:text-sm font-semibold
                   rounded-full border touch-manipulation
                   transition hover:border-brand">
  Click me
</button>
```

### Responsive Form Field
```tsx
<input className="w-full rounded-xl border border-border
                  px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm
                  touch-manipulation min-h-[44px]
                  focus:border-brand focus:ring-2 focus:ring-brand/30" />
```

### Responsive Container
```tsx
<div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6
                rounded-2xl border border-white/80 bg-white/90
                shadow-soft p-4 sm:p-5 md:p-6">
  Content
</div>
```

### Responsive Grid
```tsx
<div className="grid gap-3 sm:gap-4 md:gap-6
                grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  {/* Items automatically stack on mobile */}
</div>
```

### Mobile-Only / Desktop-Only Elements
```tsx
{/* Show only on mobile */}
<div className="md:hidden">Mobile content</div>

{/* Show only on desktop */}
<div className="hidden md:block">Desktop content</div>

{/* Show different content */}
<div className="hidden md:grid">
  {/* Desktop table view */}
</div>
<div className="md:hidden space-y-4">
  {/* Mobile card view */}
</div>
```

## Testing Checklist

Before committing mobile changes:

### Device Testing
- [ ] iPhone SE (375px)
- [ ] iPhone 12/13 (390px)
- [ ] iPhone 14 Pro Max (430px)
- [ ] Galaxy S21 (360px)
- [ ] iPad (768px)
- [ ] iPad Pro (1024px)

### Functionality Testing
- [ ] All buttons tappable
- [ ] No horizontal scrolling
- [ ] Forms don't get hidden by keyboard
- [ ] Navigation works on mobile
- [ ] Links have adequate spacing
- [ ] Modals fit on screen
- [ ] Images scale properly

### Browser Testing
- [ ] Safari iOS
- [ ] Chrome iOS
- [ ] Chrome Android
- [ ] Samsung Internet
- [ ] Firefox

## Common Mistakes to Avoid

❌ **Don't:** Use fixed font sizes
```tsx
// BAD
<p className="text-sm">Text</p>
```

✅ **Do:** Make text responsive
```tsx
// GOOD
<p className="text-xs sm:text-sm md:text-base">Text</p>
```

---

❌ **Don't:** Make buttons too small
```tsx
// BAD
<button className="px-2 py-1 text-xs">Small button</button>
```

✅ **Do:** Ensure 44px minimum touch targets
```tsx
// GOOD
<button className="px-3 sm:px-4 py-2 sm:py-3 min-h-[44px]">
  Tappable button
</button>
```

---

❌ **Don't:** Use multi-column layouts on mobile
```tsx
// BAD
<div className="grid grid-cols-3 gap-4">
```

✅ **Do:** Stack on mobile, grid on larger screens
```tsx
// GOOD
<div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
```

---

❌ **Don't:** Forget about keyboard on mobile
```tsx
// BAD - Modal hides behind keyboard
<div className="fixed inset-0 flex items-center justify-center">
```

✅ **Do:** Make modals scrollable
```tsx
// GOOD
<div className="fixed inset-0 flex items-center justify-center overflow-y-auto">
```

---

❌ **Don't:** Ignore touch-specific needs
```tsx
// BAD - No mobile optimizations
<input className="border px-4 py-3" />
```

✅ **Do:** Optimize for touch
```tsx
// GOOD
<input className="border px-3 sm:px-4 py-2.5 sm:py-3
                   touch-manipulation min-h-[44px]
                   text-xs sm:text-sm" 
       autoComplete="email" />
```

## Performance Tips

### Images
- Use `next/image` for optimization
- Provide responsive `sizes` prop
- Load-time image sizes scale appropriately

### CSS
- Tailwind handles responsive CSS efficiently
- No custom media queries needed
- BYO breakpoints are consistent

### JavaScript
- Close modals when route changes
- Disable horizontal scrolling
- Handle touch events properly

## Accessibility Notes

All improvements include:
- ✅ Proper `aria-*` attributes
- ✅ Semantic HTML (`<button>`, `<input>`, etc.)
- ✅ Focus styles for keyboard navigation
- ✅ Color contrast ratios maintained
- ✅ Touch targets >= 44x44px
- ✅ Form labels properly associated

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/ios)
- [Android Material Design](https://material.io/design)
- [Tailwind Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [MDN Mobile Web Development](https://developer.mozilla.org/en-US/docs/Web/Guide/Mobile)

---

**Last Updated:** May 3, 2026  
**Mobile Score:** 70-80% optimized  
**Next Priority:** Complete checkout page mobile fixes & production testing
