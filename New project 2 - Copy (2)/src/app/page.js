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

  const features = [
    {
      icon: '💎',
      title: 'Smart Rewards',
      text: 'Automatically reward customers based on total purchases and spending activity.'
    },
    {
      icon: '📊',
      title: 'Sales Analytics',
      text: 'Track daily, weekly, monthly, and yearly grocery sales in real time.'
    },
    {
      icon: '👥',
      title: 'Customer Management',
      text: 'Search customers, update spending, and manage reward history easily.'
    },
    {
      icon: '⚡',
      title: 'Fast & Modern',
      text: 'Built using Next.js, Supabase, and Vercel for speed and reliability.'
    }
  ]

  const stats = [
    { value: 'Real-time', label: 'Sales Tracking' },
    { value: 'Secure', label: 'Authentication' },
    { value: 'Automatic', label: 'Points System' }
  ]

  return (
    <main className="min-h-screen overflow-hidden bg-[#07111f] text-white">
      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute left-[-120px] top-[-120px] h-[400px] w-[400px] rounded-full bg-emerald-500/20 blur-3xl" />

        <div className="absolute bottom-[-150px] right-[-100px] h-[400px] w-[400px] rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:70px_70px]" />
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07111f]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 md:px-8">
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400 text-2xl shadow-lg shadow-emerald-500/30">
              🛒
            </div>

            <div>
              <h1 className="text-lg font-black tracking-tight">
                Ronald Store
              </h1>

              <p className="text-xs text-slate-400">
                Sulit Saya Rewards
              </p>
            </div>
          </div>

          {/* NAV */}
          <nav className="hidden items-center gap-8 lg:flex">
            <a
              href="#features"
              className="text-sm text-slate-300 transition hover:text-white"
            >
              Features
            </a>

            <a
              href="#dashboard"
              className="text-sm text-slate-300 transition hover:text-white"
            >
              Dashboard
            </a>

            <a
              href="#about"
              className="text-sm text-slate-300 transition hover:text-white"
            >
              About
            </a>
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">
            <Link
              href="/sign-in"
              className="hidden rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 md:inline-flex"
            >
              Sign In
            </Link>

            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-5 py-2.5 text-sm font-bold text-black transition hover:scale-[1.02]"
            >
              Get Started →
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative">
        <div className="mx-auto grid w-full max-w-7xl gap-20 px-4 py-24 md:px-8 lg:grid-cols-2 lg:items-center lg:py-32">
          {/* LEFT */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-300">
              ✨ Grocery Loyalty & Rewards Platform
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">
              Modern rewards
              <span className="block bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                for grocery stores
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
              Manage customers, track grocery sales, automate reward points,
              and grow customer loyalty with a clean and modern platform.
            </p>

            {/* BUTTONS */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-8 py-4 text-lg font-bold text-black shadow-2xl shadow-emerald-500/20 transition hover:scale-[1.02]"
              >
                Create Account →
              </Link>

              <Link
                href="/sign-in"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                Sign In
              </Link>
            </div>

            {/* STATS */}
            <div className="mt-14 grid grid-cols-3 gap-5">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
                >
                  <h3 className="text-2xl font-black text-emerald-300">
                    {stat.value}
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT MOCKUP */}
          <div
            id="dashboard"
            className="relative"
          >
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-2xl">
              {/* TOP */}
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-300">
                      Customer Points
                    </p>

                    <h2 className="mt-2 text-5xl font-black">
                      1,250
                    </h2>

                    <p className="mt-3 text-sm text-emerald-200">
                      +12% this month
                    </p>
                  </div>

                  <div className="rounded-3xl bg-white/10 p-4 text-4xl">
                    💎
                  </div>
                </div>

                <div className="mt-8">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-slate-300">
                      Reward Progress
                    </span>

                    <span className="text-emerald-200">
                      75%
                    </span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[75%] rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
                  </div>
                </div>
              </div>

              {/* CARDS */}
              <div className="mt-6 grid gap-4">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold">
                        ₱500 Purchase Added
                      </h3>

                      <p className="mt-1 text-sm text-slate-400">
                        Customer spending updated automatically
                      </p>
                    </div>

                    <span className="rounded-full bg-emerald-400/20 px-4 py-2 text-sm font-bold text-emerald-300">
                      +5 pts
                    </span>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold">
                        Monthly Analytics
                      </h3>

                      <p className="mt-1 text-sm text-slate-400">
                        Grocery sales increased this month
                      </p>
                    </div>

                    <span className="rounded-full bg-cyan-400/20 px-4 py-2 text-sm font-bold text-cyan-300">
                      Live
                    </span>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold">
                        Milk Tea Reward
                      </h3>

                      <p className="mt-1 text-sm text-slate-400">
                        Customer reward available for redemption
                      </p>
                    </div>

                    <span className="rounded-full bg-orange-400/20 px-4 py-2 text-sm font-bold text-orange-300">
                      Ready
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* FLOATING */}
            <div className="absolute -bottom-8 -left-8 hidden rounded-3xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-xl lg:block">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-emerald-400/20 p-4 text-3xl">
                  📈
                </div>

                <div>
                  <h4 className="font-black">
                    Real-time Analytics
                  </h4>

                  <p className="text-sm text-slate-400">
                    Daily • Weekly • Monthly
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="border-t border-white/10 bg-[#0b1728]"
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-24 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-5xl font-black">
              Everything your grocery store needs
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-slate-400">
              Built to improve customer loyalty, simplify reward management,
              and modernize grocery store operations.
            </p>
          </div>

          <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-[28px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:bg-white/10"
              >
                <div className="mb-6 text-5xl">
                  {feature.icon}
                </div>

                <h3 className="text-2xl font-black">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-relaxed text-slate-400">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="about"
        className="mx-auto w-full max-w-7xl px-4 py-24 md:px-8"
      >
        <div className="overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 p-10 backdrop-blur-xl md:p-16">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-5xl font-black leading-tight">
              Start building customer loyalty today
            </h2>

            <p className="mt-6 text-xl leading-relaxed text-slate-300">
              Create reward systems, monitor grocery sales, and manage customer
              spending from a beautiful modern dashboard.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-8 py-4 text-lg font-black text-black transition hover:scale-[1.02]"
              >
                Create Free Account
              </Link>

              <Link
                href="/sign-in"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Open Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#07111f]">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-5 px-4 py-10 text-center text-sm text-slate-500 md:flex-row md:px-8">
          <p>
            © 2026 Ronald Store Sulit Saya. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <span>Next.js</span>
            <span>Supabase</span>
            <span>GitHub</span>
            <span>Vercel</span>
          </div>
        </div>
      </footer>
    </main>
  )
}