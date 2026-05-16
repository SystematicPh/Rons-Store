import { getSupabaseAdmin } from '@/lib/supabase'

export async function getSettings() {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from('store_settings')
    .select('*')
    .eq('id', 1)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getDashboardAnalytics() {
  const supabase = getSupabaseAdmin()
  const now = new Date()
  const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const weekStart = new Date(dayStart)
  weekStart.setDate(dayStart.getDate() - dayStart.getDay())
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const yearStart = new Date(now.getFullYear(), 0, 1)

  async function sumFrom(date) {
    const { data, error } = await supabase
      .from('purchase_logs')
      .select('amount')
      .gte('created_at', date.toISOString())

    if (error) {
      throw new Error(error.message)
    }

    return data.reduce((total, row) => total + Number(row.amount), 0)
  }

  const [today, week, month, year] = await Promise.all([
    sumFrom(dayStart),
    sumFrom(weekStart),
    sumFrom(monthStart),
    sumFrom(yearStart)
  ])

  return { today, week, month, year }
}

export async function getCustomers() {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from('users')
    .select('id, username, full_name, total_spent, points, created_at')
    .eq('role', 'customer')
    .order('total_spent', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getCustomerByUsername(username) {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from('users')
    .select('id, username, full_name, role, total_spent, points, created_at')
    .eq('username', username)
    .single()

  if (error) {
    return null
  }

  return data
}

export async function getRewards() {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from('rewards')
    .select('*')
    .order('points_required', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getPurchaseLogsForCustomer(userId) {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from('purchase_logs')
    .select('id, amount, points_earned, created_at, admin:admin_id(username, full_name)')
    .eq('customer_id', userId)
    .order('created_at', { ascending: false })
    .limit(10)

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getAdminExists() {
  const supabase = getSupabaseAdmin()
  const { count, error } = await supabase
    .from('users')
    .select('id', { count: 'exact', head: true })
    .eq('role', 'admin')

  if (error) {
    throw new Error(error.message)
  }

  return count > 0
}
