# Superbinary Website

Vite React + React Router + TypeScript + Tailwind app for the Superbinary landing page.

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Cloudflare Pages

Use these Pages settings:

- Build command: `npm run build`
- Build output directory: `dist`
- Functions directory: `functions`

Set these runtime variables/secrets in Cloudflare Pages:

- `RESEND_API_KEY`
- `DOWNLOAD_FROM_EMAIL`
- `DOWNLOAD_LINK_URL`
- `DOWNLOAD_REPLY_TO` optional

For local Pages Function testing, copy `.dev.vars.example` to `.dev.vars` and fill in real values:

```bash
npm run cf:dev
```
