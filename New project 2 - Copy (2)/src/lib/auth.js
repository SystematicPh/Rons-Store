import bcrypt from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getEnv } from '@/lib/env'
import { getSupabaseAdmin } from '@/lib/supabase'

const SESSION_COOKIE = 'ronals-session'

function getSecretKey() {
  return new TextEncoder().encode(getEnv('SESSION_SECRET'))
}

export async function hashPassword(password) {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash)
}

export async function createSession(user) {
  const token = await new SignJWT({
    sub: user.id,
    username: user.username,
    role: user.role,
    fullName: user.full_name
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecretKey())

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  })
}

export async function clearSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

export async function getSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value

  if (!token) {
    return null
  }

  try {
    const { payload } = await jwtVerify(token, getSecretKey())
    return payload
  } catch {
    return null
  }
}

export async function getCurrentUser() {
  const session = await getSession()

  if (!session?.sub) {
    return null
  }

  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', session.sub)
    .single()

  if (error) {
    return null
  }

  return data
}

export async function requireUser() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/sign-in')
  }

  return user
}

export async function requireAdmin() {
  const user = await requireUser()

  if (user.role !== 'admin') {
    redirect('/dashboard')
  }

  return user
}
