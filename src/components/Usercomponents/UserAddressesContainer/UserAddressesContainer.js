import React, { useEffect, useState } from 'react'
import { Grid, Button, makeStyles, TextField } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'

import UserAddress from './UserAddress/UserAddress'
import MiniDrawer from '../../../UI/MiniDrawer/MiniDrawer'
import SlideDownAnimation from '../../../UI/SlideDownAnimation/SlideDownAnimation'

import { connect } from 'react-redux'

import {
    getUserAddresses,
    setUserAddresses,
    setCurrentDeliveryAddress
} from '../../../store/actions/index'


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
    wave: {
        '&::after': {
            background: `linear-gradient(90deg, transparent, #444 , transparent)`,
        }
    }

})

const UserAddressContainer = props => {

    const classes = useStyles()
    const [setAddress, setSetAddress] = useState(false)
    const [postalCode, setPostalCode] = useState('')
    const [postalCodeError, setPostalCodeError] = useState('')
    const [street, setStreet] = useState('')
    const [streetError, setStreetError] = useState('')


    useEffect(() => {
        console.log('why isny it running', props.user)
        const fetchUserAddresses = async () => {
            await props.getUserAddresses()
        }
        fetchUserAddresses()
    }, [])

    return (
        <MiniDrawer>
            <Grid item style={{ color: '#f5f5f5', fontWeight: 'bold', fontSize: '2rem', marginBottom: '20px' }}>
                Select Delivery Address
            </Grid>
            <Grid container direction="row" style={{ minWidth: '100%', flexGrow: 1, marginBottom: '30px' }} justify="center">

                {
                    !props.loading ?
                        (props.addresses ?
                            props.addresses.map((address, index) =>
                                <UserAddress
                                    key={index}
                                    address={address}
                                    handleClick={() => {
                                        props.setCurrentDeliveryAddress(address)
                                        console.log('clieck')
                                    }}
                                />
                            )
                            :
                            <Grid item >
                                No Address yet
                            </Grid>
                        )
                        :
                        <Grid item xs container style={{ width: '100%' }} justify="center">
                            <Skeleton
                                variant="rect"
                                width={410}
                                height={358}
                                animation="wave"
                                style={{
                                    background: '#202020',
                                }}
                                classes={{
                                    wave: classes.wave
                                }}
                            />
                        </Grid>
                }
            </Grid>

            <Grid item xs container style={{ width: '60%', margin: 'auto' }} justify="center">
                <SlideDownAnimation isVisible={setAddress} >
                    <Grid item style={{ margin: '0px 10px 0px 10px', padding: '0px 10px 0px 10px' }}>
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
                    <Grid item style={{ margin: '0px 10px', padding: '0px 10px 0px 10px' }}>
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

                    <Grid item xs container justify='center'>
                        <Grid item style={{ margin: '0px 10px', padding: '0px 10px 0px 10px' }}>
                            <Button
                                aria-label="add-it"
                                style={{
                                    fontWeight: 'bold',
                                    color: 'rgba(255,255,255,0.9)',
                                    marginBottom: '10px',
                                    background: 'transparent'
                                }}
                                onClick={() => {
                                    props.setUserAdresses({
                                        PostalCode: postalCode,
                                        Street: street
                                    })
                                    setSetAddress(false)
                                }}
                            >
                                Add
                            </Button>
                        </Grid>
                        <Grid item style={{ margin: '0px 10px', padding: '0px 10px 0px 10px' }}>
                            <Button
                                aria-label="cancel"
                                style={{
                                    fontWeight: 'bold',
                                    color: '#c51162',
                                    marginBottom: '10px',
                                    background: 'transparent'
                                }}
                                onClick={() => {
                                    setSetAddress(false)
                                }}
                            >
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </SlideDownAnimation>
            </Grid>
            {
                !setAddress ?
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
                        >
                            Add Another Address

            </Button>
                    </Grid>
                    :
                    null
            }

        </MiniDrawer>
    )

}

const mapStateToProps = state => {
    return {
        addresses: state.user.addresses,
        loading: state.user.loading,
        refreshAddresses: state.user.refreshAddresses,
        user: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserAddresses: () => dispatch(getUserAddresses()),
        setUserAdresses: (address) => dispatch(setUserAddresses(address)),
        setCurrentDeliveryAddress: (address) => dispatch(setCurrentDeliveryAddress(address))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAddressContainer)