import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import OpacityIcon from '@material-ui/icons/Opacity';
import WavesIcon from '@material-ui/icons/Waves';
import ExploreIcon from '@material-ui/icons/Explore';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import BarChartIcon from '@material-ui/icons/BarChart';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

export const mainListItems = (
  <div>
     <ListSubheader inset>Usuarios</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <WbSunnyIcon />
      </ListItemIcon>
      <ListItemText primary="Temperatura" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ExploreIcon />
      </ListItemIcon>
      <ListItemText primary="Velidad del viento" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <CompareArrowsIcon />
      </ListItemIcon>
      <ListItemText primary="Presión" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <WavesIcon />
      </ListItemIcon>
      <ListItemText primary="Radiación" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <OpacityIcon />
      </ListItemIcon>
      <ListItemText primary="Humedad" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BeachAccessIcon />
      </ListItemIcon>
      <ListItemText primary="Precipitación" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Usuarios</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <PersonAddIcon />
      </ListItemIcon>
      <ListItemText primary="Registrar" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleAltIcon />
      </ListItemIcon>
      <ListItemText primary="Listar" />
    </ListItem>
  </div>
);