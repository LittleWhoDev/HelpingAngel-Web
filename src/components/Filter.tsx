import { MapContext } from '@/hooks/map';
import React, { useState, useContext } from 'react';
import {
  Button,
  Typography,
  Box,
  Slider,
  Grid,
  Theme,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles, createStyles } from '@material-ui/styles';
import { useSlider } from '@/hooks/slider';
import clsx from 'clsx';
import { PostType } from '@/api/posts';

interface FilterProps {
  closeDialog: () => void;
}

const Filter: React.FC<FilterProps> = ({ closeDialog }) => {
  const { filters, setFilters } = useContext(MapContext);
  const [typeState, setTypeState] = useState(filters.type);
  const { sliderState, setSliderState, marks } = useSlider(filters.range);
  const classes = useStyles();

  const handleSliderChange = (_, value): void => {
    setSliderState({ ...sliderState, value });
  };

  const handleSubmit = (): void => {
    setFilters({
      ...filters,
      range: sliderState.value,
      type: typeState,
    });
    closeDialog();
  };

  const handleTypeButton = (type: PostType): void => {
    if (typeState === type) {
      setTypeState(undefined);
    } else {
      setTypeState(type);
    }
  };

  return (
    <Box className={classes.root}>
      <Box className={clsx(classes.firstElem)}>
        <Typography variant="h4" align="center" gutterBottom>
          Type
        </Typography>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={3}
        >
          <Grid container item xs={6}>
            <Button
              variant="contained"
              color={typeState === PostType.OFFER ? 'secondary' : 'primary'}
              size="large"
              id="offerButton"
              onClick={() => handleTypeButton(PostType.OFFER)}
              className={classes.button}
            >
              Donnor
            </Button>
          </Grid>
          <Grid container item xs={6}>
            <Button
              variant="contained"
              color={typeState === PostType.REQUEST ? 'secondary' : 'primary'}
              size="large"
              id="requestButton"
              onClick={() => handleTypeButton(PostType.REQUEST)}
              className={classes.button}
            >
              Reciever
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.sliderContainer}>
        <Typography id="range-slider" variant="h4" gutterBottom>
          Range
        </Typography>
        <Slider
          className={classes.slider}
          aria-labelledby="range-slider"
          valueLabelDisplay="auto"
          step={30}
          marks={marks}
          value={sliderState.value}
          min={sliderState.min}
          max={sliderState.max}
          onChange={handleSliderChange}
        />
      </Box>
      <Button
        className={classes.submit}
        variant="contained"
        color="primary"
        startIcon={<SearchIcon fontSize="inherit" />}
        onClick={handleSubmit}
      >
        <Typography variant="body1">Search</Typography>
      </Button>
    </Box>
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
    sliderContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        width: '70%',
      },
    },
    slider: {
      width: '90%',
    },
    submit: {
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      },
      height: '3rem',
    },
    button: {
      '& *': {
        pointerEvents: 'none',
      },
    },
  }),
);

export default Filter;
