import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const session = await getSession()

  if (session?.role === 'admin') {
    redirect('/admin')
  }

  if (session?.role === 'customer') {
    redirect('/dashboard')
  }

  return (
    <main className="page-shell hero">
      <section className="hero-grid">
        <div className="panel hero-card">
          <span className="eyebrow">Groceries Loyalty and Pointing System</span>
          <h1>Ronald Store Sulit Saya</h1>
          <p className="lead">
            A clean grocery rewards website where admins can control how points are earned,
            track customer spending, manage rewards, and update a specific user using the
            dedicated <strong> /admin/username </strong> page.
          </p>
          <div className="pill-row">
            <span className="pill">Custom points per peso</span>
            <span className="pill">Admin analytics</span>
            <span className="pill">Rewards control</span>
            <span className="pill">Username-only login</span>
          </div>
        </div>
        <div className="auth-stack">
          <Link className="card" href="/sign-in">
            <h2>Sign in</h2>
            <p className="subtle">
              Login using only your username and password. No email is required.
            </p>
            <span className="button" style={{ display: 'inline-block', marginTop: 12 }}>
              Open sign in
            </span>
          </Link>
          <Link className="card" href="/sign-up">
            <h2>Create account</h2>
            <p className="subtle">
              The very first account becomes the admin. All next accounts become customers.
            </p>
            <span className="button" style={{ display: 'inline-block', marginTop: 12 }}>
              Open sign up
            </span>
          </Link>
        </div>
      </section>
      <section className="dashboard-grid" style={{ paddingTop: 0 }}>
        <div className="card">
          <h2 className="section-title">How the points work</h2>
          <p className="subtle">
            The admin can set rules like every 100 pesos spent equals 1 point, or every 50
            pesos spent equals 0.5 points. When the admin enters a purchase for a customer,
            the system adds both the spending total and the computed points automatically.
          </p>
        </div>
        <div className="card">
          <h2 className="section-title">What the admin sees</h2>
          <p className="subtle">
            Daily, weekly, monthly, and yearly sales analytics, customer lookup, spending
            updates, and rewards management from one dashboard.
          </p>
        </div>
      </section>
      <p className="footer-note">
        Built for Supabase database storage, GitHub source control, and Vercel deployment.
      </p>
    </main>
  )
}
