import React, { useState } from 'react';
import Link from 'next/link';
import { storeItem } from '@/state/persistent';
import { login } from '@/api/login';
import { LoginDTO } from '@/dtos/login';
import {
  Box,
  Typography,
  Grid,
  Input,
  InputAdornment,
  SvgIcon,
  Button,
  Snackbar,
  Hidden,
} from '@material-ui/core';
import Navbar from '@/components/Navbar';
import Alert from '@/components/Alert';
import { makeStyles, createStyles } from '@material-ui/styles';
import BackgroundImg from '@/assets/images/bk.jpg';
import {
  MailOutline as MailOutlineIcon,
  Lock as LockIcon,
} from '@material-ui/icons';
import LogoIcon from '@/assets/icons/logo.svg';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';

const Login: React.FC<{}> = (): JSX.Element => {
  const [error, setError] = useState(undefined as undefined | string);
  const { register, handleSubmit } = useForm<LoginDTO>();
  const [openSnack, setOpenSnack] = useState(false);

  const classes = useStyles();

  const handleCloseSnack = (
    event?: React.SyntheticEvent,
    reason?: string,
  ): void => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const resp = await login(formData);
      storeItem('token', resp.data.token);
    } catch (_) {
      setError('Could not login');
      setOpenSnack(true);
    }
  });

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
          <Grid
            container
            item
            direction="column"
            component="form"
            onSubmit={onSubmit}
            sm={6}
            md={3}
          >
            <Snackbar
              open={openSnack}
              autoHideDuration={6000}
              onClose={handleCloseSnack}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <Alert
                onClose={handleCloseSnack}
                severity="error"
                className={classes.snack}
              >
                {error !== undefined ? error : null}
              </Alert>
            </Snackbar>

            <Input
              id="email"
              type="email"
              name="username"
              inputRef={register}
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
              id="password"
              type="password"
              name="password"
              inputRef={register}
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
            <Grid container item justify="flex-end">
              {/* TODO: link to ForgotPassword */}
              <Link href="/map">
                <Typography
                  variant="subtitle2"
                  align="right"
                  className={clsx(classes.textWhite, classes.hoverLink)}
                >
                  Forgot your password?
                </Typography>
              </Link>
            </Grid>
            <Grid container item>
              <Button
                color="primary"
                type="submit"
                variant="contained"
                className={classes.submit}
                fullWidth
                size="small"
              >
                Login
              </Button>
            </Grid>
          </Grid>
          <Grid container item justify="center">
            <Link href="/register">
              <Typography
                variant="overline"
                className={clsx(
                  classes.footText,
                  classes.textWhite,
                  classes.hoverLink,
                )}
              >
                Create new account
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
    snack: {
      maxWidth: '70%',
    },
    hoverLink: {
      '&:hover': {
        color: 'rgb(128, 156, 191)',
        cursor: 'pointer',
      },
    },
  }),
);

export default Login;
