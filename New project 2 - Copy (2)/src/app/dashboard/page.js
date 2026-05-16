import Link from 'next/link'
import {
  Gift,
  Coins,
  Wallet,
  User2,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Clock3
} from 'lucide-react'

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
    <main className="min-h-screen bg-[#0b1020] text-white">
      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-[-120px] left-[-80px] h-[320px] w-[320px] rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-[-120px] right-[-80px] h-[320px] w-[320px] rounded-full bg-violet-500/20 blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 md:px-8">
        {/* Topbar */}
        <TopBar user={user} admin={user.role === 'admin'} />

        {/* Hero */}
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/15 via-slate-900 to-violet-500/10 p-8 shadow-2xl backdrop-blur">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-sm text-cyan-300">
                <Sparkles size={15} />
                Customer Dashboard
              </div>

              <h1 className="text-4xl font-black tracking-tight md:text-5xl">
                Welcome back,
                <span className="block bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent">
                  {user.full_name}
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
                Track your spending, monitor reward points, and view your latest
                purchase activity in one place.
              </p>

              {user.role === 'admin' && (
                <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-200">
                  <div className="mb-2 flex items-center gap-2 font-semibold">
                    <ShieldCheck size={16} />
                    Admin Access Enabled
                  </div>

                  <p className="mb-3 text-emerald-100/90">
                    You can manage customers, rewards, and analytics from the
                    admin dashboard.
                  </p>

                  <Link
                    href="/admin"
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-4 py-2 font-semibold text-black transition hover:scale-[1.02]"
                  >
                    Open Admin Dashboard
                    <ArrowRight size={16} />
                  </Link>
                </div>
              )}
            </div>

            {/* Profile Card */}
            <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 text-black">
                  <User2 size={28} />
                </div>

                <div>
                  <h3 className="text-xl font-bold">{user.full_name}</h3>
                  <p className="text-sm text-slate-400">@{user.username}</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="mb-2 flex items-center gap-2 text-slate-400">
                    <Wallet size={16} />
                    <span className="text-sm">Spent</span>
                  </div>

                  <p className="text-xl font-black text-cyan-300">
                    {formatCurrency(user.total_spent)}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="mb-2 flex items-center gap-2 text-slate-400">
                    <Coins size={16} />
                    <span className="text-sm">Points</span>
                  </div>

                  <p className="text-xl font-black text-violet-300">
                    {formatPoints(user.points)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Grid */}
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Rewards */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Rewards Center</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Unlock rewards using your points
                </p>
              </div>

              <div className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-300">
                <Gift size={22} />
              </div>
            </div>

            {rewards.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-slate-400">
                No rewards available yet.
              </div>
            ) : (
              <div className="space-y-4">
                {rewards.map((reward) => {
                  const unlocked =
                    Number(user.points) >= Number(reward.points_required)

                  return (
                    <div
                      key={reward.id}
                      className="group flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-5 transition hover:border-cyan-400/40 hover:bg-cyan-400/5"
                    >
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <Gift size={16} className="text-cyan-300" />

                          <span className="font-bold text-white">
                            {formatPoints(reward.points_required)} points
                          </span>
                        </div>

                        <p className="text-sm text-slate-400">
                          {reward.reward_text}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide ${
                          unlocked
                            ? 'bg-emerald-400/20 text-emerald-300'
                            : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        {unlocked ? 'Ready' : 'Locked'}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Activity */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Recent Activity</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Latest purchase point updates
                </p>
              </div>

              <div className="rounded-2xl bg-violet-400/10 p-3 text-violet-300">
                <Clock3 size={22} />
              </div>
            </div>

            {logs.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-slate-400">
                No purchases recorded yet.
              </div>
            ) : (
              <div className="space-y-4">
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className="rounded-2xl border border-white/10 bg-black/20 p-5 transition hover:border-violet-400/30"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-2xl font-black text-cyan-300">
                          {formatCurrency(log.amount)}
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                          Added by{' '}
                          {log.admin?.full_name ||
                            log.admin?.username ||
                            'Admin'}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-bold text-violet-300">
                          +{formatPoints(log.points_earned)} pts
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {new Date(log.created_at).toLocaleString('en-PH')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}