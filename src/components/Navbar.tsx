import React from 'react';
import { AppBar, Toolbar, SvgIcon, IconButton, Box } from '@material-ui/core';
import { PersonOutline as PersonOutlineIcon } from '@material-ui/icons';
import LogoIcon from '@/assets/icons/logo.svg';
import { makeStyles, createStyles } from '@material-ui/styles';

const Navbar = (): JSX.Element => {
  const classes = useStyles();

  return (
    <AppBar>
      <Toolbar className={classes.container}>
        <SvgIcon
          component={LogoIcon}
          viewBox="0 0 512 512"
          className={classes.logo}
        />
        <Box>
          <IconButton color="inherit" aria-label="menu" href="/login">
            <PersonOutlineIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles(
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    logo: {
      transform: 'scale(1.2)',
    },
  }),
);

export default Navbar;
