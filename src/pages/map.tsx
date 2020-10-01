import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { MapContext, useMapState } from '@/hooks/map';
import Filter from '@/components/Filter';
import {
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Fab,
  Box,
  Hidden,
  Theme,
  SvgIcon,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import {
  ArrowBackIos as ArrowBackIosIcon,
  Explore as ExploreIcon,
  PersonOutline as PersonOutlineIcon,
  Add as AddIcon,
} from '@material-ui/icons';
import LogoIcon from '@/assets/icons/logo.svg';

const MapComponent = dynamic(() => import('@/components/Map'), { ssr: false });

const Map: React.FC<{}> = () => {
  const mapState = useMapState();
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <MapContext.Provider value={mapState}>
        <MapComponent />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setOpen(true);
          }}
          className={classes.filterButton}
        >
          Filters
        </Button>
        <Hidden mdUp>
          <Dialog fullScreen onClose={handleClose} open={open}>
            <AppBar>
              <Toolbar className={classes.toolBarDialog}>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleClose}
                >
                  <ArrowBackIosIcon />
                </IconButton>
                <Typography className={classes.toolBarTitle} variant="h6">
                  Filters
                </Typography>
                <Box />
              </Toolbar>
            </AppBar>
            <Filter closeDialog={handleClose} />
          </Dialog>
          <AppBar className={classes.appBarMain}>
            <Toolbar className={classes.toolBarDialog}>
              <IconButton color="inherit" aria-label="menu">
                <ExploreIcon />
              </IconButton>
              <Fab
                color="secondary"
                aria-label="add"
                className={classes.fabButton}
              >
                <AddIcon />
              </Fab>
              <IconButton color="inherit" aria-label="menu">
                <PersonOutlineIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Hidden>
        <Hidden smDown>
          <Dialog onClose={handleClose} open={open}>
            <Box className={classes.headDialog} bgcolor="primary.main">
              <Typography
                className={classes.toolBarTitle}
                variant="h5"
                align="center"
              >
                Filters
              </Typography>
            </Box>
            <Filter closeDialog={handleClose} />
          </Dialog>
          <AppBar>
            <Toolbar>
              <SvgIcon component={LogoIcon} viewBox="0 0 512 512" />
            </Toolbar>
          </AppBar>
        </Hidden>
      </MapContext.Provider>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    filterButton: {
      top: '6rem',
      right: '3rem',
      position: 'fixed',
      zIndex: 1200,
      [theme.breakpoints.down('md')]: {
        right: '2rem',
      },
      [theme.breakpoints.down('sm')]: {
        top: '1.5rem',
        right: '1rem',
      },
    },
    toolBarDialog: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    headDialog: {
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    toolBarTitle: {
      [theme.breakpoints.down('sm')]: {
        position: 'relative',
        right: '1.1rem',
      },
      [theme.breakpoints.up('md')]: {
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
      },
      color: 'white',
    },
    appBarMain: {
      position: 'fixed',
      bottom: 0,
      top: 'auto',
      borderTopLeftRadius: '25px',
      borderTopRightRadius: '25px',
    },
    fabButton: {
      position: 'absolute',
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: '0 auto',
    },
  }),
);

export default Map;
