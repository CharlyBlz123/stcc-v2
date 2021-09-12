import React, { Fragment, useState, useEffect } from 'react';
import socket from '../../Socket';
import path from '../../domain';

import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import PropertiesList from './PropertiesList';
import Chart from './Chart';
import ValueIndicators from './ValueIndicators';
import RegistriesTable from './RegistriesTable';
import UserMenu from './UserMenu';

import dashboardStyles from '../../assets/styles/dashboard-styles';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Dashboard = ({ setAuth }) => {

  const classes = dashboardStyles();
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [users, setUsers] = useState([]);
  const [registries, setRegistries] = useState([]);

  const [chartInformation, setChartInformation] = useState({
    title: "Temperatura",
    property: "temperature",
    unitOfMeasurement: "Grados"
  });

  const [change, setChange] = useState(false);
  const [open, setOpen] = useState(true);


  const getRegistries = async () => {
    try {
      const response = await fetch(`${path}registries/`, {
        method: "GET",
        headers: { token: localStorage.token }
      });
      const parseResponse = await response.json();
      const sortResponse = parseResponse.reverse();
      
      setRegistries(sortResponse);
    } catch (err) {
      console.error(err.message)
    }
  };

  const setInformation = (title, property, unitOfMeasurement) => {
    const newChartInformation = {title: title, property: property, unitOfMeasurement: unitOfMeasurement }
    setChartInformation({...newChartInformation});
  }

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

  const logOut = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  }


  useEffect(() => {
    getRegistries();
  }, [change]);

  useEffect(() => {
    socket.on('new: data', (c) => {
      getRegistries();

    });
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift, classes.dashboard)}>
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
          <UserMenu logOut={logOut} />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <PropertiesList setInformation={ setInformation } />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart chartInformation= {chartInformation} registries={ registries } />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <ValueIndicators registries={ registries } property={ chartInformation.property } />
              </Paper>
            </Grid>
            {/* Recent RegistriesTable */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <RegistriesTable registries={ registries }/>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}

export default Dashboard;