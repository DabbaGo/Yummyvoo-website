import { useEffect, useMemo, useState, useCallback } from 'react'
import {
  ResponsiveContainer,
  LineChart, Line,
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts'
import {
  listEngagements,
  createEngagement,
  updateEngagement,
  deleteEngagement,
  isConfigured,
} from './api.js'
import './dashboard.css'

const CATEGORIES = ['Review', 'Order', 'Complaint', 'Compliment', 'Social', 'Other']
const SOURCES = ['Zomato', 'Swiggy', 'Instagram', 'WhatsApp', 'Direct', 'Other']
const UI_PASSWORD = import.meta.env.DASHBOARD_PASSWORD || ''

const COLORS = {
  positive: '#1aa260',
  negative: '#e5484d',
  accent: '#f59e0b',
  pie: ['#1aa260', '#e5484d', '#f59e0b', '#3b82f6', '#8b5cf6', '#64748b'],
}

const emptyEntry = () => ({
  date: new Date().toISOString().slice(0, 10),
  kitchen: '',
  type: 'positive',
  category: 'Review',
  source: 'Zomato',
  rating: '',
  notes: '',
  resolved: '',
})

export default function Dashboard() {
  const [authed, setAuthed] = useState(() => {
    if (!UI_PASSWORD) return true
    return sessionStorage.getItem('dash_auth') === '1'
  })

  if (!authed) return <Gate onPass={() => setAuthed(true)} />
  return <DashboardInner onLogout={() => { sessionStorage.removeItem('dash_auth'); setAuthed(false) }} />
}

function Gate({ onPass }) {
  const [val, setVal] = useState('')
  const [err, setErr] = useState('')
  const submit = (e) => {
    e.preventDefault()
    if (val === UI_PASSWORD) {
      sessionStorage.setItem('dash_auth', '1')
      onPass()
    } else {
      setErr('Wrong password')
    }
  }
  return (
    <div className="dash-gate">
      <form onSubmit={submit} className="dash-gate__card">
        <h1>YummyVoo Dashboard</h1>
        <p className="muted">Enter dashboard password</p>
        <input
          type="password"
          autoFocus
          value={val}
          onChange={(e) => { setVal(e.target.value); setErr('') }}
          placeholder="Password"
        />
        {err && <div className="dash-error">{err}</div>}
        <button type="submit" className="dash-btn dash-btn--primary">Unlock</button>
      </form>
    </div>
  )
}

function DashboardInner({ onLogout }) {
  const configured = isConfigured()
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(configured)
  const [error, setError] = useState(configured ? '' : 'Backend not configured. See dashboard-backend/SETUP.md and create .env.local.')
  const [editing, setEditing] = useState(null)       // entry object or null
  const [showForm, setShowForm] = useState(false)
  const [filters, setFilters] = useState({ type: 'all', source: 'all', q: '', from: '', to: '' })

  const refresh = useCallback(async () => {
    if (!isConfigured()) return
    setLoading(true); setError('')
    try {
      const data = await listEngagements()
      setRows(data)
    } catch (e) {
      setError(e.message || 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!configured) return
    refresh()
  }, [configured, refresh])

  const filtered = useMemo(() => {
    const q = filters.q.trim().toLowerCase()
    return rows.filter((r) => {
      if (filters.type !== 'all' && r.type !== filters.type) return false
      if (filters.source !== 'all' && r.source !== filters.source) return false
      if (filters.from && String(r.date) < filters.from) return false
      if (filters.to && String(r.date) > filters.to) return false
      if (q) {
        const hay = `${r.kitchen} ${r.notes} ${r.category} ${r.source}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [rows, filters])

  const stats = useMemo(() => computeStats(filtered), [filtered])

  const handleSave = async (entry) => {
    try {
      if (editing && editing.id) {
        await updateEngagement(editing.id, entry)
      } else {
        await createEngagement(entry)
      }
      setShowForm(false); setEditing(null)
      await refresh()
    } catch (e) {
      alert('Save failed: ' + e.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this engagement?')) return
    try {
      await deleteEngagement(id)
      await refresh()
    } catch (e) {
      alert('Delete failed: ' + e.message)
    }
  }

  const exportCsv = () => {
    const headers = ['id','date','kitchen','type','category','source','rating','notes','resolved','createdAt','updatedAt']
    const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
    const csv = [headers.join(',')]
      .concat(filtered.map((r) => headers.map((h) => esc(r[h])).join(',')))
      .join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `yummyvoo-engagements-${new Date().toISOString().slice(0,10)}.csv`
    document.body.appendChild(a); a.click(); a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="dash">
      <header className="dash-header">
        <div>
          <h1>Kitchen Engagements</h1>
          <p className="muted">Positive &amp; negative signals across your kitchens.</p>
        </div>
        <div className="dash-header__actions">
          <button className="dash-btn" onClick={refresh} disabled={loading}>↻ Refresh</button>
          <button className="dash-btn" onClick={exportCsv} disabled={!filtered.length}>⬇ Export CSV</button>
          <button className="dash-btn dash-btn--primary" onClick={() => { setEditing(null); setShowForm(true) }}>+ Add engagement</button>
          {UI_PASSWORD && <button className="dash-btn dash-btn--ghost" onClick={onLogout}>Log out</button>}
        </div>
      </header>

      {error && <div className="dash-error dash-error--banner">{error}</div>}

      <section className="dash-kpis">
        <KpiCard label="Total" value={stats.total} />
        <KpiCard label="Positive" value={`${stats.positive} (${stats.positivePct}%)`} tone="positive" />
        <KpiCard label="Negative" value={`${stats.negative} (${stats.negativePct}%)`} tone="negative" />
        <KpiCard label="Avg rating" value={stats.avgRating == null ? '—' : stats.avgRating.toFixed(2)} />
        <KpiCard label="Unresolved negatives" value={stats.unresolved} tone={stats.unresolved > 0 ? 'negative' : undefined} />
      </section>

      <section className="dash-filters">
        <input
          placeholder="Search notes, kitchen, category…"
          value={filters.q}
          onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
        />
        <select value={filters.type} onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value }))}>
          <option value="all">All types</option>
          <option value="positive">Positive</option>
          <option value="negative">Negative</option>
        </select>
        <select value={filters.source} onChange={(e) => setFilters((f) => ({ ...f, source: e.target.value }))}>
          <option value="all">All sources</option>
          {SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <label className="dash-filters__date">
          From <input type="date" value={filters.from} onChange={(e) => setFilters((f) => ({ ...f, from: e.target.value }))} />
        </label>
        <label className="dash-filters__date">
          To <input type="date" value={filters.to} onChange={(e) => setFilters((f) => ({ ...f, to: e.target.value }))} />
        </label>
        <button className="dash-btn dash-btn--ghost" onClick={() => setFilters({ type: 'all', source: 'all', q: '', from: '', to: '' })}>Clear</button>
      </section>

      <section className="dash-charts">
        <ChartCard title="Positive vs Negative over time">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={stats.byDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="positive" stroke={COLORS.positive} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="negative" stroke={COLORS.negative} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="By source">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={stats.bySource}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="source" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="positive" stackId="a" fill={COLORS.positive} />
              <Bar dataKey="negative" stackId="a" fill={COLORS.negative} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="By category">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={stats.byCategory} dataKey="count" nameKey="category" outerRadius={90} label>
                {stats.byCategory.map((_, i) => (
                  <Cell key={i} fill={COLORS.pie[i % COLORS.pie.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <section className="dash-table-wrap">
        <h2>Engagements ({filtered.length})</h2>
        {loading ? (
          <div className="muted">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="muted">No entries match your filters. Click <strong>+ Add engagement</strong> to log one.</div>
        ) : (
          <div className="dash-table-scroll">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Kitchen</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Source</th>
                  <th>Rating</th>
                  <th>Notes</th>
                  <th>Resolved</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered
                  .slice()
                  .sort((a, b) => String(b.date).localeCompare(String(a.date)))
                  .map((r) => (
                    <tr key={r.id}>
                      <td>{formatDate(r.date)}</td>
                      <td>{r.kitchen}</td>
                      <td>
                        <span className={`dash-pill dash-pill--${r.type}`}>{r.type}</span>
                      </td>
                      <td>{r.category}</td>
                      <td>{r.source}</td>
                      <td>{r.rating || '—'}</td>
                      <td className="dash-notes">{r.notes}</td>
                      <td>{r.type === 'negative' ? (r.resolved || '—') : '—'}</td>
                      <td className="dash-row-actions">
                        <button className="dash-btn dash-btn--small" onClick={() => { setEditing(r); setShowForm(true) }}>Edit</button>
                        <button className="dash-btn dash-btn--small dash-btn--danger" onClick={() => handleDelete(r.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {showForm && (
        <EntryForm
          initial={editing || emptyEntry()}
          onCancel={() => { setShowForm(false); setEditing(null) }}
          onSave={handleSave}
        />
      )}
    </div>
  )
}

function KpiCard({ label, value, tone }) {
  return (
    <div className={`dash-kpi${tone ? ` dash-kpi--${tone}` : ''}`}>
      <div className="dash-kpi__label">{label}</div>
      <div className="dash-kpi__value">{value}</div>
    </div>
  )
}

function ChartCard({ title, children }) {
  return (
    <div className="dash-chart-card">
      <h3>{title}</h3>
      {children}
    </div>
  )
}

function EntryForm({ initial, onCancel, onSave }) {
  const [form, setForm] = useState(() => ({ ...emptyEntry(), ...initial }))
  const [saving, setSaving] = useState(false)
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const submit = async (e) => {
    e.preventDefault()
    setSaving(true)
    await onSave({
      date: form.date,
      kitchen: form.kitchen.trim(),
      type: form.type,
      category: form.category,
      source: form.source,
      rating: form.rating === '' ? '' : Number(form.rating),
      notes: form.notes.trim(),
      resolved: form.type === 'negative' ? (form.resolved || '') : '',
    })
    setSaving(false)
  }

  return (
    <div className="dash-modal" role="dialog" aria-modal="true">
      <form className="dash-modal__card" onSubmit={submit}>
        <h2>{initial.id ? 'Edit engagement' : 'Add engagement'}</h2>

        <div className="dash-form-grid">
          <label>
            Date
            <input type="date" required value={form.date} onChange={(e) => set('date', e.target.value)} />
          </label>
          <label>
            Kitchen
            <input type="text" placeholder="e.g. YummyVoo HSR" value={form.kitchen} onChange={(e) => set('kitchen', e.target.value)} />
          </label>
          <label>
            Type
            <select value={form.type} onChange={(e) => set('type', e.target.value)}>
              <option value="positive">Positive</option>
              <option value="negative">Negative</option>
            </select>
          </label>
          <label>
            Category
            <select value={form.category} onChange={(e) => set('category', e.target.value)}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
          <label>
            Source
            <select value={form.source} onChange={(e) => set('source', e.target.value)}>
              {SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
          <label>
            Rating (1–5)
            <input type="number" min="1" max="5" step="1" value={form.rating} onChange={(e) => set('rating', e.target.value)} />
          </label>
          {form.type === 'negative' && (
            <label>
              Resolved?
              <select value={form.resolved} onChange={(e) => set('resolved', e.target.value)}>
                <option value="">—</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </label>
          )}
        </div>

        <label className="dash-form-full">
          Notes
          <textarea rows="4" value={form.notes} onChange={(e) => set('notes', e.target.value)} placeholder="What happened? Any customer quote, action taken, etc." />
        </label>

        <div className="dash-modal__actions">
          <button type="button" className="dash-btn dash-btn--ghost" onClick={onCancel} disabled={saving}>Cancel</button>
          <button type="submit" className="dash-btn dash-btn--primary" disabled={saving}>
            {saving ? 'Saving…' : (initial.id ? 'Save changes' : 'Add engagement')}
          </button>
        </div>
      </form>
    </div>
  )
}

// ---------- stats helpers ----------

function computeStats(rows) {
  const total = rows.length
  let positive = 0, negative = 0, ratingSum = 0, ratingCount = 0, unresolved = 0
  const byDayMap = new Map()
  const bySourceMap = new Map()
  const byCategoryMap = new Map()

  for (const r of rows) {
    if (r.type === 'positive') positive++
    else if (r.type === 'negative') {
      negative++
      if (r.resolved !== 'yes') unresolved++
    }
    const rt = Number(r.rating)
    if (rt >= 1 && rt <= 5) { ratingSum += rt; ratingCount++ }

    const day = String(r.date || '').slice(0, 10)
    if (day) {
      const d = byDayMap.get(day) || { date: day, positive: 0, negative: 0 }
      d[r.type] = (d[r.type] || 0) + 1
      byDayMap.set(day, d)
    }
    const src = r.source || 'Other'
    const s = bySourceMap.get(src) || { source: src, positive: 0, negative: 0 }
    s[r.type] = (s[r.type] || 0) + 1
    bySourceMap.set(src, s)

    const cat = r.category || 'Other'
    byCategoryMap.set(cat, (byCategoryMap.get(cat) || 0) + 1)
  }

  const byDay = [...byDayMap.values()].sort((a, b) => a.date.localeCompare(b.date))
  const bySource = [...bySourceMap.values()].sort((a, b) => (b.positive + b.negative) - (a.positive + a.negative))
  const byCategory = [...byCategoryMap.entries()].map(([category, count]) => ({ category, count }))

  return {
    total,
    positive,
    negative,
    positivePct: total ? Math.round((positive / total) * 100) : 0,
    negativePct: total ? Math.round((negative / total) * 100) : 0,
    avgRating: ratingCount ? ratingSum / ratingCount : null,
    unresolved,
    byDay,
    bySource,
    byCategory,
  }
}

function formatDate(iso) {
  if (!iso) return ''
  const s = String(iso).slice(0, 10)
  const [y, m, d] = s.split('-')
  if (!y || !m || !d) return s
  return `${d}/${m}/${y}`
}