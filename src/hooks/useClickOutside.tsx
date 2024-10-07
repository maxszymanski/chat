import { useEffect } from 'react'

export default function useClickOutside(
    ref: React.RefObject<HTMLDivElement>,
    mutation: () => void
) {
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                mutation()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [ref, mutation])
}
