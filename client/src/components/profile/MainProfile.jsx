import React, { Fragment, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';

import path from '../../domain';

import CustomAlert from '../../utils/customAlert';

import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import dashboardStyles from '../../assets/styles/dashboard-styles';
import DashboardDreawer from '../dashboard/DashBoardDrawer';
import DashboardFooter from '../dashboard/DashboardFooter';
import ProfileOptionsList from './ProfileOptions';
import Title from '../title/Title';
import { InputAdornment } from '@mui/material';


const MainProfile = ({
    handleDrawerClose,
    open,
    changeView }) => {

    const [showAlert, setShowAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState("Welcome");
    const [typeAlert, setTypeAlert] = useState("info");
    const [user, setUser] = useState({});

    const classes = dashboardStyles();

    const getUserData = async () => {
        try {
            const response = await fetch(`${path}registries/`, {
                method: "GET",
                headers: { token: localStorage.token }
            });
            const parseResponse = await response.json();

        } catch (err) {
            console.error(err.message)
        }
    };

    useEffect(() => {

    }, []);

    return (

        <Fragment>
            <DashboardDreawer handleDrawerClose={handleDrawerClose} classes={classes} open={open}>
                <ProfileOptionsList changeView={changeView} />
            </DashboardDreawer>

            <main className={classes.content}>
                <Container maxWidth="lg" className={classes.container}>
                    <CustomAlert open={showAlert} type={typeAlert} message={messageAlert} setOpen={setShowAlert} />
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>

                                <Title>Perfil</Title>

                                <div className={classes.appBarSpacer} />
                                <CustomAlert open={showAlert} type={typeAlert} message={messageAlert} setOpen={setShowAlert} />
                                <TextField
                                    id="input-with-icon-textfield"
                                    label="TextField"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircle />
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="standard"
                                />
                                 <TextField
                                    id="input-with-icon-textfield"
                                    label="TextField"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircle />
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="standard"
                                />
                                 <TextField
                                    id="input-with-icon-textfield"
                                    label="TextField"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircle />
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="standard"
                                />



                            </Paper>
                        </Grid>
                    </Grid>
                    <DashboardFooter />
                </Container>
            </main>
            <div className={classes.appBarSpacer} />

            <DashboardFooter />

        </Fragment>

    );
}


export default MainProfile;