# 🎓 College Discovery Platform

A modern web app to explore, compare, and bookmark colleges across India. Built with Next.js, Prisma, and PostgreSQL.

🔗 **Live Demo:** [college-discovery-bsve.onrender.com](https://college-discovery-bsve.onrender.com)

---

## ✨ Features

- **Browse Colleges** — Explore a catalog of colleges with ratings, fees, and placement stats
- **Search & Filter** — Find colleges by name, city, or state. Filter by type, rating, and fees
- **College Details** — View detailed info including courses, reviews, and placement data
- **Compare Colleges** — Select multiple colleges and compare them side-by-side
- **Bookmark & Save** — Save your favorite colleges and comparisons (requires login)
- **Google Sign-In** — Secure authentication via Google OAuth
- **Responsive Design** — Works on desktop, tablet, and mobile

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Database | PostgreSQL ([Neon](https://neon.tech)) |
| ORM | [Prisma](https://prisma.io) |
| Auth | [Auth.js v5](https://authjs.dev) + Google OAuth |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Hosting | [Render](https://render.com) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- A PostgreSQL database (e.g., [Neon](https://neon.tech))
- Google OAuth credentials ([Cloud Console](https://console.cloud.google.com/apis/credentials))

### Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/Gnanendra-kumar/college-discovery.git
   cd college-discovery
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Open `.env` and fill in your values:
   ```env
   DATABASE_URL="your-postgresql-connection-string"
   AUTH_SECRET="your-auth-secret"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Push database schema & seed data**
   ```bash
   npx prisma db push
   npm run db:seed
   ```

5. **Run the dev server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
src/
├── app/                  # Pages & API routes (Next.js App Router)
│   ├── api/              # REST API endpoints
│   ├── colleges/         # Browse & detail pages
│   ├── compare/          # Side-by-side comparison
│   ├── dashboard/        # Saved bookmarks & comparisons
│   └── login/            # Google sign-in page
├── components/           # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Auth, Prisma, and providers
├── types/                # TypeScript type definitions
└── utils/                # Helper/utility functions
```

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run db:push` | Push Prisma schema to database |
| `npm run db:seed` | Seed database with sample data |
| `npm run db:studio` | Open Prisma Studio (database GUI) |

---

## 🌐 Deployment

This app is deployed on **Render** using the included `render.yaml` blueprint.

To deploy your own instance:
1. Push to GitHub
2. Create a **Web Service** on [Render](https://render.com) and connect your repo
3. Set the environment variables in the Render dashboard
4. Add your Render URL to Google OAuth redirect URIs

---

## 📄 License

This project is for educational purposes.
