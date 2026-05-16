import Link from 'next/link'
import { signOutAction } from '@/app/actions'

export function TopBar({ user, admin = false }) {
  return (
    <div className="topbar">
      <div className="brand">
        <span className="badge">{admin ? 'Admin Panel' : 'Customer Dashboard'}</span>
        <strong>Ronald Store Sulit Saya</strong>
        <span className="subtle">
          Signed in as {user.full_name} (@{user.username})
        </span>
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Link className="button secondary" href={admin ? '/admin' : '/dashboard'}>
          {admin ? 'Dashboard Home' : 'My Dashboard'}
        </Link>
        {admin ? (
          <Link className="button secondary" href="/dashboard">
            Customer View
          </Link>
        ) : null}
        <form action={signOutAction}>
          <button type="submit" className="secondary">
            Sign out
          </button>
        </form>
      </div>
    </div>
  )
}
