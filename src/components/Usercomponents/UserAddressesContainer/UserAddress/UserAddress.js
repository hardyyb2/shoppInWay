import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    addressCard: {
        color: '#f5f5f5',
        padding: '10px 15px',
        margin: 'auto',
        border: '1px solid #f5f5f5',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '10px'
    }
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
        <Grid item className={classes.addressCard}>
            {buildAddress(props.address)}
        </Grid>
    )

}

export default UserAddress