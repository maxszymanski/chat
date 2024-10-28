import { useChatContext } from '../context/useChatContext'

function FriendsTabs() {
    const { activeTab, handleActiveAll, handleActiveFav } = useChatContext()

    return (
        <div className="w-full px-2 mb-3">
            <div className="flex justify-between items-center rounded-full border border-sky-200 p-1 ">
                <button
                    onClick={handleActiveAll}
                    className={`w-full py-1 text-lg  font-medium  rounded-full transition-colors duration-300 ${activeTab === 'all' ? 'text-blue-50 bg-sky-500 ' : 'hover:bg-sky-200'}`}
                >
                    Kontakty
                </button>
                <button
                    onClick={handleActiveFav}
                    className={`w-full py-1 text-lg  font-medium  rounded-full transition-colors duration-300 ${activeTab === 'fav' ? 'text-blue-50 bg-sky-500  ' : 'hover:bg-sky-200'}`}
                >
                    Ulubione
                </button>
            </div>
        </div>
    )
}

export default FriendsTabs
