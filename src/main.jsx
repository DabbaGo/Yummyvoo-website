import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './style.css'
import App from './App.jsx'

// Lazy-load the dashboard so recharts + its CSS don't bloat the marketing bundle.
const Dashboard = lazy(() => import('./dashboard/Dashboard.jsx'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/dashboard/*"
          element={
            <Suspense fallback={<div style={{ padding: 40, fontFamily: 'system-ui' }}>Loading dashboard…</div>}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
