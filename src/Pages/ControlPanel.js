import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Button
} from '@material-ui/core/';
import RangeSlider from '../Components/RangeSlider';
import TagsPicker from '../Components/TagsPicker';
import MyContext from '../MyContext';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

export default function ControlPanel() {
    const classes = useStyles();
    let usersContext = useContext(MyContext);
    let { setCountries,
        setyearDuring,
        setMonthDuring,
        yearBountry,
        monthBountry,
        yearDuring,
        monthDuring } = usersContext;

    let handleButtonClick = () => {
        setCountries(JSON.parse(localStorage.getItem('countries')));
        setyearDuring(localStorage.getItem('yearDuring'));
        setMonthDuring(localStorage.getItem('monthDuring'));
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3} >
                <Grid item xs={12}>
                    <RangeSlider label={'Years\' Setting'} bountry={yearBountry} strong={'yearDuring'} during={yearDuring} />
                </Grid>
                <Grid item xs={12}>
                    <RangeSlider label={'Months\' Setting'} bountry={monthBountry} strong={'monthDuring'} during={monthDuring} />
                </Grid>
                <Grid item xs={12}>
                    <TagsPicker />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleButtonClick}>
                        Confirm
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}
