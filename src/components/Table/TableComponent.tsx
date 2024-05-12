import { Form, Modal, Table } from "react-bootstrap";
import { EyeFill, PencilFill, TrashFill } from "react-bootstrap-icons";
import { useOwners } from "../Hooks/useOwners";
import { IOwner } from "../Interfaces/Owner";
import { AppContext } from "../Context/AppContextProvider";
import { useContext, useRef, useState } from "react";
import { ModalComponent } from "../Modal/ModalComponent";
import { useDeleteOwner } from "../Hooks/useDeleteOwner";
import { getOneOwner } from "../Services/apiOwnerService";
import { useUpdateOwner } from "../Hooks/useUpdateOwner";
import { useOwnerById } from "../Hooks/useOwnerById";
import { IPet } from "../Interfaces/Pet";
import { usePets } from "../Hooks/usePets";
import { usePetById } from "../Hooks/usePetById";
import { useUpdatePet } from "../Hooks/useUpdatePet";
import { getOnePet } from "../Services/apiPetsService";
import { useDeletePet } from "../Hooks/useDeletePet";

export const TableComponent = () => {
    //hooks owner
    const { ownerUpdate } = useUpdateOwner()
    const { isLoadingOwner, errorOwner } = useOwners();
    const { deletingOwner } = useDeleteOwner();
    const { fetchOwner } = useOwnerById()

    //hooks pets
    const { isLoadingPets, errorPets } = usePets()
    const { fetchedPet } = usePetById()
    const { petUpdate } = useUpdatePet()
    const { deletingPet } = useDeletePet()

    //Context
    const { owners, pets, showOwnerEditForm, setShowOwnerEditForm, setShowPetEditForm, showPetEditForm } = useContext(AppContext);

    //states
    const [fastOwnerId, setFastOwnerId] = useState<string | null>(null)
    const [fastPetId, setFastPetId] = useState<string | null>(null)

    //refs owner
    const ownerFormRef = useRef<HTMLFormElement>(null);
    const ownerNameRef = useRef<HTMLInputElement>(null);
    const ownerPhoneNumberRef = useRef<HTMLInputElement>(null);

    //refs pet
    const petFormRef = useRef<HTMLFormElement>(null)
    const petNameRef = useRef<HTMLInputElement>(null);
    const petAgeRef = useRef<HTMLInputElement>(null);
    const petBreedRef = useRef<HTMLSelectElement>(null);
    const petImageRef = useRef<HTMLInputElement>(null);

    if (isLoadingOwner) return <div>Loading...</div>;
    if (errorOwner) return <div>Error: {errorOwner}</div>;

    if (isLoadingPets) return <div>Loading...</div>;
    if (errorPets) return <div>Error: {errorPets}</div>;

    //Pets
    const handlerEditPet = async (id: string | undefined) => {
        if (id) {
            await fetchedPet(id)
            setShowPetEditForm(true)
            setFastPetId(id)
        }
    }

    const handlerPetSubmitUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const updateData = {
            name: petNameRef.current?.value,
            breed: petBreedRef.current?.value,
            age: petAgeRef.current?.value ? Number(petAgeRef.current.value) : undefined, //
            image: petImageRef.current?.value
        }
        try {
            if (fastPetId) await petUpdate(fastPetId, updateData)

        } catch (error) {
            console.error('Erro ao atualizar pet:', error);
        }
        setShowPetEditForm(false);
        petFormRef.current?.reset();
    }

    const handleViewPet = async (id: string | undefined) => {
        try {
            if (id) await getOnePet(id)

        } catch (error) {
            console.error('Erro ao buscar pet:', error);
        }
    }

    const handleDeletePet = async (id: string | undefined) => {
        try {
            if (id) await deletingPet(id)
        } catch (error) {
            console.error('Erro ao excluir proprietário:', error);
        }
    }

    //Owner
    const handleEditOwner = async (id: string | undefined) => {
        if (id) {
            await fetchOwner(id)
            setShowOwnerEditForm(true);
            setFastOwnerId(id)
        }
    };

    const handlerOwnerSubmitUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const updateData = {
            name: ownerNameRef.current?.value,
            phoneNumber: ownerPhoneNumberRef.current?.value
        }
        try {
            if (fastOwnerId) await ownerUpdate(fastOwnerId, updateData)
            console.log("Proprietario atualizado com sucesso")
        } catch (error) {
            console.error('Erro ao atualizar owner:', error);
        }
        setShowOwnerEditForm(false);
        ownerFormRef.current?.reset();
    }

    const handleViewOwner = async (id: string | undefined) => {
        try {
            if (id) await getOneOwner(id)
        } catch (error) {
            console.error('Erro ao buscar proprietário:', error);
        }
    };

    const handleDeleteOwner = async (id: string | undefined) => {
        try {
            if (id) await deletingOwner(id)
        } catch (error) {
            console.error('Erro ao excluir proprietário:', error);
        }
    };

    return (
        <>
            {owners.length > 0 && (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Owner's name</th>
                            <th>Owner's phoneNumber</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {owners.map((owner: IOwner) => (
                            <tr key={owner.id}>
                                <td>{owner.name}</td>
                                <td>{owner.phoneNumber}</td>
                                <td className="d-flex justify-content-around align-items-center pt-3 pb-3">
                                    <EyeFill onClick={() => handleViewOwner(owner.id)} color="blue" size={17} />
                                    <PencilFill onClick={() => handleEditOwner(owner.id)} color="green" size={17} />
                                    <TrashFill onClick={() => handleDeleteOwner(owner.id)} color="red" size={17} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            {pets.length > 0 && (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Pet's name</th>
                            <th>Pet's breed</th>
                            <th>Pet's age</th>
                            <th>Pet's owner name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pets.map((pet: IPet) => {
                            const owner = owners.find(owner => owner.id === pet.ownerId);
                            return (
                                <tr key={pet.id}>
                                    <td>{pet.name}</td>
                                    <td>{pet.breed}</td>
                                    <td>{pet.age}</td>
                                    <td>{owner ? owner.name : 'Dono não encontrado'}</td>
                                    <td className="d-flex justify-content-around align-items-center pt-3 pb-3">
                                        <EyeFill onClick={() => handleViewPet(pet.id)} color="blue" size={17} />
                                        <PencilFill onClick={() => handlerEditPet(pet.id)} color="green" size={17} />
                                        <TrashFill onClick={() => handleDeletePet(pet.id)} color="red" size={17} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            )}
            {showOwnerEditForm && (
                <ModalComponent show={showOwnerEditForm} formId="owner">
                    <Modal.Body>
                        <Form ref={ownerFormRef} onSubmit={handlerOwnerSubmitUpdate} id='owner'>
                            <Form.Group className='mb-3'>
                                <Form.Label>Owner's name: </Form.Label>
                                <Form.Control ref={ownerNameRef} type="text" placeholder="Owner's name" defaultValue={owners.find(owner => owner.id === fastOwnerId)?.name} />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Owner's phoneNumber: </Form.Label>
                                <Form.Control ref={ownerPhoneNumberRef} type="tel" placeholder="Owner's phoneNumber" defaultValue={owners.find(owner => owner.id === fastOwnerId)?.phoneNumber} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                </ModalComponent>
            )}
            {showPetEditForm && (
                <ModalComponent show={showPetEditForm} formId="pet"  >
                    <Modal.Body>
                        <Form ref={petFormRef} onSubmit={handlerPetSubmitUpdate} id='pet'>
                            <Form.Group className='mb-3'>
                                <Form.Label>Pet's name: </Form.Label>
                                <Form.Control ref={petNameRef} type="text" placeholder="Pet's name" required defaultValue={pets.find(pet => pet.id === fastPetId)?.name} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Age: </Form.Label>
                                <Form.Control ref={petAgeRef} type="number" placeholder="Pet's age" required defaultValue={pets.find(pet => pet.id === fastPetId)?.age} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Breed: </Form.Label>
                                <Form.Select ref={petBreedRef} required defaultValue={pets.find(pet => pet.id === fastPetId)?.breed}>
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
    );
};

