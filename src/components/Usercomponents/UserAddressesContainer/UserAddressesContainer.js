import React from 'react'
import { Grid } from '@material-ui/core'
import UserAddress from './UserAddress/UserAddress'

const UserAddressContainer = props => {

    return (
        <Grid container direction="row" style={{ maxWidth: '700px', margin: 'auto' }}>
            {props.addresses && props.addresses.map(address => <UserAddress address={address} />)}
        </Grid>
    )

}

export default UserAddressContainer