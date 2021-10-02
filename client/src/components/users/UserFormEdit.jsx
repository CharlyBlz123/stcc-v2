import React, { useEffect, useState, Fragment } from "react";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import InputUserForm from './InputUserForm';
import SelectUserForm from './SelectUserForm';
import Button from 'react-bootstrap/Button';

import Domain from '../../domain';

import Title from '../title/Title';
import UserConfirmDeleteModal from "./UserConfirmDeleteModal";

const UserFormEdit = ({
  user,
  setUser,
  tellUserUpdated,
  showAlert,
  messageAlert,
  typeAlert
}) => {

  const [userName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [curp, setCurp] = useState("");
  const [role, setRole] = useState("");

  const [disableEdit, setDisableEdit] = useState(true);

  const onSubmitForm = async (event) => {
    event.preventDefault();
    try {
      const id = user.id
      let body = {}

      if (userName != user.userName) body = { userName };
      if (email != user.email) body = { email, ...body };
      if (phone != user.phone) body = { phone, ...body };
      if (curp != user.curp) body = { curp, ...body };
      if (role != user.role) body = { role, ...body };
      if (Object.keys(body).length !== 0) {
        body = { id, ...body }
        const response = await fetch(`${Domain}users/`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json", token: localStorage.token },
          body: JSON.stringify(body)
        });
        if (response.status === 200) {
          const parseResponse = await response.json();
          messageAlert("Usuario actualizado con éxito")
          typeAlert("success");
          showAlert(true);
          setDisableEdit(!disableEdit);
          setUser(undefined);
          tellUserUpdated(true);
        } else if (response.status === 401) {
          messageAlert("No tienes los permisos necesarios para actualizar este usuario")
          typeAlert("warning");
          showAlert(true);
          setDisableEdit(!disableEdit);
          setUser(undefined);
        } else {
          messageAlert("Error interno del servidor, prueba más tarde")
          typeAlert("error");
          showAlert(true);
          setDisableEdit(!disableEdit);
          setUser(undefined);
        }
      } else {
        messageAlert("¡Los datos introducidos son iguales a los actuales!")
        typeAlert("warning")
        showAlert(true)
        setDisableEdit(!disableEdit);
      }
    } catch (err) {
      console.error(err.message);
      messageAlert("Fallo al procesar petición")
      typeAlert("error")
      showAlert(true)
    }
  }

  const onDeleteUser = async () => {
    try {
      const id = user.id;
      let body = { id };
      const response = await fetch(`${Domain}users/`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", token: localStorage.token },
        body: JSON.stringify(body)
      });
      const parseResponse = await response.json();
      if (response.status === 200) {
        messageAlert("Es usuario pasó a estado INACTIVO")
        typeAlert("success")
        showAlert(true)
        setUser(undefined);
        tellUserUpdated(true);
      } else if (response.status === 401) {
        messageAlert("No tienes los permisos necesario para desabilitar a este usuario")
        typeAlert("warning")
        showAlert(true)
      } else {
        messageAlert("Error interno del servidor")
        typeAlert("error")
        showAlert(true)
      }

    } catch (err) {
      console.error(err.message);
      messageAlert("Fallo al procesar petición")
      typeAlert("error")
      showAlert(true)
    }
  }

  const onActiveUser = async () => {
    try {
      const id = user.id;
      let body = { id };
      const response = await fetch(`${Domain}users/deleted-user`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", token: localStorage.token },
        body: JSON.stringify(body)
      });
      const parseResponse = await response.json();
      if (response.status === 200) {
        messageAlert("Es usuario pasó a estado ACTIVO")
        typeAlert("success")
        showAlert(true)
        setUser(undefined);
        tellUserUpdated(true);
      } else if (response.status === 401) {
        messageAlert("No tienes los permisos necesario para activar a este usuario")
        typeAlert("warning")
        showAlert(true)
      } else {
        messageAlert("Error interno del servidor")
        typeAlert("error")
        showAlert(true)
      }

    } catch (err) {
      console.error(err.message);
    }
  }

  const allowEdit = () => {
    setDisableEdit(!disableEdit);
    if (!disableEdit) {
      setName(user.userName)
      setCurp(user.curp)
      setEmail(user.email)
      setPhone(user.phone)
      setRole(user.role)
    }
  }

  useEffect(() => {
    setName(user.userName)
    setCurp(user.curp)
    setEmail(user.email)
    setPhone(user.phone)
    setRole(user.role)
  }, [user]);

  return (
    <Fragment >
      <Title>
        Información de usuario: {user.userName} - {user.status ? "Activo" : "Inactivo"}
      </Title>

      <Form onSubmit={onSubmitForm}>
        <Row className="mb-6">

          <InputUserForm
            label="Nombre"
            controlId="formGridName"
            id="name"
            type="text"
            placeholder="Nombre"
            value={userName}
            setValue={setName}
            isDisable={disableEdit}

          />
          <InputUserForm
            label="CURP"
            id="curp"
            type="text"
            placeholder="Clave Única de Registro de Población"
            value={curp}
            setValue={setCurp}
            isDisable={disableEdit}
          />
        </Row>
        <Title>
          Contacto y permisos
        </Title>
        <Row className="mb-3">

          <InputUserForm
            label="Email"
            id="email"
            type="email"
            placeholder="Ingresa un email"
            value={email}
            setValue={setEmail}
            isDisable={disableEdit}

          />
          <InputUserForm
            label="Teléfono"
            id="phone"
            type="number"
            placeholder="Número de contacto"
            value={phone}
            setValue={setPhone}
            isDisable={disableEdit}
          />
          <SelectUserForm
            label="Rol del usuario"
            id="role"
            setValue={setRole}
            value={role}
            isDisable={disableEdit}
          />
        </Row>

        {disableEdit && user.status && (
          <Fragment>
            <Button
              variant="outline-secondary"
              type="button"
              style={{ marginRight: '1vw' }}
              onClick={() => allowEdit()}
            >
              Editar
            </Button>
            <UserConfirmDeleteModal
              title="Eliminar usuario"
              message={`¿Seguro que deseas eliminar a ${user.userName} su estado pasará a INACTIVO`}
              action={onDeleteUser}
              actionName="Eliminar"
            />
          </Fragment>
        )}
        {!user.status && (
          <UserConfirmDeleteModal
            title="Activar usuario"
            message={`¿Seguro que deseas activar a ${user.userName} su estado pasará a ACTIVO`}
            action={onActiveUser}
            actionName="Activar"
          />
        )}
        {!disableEdit && (
          <Fragment>
            <Button
              variant="outline-danger"
              type="button"
              style={{ marginRight: '1vw' }}
              onClick={() => allowEdit()}
            >
              Cancelar
            </Button>
            <Button variant="outline-warning" type="submit" >
              Guardar
            </Button>
          </Fragment>
        )}
      </Form>
    </Fragment>
  );
};

export default UserFormEdit;