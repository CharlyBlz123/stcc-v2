import React, {Fragment} from 'react';

const SignIn = ({ setAuth }) => {
    return(
        <Fragment>
            <h1>Log In</h1>
            <button onClick={() => setAuth(true)} className="btn btn-dark">Authenticate</button>
        </Fragment>
    );
}

export default SignIn;