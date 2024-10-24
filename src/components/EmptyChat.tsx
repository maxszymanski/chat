import FriendInfo from '../users/FriendInfo'

function EmptyChat() {
    return (
        <div className="flex flex-col  justify-center items-center flex-1 min-h-full">
            <FriendInfo inProfile={false} />
            <p className="py-4 text-center text-sm px-8 text-blue-900 md:text-base">
                Napisz coś, aby rozpocząć rozmowę i lepiej się poznać!
            </p>
        </div>
    )
}

export default EmptyChat
