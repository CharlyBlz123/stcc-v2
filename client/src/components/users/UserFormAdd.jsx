import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';


import InputUserForm from './InputUserForm';
import SelectUserForm from './SelectUserForm';

import Domain from '../../domain';

const UserFormAdd = ({
    onHide,
    tellUserUpdated,
    showAlert,
    messageAlert,
    typeAlert,

}) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [curp, setCurp] = useState("");
    const [code, setCode] = useState("");
    const [role, setRole] = useState("");

    const onSubmitForm = async (event) => {
        event.preventDefault();
        try {
            const body = { name, email, code, curp, phone, role }

            const response = await fetch(`${Domain}users/`, {
                method: "POST",
                headers: { "Content-Type": "application/json", token: localStorage.token },
                body: JSON.stringify(body)
            });

            const parseResponse = await response.json();
            if(response.status === 201){
                typeAlert("success");
                messageAlert("El usuario se registró con éxito");
                showAlert(true);
                onHide();
                tellUserUpdated(true);
            } else if(response.status === 204){
                typeAlert("error");
                messageAlert("El usuario no se pudo registrar");
                showAlert(true);
                onHide();
            }if(response.status === 401){
                typeAlert("warning");
                messageAlert("No estás autorizado para registrar un nuevo usuario");
                showAlert(true);
                onHide();
            } if(response.status === 400){
                typeAlert("info");
                messageAlert("El usuario ya se encuentra registrado");
                showAlert(true);
            }
            if(response.status === 500){
                typeAlert("error");
                messageAlert("Error interno del servidor");
                showAlert(true);
            }

        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Form onSubmit={onSubmitForm}>
            <Row className="mb-3">

                <InputUserForm
                    label="Nombre"
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
                    id="email"
                    type="email"
                    placeholder="Ingresa un email"
                    value={email}
                    setValue={setEmail}

                />
                <InputUserForm
                    label="Teléfono"
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
                    id="curp"
                    type="text"
                    placeholder="Clave Única de Registro de Población"
                    value={curp}
                    setValue={setCurp}
                />
                <InputUserForm
                    label="Código de usuario"
                    id="userCode"
                    type="text"
                    placeholder="Número de control"
                    value={code}
                    setValue={setCode}
                />
                <SelectUserForm
                    label="Rol del usuario"
                    id="role"
                    setValue={setRole}
                />
            </Row>
            <Button variant="outline-secondary" type="submit" style={{ marginRight: '1vw' }}>
                Registrar
            </Button>
            <Button variant="danger" type="button" onClick={() => onHide()}>
                Cancelar
            </Button>
        </Form>
    );

}

export default UserFormAdd;