import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Paper,
    Grid
} from '@material-ui/core/';
import ControlPanel from './ControlPanel';
import BarChart from '../Charts/BarChart';
import BrushChart from '../Charts/BrushChart';
import LeafLetMap from './Map';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function CenteredGrid() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <ControlPanel />
                    </Paper>
                </Grid>
                <Grid item xs={9}>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Paper className={classes.paper}><LeafLetMap /></Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper className={classes.paper}>
                                <BarChart />
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <BrushChart />
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
