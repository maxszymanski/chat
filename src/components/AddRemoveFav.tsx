import { HeartIcon } from '@heroicons/react/24/outline'
import { useAddUserFriends } from '../hooks/useAddUserFriends'
import { useRemoveUserFriends } from '../hooks/useRemoveFavUser'
import { useUser } from '../hooks/useUser'
import { HeartIcon as SolidHeart } from '@heroicons/react/24/solid'
import Spinner from './Spinner'

function AddRemoveFav({ id, onClick }: { id: string; onClick: () => void }) {
    const { addFriends, isAddingFriends } = useAddUserFriends()
    const { removeFriends, isRemovingFriends } = useRemoveUserFriends()
    const { user } = useUser()

    const friends: string[] = user?.user_metadata?.friends || []
    const isFav = friends.includes(id)
    const isPending = isAddingFriends || isRemovingFriends

    const addToFavorite = () => {
        addFriends(id, { onSuccess: () => onClick() })
    }
    const removeFromFavorite = () => {
        removeFriends(id, { onSuccess: () => onClick() })
    }

    return (
        <button
            onClick={!isFav ? addToFavorite : removeFromFavorite}
            className="flex items-center gap-2 w-full p-4  hover:bg-blue-100  transition-colors duration-300 text-blue-950"
        >
            {isPending && <Spinner />}
            {isFav && !isPending && (
                <SolidHeart className="size-6 text-red-500 pointer-events-none" />
            )}
            {!isFav && !isPending && (
                <HeartIcon className="size-6 text-red-500 pointer-events-none" />
            )}
            {isFav ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
        </button>
    )
}

export default AddRemoveFav
