import React, { Fragment, useState } from "react";

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';

const UserMenu = ( { logOut } ) => {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

    return (
        <Fragment>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <AccountCircle   color="action" /><ArrowDropDown   color="action"/>
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Perfil</MenuItem>
                <MenuItem onClick={(event) => logOut(event)}>Cerrar sesión</MenuItem>
            </Menu>
        </Fragment>
    );
}

export default UserMenu;