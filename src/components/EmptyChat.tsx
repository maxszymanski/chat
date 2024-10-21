import FriendInfo from '../users/FriendInfo'

function EmptyChat() {
    return (
        <div className="flex h-full justify-center items-center">
            <FriendInfo inProfile={false} />
        </div>
    )
}

export default EmptyChat
