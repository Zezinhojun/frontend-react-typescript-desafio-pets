import { useContext, useEffect, useRef } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { AppContext } from '../Context/AppContextProvider';
import { ModalComponent } from '../Modal/ModalComponent';
import { useCreateOwner } from '../Hooks/useCreateOwner';
import { IOwner } from '../Interfaces/Owner';
import { IPet } from '../Interfaces/Pet';
import { useCreatePet } from '../Hooks/useCreatePet';

export const FormComponent = () => {
    const { showOwner, setShowOwner, showPetForm, setShowPetForm } = useContext(AppContext)
    const { createOneOwner, isLoadingOwner, errorOwner } = useCreateOwner();
    const { createOnePet, ownerId, setOwnerId } = useCreatePet()
    const ownerNameRef = useRef<HTMLInputElement>(null)
    const ownerPhoneNumberRef = useRef<HTMLInputElement>(null)
    const petNameRef = useRef<HTMLInputElement>(null);
    const petAgeRef = useRef<HTMLInputElement>(null);
    const petBreedRef = useRef<HTMLSelectElement>(null);
    const petImageRef = useRef<HTMLInputElement>(null);
    const ownerFormRef = useRef<HTMLFormElement>(null);
    const petFormRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
    }, [ownerId]);

    const handlerOwnerSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        const ownerData: IOwner = {
            name: ownerNameRef.current?.value,
            phoneNumber: ownerPhoneNumberRef.current?.value
        };
        try {
            const newOwner = await createOneOwner(ownerData);
            if (newOwner.id !== undefined) setOwnerId(newOwner.id);
            setShowOwner(false);
            setShowPetForm(true);
        } catch (error) {
            console.error(error);
        }
        ownerFormRef.current?.reset();
    }

    const handlePetSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const petData: IPet = {
            name: petNameRef.current?.value,
            breed: petBreedRef.current?.value,
            age: petAgeRef.current?.value ? Number(petAgeRef.current.value) : undefined,
            image: petImageRef.current?.value ? undefined : null,
            ownerId: ownerId ?? undefined
        }
        try {
            if (ownerId) {
                await createOnePet(petData)
                setShowPetForm(false)
            }
        } catch (error) {
            console.error(error);
        }
        petFormRef.current?.reset();

        setShowPetForm(false);
        petFormRef.current?.reset();
    };

    if (isLoadingOwner) return <div>Loading...</div>;
    if (errorOwner) return <div>Error: {errorOwner}</div>;
    return (
        <>
            <Button variant="primary" onClick={() => setShowOwner(true)} className="buttonSubmit">
                Adicionar Pet
            </Button>

            {showOwner && (
                <ModalComponent show={showOwner} formId="owner">
                    <Modal.Body>
                        <Form ref={ownerFormRef} onSubmit={handlerOwnerSubmit} id='owner'>
                            <Form.Group className='mb-3'>
                                <Form.Label>Owner's name: </Form.Label>
                                <Form.Control ref={ownerNameRef} type="text" placeholder="Owner's name" />
                            </Form.Group>

                            <Form.Group className='mb-3'>
                                <Form.Label>Owner's phoneNumber: </Form.Label>
                                <Form.Control ref={ownerPhoneNumberRef} type="tel" placeholder="Owner's phoneNumber" />
                                <Form.Text muted>
                                    Format: xx-xxxxx-xxxx
                                </Form.Text>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                </ModalComponent>
            )}
            {showPetForm && (
                <ModalComponent show={showPetForm} formId="pet"  >
                    <Modal.Body>
                        <Form ref={petFormRef} onSubmit={handlePetSubmit} id='pet'>
                            <Form.Group className='mb-3'>
                                <Form.Label>Pet's name: </Form.Label>
                                <Form.Control ref={petNameRef} type="text" placeholder="Pet's name" required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Age: </Form.Label>
                                <Form.Control ref={petAgeRef} type="number" placeholder="Pet's age" required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Breed: </Form.Label>
                                <Form.Select ref={petBreedRef} required>
                                    <option value="dog">dog</option >
                                    <option value="cat">cat</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Dog's or Cat's image</Form.Label>
                                <Form.Control ref={petImageRef} type="file" size="sm" />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                </ModalComponent>
            )}

        </>
    )
}