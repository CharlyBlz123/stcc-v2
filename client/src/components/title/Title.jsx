import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import '../../assets/styles/title.css'

export default function Title(props) {
  return (
    <Typography className="title-style"  component="h2" variant="h6" gutterBottom >
      {props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node
};