import { User } from '../types/types'
import supabase from './supabase'

export async function signIn({
    email,
    password,
}: {
    email: string
    password: string
}) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })
    if (error) throw new Error(error.message)
    return data
}

export async function getCurrentUser() {
    const { data: session } = await supabase.auth.getSession()
    if (!session.session) return null

    const { data, error } = await supabase.auth.getUser()
    if (error) throw new Error(error.message)
    return data?.user
}
export async function singOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw new Error(error.message)
}
export async function signUp({ email = '', password = '', userName = '' }) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                userName,
            },
        },
    })
    if (error) throw new Error(error.message)
    return data
}

export async function addUser(newUser: User) {
    const { data, error } = await supabase
        .from('users')
        .insert([newUser])
        .select('*')
    console.log(newUser)

    if (error) {
        console.error(error)
    }

    return data
}
