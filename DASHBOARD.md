# Kitchen Engagements Dashboard

A private admin dashboard at **`/dashboard`** on yummyvoo.com to track
positive and negative kitchen engagements (reviews, orders, complaints,
compliments, social mentions, etc.) with Google Sheets as the backend.

## What you get

- **KPI cards**: total engagements, positive %, negative %, average rating,
  unresolved negative count.
- **Charts**: positive vs negative over time (line), by source (stacked bar),
  by category (pie).
- **Table**: searchable, filterable list of all engagements with inline edit
  and delete.
- **Add engagement** modal form with sensible defaults.
- **Export to CSV** of the current filtered view.
- **Password gate** on the UI (configurable via env var).
- **Google Sheets as backend** — your data lives in a spreadsheet you own,
  editable both from this dashboard and directly in Google Sheets.

## File layout

```
yumivoo-site/
├── dashboard-backend/        # Google Apps Script code + setup guide
│   ├── Code.gs              # paste this into Apps Script editor
│   └── SETUP.md             # step-by-step backend setup
├── src/dashboard/
│   ├── Dashboard.jsx        # main dashboard component (lazy-loaded)
│   ├── api.js               # Google Sheets API client
│   └── dashboard.css        # scoped styles (.dash-* classes)
├── .env.example             # copy to .env.local and fill in
└── src/main.jsx             # adds /dashboard route alongside marketing site
```

## First-time setup (5 minutes)

1. **Set up the backend** → follow `dashboard-backend/SETUP.md` to create
   the Google Sheet, deploy the Apps Script Web App, and get:
   - the Web App URL
   - the API token you set
2. **Configure the frontend**:
   ```bash
   cp .env.example .env.local
   # edit .env.local and paste the three values
   ```
3. **Run locally**:
   ```bash
   npm install
   npm run dev
   # open http://localhost:5173/dashboard
   ```

## Deploy to Vercel

1. Push the repo as usual (`git push`) — Vercel will auto-deploy.
2. In Vercel → **Settings → Environment Variables** add:
   - `VITE_DASHBOARD_API_URL`
   - `VITE_DASHBOARD_API_TOKEN`
   - `VITE_DASHBOARD_PASSWORD`
3. Redeploy. Your dashboard lives at **<https://yummyvoo.com/dashboard>**.

The marketing site at `/` is completely untouched — the dashboard code is
lazy-loaded only when someone visits `/dashboard`, so your main site bundle
is unaffected.

## Day-to-day usage

- Visit `/dashboard`, enter the password.
- Click **+ Add engagement** every time a review/complaint/compliment comes
  in. You can also open the Google Sheet directly and type rows manually —
  the dashboard reads from the same source of truth.
- Use filters + search to focus on a kitchen, source, date range, or type.
- Hit **⬇ Export CSV** when you want a snapshot.

## Future upgrades (easy)

- **Multi-user auth**: swap `api.js` for a Supabase/Firebase client.
- **Auto-pull reviews**: add a scheduled Google Apps Script trigger that
  fetches from Zomato/Swiggy/Instagram APIs and writes to the same sheet.
- **Per-kitchen comparison**: add a kitchen filter dropdown (data model
  already supports it).
- **Alerts**: an Apps Script `onEdit` trigger that emails you when a new
  negative engagement is logged.