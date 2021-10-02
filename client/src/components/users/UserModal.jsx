import React, { Fragment, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import Title from '../title/Title';
import UserFormAdd from './UserFormAdd';

function ModalContent(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Title>
            {props.title}
          </Title>
        </Modal.Header>
        <Modal.Body>
          <UserFormAdd
            onHide={ props.onHide }
            getUsers={props.tellUserUpdated}
            showAlert={props.showAlert}
            messageAlert={props.messageAlert}
            typeAlert={props.typeAlert}
            />
        </Modal.Body>
        <Modal.Footer>
          <p  className="text-muted">Al registrar al asociado, este recibirá un email con sus credenciales</p>
        </Modal.Footer>
      </Modal>
    );
  }

const UserModal = ({ 
  modalShow,
  setModalShow,
  title, tellUserUpdated,
  showAlert,
  messageAlert,
  typeAlert,
}) => {
    
  return (
    <Fragment>

      <ModalContent
        show={modalShow}
        onHide={() => setModalShow()}
        title={title}
        tellUserUpdated={() => tellUserUpdated()}
        showAlert={showAlert}
        messageAlert={messageAlert}
        typeAlert={typeAlert}
      />
    </Fragment>
  );
}

export default UserModal;