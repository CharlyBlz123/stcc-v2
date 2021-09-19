import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import BackspaceIcon from '@material-ui/icons/Backspace';
import EditIcon from '@material-ui/icons/Edit';
import FeaturedVideoIcon from '@material-ui/icons/FeaturedVideo'
import DesktopAccessDisabledIcon from '@material-ui/icons/DesktopAccessDisabled';
import LocalPhoneIcon from '@material-ui/icons/LocalPhone';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import CheckIcon from '@material-ui/icons/Check';
import BlockIcon from '@material-ui/icons/Block';

import Title from '../title/Title';

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));


const UsersTable = ({ users }) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Title>Usuarios</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">
                            <FeaturedVideoIcon /> Código
                        </TableCell>
                        <TableCell align="center">
                            <EmojiPeopleIcon /> Nombre
                        </TableCell>
                        <TableCell align="center">
                            <AlternateEmailIcon /> Email
                        </TableCell>
                        <TableCell align="center">
                            <LocalPhoneIcon /> Teléfono
                        </TableCell>
                        <TableCell align="center">
                            <DesktopAccessDisabledIcon /> Estado
                        </TableCell>
                        <TableCell align="center">
                            <EditIcon /> Editar
                        </TableCell>
                        <TableCell align="center">
                            <BackspaceIcon /> Eliminar
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell align="center" >{user.userCode}</TableCell>
                            <TableCell >{user.userName}</TableCell>
                            <TableCell align="center" >{user.email}</TableCell>
                            <TableCell align="center" >{user.phone}</TableCell>
                            <TableCell align="center" >{user.status ? <CheckIcon />:<BlockIcon />}</TableCell>
                            <TableCell align="center" >{'Algo'}</TableCell>
                            <TableCell align="center" >{'Algo'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className={classes.seeMore}>
                <Link color="primary" href="#" onClick={preventDefault}>
                    Mostrar más
                </Link>
            </div>
        </React.Fragment>
    );
}

export default UsersTable;