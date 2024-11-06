import { useSignUp } from '../hooks/useSignUp'
import Spinner from './Spinner'

function SingUpAsGuestButton() {
    const { signUp, isPending } = useSignUp()
    const MAX_USER_NUMBER = 10000
    const SignUpAsGuest = () => {
        const randomUserNumer = Math.floor(Math.random() * MAX_USER_NUMBER)

        const guestUser = {
            email: `guest@guest${randomUserNumer}.com`,
            username: `Gość ${randomUserNumer}`,
            password: '12345678',
            passwordConfirm: '12345678',
        }
        if (guestUser) signUp(guestUser)
    }

    return (
        <button
            onClick={SignUpAsGuest}
            type="button"
            className="w-full p-2 bg-white/20 backdrop-blur-sm rounded-2xl font-medium text-stone-200 transition-colors duration-300 hover:bg-white/30 flex items-center justify-center gap-2 md:text-xl text-lg"
        >
            {isPending && <Spinner />} Wpisz sie jako gość
        </button>
    )
}

export default SingUpAsGuestButton
