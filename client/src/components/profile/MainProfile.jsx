import React, { Fragment, useContext, useEffect, useState } from "react";

import CustomAlert from "../../utils/customAlert";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import dashboardStyles from "../../assets/styles/dashboard-styles";
import DashboardDreawer from "../dashboard/DashBoardDrawer";
import DashboardFooter from "../dashboard/DashboardFooter";
import ProfileOptionsList from "./ProfileOptions";
import Title from "../title/Title";
import FormBasics from "./FormBasics";
import FormCredentials from "./FormCredentials";


const MainProfile = ({ handleDrawerClose, open, changeView }) => {

  const [formView, setFormView] = useState("basic");
  const [showAlert, setShowAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState("Welcome");
  const [typeAlert, setTypeAlert] = useState("info");

  const classes = dashboardStyles();

  const changeForm = (view) => {
    setFormView(view);
  };

  return (
    <Fragment>
      <DashboardDreawer
        handleDrawerClose={handleDrawerClose}
        classes={classes}
        open={open}
      >
        <ProfileOptionsList changeView={changeView} changeForm={changeForm} />
      </DashboardDreawer>

      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Title>Perfil</Title>

                <div className={classes.appBarSpacer} />
                <CustomAlert
                  open={showAlert}
                  type={typeAlert}
                  message={messageAlert}
                  setOpen={setShowAlert}
                />

                {formView === "basic" && (
                  <FormBasics messageAlert={setMessageAlert} typeAlert={setTypeAlert} showAlert={setShowAlert} />
                )}
                {formView === "credentials" && (
                  <FormCredentials messageAlert={setMessageAlert} typeAlert={setTypeAlert} showAlert={setShowAlert} />
                )}
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
};

export default MainProfile;
