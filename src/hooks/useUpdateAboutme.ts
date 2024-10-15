import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateAbout } from '../services/apiAuth'
import { useChatContext } from '../context/useChatContext'
import toast from 'react-hot-toast'

export function useUpdateAboutme() {
    const { closeModal } = useChatContext()

    const queryClient = useQueryClient()
    const { mutate: updateAboutme, isPending: isUpdatingAboutme } = useMutation(
        {
            mutationFn: (about: string) => updateAbout(about),
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
        }
    )

    return { isUpdatingAboutme, updateAboutme }
}
