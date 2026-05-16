import Link from 'next/link'
import { signUpAction } from '@/app/actions'
import { AuthForm } from '@/components/auth-form'
import { getAdminExists } from '@/lib/data'

export const dynamic = 'force-dynamic'

export default async function SignUpPage({ searchParams }) {
  const params = await searchParams
  const error = params?.error
  const hasAdmin = await getAdminExists()

  return (
    <main className="page-shell hero">
      <div className="auth-stack" style={{ gridTemplateColumns: 'minmax(0, 560px)' }}>
        <AuthForm
          title="Create account"
          subtitle={
            hasAdmin
              ? 'Create a customer account with username and password only.'
              : 'Create the first account to become the store admin.'
          }
          action={signUpAction}
          submitLabel={hasAdmin ? 'Create customer account' : 'Create admin account'}
          extraLink={
            <>
              Already have an account? <Link href="/sign-in">Sign in here</Link>.
            </>
          }
        >
          {error ? <div className="empty">{error}</div> : null}
          {!hasAdmin ? (
            <div className="empty">
              No admin account exists yet. The first registered account will become the admin.
            </div>
          ) : null}
          <label>
            Full name
            <input name="fullName" placeholder="Enter full name" required />
          </label>
          <label>
            Username
            <input name="username" placeholder="Choose username" required />
          </label>
          <label>
            Password
            <input name="password" type="password" placeholder="At least 6 characters" required />
          </label>
        </AuthForm>
      </div>
    </main>
  )
}
