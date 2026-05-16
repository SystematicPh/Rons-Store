import Link from 'next/link'
import { redirect } from 'next/navigation'
import {
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Wallet,
  Users,
  Coins
} from 'lucide-react'

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
    <main className="relative min-h-screen overflow-hidden bg-[#070b17] text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-[-120px] h-[380px] w-[380px] rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-[-120px] right-[-120px] h-[380px] w-[380px] rounded-full bg-violet-500/20 blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-8 md:px-8">
        {/* HERO */}
        <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          {/* Left */}
          <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-violet-500/10 p-8 shadow-2xl backdrop-blur-xl md:p-12">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">
              <Sparkles size={16} />
              Grocery Loyalty & Pointing System
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-tight tracking-tight md:text-6xl">
              Ronald Store
              <span className="block bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent">
                Sulit Saya
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
              A modern grocery rewards platform where admins can manage
              customers, monitor sales analytics, configure reward rules, and
              update spending using a dedicated customer management page.
            </p>

            {/* Features */}
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                'Custom points per peso',
                'Admin analytics',
                'Rewards management',
                'Username-only login',
                'Customer dashboard'
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 backdrop-blur"
                >
                  {item}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/sign-in"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-6 py-4 font-bold text-black transition hover:scale-[1.02]"
              >
                Sign In
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-semibold text-white transition hover:bg-white/10"
              >
                Create Account
              </Link>
            </div>
          </div>

          {/* Right Auth Cards */}
          <div className="flex flex-col gap-6">
            {/* Sign In */}
            <Link
              href="/sign-in"
              className="group rounded-3xl border border-white/10 bg-white/5 p-7 shadow-xl backdrop-blur-xl transition hover:border-cyan-400/40 hover:bg-cyan-400/5"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                <ShieldCheck size={28} />
              </div>

              <h2 className="text-2xl font-bold">Sign In</h2>

              <p className="mt-3 leading-relaxed text-slate-400">
                Login using your username and password. No email address
                required.
              </p>

              <div className="mt-5 inline-flex items-center gap-2 font-semibold text-cyan-300">
                Open Sign In
                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-1"
                />
              </div>
            </Link>

            {/* Sign Up */}
            <Link
              href="/sign-up"
              className="group rounded-3xl border border-white/10 bg-white/5 p-7 shadow-xl backdrop-blur-xl transition hover:border-violet-400/40 hover:bg-violet-400/5"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-400/10 text-violet-300">
                <Users size={28} />
              </div>

              <h2 className="text-2xl font-bold">Create Account</h2>

              <p className="mt-3 leading-relaxed text-slate-400">
                The first account becomes the administrator. All next users
                automatically become customers.
              </p>

              <div className="mt-5 inline-flex items-center gap-2 font-semibold text-violet-300">
                Open Sign Up
                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-1"
                />
              </div>
            </Link>
          </div>
        </section>

        {/* FEATURES */}
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
              <Coins size={26} />
            </div>

            <h3 className="text-xl font-bold">Flexible Rewards</h3>

            <p className="mt-3 leading-relaxed text-slate-400">
              Configure custom points based on customer spending rules.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-400/10 text-violet-300">
              <TrendingUp size={26} />
            </div>

            <h3 className="text-xl font-bold">Sales Analytics</h3>

            <p className="mt-3 leading-relaxed text-slate-400">
              Monitor daily, weekly, monthly, and yearly sales activity.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
              <ShoppingBag size={26} />
            </div>

            <h3 className="text-xl font-bold">Purchase Tracking</h3>

            <p className="mt-3 leading-relaxed text-slate-400">
              Automatically update customer spending and reward points.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-400/10 text-orange-300">
              <Wallet size={26} />
            </div>

            <h3 className="text-xl font-bold">Customer Dashboard</h3>

            <p className="mt-3 leading-relaxed text-slate-400">
              Customers can track points, rewards, and purchase history.
            </p>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <div className="mb-5 inline-flex rounded-2xl bg-cyan-400/10 p-4 text-cyan-300">
              <Coins size={28} />
            </div>

            <h2 className="text-3xl font-black">
              How the points system works
            </h2>

            <p className="mt-5 leading-relaxed text-slate-300">
              Admins can configure custom reward rules like:
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <strong className="text-cyan-300">
                  ₱100 spent = 1 point
                </strong>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <strong className="text-violet-300">
                  ₱50 spent = 0.5 points
                </strong>
              </div>
            </div>

            <p className="mt-6 leading-relaxed text-slate-400">
              Once purchases are entered, the system automatically computes and
              adds reward points to the customer account.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <div className="mb-5 inline-flex rounded-2xl bg-violet-400/10 p-4 text-violet-300">
              <ShieldCheck size={28} />
            </div>

            <h2 className="text-3xl font-black">Admin management tools</h2>

            <div className="mt-6 space-y-4">
              {[
                'Customer lookup and management',
                'Reward configuration',
                'Purchase and spending updates',
                'Analytics dashboard',
                'Dedicated /admin/[username] page'
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4"
                >
                  <div className="h-2.5 w-2.5 rounded-full bg-violet-300" />
                  <span className="text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pb-6 pt-2 text-center text-sm text-slate-500">
          Built with Next.js, Supabase, GitHub, and Vercel deployment.
        </footer>
      </div>
    </main>
  )
}