import React from 'react'
import { Grid, makeStyles, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
    root: {
        color: '#f5f5f5',
        display: 'flex',
        flexDirection: 'row',
        borderRadius: '10px',
        width: '50%',
        margin: '8px 30px',
        cursor: 'pointer',
        padding: '10px',
        border: '1px solid #f5f5f5',
        borderRadius: '10px',
        '&:hover': {
            background: "#1f1f2f",
            fontWeight: 'bolder',
            border: 'none'
        },
        transition: 'all 300ms ease-in'

    },
    addressCard: {
        color: '#f5f5f5',
        padding: '10px 15px',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
    },
    closeButton: {
        color: 'white',

    }

})

const UserAddress = props => {
    const classes = useStyles()

    const buildAddress = addressObj => {
        let arr = []
        for (let key in addressObj) {
            arr.push(<span key={key}>{addressObj[key]}</span>)
        }
        return arr
    }

    return (
        <Grid container className={classes.root}>
            <Grid item xs className={classes.addressCard} onClick={props.handleClick}>
                {buildAddress(props.address)}
            </Grid>

            <IconButton style={{ color: 'white' }} onClick={() => props.handleDeleteAddress()}>
                <CloseIcon />
            </IconButton>

        </Grid>
    )

}

export default UserAddress