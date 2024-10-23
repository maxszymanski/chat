import { Link } from 'react-router-dom'
import { useChatContext } from '../context/useChatContext'

function FriendsTabs() {
    const { activeTab, handleActiveAll, handleActiveFav } = useChatContext()

    return (
        <div className="w-full px-2 mb-3">
            <div className="flex justify-between items-center rounded-full border p-1 ">
                <button
                    onClick={handleActiveAll}
                    className={`w-full py-1 text-lg  font-medium  rounded-full transition-colors duration-300 ${activeTab === 'all' ? 'text-blue-50 bg-blue-500' : ''}`}
                >
                    Kontakty
                </button>
                {/* <Link
                    to="/chat"
                    className={`w-full text-center py-1 text-lg  font-medium  rounded-full transition-colors duration-300 ${activeTab === 'all' ? 'text-blue-50 bg-blue-500' : ''}`}
                >
                    Kontakty
                </Link> */}
                <button
                    onClick={handleActiveFav}
                    className={`w-full py-1 text-lg  font-medium  rounded-full transition-colors duration-300 ${activeTab === 'fav' ? 'text-blue-50 bg-blue-500' : ''}`}
                >
                    Ulubione
                </button>
                {/* <Link
                    to="/chat/favorite"
                    className={`w-full text-center py-1 text-lg  font-medium  rounded-full transition-colors duration-300 ${activeTab === 'fav' ? 'text-blue-50 bg-blue-500' : ''}`}
                >
                    Ulubione
                </Link> */}
            </div>
        </div>
    )
}

export default FriendsTabs