import React from 'react'
import { makeStyles, TextField } from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    input: {
        color: '#f5f5f5',
        borderBottom: '1px solid #f5f5f5',
        outline: 'none'
    },
    label: {
        color: '#f5f5f5 !important',
        outline: 'none'
    },

    select: {
        borderWidth: '1px',
        borderColor: '#f5f5f5 !important',

        color: '#f5f5f5 !important',
    }

}))


const FormInput = props => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };



    switch (props.elementType.toLowerCase()) {
        case 'input':
            return (
                <TextField
                    autoFocus={props.label.toLowerCase() === 'name'}
                    fullWidth
                    label={props.label}
                    type={props.elementConfig.type}
                    placeholder={props.elementConfig.placeholder}
                    value={props.value}
                    error={props.invalid && props.touched}
                    helperText={props.invalid && props.touched ? `Please fill a valid ${props.label}` : ' '}
                    onChange={props.changed}
                    InputProps={{
                        className: classes.input,

                    }}
                    InputLabelProps={{
                        className: classes.label,
                    }}
                />
            )
        case 'select':
            return (
                <FormControl style={{ borderColor: '#f5f5f5' }}>
                    <InputLabel >{props.label}</InputLabel>
                    <Select
                        open={open}
                        fullWidth
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={props.value}
                        onChange={props.changed}
                        className={classes.select}
                        InputProps={{
                            classes: {

                                icon: classes.icon,
                            },
                        }}
                        InputLabelProps={{
                            className: classes.label,
                        }}
                    >
                        {props.elementConfig.options.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.displayValue}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )
        default:
            return null


    }

}

export default FormInput