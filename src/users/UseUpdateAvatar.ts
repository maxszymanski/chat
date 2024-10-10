import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateAvatar as updateCurrentAvatar } from '../services/apiAuth'
import toast from 'react-hot-toast'

export function useUpdateAvatar() {
    const queryClient = useQueryClient()
    const { mutate: updateAvatar, isPending: isUpdatingAvatar } = useMutation({
        mutationFn: (avatar: File) => updateCurrentAvatar(avatar),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['user'],
            })
            await queryClient.refetchQueries({ queryKey: ['user'] })

            toast.success('Zdjęcie zostało zaaktualizowane')
        },
        onError: () =>
            toast.error('Wystąpił bład podczas aktualizacji zdjęcia'),
    })

    return { isUpdatingAvatar, updateAvatar }
}
