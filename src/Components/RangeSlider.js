import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles((theme) => ({
    root: {
    },
    margin: {
        height: theme.spacing(8),
    },
}));

export default function TrackFalseSlider(props) {
    const classes = useStyles();
    let { label, bountry, strong, during } = props;

    let [value, setValue] = useState([parseInt(during.split(',')[0]), parseInt(during.split(',')[1])]);

    let handleSliderChange = (event, newValue) => {
        setValue(newValue);
    }

    let handleSliderChangeCommitted = (event, newValue) => {
        localStorage.setItem(strong, newValue);
    }

    return (
        <div className={classes.root}>
            <Typography className={classes.margin} align='left' id="track-false-range-slider" gutterBottom>
                {label}
            </Typography>
            <Slider
                track={false}
                aria-labelledby="track-false-range-slider"
                valueLabelDisplay="on"
                value={value}
                min={bountry.min}
                max={bountry.max}
                onChange={handleSliderChange}
                onChangeCommitted={handleSliderChangeCommitted}
            />
        </div>
    );
}
