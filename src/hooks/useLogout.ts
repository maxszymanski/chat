import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { logout as logoutApi } from '../services/apiAuth'

function useLogout() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { mutate: logout, isPending: isLogingOut } = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            queryClient.removeQueries(), navigate('/', { replace: true })
        },
        onError: () => {
            console.log('Wystąpił błąd podczas wylogowywania')
        },
    })
    return { logout, isLogingOut }
}

export default useLogout
