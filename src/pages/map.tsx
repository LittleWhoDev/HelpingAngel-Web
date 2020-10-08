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
  Grid,
} from '@material-ui/core';
import Navbar from '@/components/Navbar';
import { makeStyles, createStyles } from '@material-ui/styles';
import {
  ArrowBackIos as ArrowBackIosIcon,
  Explore as ExploreIcon,
  PersonOutline as PersonOutlineIcon,
  Add as AddIcon,
} from '@material-ui/icons';
import Create from '@/components/Post/Create';

const MapComponent = dynamic(() => import('@/components/Map'), { ssr: false });

interface DialogsState {
  [key: string]: boolean;
}

const Map: React.FC<{}> = () => {
  const mapState = useMapState();
  const [dialogsState, setDialogsState] = useState<DialogsState>({
    filters: false,
    addPost: false,
  });
  const classes = useStyles();

  const handleClose = (dialogName: string): (() => void) => (): void =>
    setDialogsState({ ...dialogsState, [dialogName]: false });

  return (
    <>
      <MapContext.Provider value={mapState}>
        <MapComponent />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setDialogsState({ ...dialogsState, filters: true });
          }}
          className={classes.filterButton}
        >
          Filters
        </Button>
        <Hidden mdUp>
          <Dialog
            fullScreen
            onClose={handleClose('addPost')}
            open={dialogsState.addPost}
          >
            <AppBar>
              <Toolbar className={classes.toolBarDialog}>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleClose('addPost')}
                >
                  <ArrowBackIosIcon />
                </IconButton>
                <Typography className={classes.toolBarTitle} variant="h6">
                  Add a new post
                </Typography>
                <Box />
              </Toolbar>
            </AppBar>
            <Grid
              container
              item
              direction="column"
              component="form"
              sm={6}
              md={3}
            >
              <Create />
            </Grid>
          </Dialog>
          <Dialog
            fullScreen
            onClose={handleClose('filters')}
            open={dialogsState.filters}
          >
            <AppBar>
              <Toolbar className={classes.toolBarDialog}>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleClose('filters')}
                >
                  <ArrowBackIosIcon />
                </IconButton>
                <Typography className={classes.toolBarTitle} variant="h6">
                  Filters
                </Typography>
                <Box />
              </Toolbar>
            </AppBar>
            <Filter closeDialog={handleClose('filters')} />
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
                <IconButton
                  onClick={() => {
                    setDialogsState({ ...dialogsState, addPost: true });
                  }}
                >
                  <AddIcon />
                </IconButton>
              </Fab>
              {/* TODO: href to Account page */}
              <IconButton color="inherit" aria-label="menu" href="/login">
                <PersonOutlineIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Hidden>
        <Hidden smDown>
          <Dialog onClose={handleClose('filters')} open={dialogsState.filters}>
            <Box className={classes.headDialog} bgcolor="primary.main">
              <Typography
                className={classes.toolBarTitle}
                variant="h5"
                align="center"
              >
                Filters
              </Typography>
            </Box>
            <Filter closeDialog={handleClose('filters')} />
          </Dialog>
          <Navbar />
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
