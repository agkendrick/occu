import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

export default function EditModal(props) {

    const [validated, setValidated] = useState(false);
    const [name, setName] = useState(props.editItem.name);
    const [capital, setCapital] = useState(props.editItem.capital);
    const [region, setRegion] = useState(props.editItem.region);
    const [abbreviation, setAbbreviation] = useState(props.editItem.abbreviation);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        setValidated(true);
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false || !isNameValid()) {
            return;
        }
        props.saveItem(name, { region, abbreviation, capital, timeStamp: new Date().toString() });
        clearInput();
        props.onHide();
    };

    const clearInput = () => {
        setName("");
        setCapital("");
        setRegion("");
        setAbbreviation("");
        setValidated(false);
    }

    const isNameValid = () => {
        const isUnique = props.existingNames.find((item) => {
            if(item == props.editItem.name) return false;
            return item == name;
        });

        const res = isUnique == undefined;
        return res;
    }

    return (
        <Modal
            show={props.show}
            onHide={() => { clearInput(); props.onHide(); }}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit: <b>{props.editItem.name}</b>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Name</Form.Label>
                        <Form.Control required value={name} onChange={({ target: { value } }) => setName(value)} isInvalid={!isNameValid()} isValid={isNameValid() && validated} type="text" />
                        <Form.Control.Feedback type="invalid">
                            Please choose a unique name.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Capital</Form.Label>
                        <Form.Control required value={capital} onChange={({ target: { value } }) => setCapital(value)} type="text" />
                        <Form.Control.Feedback type="invalid">
                            Please choose a capital.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                        <Form.Label>Region</Form.Label>
                        <Form.Control value={region} onChange={({ target: { value } }) => setRegion(value)} required type="text" />
                        <Form.Control.Feedback type="invalid">
                            Please choose a region.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                        <Form.Label>Abbreviation</Form.Label>
                        <Form.Control value={abbreviation} onChange={({ target: { value } }) => setAbbreviation(value)} required type="text" />
                        <Form.Control.Feedback type="invalid">
                            Please choose an abbreviation.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <div style={{textAlign: "center"}}>
                        <Button type="submit">Save</Button>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
}