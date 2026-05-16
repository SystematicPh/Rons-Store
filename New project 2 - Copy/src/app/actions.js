'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { clearSession, createSession, hashPassword, requireAdmin, verifyPassword } from '@/lib/auth'
import { getAdminExists, getCustomerByUsername } from '@/lib/data'
import { getSupabaseAdmin } from '@/lib/supabase'

function parseAmount(value) {
  const amount = Number(value)

  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error('Amount must be greater than 0.')
  }

  return amount
}

export async function signUpAction(formData) {
  const supabase = getSupabaseAdmin()
  const username = String(formData.get('username') || '').trim().toLowerCase()
  const fullName = String(formData.get('fullName') || '').trim()
  const password = String(formData.get('password') || '')

  if (username.length < 3) {
    redirect('/sign-up?error=Username must be at least 3 characters.')
  }

  if (password.length < 6) {
    redirect('/sign-up?error=Password must be at least 6 characters.')
  }

  const adminExists = await getAdminExists()
  const role = adminExists ? 'customer' : 'admin'
  const passwordHash = await hashPassword(password)

  const { data, error } = await supabase
    .from('users')
    .insert({
      username,
      full_name: fullName || username,
      password_hash: passwordHash,
      role
    })
    .select('*')
    .single()

  if (error) {
    redirect(`/sign-up?error=${encodeURIComponent(error.message)}`)
  }

  await createSession(data)
  redirect(role === 'admin' ? '/admin' : '/dashboard')
}

export async function signInAction(formData) {
  const supabase = getSupabaseAdmin()
  const username = String(formData.get('username') || '').trim().toLowerCase()
  const password = String(formData.get('password') || '')

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single()

  if (error || !data) {
    redirect('/sign-in?error=Invalid username or password.')
  }

  const valid = await verifyPassword(password, data.password_hash)

  if (!valid) {
    redirect('/sign-in?error=Invalid username or password.')
  }

  await createSession(data)
  redirect(data.role === 'admin' ? '/admin' : '/dashboard')
}

export async function signOutAction() {
  await clearSession()
  redirect('/')
}

export async function updatePointRuleAction(formData) {
  await requireAdmin()
  const supabase = getSupabaseAdmin()
  const pesoStep = parseAmount(formData.get('pesoStep'))
  const pointValue = parseAmount(formData.get('pointValue'))

  const { error } = await supabase.from('store_settings').upsert({
    id: 1,
    store_name: 'Ronald Store Sulit Saya',
    peso_step: pesoStep,
    point_value: pointValue
  })

  if (error) {
    redirect(`/admin?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/admin')
  revalidatePath('/dashboard')
  redirect('/admin?success=Pointing system updated.')
}

export async function addRewardAction(formData) {
  await requireAdmin()
  const supabase = getSupabaseAdmin()
  const pointsRequired = parseAmount(formData.get('pointsRequired'))
  const rewardText = String(formData.get('rewardText') || '').trim()

  if (!rewardText) {
    redirect('/admin?error=Reward text is required.')
  }

  const { error } = await supabase.from('rewards').insert({
    points_required: pointsRequired,
    reward_text: rewardText
  })

  if (error) {
    redirect(`/admin?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/admin')
  revalidatePath('/dashboard')
  redirect('/admin?success=Reward added.')
}

export async function deleteRewardAction(formData) {
  await requireAdmin()
  const supabase = getSupabaseAdmin()
  const rewardId = String(formData.get('rewardId') || '')

  const { error } = await supabase.from('rewards').delete().eq('id', rewardId)

  if (error) {
    redirect(`/admin?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/admin')
  revalidatePath('/dashboard')
  redirect('/admin?success=Reward deleted.')
}

export async function openCustomerProfileAction(formData) {
  await requireAdmin()
  const username = String(formData.get('username') || '').trim().toLowerCase()

  if (!username) {
    redirect('/admin?error=Enter a customer username first.')
  }

  redirect(`/admin/${username}`)
}

export async function addPurchaseAction(formData) {
  const admin = await requireAdmin()
  const supabase = getSupabaseAdmin()
  const username = String(formData.get('username') || '').trim().toLowerCase()
  const amount = parseAmount(formData.get('amount'))

  const customer = await getCustomerByUsername(username)

  if (!customer || customer.role !== 'customer') {
    redirect(`/admin/${username}?error=Customer not found.`)
  }

  const { error } = await supabase.rpc('apply_purchase', {
    p_customer_username: username,
    p_admin_username: admin.username,
    p_amount: amount
  })

  if (error) {
    redirect(`/admin/${username}?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/admin')
  revalidatePath(`/admin/${username}`)
  revalidatePath('/dashboard')
  redirect(`/admin/${username}?success=Purchase saved and points added.`)
}
