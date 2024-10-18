import supabase, { supabaseUrl } from './supabase'

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
    if (error) {
        console.error('Logowanie nieudane:', error.message)
    }
    return data
}

export async function checkAndAddUser(
    userId: string,
    email: string,
    username: string,
    status: string,
    aboutme: string,
    avatar: string
) {
    const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)

    if (userError) {
        console.error(
            'Błąd podczas sprawdzania użytkownika w tabeli:',
            userError.message
        )
        return
    }

    if (userData.length === 0) {
        const { error: insertError } = await supabase
            .from('users')
            .insert([{ id: userId, email, username, status, aboutme, avatar }])

        if (insertError) {
            console.error(
                'Błąd podczas dodawania użytkownika do tabeli `users`:',
                insertError.message
            )
        }
    } else {
        const existingUser = userData[0]
        const shouldUpdate =
            existingUser.email !== email ||
            existingUser.username !== username ||
            existingUser.status !== status ||
            existingUser.aboutme !== aboutme ||
            existingUser.avatar !== avatar

        if (shouldUpdate) {
            const { error: updateError } = await supabase
                .from('users')
                .update({ email, username, status, aboutme, avatar })
                .eq('id', userId)
                .select()

            if (updateError) {
                console.error(
                    'Błąd podczas aktualizacji użytkownika w tabeli `users`:',
                    updateError.message
                )
            }
        }
    }
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
export async function signUp({ email = '', password = '', username = 'User' }) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                username,
                status: 'Nowy na czacie – poznaj mnie!',
                aboutme:
                    'Hej! Jeszcze się tutaj urządzam, ale zapraszam do kontaktu! ',
            },
        },
    })
    if (error) throw new Error(error.message)
    return data
}

export async function logout() {
    const { error } = await supabase.auth.signOut()
    if (error) throw new Error(error.message)
}

export async function getAllUsers() {
    const {
        data: { session },
    } = await supabase.auth.getSession()
    const currentUserId = session?.user?.id

    const { data, error } = await supabase
        .from('users')
        .select('*')
        .not('id', 'eq', currentUserId)
        .order('username', { ascending: true })

    if (error) {
        console.error('Error fetching messages:', error)
        return []
    }

    return data
}

export async function getUserFriend(id: string) {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single()

    if (error) {
        console.error(error)
        throw new Error('Nie znaleziono użytkownika')
    }
    return data
}

export async function updateUser(username = 'User') {
    const { error } = await supabase.auth.updateUser({
        data: {
            username,
        },
    })
    if (error) throw new Error(error.message)
}
export async function updatePassword(password: string) {
    const { error } = await supabase.auth.updateUser({
        password,
    })
    if (error) throw new Error(error.message)
}
export async function updateAbout(aboutme = '') {
    const { error } = await supabase.auth.updateUser({
        data: {
            aboutme,
        },
    })
    if (error) throw new Error(error.message)
}
export async function updateStatus(status = '') {
    const { error } = await supabase.auth.updateUser({
        data: {
            status,
        },
    })
    if (error) throw new Error(error.message)
}

export async function updateAvatar(avatarFile: File) {
    const fileName = `avatar-${Math.random()}`

    const { error: storageError } = await supabase.storage
        .from('avatars')
        .upload(fileName, avatarFile)

    if (storageError) throw new Error(storageError.message)

    const { error: error2 } = await supabase.auth.updateUser({
        data: {
            avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
        },
    })
    if (error2) throw new Error(error2.message)
}
