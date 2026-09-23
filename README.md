# ORBIT — A playable gravity garden

**[Open the live garden](https://SweeMingXx.github.io/orbit-gravity-garden/)**

An original, responsive interactive artwork built with Canvas 2D, Web Audio, and vanilla JavaScript. No build step, account, analytics, or backend.

## Play
- Drag to launch a planet, or use **Launch a planet**. Maximum: 24 planets.
- Explore **Harmony**, **Bloom**, and **Wild** starting patterns.
- Adjust gravity from **0.4× to 2.0×** and time from **0.2× to 2.0×**.
- Enable **Let it sing** for C-major pentatonic notes at orbital crossings.
- Try **Dusk**, **Aurora**, or **Ember** palettes.
- Save a PNG postcard, undo a launch, or share initial conditions in a URL.
- Keyboard: Space pause/play; L launch; M sound; R reset; Ctrl/Command+Z undo.

Reduced-motion preferences start the simulation paused. Native dialogs, visible focus states, keyboard alternatives, reset confirmations, limits, and status messages support accessible interaction. Optional Google Fonts have system-font fallbacks. Settings and launch conditions persist locally; audio requires an explicit user gesture. Shared links recreate initial conditions, not exact animation frames. Illustrative softened-gravity physics, not an astronomical model.

## Development
Serve this directory with any static HTTP server. `index.html`, `styles.css`, and `app.js` contain the complete application. `.nojekyll` enables direct static publishing.

## Verification
`npm install` then `npx playwright install chromium` and `npm test` runs desktop/mobile interaction, accessibility, persistence, sharing, keyboard, download, and reduced-motion checks. GitHub Actions runs these checks and uploads screenshots.

## Deployment
GitHub Pages publishes the root of the `gh-pages` branch. Changes to that branch update the live site automatically.
