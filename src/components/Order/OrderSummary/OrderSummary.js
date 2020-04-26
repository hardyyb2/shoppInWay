import React, { useState, useEffect } from 'react'
import { Grid, Paper, makeStyles, TextField, Button } from '@material-ui/core'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';


import MiniDrawer from '../../../UI/MiniDrawer/MiniDrawer'

import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { getUserProfileDetails, setOrder } from '../../../store/actions/index'

import OrderTable from './OrdersTable/OrderTable'

const useStyles = makeStyles(theme => ({
    root: {
        background: '#1f1f1f',
        width: '80%',
        margin: 'auto'
    },
    paper: {
        background: '#1f1f2f',
        color: '#f5f5f5'
    },
    row: {
        padding: '10px',
        borderBottom: '4px solid #1f1f1f',

    },
    header: {
        fontSize: '1.4rem',
        padding: '15px',
        textAlign: 'center',
        outline: '4px solid #1f1f1f',
        border: '2px solid #f5f5f5'
    },
    input: {
        color: '#f5f5f5',
        borderBottom: '1px solid #f5f5f5',
        outline: 'none'
    },
    label: {
        color: '#f5f5f5 !important',
        outline: 'none'
    },

}))

const OrderSummary = props => {
    const classes = useStyles()
    const history = useHistory()
    let today = new Date()
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [payMethod, setPayMethod] = useState('COD')
    const [total, setTotal] = useState(0)

    let dateToday = `${today.getUTCDate()}-${today.getUTCMonth() + 1}-${today.getUTCFullYear()}`

    useEffect(() => {
        if (props.profile) {
            let up = props.profile
            setName(up.Name || '')
            setPhone(up.Phone || '')
            setEmail(up.email || '')
        } else {
            props.getUserProfileDetails()
        }
    }, [])

    const handleOwnThis = () => {
        let order = {
            name: name || '',
            phone: phone || '',
            email: email || '',
            address: setDeliveryAddress() || '',
            products: props.finalProducts.map(product => product.id),
            total: calcTotal() || '',
            paymentMethod: payMethod || ''
        }

        props.setOrder(order)
        history.replace('/ordersuccess')
    }

    const setDeliveryAddress = () => {
        let addressString = ''
        for (let key in props.currentDeliveryAddress) {
            addressString += `${props.currentDeliveryAddress[key]} , \n`
        }
        return addressString
    }

    const calcTotal = () => {
        let totalPrice = 0
        props.finalProducts.map((product, index) => {
            totalPrice += product.product_price
        })
        return totalPrice
    }

    return (
        <MiniDrawer>
            <Grid container className={classes.root} justify="center">
                <Paper elevate={6} className={classes.paper}>

                    <Grid container>
                        <Grid container justify="center" className={classes.header}>
                            Order Summary
                        </Grid>
                        <Grid container direction="row" className={classes.row} >
                            <Grid container item xs justify="center" style={{ alignItems: 'center' }}>
                                Name
                             </Grid>
                            <Grid container item xs justify="center" >
                                <TextField
                                    fullWidth
                                    placeholder="Name..."
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    InputProps={{
                                        className: classes.input,
                                    }}
                                    InputLabelProps={{
                                        className: classes.label,
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <Grid container direction="row" className={classes.row}>
                            <Grid container item xs justify="center" style={{ alignItems: 'center' }}>
                                Email
                             </Grid>
                            <Grid container item xs justify="center" >
                                <TextField
                                    fullWidth
                                    placeholder="Email..."
                                    value={email}
                                    readOnly={true}
                                    style={{ pointerEvents: 'none' }}
                                    InputProps={{
                                        className: classes.input,
                                    }}
                                    InputLabelProps={{
                                        className: classes.label,
                                    }}
                                />
                            </Grid>
                        </Grid>


                        <Grid container direction="row" className={classes.row}>
                            <Grid container item xs justify="center" style={{ alignItems: 'center' }}>
                                Phone
                             </Grid>
                            <Grid container item xs justify="center" >
                                <TextField
                                    fullWidth
                                    placeholder="Phone..."
                                    value={phone}
                                    onChange={e => setName(e.target.value)}
                                    InputProps={{
                                        className: classes.input,
                                    }}
                                    InputLabelProps={{
                                        className: classes.label,
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container direction="row" className={classes.row}>
                            <Grid container item xs justify="center" style={{ alignItems: 'center' }}>
                                Date
                            </Grid>
                            <Grid container item xs justify="center" >
                                <TextField
                                    fullWidth
                                    placeholder="Name..."
                                    value={dateToday}
                                    readOnly={true}
                                    style={{ pointerEvents: 'none' }}
                                    InputProps={{
                                        className: classes.input,
                                    }}
                                    InputLabelProps={{
                                        className: classes.label,
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container direction="row" className={classes.row}>
                            <Grid container item xs justify="center" style={{ alignItems: 'center' }}>
                                Address
                            </Grid>
                            <Grid container item xs justify="center" >
                                <TextField
                                    fullWidth
                                    placeholder="Name..."
                                    value={setDeliveryAddress()}
                                    readOnly={true}
                                    style={{ pointerEvents: 'none' }}
                                    InputProps={{
                                        className: classes.input,
                                    }}
                                    InputLabelProps={{
                                        className: classes.label,
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container style={{ borderTop: '10px solid #1f1f1f' }}>
                            <OrderTable
                                finalProducts={props.finalProducts} />
                        </Grid>
                        <Grid container style={{ borderTop: '10px solid #1f1f1f' }}>
                            <Grid item xs style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Pay with</Grid>
                            <Grid item xs container justify="center">
                                <FormControl component="fieldset">
                                    <RadioGroup aria-label="method" name="method" value={payMethod} onChange={e => setPayMethod(e.target.value)}>
                                        <FormControlLabel value="COD" control={<Radio />} label="COD" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>

                    </Grid>
                </Paper>
                <Grid container justify="center" style={{ marginTop: '10px' }}>
                    <Grid item xs container justify="flex-end">
                        <Button
                            variant="contained"
                            style={{
                                background: '#35425d',
                                color: '#f5f5f5',
                                marginRight: '10px',
                                fontSize: '1.2rem',
                                textTransform: 'capitalize'
                            }}

                            onClick={() => { history.replace('/') }}
                        >
                            Cancel
                                </Button>
                    </Grid>
                    <Grid item xs container justify="flex-start">
                        <Button
                            variant="contained"
                            style={{
                                background: '#c51162',
                                color: '#f5f5f5',
                                fontSize: '1.2rem',
                                textTransform: 'capitalize'
                            }}
                            onClick={handleOwnThis}
                        >
                            Own this
                                </Button>
                    </Grid>
                </Grid>

            </Grid>
        </MiniDrawer>
    )

}

const mapStateToProps = state => {
    return {
        profile: state.user.profile,
        finalProducts: state.products.finalProducts,
        currentDeliveryAddress: state.user.currentDeliveryAddress
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserProfileDetails: () => dispatch(getUserProfileDetails()),
        setOrder: order => dispatch(setOrder(order))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary)