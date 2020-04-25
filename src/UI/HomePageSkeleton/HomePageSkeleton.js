import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
    card: {
        width: 345,
        margin: theme.spacing(2),
        background: '#1f1f2f',
        ['@media (max-width: 850px)']: {
            width: '300px',
            minWidth: '300px',

        },

        ['@media (max-width: 720px)']: {
            width: '400px',
            minWidth: '400px',

        },
        ['@media (max-width: 500px)']: {
            width: '330px',
            minWidth: '330px',

        },

        ['@media (max-width: 450px)']: {
            width: '260px',
            minWidth: '260px',

        },
        ['@media (max-width: 350px)']: {
            width: '250px',
            minWidth: '250px',
        }
    },
    media: {
        height: 250,
    },
    wave: {
        '&::after': {
            background: `linear-gradient(90deg, transparent, #444 , transparent)`,
        }
    }

}));

const HomePageSkeleton = (props) => {
    const classes = useStyles();
    useEffect(() => {
        console.log('this has landed')
    }, [])

    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Skeleton classes={{
                        wave: classes.wave
                    }} animation="wave" variant="circle" width={40} height={40} />
                }
                action={null}
                title={
                    <Skeleton classes={{
                        wave: classes.wave
                    }} animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />

                }
                subheader={<Skeleton classes={{
                    wave: classes.wave
                }} animation="wave" height={10} width="40%" />}
            />

            <Skeleton classes={{
                wave: classes.wave
            }} animation="wave" variant="rect" className={classes.media} />


            <CardContent>

                <React.Fragment>
                    <Skeleton animation="wave" height={20} style={{ marginBottom: 6 }} classes={{
                        wave: classes.wave
                    }} />
                    <Skeleton animation="wave" height={20} width="80%" classes={{
                        wave: classes.wave
                    }} />

                    <Skeleton animation="wave" height={20} width="80%" classes={{
                        wave: classes.wave
                    }} />
                    <Skeleton animation="wave" height={20} width="80%" classes={{
                        wave: classes.wave
                    }} />
                </React.Fragment>
            </CardContent>
        </Card>
    );
}

export default HomePageSkeleton

HomePageSkeleton.propTypes = {
    loading: PropTypes.bool,
};
