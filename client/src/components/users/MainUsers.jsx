import React, { useState, useEffect, Fragment } from 'react';
import path from '../../domain';

import CustomAlert from '../../utils/customAlert';

import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import {Container} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import UsersList from './UsersList';
import UserModal from './UserModal';
import UsersTable from './UsersTable';
import DashboardDreawer from '../dashboard/DashBoardDrawer';


import dashboardStyles from '../../assets/styles/dashboard-styles';
import DashboardFooter from '../dashboard/DashboardFooter';
import UserFormEdit from './UserFormEdit';
import Title from '../title/Title';

const MainUsers = ({ handleDrawerClose, open, changeView }) => {

  const [showAlert, setShowAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState("Welcome");
  const [typeAlert, setTypeAlert] = useState("info");

  const classes = dashboardStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [modalShowAdd, setModalShowAdd] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(undefined);
  const [updated, setUpdated] = useState(false);

  const getUsers = async () => {
    try {
      const response = await fetch(`${path}users/`, {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseResponse = await response.json();
      setUsers(parseResponse);

    } catch (error) {
      console.error(error.message);
    }
  }

  const setShowModalAdd = () => {
    setModalShowAdd(!modalShowAdd);
  }

  const setUser = (user) => {
    setSelectedUser(user);
  }

  const tellUserUpdated = () => {
    setUpdated(true);
  }

  useEffect(() => {
    getUsers();
  }, [])

  useEffect(() => {
    if(updated){
      getUsers();
      setUpdated(false);
    }
  }, [updated])

  return (
    <Fragment>
      <DashboardDreawer handleDrawerClose={handleDrawerClose} open={open}>
        <UsersList showModal={setShowModalAdd} changeView={changeView} />
      </DashboardDreawer>
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
        <CustomAlert open={showAlert} type={typeAlert} message={messageAlert} setOpen={setShowAlert} />
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
              {selectedUser &&(
                <UserFormEdit 
                  user={ selectedUser } 
                  tellUserUpdated={tellUserUpdated}
                  setUser={setUser}
                  showAlert={setShowAlert}
                  messageAlert={setMessageAlert}
                  typeAlert={setTypeAlert}
                  />
              )}
              {!selectedUser &&(
                <Title>Selecciona un usuario para ver sus datos</Title>
              )}
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <UsersTable users={users} setUser={ setUser } />
              </Paper>
            </Grid>
          </Grid>
          <DashboardFooter />
        </Container>
      </main>
      <UserModal 
        modalShow={modalShowAdd}
        setModalShow={setShowModalAdd}
        title="Registrar colaborador"
        tellUserUpdated={tellUserUpdated}
        showAlert={setShowAlert}
        messageAlert={setMessageAlert}
        typeAlert={setTypeAlert}
      />
    </Fragment>
  );
}

export default MainUsers;