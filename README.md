# Milos Dimitrijevic — Portfolio

A responsive, single-page portfolio with four interactive project tiles:

- Security trainings
- Knowledgebases
- OpenVPN
- GLPI

Each tile changes colour and lifts on hover, then opens a centered video-ready modal when clicked. The dialog also closes from the close button, backdrop, or `Escape` key.

## Run locally

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
