import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    `Supabase env vars missing. URL=${supabaseUrl ? 'OK' : 'MISSING'} KEY=${supabaseKey ? 'OK' : 'MISSING'}. Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in Vercel.`
  )
}

export const supabase = createClient(supabaseUrl, supabaseKey)
