import { useMutation, useQueryClient } from '@tanstack/react-query'
import { signIn as loginApi } from '../services/apiAuth'

import { User } from '../types/types'
import toast from 'react-hot-toast'

function useLogin() {
    const queryClient = useQueryClient()
    const { mutate: login, isPending } = useMutation({
        mutationFn: ({ email, password }: User) =>
            loginApi({ email, password }),
        onSuccess: (user) => {
            queryClient.setQueryData(['user'], user.user)
        },
        onError: (err) => {
            console.log('Error', err)
            toast.error('Podany email lub hasło jest niepoprawne')
        },
    })
    return { login, isPending }
}
export default useLogin
