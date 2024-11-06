import { Link } from 'react-router-dom'

function FormLink({ to, text }: { to: string; text: string }) {
    return (
        <Link
            to={to}
            className=" block p-2 md:text-xl text-lg bg-secondary rounded-2xl 
    text-[#041927]  text-center font-medium transition-colors duration-300 hover:bg-[#6c82a4]"
        >
            {text}
        </Link>
    )
}

export default FormLink
