import React, { useState, useEffect } from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

const useStyles = makeStyles(theme => ({
    fileStyle: {
        display: 'none'
    },
    customFileUpload: {
        padding: '10px',
        background: '#673ab7',
        borderRadius: '5px',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        color: 'white',
        fontWeight: 'bolder'
    },
    image: {
        marginBottom: '5px'
    }
}));


const ProfileImage = (props) => {
    const classes = useStyles()
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(e.target.files[0])
    }

    return (
        <Grid container style={{ width: '100%', marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} direction="column" >
            {selectedFile && <img className={classes.image} width={props.width} height={props.height} src={preview} alt="Logo or Signature" />}

            <label className={classes.customFileUpload} >

                <input type='file' className={classes.fileStyle} onChange={onSelectFile} />
                <CloudUploadIcon style={{ marginRight: '5px' }} />
                Upload {props.title}
            </label>
        </Grid>
    )
}

export default ProfileImage