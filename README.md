# 🎓 College Discovery Platform

A modern platform to explore, compare, and bookmark colleges across India. Built with Next.js, Prisma, and Neon PostgreSQL.

🔗 **Live**: [college-discovery-bsve.onrender.com](https://college-discovery-bsve.onrender.com)

---

## ✨ Features

- **Browse Colleges** — Search, filter by type/state/fees, and sort results
- **College Details** — View courses, placements, reviews, and ratings
- **Compare Colleges** — Side-by-side comparison of up to 4 colleges
- **Bookmarks** — Save your favorite colleges (requires login)
- **Google Sign-In** — Secure authentication via Google OAuth
- **Dashboard** — View saved bookmarks and comparisons

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Database | Neon PostgreSQL |
| ORM | Prisma |
| Auth | Auth.js (NextAuth v5) + Google OAuth |
| Hosting | Render |

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/Gnanendra-kumar/college-discovery.git
cd college-discovery
npm install
```

### 2. Set Up Environment

Copy `.env.example` to `.env` and fill in your values:

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
npx prisma db push    # Push schema to database
npx prisma db seed    # Seed with sample colleges
```

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/            # API routes (auth, colleges, bookmarks, comparisons)
│   ├── colleges/       # Browse & detail pages
│   ├── compare/        # Comparison page
│   ├── dashboard/      # Saved bookmarks & comparisons
│   └── login/          # Sign-in page
├── components/         # Reusable UI components
├── hooks/              # Custom React hooks (compare, bookmarks)
├── lib/                # Auth config, Prisma client
└── types/              # TypeScript types
```

---

## 🌐 Deployment (Render)

1. Push code to GitHub
2. Create a **Web Service** on [render.com](https://render.com) and connect the repo
3. Set environment variables in the Render dashboard
4. Set `NEXTAUTH_URL` to your Render URL (e.g. `https://college-discovery-bsve.onrender.com`)
5. Add the Render URL to Google OAuth redirect URIs in [Google Cloud Console](https://console.cloud.google.com/apis/credentials)

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run db:push` | Push Prisma schema to database |
| `npm run db:seed` | Seed database with sample data |
| `npm run db:studio` | Open Prisma Studio |
