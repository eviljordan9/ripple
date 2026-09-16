# Ripple

Live audience polling. Create a poll, share a short code (or QR), and watch the bars move as people vote.

**Repo:** https://github.com/eviljordan9/ripple

## Keep it live 24/7

GitHub only stores the code. GitHub Pages cannot run Go, MongoDB, or Redis.

Deploy on **Railway** so the URL stays up:

1. Open https://railway.app and sign in with GitHub.
2. New project → Deploy from GitHub repo → `eviljordan9/ripple`.
3. Add plugins: MongoDB and Redis.
4. Set variables: `MONGO_URI` (from Mongo), `REDIS_URL` (from Redis), `JWT_SECRET` (long random string), `COOKIE_SECURE=1`, `MONGO_DB=ripple`.
5. Generate a public domain. That `*.up.railway.app` link is Ripple, always on.

## Run with Docker

```bash
docker compose up --build
```

Demo code: `WELCOME`. Sign in with email + password (8+ characters) to create a poll.
