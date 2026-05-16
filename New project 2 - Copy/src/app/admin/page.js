import Link from 'next/link'
import {
  addRewardAction,
  deleteRewardAction,
  openCustomerProfileAction,
  updatePointRuleAction
} from '@/app/actions'
import { TopBar } from '@/components/topbar'
import { requireAdmin } from '@/lib/auth'
import {
  getCustomers,
  getDashboardAnalytics,
  getRewards,
  getSettings
} from '@/lib/data'
import { formatCurrency, formatPoints } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function AdminPage({ searchParams }) {
  const admin = await requireAdmin()
  const params = await searchParams
  const success = params?.success
  const error = params?.error
  const [analytics, customers, rewards, settings] = await Promise.all([
    getDashboardAnalytics(),
    getCustomers(),
    getRewards(),
    getSettings()
  ])

  return (
    <main className="page-shell">
      <section className="customer-hero">
        <TopBar user={admin} admin />
      </section>

      <section className="metrics-grid">
        <div className="card metric-card">
          <span className="metric-label">Today</span>
          <p className="metric-value money">{formatCurrency(analytics.today)}</p>
        </div>
        <div className="card metric-card">
          <span className="metric-label">This week</span>
          <p className="metric-value money">{formatCurrency(analytics.week)}</p>
        </div>
        <div className="card metric-card">
          <span className="metric-label">This month</span>
          <p className="metric-value money">{formatCurrency(analytics.month)}</p>
        </div>
        <div className="card metric-card">
          <span className="metric-label">This year</span>
          <p className="metric-value money">{formatCurrency(analytics.year)}</p>
        </div>
      </section>

      <section className="dashboard-grid">
        <div className="card">
          <div className="dashboard-header">
            <div>
              <h1 style={{ marginBottom: 8 }}>Admin Dashboard</h1>
              <p className="subtle" style={{ marginTop: 0 }}>
                Search customers, open their dedicated `/admin/username` page, and add new
                purchases that automatically convert into points.
              </p>
            </div>
            <span className="badge">{customers.length} customers</span>
          </div>

          {success ? <div className="empty">{success}</div> : null}
          {error ? <div className="empty">{error}</div> : null}

          <div className="card" style={{ marginTop: 18 }}>
            <h3 className="section-title">Current pointing system</h3>
            <p className="subtle">
              Every {formatCurrency(settings.peso_step)} spent = {formatPoints(settings.point_value)} points
            </p>
            <form action={updatePointRuleAction} className="split-grid">
              <label>
                Pesos spent
                <input
                  name="pesoStep"
                  type="number"
                  step="0.01"
                  min="0.01"
                  defaultValue={settings.peso_step}
                  required
                />
              </label>
              <label>
                Points earned
                <input
                  name="pointValue"
                  type="number"
                  step="0.01"
                  min="0.01"
                  defaultValue={settings.point_value}
                  required
                />
              </label>
              <button type="submit">Save pointing system</button>
            </form>
          </div>

          <div className="card" style={{ marginTop: 18 }}>
            <h3 className="section-title">Customer Management System</h3>
            <p className="subtle">
              Search a username to open the linked admin page, then add how much that customer
              spent so the points are added automatically.
            </p>
            <form action={openCustomerProfileAction} className="search-row" style={{ marginBottom: 18 }}>
              <input
                name="username"
                placeholder="Search customer username"
                aria-label="Search customer username"
                required
              />
              <button type="submit">Open /admin/username</button>
            </form>
            {customers.length === 0 ? (
              <div className="empty">No customers yet. Ask users to sign up first.</div>
            ) : (
              customers.map((customer) => (
                <div className="list-row" key={customer.id}>
                  <div>
                    <strong>{customer.full_name}</strong>
                    <div className="subtle">@{customer.username}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="subtle money">{formatCurrency(customer.total_spent)}</div>
                    <div>{formatPoints(customer.points)} pts</div>
                  </div>
                  <Link className="button secondary" href={`/admin/${customer.username}`}>
                    Open profile
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="card">
          <h2 className="section-title">Rewards Control</h2>
          <form action={addRewardAction} className="form-grid">
            <label>
              Points required
              <input name="pointsRequired" type="number" min="0.01" step="0.01" required />
            </label>
            <label>
              Reward text
              <textarea
                name="rewardText"
                placeholder="Example: 100 points = 1 free rice pack or 10% discount coupon"
                required
              />
            </label>
            <button type="submit">Add reward</button>
          </form>

          <div style={{ marginTop: 22 }}>
            {rewards.length === 0 ? (
              <div className="empty">No rewards added yet.</div>
            ) : (
              rewards.map((reward) => (
                <div className="reward-item" key={reward.id}>
                  <div>
                    <strong>{formatPoints(reward.points_required)} points</strong>
                    <div className="subtle">{reward.reward_text}</div>
                  </div>
                  <form action={deleteRewardAction}>
                    <input type="hidden" name="rewardId" value={reward.id} />
                    <button type="submit" className="danger">
                      Delete
                    </button>
                  </form>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
