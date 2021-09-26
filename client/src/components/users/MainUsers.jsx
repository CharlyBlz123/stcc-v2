import React, { useState, useEffect, Fragment } from 'react';
import path from '../../domain';

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

const MainUsers = ({ handleDrawerClose, open, changeView }) => {

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
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
              {selectedUser &&(
                <UserFormEdit 
                  user={ selectedUser } 
                  tellUserUpdated={tellUserUpdated}
                  setUser={setUser}                />
              )}
              {!selectedUser &&(
                <p>Nada</p>
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
      />
    </Fragment>
  );
}

export default MainUsers;