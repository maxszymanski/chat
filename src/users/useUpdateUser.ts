import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUser as updateCurrentUser } from '../services/apiAuth'
import { useChatContext } from '../context/useChatContext'
import toast from 'react-hot-toast'

export function useUpdateUser() {
    const { closeModal } = useChatContext()

    const queryClient = useQueryClient()
    const { mutate: updateUser, isPending: isUpdatingName } = useMutation({
        mutationFn: (userName: string) => updateCurrentUser(userName),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['user'],
            })
            await queryClient.refetchQueries({ queryKey: ['user'] })
            closeModal()
            toast.success('Profil został zaaktualizowany')
        },
        onError: () =>
            toast.error('Wystąpił bład podczas aktualizacji profilu'),
    })

    return { isUpdatingName, updateUser }
}
