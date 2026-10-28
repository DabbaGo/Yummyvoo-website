// Google Sheets backend client (via Apps Script Web App).
// Config comes from Vite env vars — see dashboard-backend/SETUP.md.

const API_URL = import.meta.env.DASHBOARD_API_URL || ''
const API_TOKEN = import.meta.env.DASHBOARD_API_TOKEN || ''

export const isConfigured = () => Boolean(API_URL && API_TOKEN)

async function post(action, payload = {}) {
  if (!isConfigured()) throw new Error('Dashboard API is not configured. See dashboard-backend/SETUP.md.')
  const res = await fetch(API_URL, {
    method: 'POST',
    // Apps Script doesn't accept custom Content-Type without preflight,
    // so we send text/plain with a JSON body — Apps Script parses postData.contents.
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action, token: API_TOKEN, ...payload }),
    redirect: 'follow',
  })
  const data = await res.json()
  if (!data.ok) throw new Error(data.error || 'Request failed')
  return data
}

export async function listEngagements() {
  if (!isConfigured()) throw new Error('Dashboard API is not configured. See dashboard-backend/SETUP.md.')
  const url = `${API_URL}?action=list&token=${encodeURIComponent(API_TOKEN)}`
  const res = await fetch(url, { redirect: 'follow' })
  const data = await res.json()
  if (!data.ok) throw new Error(data.error || 'Request failed')
  return data.rows || []
}

export async function createEngagement(entry) {
  const data = await post('create', { entry })
  return data.row
}

export async function updateEngagement(id, entry) {
  const data = await post('update', { id, entry })
  return data.row
}

export async function deleteEngagement(id) {
  await post('delete', { id })
}