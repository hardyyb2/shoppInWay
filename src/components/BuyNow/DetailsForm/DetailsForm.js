import React, { useState } from 'react'
import { Grid, Button } from '@material-ui/core'
import validator from 'validator'

import FormInput from './FormInput'


const DetailsForm = props => {

    const [orderForm, setOrderForm]
        = useState({
            Name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name..'
                },
                value: '',
                valid: false,
                touched: false,
                validation: {
                    required: true
                }
            },
            Email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Email..'
                },
                value: '',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    isEmail: true
                }
            },
            Phone: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Phone Number..'
                },
                value: '',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    isNumber: true
                }
            },
            Street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street..'
                },
                value: '',
                valid: false,
                touched: false,
                validation: {
                    required: true
                }
            },
            PostalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP..'
                },
                value: '',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 3
                }
            },

        })
    const [formIsValid, setFormIsValid] = useState(false)


    const checkValidation = (value, rules) => {
        let isValid = true
        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.maxLength) {
            isValid = value.length >= rules.maxLength && isValid
        }
        if (rules.isEmail) {
            isValid = validator.isEmail(value) && isValid
        }
        if (rules.isNumber) {
            isValid = validator.isDecimal(value) && isValid
        }
        return isValid
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedForm = { ...orderForm }
        const updatedFormElement = { ...updatedForm[inputIdentifier] }
        updatedFormElement.value = event.target.value
        updatedFormElement.valid = checkValidation(
            updatedFormElement.value,
            updatedFormElement.validation
        )
        updatedFormElement.touched = true
        updatedForm[inputIdentifier] = updatedFormElement
        let formIsValid = true
        for (let key in updatedForm) {
            formIsValid = updatedForm[key].valid && formIsValid
        }
        setOrderForm(updatedForm)
        setFormIsValid(formIsValid)
    }


    const formElementsArray = []
    for (let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key],
            title: key
        })
    }

    return (
        <Grid container direction="column" justify="center"
            style={{ marginTop: '30px' }}
        >
            {
                formElementsArray.map((elem, index) => {
                    return (
                        <Grid key={index} item xs container justify="center">
                            <FormInput
                                key={elem.id}
                                touched={elem.config.touched}
                                elementType={elem.config.elementType}
                                elementConfig={elem.config.elementConfig}
                                value={elem.config.value}
                                invalid={!elem.config.valid}
                                shouldValidate={elem.config.validation}
                                touched={elem.config.touched}
                                changed={event => inputChangedHandler(event, elem.id)}
                                label={elem.title}
                            />
                        </Grid>
                    )
                })}
            <Grid item xs container justify="center">

                <Button
                    variant="contained"
                    style={{
                        fontWeight: 'bold',
                        background: (formIsValid ? '#c51162' : '#1d1d1d'),
                        color: (formIsValid ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.2)'),
                        marginBottom: '20px'
                    }}
                    onClick={() => {
                        let details = {}
                        for (let key in orderForm) {
                            if (key === 'phone') {
                                details[key] = parseInt(orderForm[key].value)
                            }
                            else {
                                details[key] = orderForm[key].value
                            }
                        }
                        props.handleDeliveryOptions(details)
                    }}
                    disabled={!formIsValid}

                >
                    {/* Choose Delivery Method */}
                     Order
                </Button>

            </Grid>
        </Grid >
    )

}

export default DetailsForm