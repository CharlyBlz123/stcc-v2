import React, { Fragment, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Eliminar a usuario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              ¿Seguro que deseas eliminar a {props.userName}? Su estado en el sistema pasará a INACTIVO
            </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>
              Cancelar
            </Button>   
            <Button
                variant="danger"
                onClick={() => {
                    props.deleteUser();
                    props.onHide();
                    }}
                >
              Eliminar
            </Button>
          </Modal.Footer>
      </Modal>
    );
  }
  
  function UserConfirmDeleteModal({ userName, deleteUser}) {
    const [show, setShow] = useState(false);
  
    const handleShow = () => {
        setShow(!show);
    }
  
    return (
      <Fragment>
        <Button variant="danger" onClick={handleShow}>
            Eliminar
        </Button>
  
        <MyVerticallyCenteredModal
          show={show}
          onHide={handleShow}
          userName={userName}
          deleteUser={deleteUser}
        />
      </Fragment>
    );
  }
export default UserConfirmDeleteModal;