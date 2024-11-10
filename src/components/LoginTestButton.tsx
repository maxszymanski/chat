import useLogin from '../hooks/useLogin'
import Spinner from './Spinner'

function LoginTestButton() {
    const { login, isPending } = useLogin()

    const handleLoginTestAccount = () => {
        const testUser = {
            email: 'test@test.pl',
            password: '12345678',
        }
        login(testUser)
    }

    return (
        <button
            onClick={handleLoginTestAccount}
            type="button"
            className="w-full p-2 bg-white/20 backdrop-blur-sm rounded-2xl font-medium text-stone-200 transition-colors duration-300 hover:bg-white/30 flex items-center justify-center gap-2 md:text-xl text-lg"
        >
            {isPending && <Spinner />} Konto testowe
        </button>
    )
}

export default LoginTestButton
