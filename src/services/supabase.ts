import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://uwbtfgbasifextwygoul.supabase.co'
const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3YnRmZ2Jhc2lmZXh0d3lnb3VsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc0MzA4NTcsImV4cCI6MjA0MzAwNjg1N30.8cPvKzr5Fazq-cllpZfXGPuj2z0kUFtSa_ls0zM7D3Q'
const supabase = createClient(supabaseUrl, supabaseKey)

// export const channel = supabase
//     .channel('schema-db-changes')
//     .on(
//         'postgres_changes',
//         {
//             event: 'INSERT',
//             schema: 'public',
//             table: 'messages',
//         },
//         (payload) => console.log(payload)
//     )
//     .subscribe()

export default supabase
