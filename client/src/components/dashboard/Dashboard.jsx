import React, {Fragment, useState} from 'react';

const Dashboard = ({ setAuth }) => {
    return(
        <Fragment>
            <h1>Dashboard</h1>
            <button onClick={() => setAuth(false)} className="btn btn-dark">LogOut</button>
        </Fragment>
    );
} 

export default Dashboard;