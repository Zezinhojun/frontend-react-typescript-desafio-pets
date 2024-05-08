import { useContext, useRef } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { AppContext } from '../AppContextProvider';

export const FormComponent = () => {
    const { isOn, setIsOn, name, setName } = useContext(AppContext)
    const ownerNameRef = useRef<HTMLInputElement>(null)
    const petNameRef = useRef<HTMLInputElement>(null);
    const petAgeRef = useRef<HTMLInputElement>(null);
    const petBreedRef = useRef<HTMLSelectElement>(null);
    const petImageRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const handlerSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        console.log(ownerNameRef.current?.value, petNameRef.current?.value, petAgeRef.current?.value, petBreedRef.current?.value);
        console.log("Antes de atualizar:", isOn);
        setIsOn(true);
        setName(petNameRef.current?.value ?? '');
        formRef.current?.reset();
    }
    return (
        <>
            <Form ref={formRef} onSubmit={handlerSubmit}>
                <Form.Group className='mb-3'>
                    <Form.Label>Owner's name: </Form.Label>
                    <Form.Control ref={ownerNameRef} type="text" placeholder="Owner's name" value={name} />
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group className='mb-3'>
                            <Form.Label>Pet's name: </Form.Label>
                            <Form.Control ref={petNameRef} type="text" placeholder="Pet's name" />
                        </Form.Group>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Age: </Form.Label>
                                <Form.Control ref={petAgeRef} type="number" placeholder="Pet's age" />
                            </Form.Group>
                        </Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Breed: </Form.Label>
                            <Form.Select ref={petBreedRef}>
                                <option selected>dog</option >
                                <option>cat</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Dog's or Cat's image</Form.Label>
                            <Form.Control ref={petImageRef} type="file" size="sm" />
                        </Form.Group>
                    </Col>
                </Row>
                <Button type='submit'>Adicionar</Button>
            </Form>
        </>
    )
}