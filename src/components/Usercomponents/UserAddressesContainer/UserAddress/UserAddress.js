import React from 'react'
import { Grid } from '@material-ui/core'

const UserAddress = props => {

    const buildAddress = addressObj => {
        let arr = []
        for (let key in addressObj) {
            arr.push(
                <Grid item xs style={{ color: '#f5f5f5' }}>
                    {addressObj[key]}
                </Grid>
            )
        }
        return arr
    }

    return (
        <Grid container direction="column">
            {buildAddress(props.address)}
        </Grid>
    )

}

export default UserAddress