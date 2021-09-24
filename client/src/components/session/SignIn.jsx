import React, { useState } from 'react';
import Domain from '../../domain';

import coverImage from '../../assets/images/lemon-sign-in.png';
import '../../assets/styles/sign-up.css';

const SignIn = ({ setAuth }) => {

    const [values, setValues] = useState({
        userCode: "",
        password: "",
    });

    const { userCode, password } = values;

    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const onSubmitForm = async (event) => {
        event.preventDefault();
        try {
            const body = { userCode, password }

            const response = await fetch(`${Domain}auth/sign-in`, {
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
        <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
            <div className="card card0 border-0">
                <div className="row d-flex">
                    <div className="col-lg-6">
                        <div className="row px-3 justify-content-center mt-4 mb-5 border-line">
                            <img className="cover-sign-in" src={ coverImage } />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card2 card border-0 px-4 py-5">
                            <h6 className="text-center title-sign-in">Bienvenido al STCC</h6>
                            <form onSubmit={onSubmitForm}>
                                <div className="row px-3">
                                    <label className="mb-1">
                                        <h6 className="mb-0 text-sm">Número de cuenta</h6>
                                    </label>
                                    <input 
                                        className="mb-4 input-sign-in"
                                        type="text" name="userCode"
                                        placeholder="Ingresa tu número de cuenta" 
                                        value={userCode}
                                        onChange={event => onChange(event)}
                                    />
                                </div>
                                <div className="row px-3">
                                    <label className="mb-1">
                                        <h6 className="mb-0 text-sm">Contraseña</h6>
                                    </label>
                                    <input
                                        className="mb-4 input-sign-in"
                                        type="password"
                                        name="password"
                                        placeholder="Ingresa tu contraseña"
                                        value={password}
                                        onChange={event => onChange(event)}    
                                    />
                                </div>
                                <div className="row px-3 mb-4">
                                    <div className="custom-control custom-checkbox custom-control-inline"> </div>
                                    <a href="#" className="ml-auto mb-0 text-sm text-sign-up" >¿Olvidaste tu contraseña?</a>
                                </div>
                                <div className="row mb-3 px-3">
                                    <button type="submit" className="btn btn-green text-center">Aceptar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="bg-blue py-4">
                    <div className="row px-3">
                        <small className="ml-4 ml-sm-5 mb-2">Copyright &copy; 2021. Todos los derechos reservados.</small>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;