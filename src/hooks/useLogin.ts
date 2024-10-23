import { useMutation } from '@tanstack/react-query'
import { signIn as loginApi } from '../services/apiAuth'

import { User } from '../types/types'

function useLogin() {
    const { mutate: login, isPending } = useMutation({
        mutationFn: ({ email, password }: User) =>
            loginApi({ email, password }),
        onError: (err) => {
            console.log('Error', err)
        },
    })
    return { login, isPending }
}
export default useLogin
