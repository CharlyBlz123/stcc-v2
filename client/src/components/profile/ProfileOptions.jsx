import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';
import List from '@material-ui/core/List';

export const ProfileOptions = ({ changeView }) => {


    return (
        <List>
            <div>
                <ListSubheader inset>Opciones</ListSubheader>
                <ListItem button onClick={() =>{}}>
                    <ListItemIcon>
                        <EditAttributesIcon />
                    </ListItemIcon>
                    <ListItemText primary="Editar información" />
                </ListItem>
                <ListItem button onClick={() => {}}>
                    <ListItemIcon>
                        <LockOpenIcon />
                    </ListItemIcon>
                    <ListItemText primary="Cambiar contraseña" />
                </ListItem>
                <ListItem button onClick={() => changeView("registries")}>
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Regresar a registros" />
                </ListItem>
            </div>
        </List>
    );
}

export default ProfileOptions;