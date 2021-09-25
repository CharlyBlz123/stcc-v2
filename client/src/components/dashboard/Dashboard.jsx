import React, { useState } from 'react';


import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';
import DashboardMenu from './DashboardMenu';
import MainRegistries from '../registries/MainRegistries';
import MainUsers from '../users/MainUsers';

import dashboardStyles from '../../assets/styles/dashboard-styles';



const Dashboard = ({ setAuth }) => {

  const classes = dashboardStyles();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [open, setOpen] = useState(false);
  const [view, setView] = useState("registries");

  const changeView = (viewName) => {
    setView(viewName)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={clsx(classes.appBar, open && classes.appBarShift, classes.dashboard)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="action"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" noWrap className={classes.title}>
            Dashboard
          </Typography>
          <DashboardMenu setAuth={setAuth} />
        </Toolbar>
      </AppBar>
      
      {view === "registries" &&(
      <MainRegistries handleDrawerClose={ handleDrawerClose } open={ open } changeView={ changeView }  />
      )}
      {view === "users" &&(
      <MainUsers handleDrawerClose={ handleDrawerClose } open={ open } changeView={ changeView }  />
      )}
    </div>
  );
}

export default Dashboard;