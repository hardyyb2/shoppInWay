import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Grid, Paper } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: '10px',
        margin: 'auto',
        width: '90%',
        background: '#1f1f2a'

    },
    media: {
        height: 250,
    },
    title: {
        fontSize: '2.6rem',
        color: 'rgba(255,255,255,0.9)',
        marginBottom: '20px'
    },
    subtitle: {
        fontSize: '1.8rem',
        color: 'rgba(255,255,255,0.7)',
        marginBottom: '20px'

    },
    desc: {
        width: '70%',
        height: '200px',
        margin: 'auto',
        color: 'rgba(255,255,255,0.7)',
        marginBottom: '20px'


    },
    price: {
        marginTop: '15px',
        padding: '8px 15px',
        fontSize: '2rem',
        color: 'rgba(255,255,255,1)'
    }
    ,
    wave: {
        '&::after': {
            background: `linear-gradient(90deg, transparent, #444 , transparent)`,
        }
    }

}));

const DetailsPageSkeleton = (props) => {
    const classes = useStyles();
    useEffect(() => {
        console.log('this has landed')
    }, [])

    return (
        <Grid container style={{
            background: '#181a1b', alignItems: 'center'
        }} >
            <div className={classes.root
            } >
                <Paper className={classes.paper}>
                    <Grid container justify="center" style={{ alignItems: 'center' }} spacing={2}>
                        <Grid item>
                            <Skeleton classes={{
                                wave: classes.wave
                            }} variant="rect" animation="wave" height={500} width={300} />

                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column">
                                <Grid item xs>
                                    <Skeleton classes={{
                                        wave: classes.wave
                                    }} variant="rect" animation="wave"
                                        className={classes.title}
                                    />

                                    <Skeleton classes={{
                                        wave: classes.wave
                                    }} variant="rect" animation="wave"
                                        className={classes.subtitle}
                                    />

                                    <Skeleton classes={{
                                        wave: classes.wave
                                    }} variant="rect" animation="wave"
                                        className={classes.desc}
                                    />

                                </Grid>
                                <Grid item xs container spacing={3} direction="row" justify="center">
                                    <Grid item>

                                        <Skeleton classes={{
                                            wave: classes.wave
                                        }} variant="rect" animation="wave" height={20} width={300}
                                            className={classes.price}
                                        />

                                    </Grid>
                                    <Grid item>

                                        <Skeleton classes={{
                                            wave: classes.wave
                                        }} variant="rect" animation="wave" height={20} width={300}
                                            className={classes.price}
                                        />

                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                </Paper>

            </div>
        </Grid>
    );
}

export default DetailsPageSkeleton

DetailsPageSkeleton.propTypes = {
    loading: PropTypes.bool,
};
