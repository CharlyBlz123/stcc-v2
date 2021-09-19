import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import InputUserForm from './InputUserForm';

import Domain from '../../domain';

const UserForm = ({ onHide }) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [curp, setCurp] = useState("");
    const [code, setCode] = useState("");

    const onSubmitForm = async (event) => {
        event.preventDefault();
        try {
            const body = { name, email, code, curp, phone }

            const response = await fetch(`${Domain}users/`, {
                method: "POST",
                headers: { "Content-Type": "application/json", token: localStorage.token },
                body: JSON.stringify(body)
            });

            const parseResponse = await response.json();
            onHide();
            console.log("Usuario registrado")
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Form onSubmit={onSubmitForm}>
            <Row className="mb-3">
                
                <InputUserForm 
                    label="Nombre"
                    controlId="formGridName"
                    id="name"
                    type="text"
                    placeholder="Ingresa el nombre del asociado"
                    value={name}
                    setValue={setName}
                />
            </Row>
            <Row className="mb-3">
                
                <InputUserForm 
                    label="Email"
                    controlId="formGridEmail"
                    id="email"
                    type="email"
                    placeholder="Ingresa un email"
                    value={email}
                    setValue={setEmail}
                   
                />
                <InputUserForm 
                    label="Teléfono"
                    controlId="formGridPhone"
                    id="phone"
                    type="number"
                    placeholder="Número de contacto"
                    value={phone}
                    setValue={setPhone}
                />
            </Row>
            <Row className="mb-3">
                
                <InputUserForm 
                    label="CURP"
                    controlId="formGridCurp"
                    id="curp"
                    type="text"
                    placeholder="Clave Única de Registro de Población"
                    value={curp}
                    setValue={setCurp}
                />
                <InputUserForm 
                    label="Código de usuario"
                    controlId="formGridUserCode"
                    id="userCode"
                    type="text"
                    placeholder="Número de control"
                    value={code}
                    setValue={setCode}
                />
            </Row>
            <Button variant="outline-secondary" type="submit" style={{marginRight: '1vw' }}>
                Registrar
            </Button>
            <Button variant="danger" type="button" onClick={() => onHide()}>
                Cancelar
            </Button>
        </Form>
    );

}

export default UserForm;