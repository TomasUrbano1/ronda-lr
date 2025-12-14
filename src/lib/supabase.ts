import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jdmdkrxkraoquodmqrng.supabase.co'  // Pegá acá
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkbWRrcnhrcmFvcXVvZG1xcm5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1MDIzMjUsImV4cCI6MjA4MTA3ODMyNX0.i3ChVNXfGtLKGp1WbeXGAR9z9FbP8a75EdkNQDI-tbY'     // Pegá acá

export const supabase = createClient(supabaseUrl, supabaseAnonKey)