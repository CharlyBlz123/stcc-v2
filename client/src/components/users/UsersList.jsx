import React from 'react';
import { Link } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import KeyboardReturnTwoTone from '@material-ui/icons/KeyboardReturnTwoTone';
import PersonAdd from '@material-ui/icons/PersonAddSharp';

import List from '@material-ui/core/List';

export const UsersList = ({ showModal, changeView }) => {

    return (
        <List>
            <div>
                <ListSubheader inset>Funciones</ListSubheader>
                
                <ListItem button onClick={() => changeView("registries")}>
                        <ListItemIcon>
                            <KeyboardReturnTwoTone />
                        </ListItemIcon>
                        <ListItemText primary="Regresar a registros" />
                    </ListItem>
              
                <ListSubheader inset>Usuarios</ListSubheader>
                <ListItem button onClick={() => showModal() } >
                    <ListItemIcon>
                        <PersonAdd />
                    </ListItemIcon>
                    <ListItemText primary="Registrar" />
                </ListItem>
            </div>
        </List>
    );
}

export default UsersList;