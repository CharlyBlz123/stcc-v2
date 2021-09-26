import React, { Fragment, useState, useEffect } from 'react';
import socket from '../../Socket';
import path from '../../domain';

import clsx from 'clsx';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import PropertiesList from './PropertiesList';
import Chart from './Chart';
import ValueIndicators from './ValueIndicators';
import RegistriesTable from './RegistriesTable';

import dashboardStyles from '../../assets/styles/dashboard-styles';
import DashboardDreawer from '../dashboard/DashBoardDrawer';
import DashboardFooter from '../dashboard/DashboardFooter';


const MainRegistries = ( { handleDrawerClose, open, changeView } ) => {

  const classes = dashboardStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [registries, setRegistries] = useState([]);

  const [chartInformation, setChartInformation] = useState({
    title: "Temperatura",
    property: "temperature",
    unitOfMeasurement: "Grados"
  });
  const [change, setChange] = useState(false);

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

  useEffect(() => {
    getRegistries();
  }, [change]);

  useEffect(() => {
    socket.on('new: data', (c) => {
      getRegistries();

    });
  }, []);
  

  return (
    
    <Fragment>
        <DashboardDreawer handleDrawerClose={handleDrawerClose} classes={classes} open={open}>
          <PropertiesList setInformation={ setInformation } changeView={ changeView } />
        </DashboardDreawer>
      <main className={classes.content} >
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
          <DashboardFooter />
        </Container>
      </main>
    </Fragment>
    
  );
}

export default MainRegistries;