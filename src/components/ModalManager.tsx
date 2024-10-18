import { useChatContext } from '../context/useChatContext'
import LogoutModal from './LogoutModal'
import ModalAbout from './ModalAbout'
import ModalSettings from './ModalSettings'
import ModalStatus from './ModalStatus'
import ModalUpdatePassword from './ModalUpdatePassword'
import ModalUsername from './ModalUsename'

function ModalManager() {
    const { modalState } = useChatContext()
    return (
        <>
            {modalState.modalType === 'logout' && <LogoutModal />}
            {modalState.modalType === 'username' && <ModalUsername />}
            {modalState.modalType === 'about' && <ModalAbout />}
            {modalState.modalType === 'settings' && <ModalSettings />}
            {modalState.modalType === 'status' && <ModalStatus />}
            {modalState.modalType === 'password' && <ModalUpdatePassword />}
        </>
    )
}

export default ModalManager
