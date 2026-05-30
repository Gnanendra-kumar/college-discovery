# 🎓 College Discovery Platform

A web app to explore, compare, and bookmark colleges across India.

🔗 **Live**: [college-discovery-bsve.onrender.com](https://college-discovery-bsve.onrender.com)

---

## Features

- 🔍 **Search & Filter** — Find colleges by name, state, type, fees, and rating
- 📊 **Compare** — Side-by-side comparison of multiple colleges
- 🔖 **Bookmarks** — Save colleges to your dashboard
- ⭐ **Reviews & Ratings** — Read reviews for each college
- 🔐 **Google Login** — Sign in with your Google account
- 📱 **Responsive** — Works on desktop and mobile

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Auth | Auth.js (NextAuth v5) + Google OAuth |
| Database | PostgreSQL (Neon) |
| ORM | Prisma |
| Hosting | Render |

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/Gnanendra-kumar/college-discovery.git
cd college-discovery
npm install
```

### 2. Set Up Environment

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `AUTH_SECRET` | Auth.js secret (`npx auth secret` to generate) |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `NEXTAUTH_URL` | `http://localhost:3000` for local dev |

### 3. Set Up Database

```bash
npx prisma db push
npx prisma db seed
```

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment (Render)

The app is configured for Render with [`render.yaml`](render.yaml).

1. Push code to GitHub
2. Create a **Web Service** on [render.com](https://render.com) and connect your repo
3. Add environment variables in the Render dashboard
4. Set `NEXTAUTH_URL` to your Render URL (e.g. `https://your-app.onrender.com`)
5. Add `https://your-app.onrender.com/api/auth/callback/google` to Google OAuth redirect URIs

## Project Structure

```
src/
├── app/            # Pages & API routes
│   ├── api/        # REST endpoints (bookmarks, colleges, comparisons)
│   ├── colleges/   # College listing & detail pages
│   ├── compare/    # Comparison page
│   ├── dashboard/  # User dashboard (saved items)
│   └── login/      # Login page
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks
├── lib/            # Auth, Prisma, providers
└── types/          # TypeScript types
```

## License

MIT
