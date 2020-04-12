
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { connect } from 'react-redux'

import { logoutUser } from '../store/actions/index'

const Logout = props => {

    return (
        <div style={{ background: '#1f1f2f' }}>
            <Dialog
                open={true}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Are you sure you want to Logout ?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={() => {
                        props.logout()
                    }}
                        color="secondary"
                    >
                        Logout
            </Button>
                    <Button onClick={props.handleClose} color="primary" autoFocus>
                        Cancel
            </Button>
                </DialogActions>
            </Dialog>
        </div>
    )

}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logoutUser())
    }
}


export default connect(null, mapDispatchToProps)(Logout)