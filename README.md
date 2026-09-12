# Billabong Solar Website

## Environment Variables
Copy `.env.example` to `.env.local` and fill in your values.

```bash
cp .env.example .env.local
```

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Production Build

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Push this folder to GitHub
2. Import repo in [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

## Odoo CRM Integration

Set these in `.env.local` or Vercel Environment Variables:

| Variable | Description |
|----------|-------------|
| `ODOO_URL` | Your Odoo instance URL (e.g. `https://yourcompany.odoo.com`) |
| `ODOO_DB` | Database name |
| `ODOO_USERNAME` | Odoo admin email |
| `ODOO_API_KEY` | Odoo API key (Settings → Users → API Keys) |
| `NOTIFICATION_EMAIL` | Email to receive lead notifications |
| `SMTP_HOST` | SMTP server for email (optional, Odoo handles it too) |
| `SMTP_PORT` | SMTP port |
| `SMTP_USER` | SMTP username |
| `SMTP_PASS` | SMTP password |

## SEO Configuration

- `NEXT_PUBLIC_SITE_URL` — Set to your production domain for sitemap/canonical URLs
- `NEXT_PUBLIC_GA_ID` — Google Analytics 4 Measurement ID (e.g. `G-XXXXXXXXXX`)
