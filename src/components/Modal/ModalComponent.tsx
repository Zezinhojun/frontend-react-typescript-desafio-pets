import { FC, ReactNode, useContext } from "react"
import { AppContext } from "../Context/AppContextProvider"
import { Button, Modal } from "react-bootstrap"
import './style.css'

interface IModalComponent {
    children: ReactNode
    show: boolean;
    formId?: string;
}

export const ModalComponent: FC<IModalComponent> = ({ children, show, formId }) => {
    const { setShowOwner, setShowPetForm, setShowOwnerEditForm, setShowPetEditForm } = useContext(AppContext)
    const closeModal = (): void => {
        setShowOwner(false)
        setShowPetForm(false)
        setShowOwnerEditForm(false)
        setShowPetEditForm(false)
    }
    return (
        <>
            <Modal
                show={show}
                onHide={closeModal}
                backdrop="static"
                centered
                className="container-modal">
                <Modal.Header >
                    <Modal.Title>Veterinaria PAES&AMOR</Modal.Title>
                </Modal.Header>

                {children}

                <Modal.Footer>
                    <Button variant='secondary' onClick={closeModal}>Close</Button>
                    <Button variant="primary" type="submit" form={formId}>Save changes</Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}
