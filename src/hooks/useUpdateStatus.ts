import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateStatus as updateCurrentStatus } from '../services/apiAuth'
import { useChatContext } from '../context/useChatContext'
import toast from 'react-hot-toast'

export function useUpdateStatus() {
    const { closeModal } = useChatContext()

    const queryClient = useQueryClient()
    const { mutate: updateStatus, isPending: isUpdatingStatus } = useMutation({
        mutationFn: (status: string) => updateCurrentStatus(status),
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

    return { isUpdatingStatus, updateStatus }
}
