# Dashboard Backend Setup (Google Sheets + Apps Script)

This folder contains the **backend** for the Kitchen Engagements dashboard.
Follow these one-time steps to get a free, cloud-hosted JSON API backed by a
Google Sheet.

## 1. Create the Google Sheet

1. Go to <https://sheets.google.com> and create a new blank sheet.
2. Rename it to something like **"YummyVoo Engagements"**.
3. From the URL, copy the **Sheet ID** — the long string between `/d/` and `/edit`.
   Example: `https://docs.google.com/spreadsheets/d/`**`1AbCDefG...xyz`**`/edit`

## 2. Create the Apps Script

1. In your sheet, go to **Extensions → Apps Script**.
2. Delete the default `Code.gs` content.
3. Paste the entire contents of `Code.gs` from this folder.
4. At the top of the file, replace the two placeholders:
   - `SHEET_ID` → the ID you copied in step 1
   - `API_TOKEN` → a long random string (e.g. generate one at <https://generate-secret.vercel.app/32>). **Save this; you'll put it in the frontend `.env`.**
5. Click the **save** icon (💾).

## 3. Deploy as Web App

1. Click **Deploy → New deployment**.
2. Click the gear ⚙️ next to "Select type" → choose **Web app**.
3. Fill in:
   - **Description**: `YummyVoo Engagements API v1`
   - **Execute as**: `Me (your@gmail.com)`
   - **Who has access**: `Anyone` ← required, because our token guards access
4. Click **Deploy**.
5. Google will ask for permissions — click **Authorize access**, pick your
   Google account, click **Advanced → Go to (unsafe)**, then **Allow**.
6. Copy the **Web app URL**. It looks like
   `https://script.google.com/macros/s/AKfyc.../exec`. **Save this; you'll
   put it in the frontend `.env`.**

> ⚠️ Every time you edit `Code.gs`, click **Deploy → Manage deployments →
> ✏️ edit → New version → Deploy** to publish the change. The URL stays
> the same.

## 4. Configure the frontend

In the repo root (`yumivoo-site/`), create a `.env.local` file:

```
DASHBOARD_API_URL=https://script.google.com/macros/s/AKfyc.../exec
DASHBOARD_API_TOKEN=the-long-random-string-from-step-2
DASHBOARD_PASSWORD=some-password-for-the-ui-gate
```

Restart `npm run dev` after creating `.env.local`.

For **production (Vercel)**: go to your project → Settings → Environment
Variables and add the same three `*` keys. Redeploy.

## 5. Test

Open the Web app URL in your browser with the token appended:

```
https://script.google.com/macros/s/AKfyc.../exec?action=list&token=YOUR_TOKEN
```

You should see `{"ok":true,"rows":[]}`. 🎉

## Security notes

- The token is a shared secret — anyone with the URL + token can read/write.
  Keep both private. Don't commit `.env.local`.
- `*` env vars are embedded into the built JS bundle, so technically
  anyone who inspects your deployed `/dashboard` can extract the token. For
  a private admin tool this is acceptable; for anything higher-stakes,
  migrate to a real auth system (Supabase / Auth0 / etc.).
- The `DASHBOARD_PASSWORD` gate is only a UI speed bump, not real
  security. The real security boundary is the API token.