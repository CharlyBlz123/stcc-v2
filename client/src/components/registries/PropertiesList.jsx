import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import PeopleAlt from '@material-ui/icons/PeopleAlt';
import OpacityIcon from '@material-ui/icons/Opacity';
import WavesIcon from '@material-ui/icons/Waves';
import ExploreIcon from '@material-ui/icons/Explore';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import List from '@material-ui/core/List';

export const PropertiesList = ({ setInformation, changeView }) => {


  return (
    <List>
      <div>
        <ListSubheader inset>Indicadores</ListSubheader>
        <ListItem button onClick={() => setInformation("Temperatura", "temperature", "Grados")}>
          <ListItemIcon>
            <WbSunnyIcon />
          </ListItemIcon>
          <ListItemText primary="Temperatura" />
        </ListItem>
        <ListItem button onClick={() => setInformation("Velocidad del viento", "wind", "m/s")}>
          <ListItemIcon>
            <ExploreIcon />
          </ListItemIcon>
          <ListItemText primary="Velidad del viento" />
        </ListItem>
        <ListItem button onClick={() => setInformation("Presión", "pression", "m/s")}>
          <ListItemIcon>
            <CompareArrowsIcon />
          </ListItemIcon>
          <ListItemText primary="Presión" />
        </ListItem>
        <ListItem button onClick={() => setInformation("Radiación", "radiation", "W/m²")}>
          <ListItemIcon>
            <WavesIcon />
          </ListItemIcon>
          <ListItemText primary="Radiación" />
        </ListItem>
        <ListItem button onClick={() => setInformation("Humedad", "humidity", "g/m3")}>
          <ListItemIcon>
            <OpacityIcon />
          </ListItemIcon>
          <ListItemText primary="Humedad" />
        </ListItem>
        <ListItem button onClick={() => setInformation("Precipitación", "precipitation", "%")}>
          <ListItemIcon>
            <BeachAccessIcon />
          </ListItemIcon>
          <ListItemText primary="Precipitación" />
        </ListItem>
        <ListSubheader inset>Indicadores</ListSubheader>
          <ListItem button onClick={() => changeView("users")}>
            <ListItemIcon>
              <PeopleAlt />
            </ListItemIcon>
            <ListItemText primary="Panel de usuarios" />
          </ListItem>
      </div>
    </List>
  );
}

export default PropertiesList;