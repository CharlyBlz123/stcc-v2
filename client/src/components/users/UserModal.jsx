import React, { Fragment, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import Title from '../title/Title';
import UserForm from './UserForm';

function FormModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Title>
            Registrar usuario
          </Title>
        </Modal.Header>
        <Modal.Body>
          <UserForm onHide={ props.onHide }/>
        </Modal.Body>
        <Modal.Footer>
          <p  className="text-muted">Al registrar al asociado, este recibirá un email con sus credenciales</p>
        </Modal.Footer>
      </Modal>
    );
  }

const AddUserForm = ({ modalShow, setModalShow }) => {
    
  return (
    <Fragment>

      <FormModal
        show={modalShow}
        onHide={() => setModalShow()}
      />
    </Fragment>
  );
}

export default AddUserForm;