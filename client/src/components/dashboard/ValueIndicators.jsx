import React, { Fragment, useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

const ValueIndicators = ({ registries, property }) => {



  const [values, setValues] = useState({});
  const [indicators, setIndicators] = useState({
    maximun: "...",
    minimum: "..."
  });

  const getIndicators = async () => {
    let maximumAuxiliar = 0;
    registries.forEach(element => {
      if (element[property] > maximumAuxiliar) maximumAuxiliar = element[property];
    });

    let minimumAuxiliar = registries[registries.length - 1][property];
    registries.forEach(element => {
      if (element[property] < minimumAuxiliar) minimumAuxiliar = element[property];
    });

    setIndicators({ maximun: maximumAuxiliar, minimum: minimumAuxiliar});
  }

  const classes = useStyles();

  useEffect(() => {
    getIndicators();
  }, [property, registries]);
  return (
    <Fragment>
      <Title>Indicadores</Title>
      <Typography component="p" variant="subtitle1">
        { registries[0] ? registries[registries.length - 1][property]: "..." }
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Actual
      </Typography>
      <Typography component="p" variant="subtitle1">
        {indicators.maximun}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Máximo
      </Typography>
      <Typography component="p" variant="subtitle1">
        {indicators.minimum}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Mínimo
      </Typography>
    </Fragment>
  );
}

export default ValueIndicators;