import React, { Fragment, useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';
import Domain from '../../domain';

import '../../assets/styles/sign-up.css'

const SignUp = ({ setAuth }) => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        rfc: "",
        curp: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    const { name, email, rfc, curp, phone, password, confirmPassword } = values;

    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const onSubmitForm = async (event) => {
        event.preventDefault();
        try {
            const body = { name, email, rfc, curp, phone, password }

            const response = await fetch(`${Domain}auth/sign-up`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const parseResponse = await response.json();
            localStorage.setItem("token", parseResponse.token);
            setAuth(true);
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <h1 className="text-center">Register</h1>
            <form onSubmit={onSubmitForm}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre completo"
                    className="form-control my-3"
                    value={name}
                    onChange={event => onChange(event)}
                />
                <input
                    type="text"
                    name="rfc"
                    placeholder="Registro Federal de Contribuyentes"
                    className="form-control my-3"
                    value={rfc}
                    onChange={event => onChange(event)}
                />
                <input
                    type="text"
                    name="curp"
                    placeholder="Clave Única de Registro de Población"
                    className="form-control my-3"
                    value={curp}
                    onChange={event => onChange(event)}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    className="form-control my-3"
                    value={email}
                    onChange={event => onChange(event)}
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Número telefónico"
                    className="form-control my-3"
                    value={phone}
                    onChange={event => onChange(event)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="form-control my-3"
                    value={password}
                    onChange={event => onChange(event)}
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirmar contraseña"
                    className="form-control my-3"
                    value={confirmPassword}
                    onChange={event => onChange(event)}
                />
                <button className="btn btn-success btn-block">Submit</button>
            </form>
            
        </Fragment>
    );
}

export default SignUp;