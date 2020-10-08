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
  Input,
  TextField,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Create: React.FC<{}> = () => {
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
    <>
      <Box className={classes.root}>
        <Box className={clsx(classes.firstElem)}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={3}
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

            <Input
              name="title"
              inputRef={register}
              required
              placeholder="Title"
              disableUnderline
              className={clsx(classes.input)}
            />
            <TextField
              name="description"
              multiline
              rowsMax={5}
              rows={5}
              inputRef={register}
              required
              placeholder="Description"
              className={clsx(classes.input)}
            />
            <FormLabel component="legend">Type</FormLabel>
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
            <Input
              name="address"
              inputRef={register}
              required
              placeholder="Physical address"
              disableUnderline
              className={clsx(classes.input)}
            />
            <Button type="submit">Add</Button>
          </Grid>
        </Box>
      </Box>
    </>
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
        gridRowGap: '3rem',
        alignItems: 'center',
        margin: '1rem 3rem 1.5rem',
      },
    },
    firstElem: {
      [theme.breakpoints.down('sm')]: {
        marginTop: '7rem',
      },
      marginTop: '1rem',
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
    },
  }),
);

export default Create;
