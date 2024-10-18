import { useMutation } from '@tanstack/react-query'
import { signUp as signUpApi } from '../services/apiAuth'
import { useNavigate } from 'react-router-dom'
import { User } from '../types/types'
import toast from 'react-hot-toast'

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
            toast.error('Wystąpił błąd podczas rejestracji')
        },
    })
    return { signUp, isPending }
}
