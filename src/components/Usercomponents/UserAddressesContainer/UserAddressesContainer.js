import React, { useEffect, useState } from 'react'
import { Grid, Button, makeStyles, TextField } from '@material-ui/core'
import UserAddress from './UserAddress/UserAddress'

import MiniDrawer from '../../../UI/MiniDrawer/MiniDrawer'

import { connect } from 'react-redux'

import { getUserAddresses, setUserAddresses } from '../../../store/actions/index'

import SlideDownAnimation from '../../../UI/SlideDownAnimation/SlideDownAnimation'

const useStyles = makeStyles({
    input: {
        color: '#f5f5f5',
        borderBottom: '1px solid #f5f5f5',
        outline: 'none'
    },
    label: {
        color: '#f5f5f5 !important',
        outline: 'none'
    },

})

const UserAddressContainer = props => {

    const classes = useStyles()
    const [setAddress, setSetAddress] = useState(false)
    const [postalCode, setPostalCode] = useState('')
    const [postalCodeError, setPostalCodeError] = useState('')
    const [street, setStreet] = useState('')
    const [streetError, setStreetError] = useState('')

    const [disabledButton, setDisabledButton] = useState(true)

    useEffect(async () => {
        await props.getUserAddresses()
        setDisabledButton(false)

    }, [])

    return (
        <MiniDrawer>
            <Grid item style={{ color: '#f5f5f5', fontWeight: 'bold', fontSize: '2rem', marginBottom: '20px' }}>
                Select Delivery Address
            </Grid>
            <Grid container direction="row" style={{ minWidth: '100%', flexGrow: 1, marginBottom: '30px' }}>
                {
                    props.addresses ?
                        props.addresses.map((address, index) => <UserAddress key={index} address={address} />)
                        :
                        <Grid item >
                            No Address yet
                         </Grid>
                }
            </Grid>

            <Grid item xs container style={{ width: '100%' }} justify="center">
                <SlideDownAnimation isVisible={setAddress} >
                    <Grid item style={{ margin: '0px 10px 10px 10px', padding: '0px 10px 10px 10px' }}>
                        <TextField
                            autofocus
                            fullWidth
                            label='Postal code'
                            placeholder='Postal code'
                            value={postalCode}
                            error={postalCodeError}
                            helperText={postalCodeError ? 'Please fill this out' : ' '}
                            onChange={e => setPostalCode(e.target.value)}
                            InputProps={{
                                className: classes.input,

                            }}
                            InputLabelProps={{
                                className: classes.label,
                            }}
                        />
                    </Grid>
                    <Grid item style={{ margin: '0px 10px 10px 10px', padding: '0px 10px 10px 10px' }}>
                        <TextField
                            fullWidth
                            label='Address'
                            placeholder='Address'
                            value={street}
                            error={streetError}
                            helperText={streetError ? 'Please fill this out' : ' '}
                            onChange={e => setStreet(e.target.value)}
                            InputProps={{
                                className: classes.input,

                            }}
                            InputLabelProps={{
                                className: classes.label,
                            }}
                        />
                    </Grid>
                </SlideDownAnimation>
            </Grid>

            <Grid item xs container style={{ width: '100%' }} justify="center">
                <Button
                    aria-label="address"
                    variant="contained"
                    style={{
                        fontWeight: 'bold',
                        background: '#c51162',
                        color: 'rgba(255,255,255,0.9)'
                    }}
                    onClick={() => setSetAddress(true)}
                    disabled={disabledButton}
                >
                    Add Another Address

                </Button>
            </Grid>

        </MiniDrawer>
    )

}

const mapStateToProps = state => {
    return {
        addresses: state.user.addresses
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserAddresses: () => dispatch(getUserAddresses()),
        setUserAdresses: (address) => dispatch(setUserAddresses(address))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAddressContainer)