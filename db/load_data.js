import * as dotenv from 'dotenv'
import { env } from 'node:process'
import { createClient } from '@supabase/supabase-js'

dotenv.config({ path: './.env.local' })
const supabaseUrl = env.VITE_SUPABASE_URL
// const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY
const supabaseServiceKey = env.SUPABASE_SERVICE_KEY

// Demonstrates how to use the Auth Admin, which requires the service key
async function listAllUsers() {
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
  const {
    data: { users },
  } = await supabase.auth.admin.listUsers()
  console.log(users)
}

listAllUsers()
