import React, { Fragment, useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import AuthContext from "../../AuthContext";
import PATH from "../../domain";
import Button from "@material-ui/core/Button";

const FormBasics = ({ messageAlert, typeAlert, showAlert}) => {
    const context = useContext(AuthContext);

    const [name, setName] = useState("");
    const [curp, setCurp] = useState("");
    const [phone, setPhone] = useState("");
    const [disableEdit, setDisableEdit] = useState(false);

    const onSubmitForm = async (event) => {
        event.preventDefault();
        try {
          const id = context.user.id;
          let body = {};
    
          if (name !== context.user.userName) body = { userName: name };
          if (phone !== context.user.phone) body = { phone, ...body };
          if (curp !== context.user.curp) body = { curp, ...body };
          if (Object.keys(body).length !== 0) {
            body = { id, ...body };
            const response = await fetch(`${PATH}users/`, {
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
        setName(context.user.userName);
        setCurp(context.user.curp);
        setPhone(context.user.phone);
      }, []);

    return(
        <form onSubmit={onSubmitForm}>
                    <TextField
                      required
                      id="outlined-required-name"
                      label="Nombre"
                      value={name}
                      variant="filled"
                      onChange={(e) => setName(e.target.value)}
                      disabled={!disableEdit}
                      style={{ margin: "10px", width: "90%" }}
                    />
                    <TextField
                      required
                      id="outlined-required-curp"
                      variant="filled"
                      label="CURP"
                      value={curp}
                      onChange={(e) => setCurp(e.target.value)}
                      disabled={!disableEdit}
                      style={{ margin: "10px" }}
                    />
                    <TextField
                      required
                      id="outlined-required-phone"
                      variant="filled"
                      label="Teléfono"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={!disableEdit}
                      type="number"
                      style={{ margin: "10px" }}
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
}

export default FormBasics;