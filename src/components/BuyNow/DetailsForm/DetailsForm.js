import React, { useState } from 'react'
import { Grid, Button } from '@material-ui/core'
import validator from 'validator'

import FormInput from './FormInput'

import { connect } from 'react-redux'
import { SET_USER_DETAILS } from '../../../store/actions/index'

const DetailsForm = props => {

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
        const updatedForm = { ...props.userDetails }
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
        props.setUserDetails(updatedForm)

        setFormIsValid(formIsValid)
    }


    const formElementsArray = []
    for (let key in props.userDetails) {
        formElementsArray.push({
            id: key,
            config: props.userDetails[key],
            title: key
        })
    }

    return (
        <Grid container direction="column" justify="center"
        >
            {
                formElementsArray.map((elem, index) => {
                    return (
                        <Grid key={index} item style={{ margin: '10px 0' }} container justify="center">
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
        </Grid >
    )


}

const mapStateToProps = state => {
    return {
        userDetails: state.user.userDetails
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUserDetails: (userDetails) => dispatch({ type: SET_USER_DETAILS, userDetails: userDetails })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsForm)