import React from 'react';
import { AppBar, Toolbar, SvgIcon } from '@material-ui/core';
import LogoIcon from '@/assets/icons/logo.svg';
import { makeStyles, createStyles } from '@material-ui/styles';

const Navbar = (): JSX.Element => {
  const classes = useStyles();

  return (
    <AppBar>
      <Toolbar>
        <SvgIcon
          component={LogoIcon}
          viewBox="0 0 512 512"
          className={classes.logo}
        />
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles(
  createStyles({
    logo: {
      transform: 'scale(1.2)',
    },
  }),
);

export default Navbar;
