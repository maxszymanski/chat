import { useMutation } from '@tanstack/react-query'
import { signIn as loginApi } from '../services/apiAuth'

import { User } from '../types/types'
import { useNavigate } from 'react-router-dom'

function useLogin() {
    const navigate = useNavigate()
    const { mutate: login, isPending } = useMutation({
        mutationFn: ({ email, password }: User) =>
            loginApi({ email, password }),
        onSuccess: () => {
            navigate('/chat')
        },
        onError: (err) => {
            console.log('Error', err)
        },
    })
    return { login, isPending }
}
export default useLogin
