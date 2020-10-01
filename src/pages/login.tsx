import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Input,
  InputAdornment,
  SvgIcon,
  Button,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import BackgroundImg from '@/assets/images/bk.jpg';
import {
  MailOutline as MailOutlineIcon,
  Lock as LockIcon,
} from '@material-ui/icons';
import LogoIcon from '@/assets/icons/logo.svg';
import clsx from 'clsx';

const Login = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.rootContainer}>
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Box className={classes.logoArea}>
              <SvgIcon
                component={LogoIcon}
                viewBox="0 0 512 512"
                className={classes.logoImg}
              />
            </Box>
          </Grid>
          <Grid item>
            <Typography
              variant="h4"
              align="center"
              className={clsx(classes.headTextFont, classes.headTextLayout)}
            >
              Helping Angel
            </Typography>
          </Grid>
          <Grid container item direction="column">
            <Input
              id="email"
              type="email"
              required
              startAdornment={
                <InputAdornment position="start">
                  <MailOutlineIcon />
                </InputAdornment>
              }
              placeholder="Email"
              disableUnderline
              className={classes.input}
            />
            <Input
              id="Password"
              type="password"
              required
              startAdornment={
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              }
              placeholder="Password"
              disableUnderline
              className={classes.input}
            />
          </Grid>
          <Grid container item justify="flex-end">
            <Typography
              variant="subtitle2"
              align="right"
              className={classes.textWhite}
            >
              Forgot your password?
            </Typography>
          </Grid>
          <Grid container item>
            <Button
              color="primary"
              variant="contained"
              className={classes.submit}
              fullWidth
              size="small"
            >
              Login
            </Button>
          </Grid>
          <Grid container item justify="center">
            <Typography
              variant="overline"
              className={clsx(classes.textWhite, classes.footText)}
            >
              Create new account
            </Typography>
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
    },
    headTextFont: {
      color: 'yellow',
      WebkitTextStroke: '1px black',
    },
    headTextLayout: {
      marginBottom: '3rem',
    },
    input: {
      '&::placeholder': {
        color: 'white',
      },
      color: 'white',
      backgroundColor: 'rgba(76, 76, 76, 0.5)',
      borderRadius: '0.5rem',
      padding: '0.4rem 1rem',
      marginBottom: '1rem',
    },
    textWhite: {
      color: 'white',
    },
    logoArea: {
      marginBottom: '2rem',
      height: '6rem',
      width: '6rem',
      borderRadius: '50%',
      border: '2px solid orange',
      backgroundColor: 'rgba(76, 76, 76, 0.5)',
    },
    logoImg: {
      position: 'relative',
      top: '2rem',
      left: '2.3rem',
      transform: 'scale(3)',
    },
    submit: {
      marginTop: '2rem',
      height: '3rem',
      borderRadius: '0.5rem',
    },
    footText: {
      textDecoration: 'underline',
      marginTop: '4rem',
    },
  }),
);

export default Login;
