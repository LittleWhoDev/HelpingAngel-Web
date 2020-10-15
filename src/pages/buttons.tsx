import React from 'react';
import Link from 'next/link';
import {
  Box,
  Typography,
  Grid,
  SvgIcon,
  Button,
  Hidden,
} from '@material-ui/core';
import Navbar from '@/components/Navbar';
import { makeStyles, createStyles } from '@material-ui/styles';
import BackgroundImg from '@/assets/images/bk.jpg';
import { ArrowForwardIosRounded as ArrowForwardIosRoundedIcon } from '@material-ui/icons';
import clsx from 'clsx';
import UserIcon from '@/assets/icons/user.svg';
import FoodIcon from '@/assets/icons/food.svg';

const Buttons: React.FC<{}> = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.rootContainer}>
        <Hidden smDown>
          <Navbar />
        </Hidden>
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography
              variant="h3"
              align="center"
              className={clsx(classes.headTextFont, classes.headTextLayout)}
            >
              Welcome to <br />
              Helping Angel
            </Typography>
          </Grid>

          <Grid
            container
            item
            alignItems="flex-start"
            justify="center"
            className={classes.decisionContainer}
          >
            <Grid item>
              <Box className={classes.cardContainer}>
                <Box className={classes.logoArea}>
                  <SvgIcon
                    component={FoodIcon}
                    viewBox="0 0 512 512"
                    className={classes.logoFood}
                  />
                </Box>
                <Typography
                  variant="h4"
                  className={clsx(classes.textWhite, classes.cardTitle)}
                >
                  Donate
                </Typography>
                <Typography
                  variant="h6"
                  className={classes.textWhite}
                  align="center"
                >
                  <Box fontWeight="fontWeightLight">
                    Donate your food for the needy
                  </Box>
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box className={classes.cardContainer}>
                <Box className={classes.logoArea}>
                  <SvgIcon
                    component={UserIcon}
                    viewBox="0 0 103.057 126.555"
                    className={classes.logoUser}
                  />
                </Box>
                <Typography
                  variant="h4"
                  className={clsx(classes.textWhite, classes.cardTitle)}
                >
                  Receive
                </Typography>
                <Typography
                  variant="h6"
                  className={classes.textWhite}
                  align="center"
                >
                  <Box fontWeight="fontWeightLight">
                    Receive food from people or restaurant
                  </Box>
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Button
            endIcon={<ArrowForwardIosRoundedIcon />}
            size="large"
            className={clsx(classes.textWhite, classes.nextButton)}
          >
            Next page
          </Button>

          <Grid container item justify="center" className={classes.footText}>
            <Link href="/login">
              <Typography variant="overline" className={classes.textWhite}>
                Are you an angel?
              </Typography>
            </Link>
            <Link href="/register">
              <Typography
                variant="overline"
                className={classes.textWhite}
                style={{ marginLeft: '5px' }}
              >
                Create an account
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles(
  createStyles({
    root: {
      backgroundImage: `linear-gradient(grey 90%, black), url(${BackgroundImg})`,
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      backgroundSize: 'cover',
      backgroundBlendMode: 'multiply',
    },
    rootContainer: {
      margin: '8rem 2rem 0',
      height: '100%',
    },
    headTextFont: {
      color: '#ffcc00',
      WebkitTextStroke: '1px black',
    },
    headTextLayout: {
      marginBottom: '3rem',
    },
    decisionContainer: {
      '& > *': {
        margin: '0 2rem',
      },
      margin: '1rem 0 2rem 0',
    },
    cardContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '20rem',
    },
    cardTitle: {
      marginBottom: '0.5rem',
    },
    logoArea: {
      marginBottom: '2rem',
      height: '9rem',
      width: '9rem',
      borderRadius: '50%',
      border: '4px solid white',
      backgroundColor: '#ffcc00',
      overflow: 'hidden',
      '& *': {
        fill: 'white',
        stroke: 'white',
        position: 'relative',
      },
      '&:hover': {
        '& *': {
          fill: 'black',
          stroke: 'black',
        },
        backgroundColor: 'white',
        border: '4px solid #ffcc00',
      },
    },
    logoFood: {
      top: '3.4rem',
      left: '3.9rem',
      transform: 'scale(4)',
    },
    logoUser: {
      top: '3.6rem',
      left: '3.77rem',
      transform: 'scale(3)',
    },
    footText: {
      marginTop: '1.5rem',
      '& *': {
        '&:hover': {
          color: 'rgb(128, 156, 191)',
          cursor: 'pointer',
        },
      },
    },
    textWhite: {
      color: 'white',
    },
    nextButton: {
      position: 'relative',
      left: '1rem',
      paddingRight: '2rem',
      '& .MuiButton-endIcon': {
        position: 'relative',
        left: '0.5rem',
        transform: 'scale(1.3)',
      },
      '&:hover': {
        color: 'rgb(128, 156, 191)',
      },
    },
    link: {
      '&:hover': {
        color: '#0080ff',
      },
      color: '#00bfff',
      cursor: 'pointer',
    },
    hoverLink: {
      '&:hover': {
        color: 'rgb(128, 156, 191)',
        cursor: 'pointer',
      },
    },
  }),
);

export default Buttons;
