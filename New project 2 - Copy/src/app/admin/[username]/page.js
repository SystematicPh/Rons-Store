import Link from 'next/link'
import { addPurchaseAction } from '@/app/actions'
import { TopBar } from '@/components/topbar'
import { requireAdmin } from '@/lib/auth'
import {
  getCustomerByUsername,
  getPurchaseLogsForCustomer,
  getRewards,
  getSettings
} from '@/lib/data'
import { formatCurrency, formatPoints } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function AdminCustomerPage({ params, searchParams }) {
  const admin = await requireAdmin()
  const { username } = await params
  const query = await searchParams
  const customer = await getCustomerByUsername(username)

  if (!customer || customer.role !== 'customer') {
    return (
      <main className="page-shell hero">
        <div className="card">
          <h1>Customer not found</h1>
          <p className="subtle">
            The username <strong>@{username}</strong> does not exist as a customer account.
          </p>
          <Link className="button secondary" href="/admin">
            Back to admin dashboard
          </Link>
        </div>
      </main>
    )
  }

  const [logs, rewards, settings] = await Promise.all([
    getPurchaseLogsForCustomer(customer.id),
    getRewards(),
    getSettings()
  ])

  return (
    <main className="page-shell">
      <section className="customer-hero">
        <TopBar user={admin} admin />
      </section>

      <section className="details-grid">
        <div className="card">
          <div className="dashboard-header">
            <div>
              <span className="badge">/admin/{customer.username}</span>
              <h1 style={{ marginBottom: 8 }}>{customer.full_name}</h1>
              <p className="subtle" style={{ marginTop: 0 }}>
                View total spent, current points, and add a new purchase to this user.
              </p>
            </div>
            <Link className="button secondary" href="/admin">
              Back to admin
            </Link>
          </div>

          {query?.success ? <div className="empty">{query.success}</div> : null}
          {query?.error ? <div className="empty">{query.error}</div> : null}

          <div className="customer-stats" style={{ marginTop: 20 }}>
            <div className="card metric-card">
              <span className="metric-label">Total spent</span>
              <p className="metric-value money">{formatCurrency(customer.total_spent)}</p>
            </div>
            <div className="card metric-card">
              <span className="metric-label">Current points</span>
              <p className="metric-value">{formatPoints(customer.points)}</p>
            </div>
            <div className="card metric-card">
              <span className="metric-label">Current rule</span>
              <p className="metric-value" style={{ fontSize: '1.5rem' }}>
                {formatPoints(settings.point_value)}
              </p>
              <div className="subtle">
                per {formatCurrency(settings.peso_step)} spent
              </div>
            </div>
          </div>

          <div className="card" style={{ marginTop: 18 }}>
            <h2 className="section-title">Add purchase and points</h2>
            <p className="subtle">
              Enter how much this customer spent. The system will compute and add the right
              points based on your current pointing rule.
            </p>
            <form action={addPurchaseAction} className="form-grid">
              <input type="hidden" name="username" value={customer.username} />
              <label>
                Amount spent in pesos
                <input name="amount" type="number" min="0.01" step="0.01" required />
              </label>
              <button type="submit">Save purchase and add points</button>
            </form>
          </div>
        </div>

        <div className="card">
          <h2 className="section-title">Rewards status</h2>
          {rewards.length === 0 ? (
            <div className="empty">No rewards available yet.</div>
          ) : (
            rewards.map((reward) => (
              <div className="reward-item" key={reward.id}>
                <div>
                  <strong>{formatPoints(reward.points_required)} points</strong>
                  <div className="subtle">{reward.reward_text}</div>
                </div>
                <span className="badge">
                  {Number(customer.points) >= Number(reward.points_required)
                    ? 'Can redeem'
                    : 'Need more'}
                </span>
              </div>
            ))
          )}

          <h2 className="section-title" style={{ marginTop: 26 }}>
            Recent logs
          </h2>
          {logs.length === 0 ? (
            <div className="empty">No logged purchases for this customer yet.</div>
          ) : (
            logs.map((log) => (
              <div className="list-row" key={log.id}>
                <div>
                  <strong className="money">{formatCurrency(log.amount)}</strong>
                  <div className="subtle">+{formatPoints(log.points_earned)} points</div>
                </div>
                <div className="subtle">{new Date(log.created_at).toLocaleString('en-PH')}</div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  )
}
