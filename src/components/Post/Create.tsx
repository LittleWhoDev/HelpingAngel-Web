import {
  createPost,
  CreatePostForm,
  PostCategory,
  PostType,
  PostTypeDisplay,
  PostTypes,
} from '@/api/posts';
import {
  Box,
  Button,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  Snackbar,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface CreateProps {
  closeDialog: () => void;
}

const Create: React.FC<CreateProps> = ({ closeDialog }) => {
  const classes = useStyles();
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm<CreatePostForm>();
  const onSubmit = handleSubmit(async (formData) => {
    const newFormData: CreatePostForm = {
      ...formData,
      category: PostCategory.FOOD, // TODO: add multiple categories
      type: parseInt(formData.type as string, 10) as PostType,
    };

    try {
      await createPost(newFormData);
    } catch (e) {
      setError('Could not create post');
      setOpenSnack(true);
    }
    closeDialog();
  });
  const [openSnack, setOpenSnack] = useState(false);
  const handleCloseSnack = (
    _?: React.SyntheticEvent,
    reason?: string,
  ): void => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  return (
    <Grid
      className={classes.root}
      container
      direction="column"
      justify="center"
      alignItems="center"
      component="form"
      onSubmit={onSubmit}
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

      <TextField
        name="title"
        inputRef={register}
        required
        placeholder="Title"
        className={clsx(classes.inputOuter, classes.firstElem)}
        InputProps={{
          disableUnderline: true,
          classes: { input: classes.inputInner },
        }}
      />
      <TextField
        name="description"
        multiline
        rowsMax={5}
        rows={5}
        inputRef={register}
        required
        placeholder="Description"
        className={clsx(classes.inputOuter)}
        InputProps={{
          disableUnderline: true,
          classes: { input: classes.inputInner },
        }}
      />
      <Box className={classes.radioContainer}>
        <Typography variant="h4">Type</Typography>
        <RadioGroup row aria-label="position" name="type">
          {PostTypes.map((type) => (
            <FormControlLabel
              value={type}
              name="type"
              control={<Radio color="primary" />}
              label={PostTypeDisplay[type]}
              labelPlacement="top"
              inputRef={register}
            />
          ))}
        </RadioGroup>
      </Box>
      <TextField
        name="address"
        inputRef={register}
        required
        placeholder="Physical address"
        className={clsx(classes.inputOuter)}
        InputProps={{
          disableUnderline: true,
          classes: { input: classes.inputInner },
        }}
      />
      <Button
        className={clsx(classes.submit, classes.button)}
        variant="contained"
        color="primary"
        type="submit"
      >
        <Typography variant="body1">Add</Typography>
      </Button>
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
      },
      [theme.breakpoints.up('md')]: {
        display: 'grid',
        gridRowGap: '1rem',
        alignItems: 'center',
        margin: '1rem 3rem 1.5rem',
        width: 'auto',
      },
    },
    firstElem: {
      [theme.breakpoints.down('sm')]: {
        marginTop: '7rem',
      },
      marginTop: '1rem',
    },
    radioContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      alignItems: 'center',
      justifyItems: 'center',
      rowGap: '1rem',
      padding: '1rem 0',
    },
    inputOuter: {
      backgroundColor: 'rgba(63, 81, 181, 1)',
      borderRadius: '0.5rem',
      padding: '0.4rem 1rem',
      marginBottom: '1rem',
    },
    inputInner: {
      '&::placeholder': {
        color: 'white',
        opacity: 0.7,
      },
      '&:hover': {
        '&::placeholder': {
          opacity: 0.9,
        },
      },
      color: 'white',
    },
    submit: {
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      },
      height: '3rem',
    },
    snack: {
      maxWidth: '70%',
    },
    button: {
      '& *': {
        pointerEvents: 'none',
      },
      '&:hover': {
        backgroundColor: '#f44336',
      },
    },
  }),
);

export default Create;
