import React, { useState, useEffect } from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'

const useStyles = makeStyles(theme => ({
    fileStyle: {
        display: 'none'
    },
    customFileUpload: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        padding: '10px',
        background: '#c51162',
        borderRadius: '50%',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        color: 'white',
        fontWeight: 'bolder',
        zIndex: 99
    },

    image: {
        maxWidth: 400,
        maxHeight: 450,
        ['@media (max-width: 500px)']: {
            width: '350px',
            height: '450px',

        },
        ['@media (max-width: 450px)']: {
            width: '300px',
            height: '350px',

        },
        ['@media (max-width: 400px)']: {
            width: '240px',
            height: '270px',

        }
    }

}));


const ProfileImage = (props) => {
    const classes = useStyles()

    // create a preview as a side effect, whenever selected file is changed
    const onSelectFile = e => {
        props.setImageUpload(e.target.files[0])
    }

    return (
        <Grid container style={{ width: '100%', marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} direction="column" >
            <img className={classes.image} width={props.width} height={props.height} src={props.image} alt="Logo or Signature" />

            <label className={classes.customFileUpload} >

                <input type='file' className={classes.fileStyle} onChange={onSelectFile} />
                <EditIcon />
            </label>
        </Grid>
    )
}

export default ProfileImage