# Ripple

Live audience polling. Create a poll, share a short code (or QR), and watch the bars move as people vote — no refresh.

**Flow:** Create poll → Share link → Audience votes → Live results

## Stack

| Layer | Use |
| --- | --- |
| Frontend | React (Vite) in `/frontend` |
| Backend | Go + Gin in `/backend` |
| Database | MongoDB (polls, votes, users) |
| Realtime | Redis (live counts + pub/sub) |

## Run with Docker

```bash
docker compose up --build
```

Open the app and try the demo code `WELCOME`.

Sign in with email + password (at least 8 characters) to create a poll.
