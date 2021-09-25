import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import InputUserForm from './InputUserForm';
import SelectUserForm from './SelectUserForm';
import Container from "@material-ui/core/Container";

import Domain from '../../domain';

import Title from '../title/Title';

const UserFormEdit = ({ user }) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [curp, setCurp] = useState("");
  const [role, setRole] = useState("");

  const onSubmitForm = async (event) => {
    event.preventDefault();
    try {
      const body = { name, email, curp, phone, role }

      const response = await fetch(`${Domain}users/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", token: localStorage.token },
        body: JSON.stringify(body)
      });

      const parseResponse = await response.json();
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    setName(user.userName)
    setCurp(user.curp)
    setEmail(user.email)
    setPhone(user.phone)
    setRole(user.role)
  }, [user])

  return (
    <Container>
      <Title>
        Información de usuario: {user.userName}
      </Title>

      <Form onSubmit={() => { }}>
        <Row className="mb-6">

          <InputUserForm
            label="Nombre"
            controlId="formGridName"
            id="name"
            type="text"
            placeholder="Nombre"
            value={name}
            setValue={setName}
          />
          <InputUserForm 
                    label="CURP"
                    controlId="formGridCurp"
                    id="curp"
                    type="text"
                    placeholder="Clave Única de Registro de Población"
                    value={curp}
                    setValue={setCurp}
                />
        </Row>
        <Title>
       Contacto y permisos
      </Title>
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
                <SelectUserForm 
                    label="Rol del usuario"
                    controlId="formGridUserRole"
                    id="role"
                    setValue={setRole}
                />
            </Row>
      </Form>
    </Container>
  );
};

export default UserFormEdit;