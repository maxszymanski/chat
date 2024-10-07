import Loader from '../components/Loader'
import Avatar from './Avatar'
import { useUser } from './useUser'
import UserHeader from '../components/UserHeader'
import { Link } from 'react-router-dom'

function UserProfile() {
    const { user, isLoading } = useUser()

    console.log(user)

    if (isLoading) return <Loader />

    return (
        <>
            <UserHeader />
            <div className=" flex flex-col items-center py-12">
                <Avatar type="big" />
                <p className="text-3xl my-7 text-blue-950">Maksiu</p>
                <div className="flex flex-col text-xl">
                    <Link className="p-2 " to="/account/password">
                        Zmień hasło
                    </Link>
                    <Link className="p-2" to="/account/password">
                        Zmień dane
                    </Link>
                </div>
            </div>
        </>
    )
}

export default UserProfile
