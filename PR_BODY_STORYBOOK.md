## Summary

Adds Storybook configuration and ensures story scaffolds are valid. Sets up minimal Storybook setup with Vite integration for component development and visual testing.

## Files Changed

### Created
- `.storybook/main.js` - Storybook main configuration with Vite builder
- `.storybook/preview.js` - Preview configuration with global CSS and viewport settings
- `scripts/visual-test.js` - Placeholder scaffold for visual regression testing

### Modified
- `package.json` - Added Storybook devDependencies and updated script command

### Story Files (already committed)
- `src/stories/HeroIntro.stories.tsx`
- `src/stories/FeaturedProjectCard.stories.tsx`
- `src/stories/FeaturedProjectsGrid.stories.tsx`
- `src/stories/OriginTimeline.stories.tsx`

## How to Run

```bash
npm ci
npm run storybook
```

This will start Storybook on `http://localhost:6006`

## Next Steps

**Recommended follow-up PR:**
- Add Chromatic integration for visual snapshots and visual regression testing
- Configure visual test script (`scripts/visual-test.js`) with Puppeteer and pixelmatch
- Add more component stories as components are developed
- Set up CI/CD to run Storybook builds and visual tests

## Configuration Details

- **Framework**: `@storybook/react-vite` (Vite builder for fast builds)
- **Stories location**: `src/stories/**/*.stories.*` and `src/components/**/*.stories.*`
- **Addons**: `@storybook/addon-essentials` (includes controls, actions, viewport, etc.)
- **Global CSS**: Imports `src/styles/globals.css` for Tailwind and design tokens
- **Viewports**: Mobile (375px), Tablet (768px), Desktop (1920px)

## Notes

- Storybook devDependencies added but not installed in this environment (run `npm ci` locally)
- Visual test script is a placeholder - implement with Puppeteer/pixelmatch in follow-up
- TypeScript checking disabled in Storybook config (handled by project's typecheck script)

