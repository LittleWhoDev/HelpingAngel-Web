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
  LockOutlined as LockOutlinedIcon,
  PersonOutline as PersonOutlineIcon,
} from '@material-ui/icons';
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

  // Register in loc de login
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
              <PersonOutlineIcon className={classes.logoImg} />
            </Box>
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
              id="name"
              type="text"
              name="name"
              ref={register} // register who ?
              required
              startAdornment={
                <InputAdornment position="start">
                  <PersonOutlineIcon />
                </InputAdornment>
              }
              placeholder="Name"
              disableUnderline
              className={classes.input}
            />
            <Input
              id="email"
              type="email"
              name="email"
              ref={register}
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
              ref={register}
              required
              startAdornment={
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              }
              placeholder="Password"
              disableUnderline
              className={classes.input}
            />
            <Input
              id="passwordConf"
              type="password"
              name="passwordConf"
              ref={register}
              required
              startAdornment={
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              }
              placeholder="Confirm Password"
              disableUnderline
              className={classes.input}
            />

            <Grid container item>
              <Button
                color="primary"
                type="submit"
                variant="contained"
                className={classes.submit}
                fullWidth
                size="small"
              >
                Register
              </Button>
            </Grid>
          </Grid>
          <Grid container item justify="center">
            <Typography
              variant="overline"
              className={clsx(classes.footText, classes.textWhite)}
            >
              Already have an account?{' '}
              <Link href="/login">
                <Typography variant="overline" className={classes.link}>
                  Login
                </Typography>
              </Link>
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
      left: '2.28rem',
      transform: 'scale(2.5)',
      color: 'white',
    },
    submit: {
      marginTop: '2rem',
      height: '3rem',
      borderRadius: '0.5rem',
    },
    footText: {
      marginTop: '4rem',
    },
    snack: {
      maxWidth: '70%',
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

export default Login;
