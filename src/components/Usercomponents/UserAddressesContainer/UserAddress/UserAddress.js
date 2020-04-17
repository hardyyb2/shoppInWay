import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    addressCard: {
        color: '#f5f5f5',
        padding: '10px 15px',
        minWidth: '150px',
        textAlign: 'left',
        margin: '10px',
        border: '1px solid #f5f5f5',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '10px',
        cursor: 'pointer',
        '&:hover': {
            background: "#1f1f2f",
            fontWeight: 'bolder',
            border: 'none'
        },
        transition: 'all 300ms ease-in'
    },

})

const UserAddress = props => {
    const classes = useStyles()

    const buildAddress = addressObj => {
        let arr = []
        for (let key in addressObj) {
            arr.push(<span>{addressObj[key]}</span>)
        }
        return arr
    }

    return (
        <Grid item className={classes.addressCard} onClick={props.handleClick}>
            {buildAddress(props.address)}
        </Grid>
    )

}

export default UserAddress