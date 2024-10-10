import { useChatContext } from '../context/useChatContext'
import LogoutModal from './LogoutModal'
import ModalUsername from './ModalUsename'

function ModalManager() {
    const { modalState } = useChatContext()
    return (
        <>
            {modalState.modalType === 'logout' && <LogoutModal />}
            {modalState.modalType === 'username' && <ModalUsername />}
        </>
    )
}

export default ModalManager
