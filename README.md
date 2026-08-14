# Milos Dimitrijevic — Portfolio

A responsive, single-page portfolio with four interactive project tiles. The root `index.html`, `styles.css`, and `script.js` files are ready for GitHub Pages with no build step.

- Security trainings
- Knowledgebases
- OpenVPN
- GLPI

Each tile changes colour and lifts on hover, then opens a centered video-ready modal when clicked. The dialog also closes from the close button, backdrop, or `Escape` key.

## Publish with GitHub Pages

1. Upload the repository files to GitHub.
2. Open the repository's **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select your main branch and the **/(root)** folder, then save.

GitHub will display the public portfolio URL after deployment finishes. Opening the repository itself displays this README; the live page is the separate URL shown under Settings → Pages.

## Optional development version

Install Node.js 22 or newer, then run:

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
npm run start
```

## Add project videos later

The tiles and dialog are defined in `app/page.tsx`. Replace the `.video-placeholder` block with a standard `<video controls>` element or an embedded video player. Put locally hosted video files in `public/videos/` and reference them as `/videos/your-video.mp4`.

The complete visual theme and responsive layout are in `app/globals.css`.
