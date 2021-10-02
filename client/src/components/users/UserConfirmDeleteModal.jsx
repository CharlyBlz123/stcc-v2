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
            <Modal.Title id="contained-modal-title-vcenter">{props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              {props.message}
            </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>
              Cancelar
            </Button>   
            <Button
                variant="danger"
                onClick={() => {
                    props.action();
                    props.onHide();
                    }}
                >
              {props.actionName}
            </Button>
          </Modal.Footer>
      </Modal>
    );
  }
  
  function UserConfirmDeleteModal({ userName, action, title, message, actionName}) {
    const [show, setShow] = useState(false);
  
    const handleShow = () => {
        setShow(!show);
    }
  
    return (
      <Fragment>
        <Button variant="danger" onClick={handleShow}>
            {actionName}
        </Button>
  
        <MyVerticallyCenteredModal
          show={show}
          onHide={handleShow}
          userName={userName}
          action={action}
          title={title}
          message={message}
          actionName={actionName}
        />
      </Fragment>
    );
  }
export default UserConfirmDeleteModal;