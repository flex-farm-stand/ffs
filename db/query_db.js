import * as dotenv from 'dotenv'
import { env } from 'node:process'
import { createClient } from '@supabase/supabase-js'

dotenv.config({ path: './.env.local' })
const supabaseUrl = env.VITE_SUPABASE_URL
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY
const supabaseServiceKey = env.SUPABASE_SERVICE_KEY

async function getAllProfiles() {
  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  const data = await supabase.from('profiles').select()
  console.log(data)
}

async function getOneProfile() {
  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  const data = await supabase
    .from('profiles')
    .select()
    .eq('id', 'ed5fc1e5-3be9-4cbc-bcfe-9ac2b746d32a')
  console.log(data)
}

async function getSession() {
  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  const data = await supabase.auth.getSession()
  console.log(data)
}

// Demonstrates how to use the Auth Admin, which requires the service key
async function getAllUsers() {
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

getOneProfile()
// getSession()
// getAllProfiles()
