import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUser as updateCurrentUser } from '../services/apiAuth'
import { useNavigate } from 'react-router-dom'

export function useUpdateUser() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { mutate: updateUser, isPending: isUpdatingName } = useMutation({
        mutationFn: (userName: string) => updateCurrentUser(userName),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['user'],
            })
            await queryClient.refetchQueries({ queryKey: ['user'] })
            navigate('/account')
        },
        onError: () => console.log('błąd'),
    })

    return { isUpdatingName, updateUser }
}
