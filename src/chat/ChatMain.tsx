import { useEffect, useRef } from 'react'
import EmptyChat from '../components/EmptyChat'
import Loader from '../components/Loader'
import { useFriend } from '../hooks/useFriend'

import { useMessages } from '../hooks/useMessages'
import MessagesList from './MessagesList'

function ChatMain() {
    const {
        messages,
        isLoadingMessages,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useMessages()
    const { friend, isLoading } = useFriend()
    const scrollContainerRef = useRef<HTMLDivElement | null>(null)

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollTop } = scrollContainerRef.current

            if (scrollTop === 0 && hasNextPage && !isFetchingNextPage) {
                fetchNextPage()
            }
        }
    }

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', handleScroll)
            return () =>
                scrollContainer.removeEventListener('scroll', handleScroll)
        }
    }, [hasNextPage, isFetchingNextPage])

    return (
        <div
            ref={scrollContainerRef}
            className="px-6 py-6 text-lg relative  flex-1 overflow-y-auto scrollbar-thin
        scrollbar-thumb-sky-300 scrollbar-track-sky-100"
        >
            {(isLoadingMessages || isLoading) && <Loader />}
            {messages.length > 0 && friend && <MessagesList />}
            {messages.length === 0 && friend && <EmptyChat />}
        </div>
    )
}

export default ChatMain
