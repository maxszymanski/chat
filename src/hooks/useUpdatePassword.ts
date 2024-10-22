import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updatePassword as updateCurrentPassword } from '../services/apiAuth'
import { useChatContext } from '../context/useChatContext'
import toast from 'react-hot-toast'

export function useUpdatePassword() {
    const { closeModal } = useChatContext()

    const queryClient = useQueryClient()
    const { mutate: updatePassword, isPending: isUpdatingPassword } =
        useMutation({
            mutationFn: (password: string) => updateCurrentPassword(password),
            onSuccess: async () => {
                await queryClient.invalidateQueries({
                    queryKey: ['user'],
                })
                await queryClient.refetchQueries({ queryKey: ['user'] })
                closeModal()
                toast.success('Hasło zostało zaaktualizowane')
            },
            onError: () =>
                toast.error('Wystąpił bład podczas aktualizacji hasła'),
        })

    return { isUpdatingPassword, updatePassword }
}
