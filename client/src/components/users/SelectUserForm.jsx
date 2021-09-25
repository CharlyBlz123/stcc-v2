import React from 'react';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';


const SelectUserForm = ({ id, label, controlId, setValue }) => {
    const onChange = (event) => {
        setValue(event.target.value);
    }

    return (
        <Form.Group as={Col} controlId={controlId}>
            <Form.Floating>
                <Form.Select
                    aria-label={label}
                    id={id}
                    onChange={event => onChange(event)}
                >
                    <option>Rol </option>
                    <option value="regular">Regular</option>
                    <option value="admin">Administrador</option>
                </Form.Select>

            </Form.Floating>
        </Form.Group>
    );
}

export default SelectUserForm;