import Link from 'next/link'
import { signInAction } from '@/app/actions'
import { AuthForm } from '@/components/auth-form'

export const dynamic = 'force-dynamic'

export default async function SignInPage({ searchParams }) {
  const params = await searchParams
  const error = params?.error

  return (
    <main className="page-shell hero">
      <div className="auth-stack" style={{ gridTemplateColumns: 'minmax(0, 560px)' }}>
        <AuthForm
          title="Sign in"
          subtitle="Use your username and password to access the system."
          action={signInAction}
          submitLabel="Sign in"
          extraLink={
            <>
              No account yet? <Link href="/sign-up">Create one here</Link>.
            </>
          }
        >
          {error ? <div className="empty">{error}</div> : null}
          <label>
            Username
            <input name="username" placeholder="Enter username" required />
          </label>
          <label>
            Password
            <input name="password" type="password" placeholder="Enter password" required />
          </label>
        </AuthForm>
      </div>
    </main>
  )
}
