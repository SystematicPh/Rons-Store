import { createClient } from '@supabase/supabase-js'
import { getEnv } from '@/lib/env'

let adminClient = null

export function getSupabaseAdmin() {
  if (!adminClient) {
    adminClient = createClient(
      getEnv('NEXT_PUBLIC_SUPABASE_URL'),
      getEnv('SUPABASE_SERVICE_ROLE_KEY'),
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )
  }

  return adminClient
}
