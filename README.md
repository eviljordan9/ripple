# Ripple

Live audience polling. Create a poll, share a short code (or QR), and watch the bars move as people vote.

**Repo:** https://github.com/eviljordan9/ripple

## Stack

| Layer | Path |
| --- | --- |
| Frontend | React + Vite in `/frontend` |
| Backend | Go + Gin in `/backend` |
| Database | MongoDB |
| Realtime | Redis pub/sub + live counts |

GitHub hosts the **source**. GitHub Pages cannot run Go, MongoDB, or Redis, so the live site is not on Pages.

## Run

```bash
docker compose up --build
```

Then open the app and try the demo code `WELCOME`.

Or run pieces yourself:

```bash
cd backend && go run .
cd frontend && npm install && npm run dev
```

Sign in with email + password (8+ characters) to create a poll. Voting does not need an account.
