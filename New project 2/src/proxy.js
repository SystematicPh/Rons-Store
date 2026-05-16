import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const SESSION_COOKIE = 'ronals-session'

async function getSession(request) {
  const token = request.cookies.get(SESSION_COOKIE)?.value

  if (!token || !process.env.SESSION_SECRET) {
    return null
  }

  try {
    const secret = new TextEncoder().encode(process.env.SESSION_SECRET)
    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch {
    return null
  }
}

export async function proxy(request) {
  const { pathname } = request.nextUrl
  const session = await getSession(request)

  if ((pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) && !session) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  if (pathname.startsWith('/admin') && session?.role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if ((pathname === '/sign-in' || pathname === '/sign-up') && session?.role === 'admin') {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  if ((pathname === '/sign-in' || pathname === '/sign-up') && session?.role === 'customer') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*', '/sign-in', '/sign-up']
}
