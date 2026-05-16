import Link from 'next/link'
import { TopBar } from '@/components/topbar'
import { requireUser } from '@/lib/auth'
import { getPurchaseLogsForCustomer, getRewards } from '@/lib/data'
import { formatCurrency, formatPoints } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const user = await requireUser()
  const [rewards, logs] = await Promise.all([
    getRewards(),
    getPurchaseLogsForCustomer(user.id)
  ])

  return (
    <main className="page-shell">
      <section className="customer-hero">
        <TopBar user={user} admin={user.role === 'admin'} />
      </section>

      <section className="dashboard-grid">
        <div className="card">
          <h1 style={{ marginTop: 0 }}>Welcome back, {user.full_name}</h1>
          <p className="subtle">
            This dashboard shows your current spending total and the points already earned.
          </p>
          <div className="customer-stats" style={{ marginTop: 22 }}>
            <div className="card metric-card">
              <span className="metric-label">Total spent</span>
              <p className="metric-value money">{formatCurrency(user.total_spent)}</p>
            </div>
            <div className="card metric-card">
              <span className="metric-label">Available points</span>
              <p className="metric-value">{formatPoints(user.points)}</p>
            </div>
            <div className="card metric-card">
              <span className="metric-label">Username</span>
              <p className="metric-value" style={{ fontSize: '1.55rem' }}>
                @{user.username}
              </p>
            </div>
          </div>
          {user.role === 'admin' ? (
            <div className="empty" style={{ marginTop: 18 }}>
              You are also an admin. Open the <Link href="/admin">admin dashboard</Link> to
              manage customers, rewards, and analytics.
            </div>
          ) : null}
        </div>

        <div className="card">
          <h2 className="section-title">Rewards you can earn</h2>
          {rewards.length === 0 ? (
            <div className="empty">No rewards have been added yet.</div>
          ) : (
            rewards.map((reward) => (
              <div className="reward-item" key={reward.id}>
                <div>
                  <strong>{formatPoints(reward.points_required)} points</strong>
                  <div className="subtle">{reward.reward_text}</div>
                </div>
                <span className="badge">
                  {Number(user.points) >= Number(reward.points_required) ? 'Ready' : 'Locked'}
                </span>
              </div>
            ))
          )}
        </div>
      </section>

      <section style={{ paddingBottom: 52 }}>
        <div className="card">
          <h2 className="section-title">Recent purchase updates</h2>
          {logs.length === 0 ? (
            <div className="empty">No purchases have been added to your account yet.</div>
          ) : (
            logs.map((log) => (
              <div className="list-row" key={log.id}>
                <div>
                  <strong className="money">{formatCurrency(log.amount)}</strong>
                  <div className="subtle">
                    Added by {log.admin?.full_name || log.admin?.username || 'Admin'}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <strong>+{formatPoints(log.points_earned)} pts</strong>
                  <div className="subtle">
                    {new Date(log.created_at).toLocaleString('en-PH')}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  )
}
