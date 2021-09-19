import React from 'react';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';


const InputUserForm = ({ id, type, placeholder, value, label, controlId, setValue }) => {
    const onChange = (event) => {
        setValue(event.target.value);
    }

    return(
        <Form.Group as={Col} controlId={ controlId }>
                    <Form.Floating>
                        <Form.Control
                            id={ id }
                            type={ type }
                            placeholder={placeholder}
                            value={ value }
                            onChange={event => onChange(event)}
                        />
                        <label htmlFor={ id }>{ label }</label>
                    </Form.Floating>
                </Form.Group>
    );
}

export default InputUserForm;