import React from 'react';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';


const InputUserForm = ({ id, type, placeholder, value, label, setValue, isDisable }) => {
    const onChange = (event) => {
        setValue(event.target.value);
    }

    return(
        <Form.Group as={Col}>
                    <Form.Floating>
                        <Form.Control
                            id={ id }
                            type={ type }
                            placeholder={placeholder}
                            value={ value }
                            onChange={event => onChange(event)}
                            disabled={isDisable}
                        />
                        <label htmlFor={ id }>{ label }</label>
                    </Form.Floating>
                </Form.Group>
    );
}

export default InputUserForm;