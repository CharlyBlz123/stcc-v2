import React, { Fragment, useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import AuthContext from "../../AuthContext";
import Button from "@material-ui/core/Button";
import PATH from "../../domain";

const FormCredentials = ({ messageAlert, typeAlert, showAlert}) => {
    const context = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [disableEdit, setDisableEdit] = useState(false);

    const onSubmitForm = async (event) => {
        event.preventDefault();
        try {
          const id = context.user.id;
          let body = {oldPassword: oldPassword};
    
          if (email !== context.user.email) body = { email, ...body };
          if (password !== ""){
              if(password.length < 6){
                messageAlert("La contraseña debe tener por lo menos 6 caracteres");
                typeAlert("warning");
                showAlert(true);
                setDisableEdit(!disableEdit);
                } else {
                    if(passwordConfirm !== password){
                        messageAlert("Las contraseñas deben coincidir");
                        typeAlert("warning");
                        showAlert(true);
                        setDisableEdit(!disableEdit);
                    } else {
                        body = { password, ...body };
                    }
              }
          }
          if (Object.keys(body).length !== 0) {
            body = { id, ...body };
            const response = await fetch(`${PATH}users/credentials`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                token: localStorage.token,
              },
              body: JSON.stringify(body),
            });
            if (response.status === 200) {
              messageAlert("Usuario actualizado con éxito");
              typeAlert("success");
              showAlert(true);
              setDisableEdit(!disableEdit);
            } else if (response.status === 401) {
              messageAlert(
                "No tienes los permisos necesarios para actualizar este usuario"
              );
              typeAlert("warning");
              showAlert(true);
              setDisableEdit(!disableEdit);
            } else {
              messageAlert("Error interno del servidor, prueba más tarde");
              typeAlert("error");
              showAlert(true);
              setDisableEdit(!disableEdit);
            }
          } else {
            messageAlert("¡Los datos introducidos son iguales a los actuales!");
            typeAlert("warning");
            showAlert(true);
            setDisableEdit(!disableEdit);
          }
        } catch (err) {
          console.error(err.message);
          messageAlert("Fallo al procesar petición");
          typeAlert("error");
          showAlert(true);
        }
      };

    useEffect(() => {
        setEmail(context.user.email);
      }, []);
  

  return (
    <form onSubmit={onSubmitForm}>
      <TextField
        id="outlined-email"
        label="Correo electrónico"
        value={email}
        variant="filled"
        onChange={(e) => setEmail(e.target.value)}
        disabled={!disableEdit}
        style={{ margin: "10px", width: "90%" }}
      />
      <TextField
        id="outlined-password"
        variant="filled"
        label="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={!disableEdit}
        style={{ margin: "10px", width: "90%" }}
        type="password"
      />
      <br />
      <TextField
        id="outlined-password-confirm"
        variant="filled"
        label="Confirmar contraseña"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        disabled={!disableEdit}
        style={{ margin: "10px", width: "90%" }}
        type="password"
      />
      <br />
      <TextField
        required
        id="outlined-required-old-password"
        variant="filled"
        label="Contraseña antigua"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        disabled={!disableEdit}
        style={{ margin: "10px", width: "90%" }}
        type="password"
      />
      <br />
      {!disableEdit && (
        <Fragment>
          <Button
            variant="contained"
            type="button"
            style={{ marginRight: "1vw" }}
            onClick={() => setDisableEdit(!disableEdit)}
          >
            Editar
          </Button>
        </Fragment>
      )}
      {disableEdit && (
        <Fragment>
          <Button
            variant="contained"
            type="button"
            style={{ margin: "1vw" }}
            onClick={() => setDisableEdit(!disableEdit)}
          >
            Cancelar
          </Button>
          <Button variant="contained" type="submit">
            Guardar
          </Button>
        </Fragment>
      )}
    </form>
  );
};

export default FormCredentials;
