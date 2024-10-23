function Avatar({ type = 'small', image = '' }) {
    return (
        <img
            src={image || '/default-user.webp'}
            alt="Zdjęcie profilowe użytkownika"
            className={` object-cover object-top rounded-full pointer-events-none ${type === 'small' ? 'w-9 h-9' : 'w-12 h-12'}`}
        />
    )
}

export default Avatar
