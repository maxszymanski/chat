import { useMutation } from '@tanstack/react-query'
import { signUp as signUpApi } from '../services/apiAuth'
import { useNavigate } from 'react-router-dom'
import { User } from '../types/types'

export function useSignUp() {
    const navigate = useNavigate()
    const { mutate: signUp, isPending } = useMutation({
        mutationFn: ({ email, password, username }: User) =>
            signUpApi({
                email,
                password,
                username,
            }),
        onSuccess: () => {
            navigate('/login')
        },
        onError: () => {
            console.log('Bład przy wpisywaniu')
        },
    })
    return { signUp, isPending }
}
