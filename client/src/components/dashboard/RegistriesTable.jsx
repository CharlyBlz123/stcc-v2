import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import OpacityIcon from '@material-ui/icons/Opacity';
import WavesIcon from '@material-ui/icons/Waves';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import ExploreIcon from '@material-ui/icons/Explore';
import WbSunnyIcon from '@material-ui/icons/WbSunny';

import Title from '../title/Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

 const  RegistriesTable = ( { registries } ) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Registros recientes</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell align="center">
              <WbSunnyIcon /> Temperatura
            </TableCell>
            <TableCell align="center">
              <ExploreIcon /> Viento
            </TableCell>
            <TableCell align="center">
              <CompareArrowsIcon /> Presión
            </TableCell>
            <TableCell align="center">
              <WavesIcon /> Radiación
            </TableCell>
            <TableCell align="center">
              <OpacityIcon /> Humedad
            </TableCell>
            <TableCell align="center">
              <BeachAccessIcon /> Precipitación
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {registries.map((registry) => (
            <TableRow key={registry.id}>
              <TableCell  align="center" >{registry.time}</TableCell>
              <TableCell  align="center" >{registry.temperature}</TableCell>
              <TableCell  align="center" >{registry.wind}</TableCell>
              <TableCell  align="center" >{registry.pression}</TableCell>
              <TableCell  align="center" >{registry.radiation}</TableCell>
              <TableCell  align="center" >{registry.humidity}</TableCell>
              <TableCell  align="center" >{registry.precipitation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          Ver más registros
        </Link>
      </div>
    </React.Fragment>
  );
}

export default RegistriesTable;