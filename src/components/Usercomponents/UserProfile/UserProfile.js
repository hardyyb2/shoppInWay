import React, { useState, useEffect } from 'react'
import {
    makeStyles, Grid, TextField,
    TextareaAutosize, Paper, ButtonBase, Button,
} from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import EditIcon from '@material-ui/icons/Edit';
import Skeleton from '@material-ui/lab/Skeleton'

import MiniDrawer from '../../../UI/MiniDrawer/MiniDrawer'

import { connect } from 'react-redux'
import { getUserProfileDetails, setImageUpload, setUserProfileDetails } from '../../../store/actions/index'
import ProfileImage from '../../../UI/ProfileImage/ProfileImage';
import Profile from '../../../assets/images/profile.svg'


const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: '10px',
        margin: 'auto',
        width: '90%',
        background: '#1f1f2a'

    },
    image: {
        position: 'relative',
        width: 400,
        height: 500,
        ['@media (max-width: 500px)']: {
            width: '350px',
            height: '500px',

        },
        ['@media (max-width: 450px)']: {
            width: '300px',
            height: '400px',

        },
        ['@media (max-width: 400px)']: {
            width: '240px',
            height: '300px',

        }
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    input: {
        color: '#f5f5f5',
        borderBottom: '1px solid #f5f5f5',
        outline: 'none'
    },
    label: {
        color: 'rgba(255,255,255,0.6) !important',
        outline: 'none'
    },
    wave: {
        '&::after': {
            background: `linear-gradient(90deg, transparent, #444 , transparent)`,
        }
    }

})

const UserProfile = props => {
    const classes = useStyles()

    const [editDetails, setEditDetails] = useState(false)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [sex, setSex] = useState('')
    const [bio, setBio] = useState('')
    const [url, setURL] = useState('')

    useEffect(() => {
        if (props.profile) {
            let up = props.profile
            setName(up.Name || '')
            setPhone(up.Phone || '')
            setSex(up.sex || '')
            setBio(up.bio || '')
            setURL(up.url || '')
        } else {
            props.getUserProfileDetails()
        }
    }, [props.profile])

    return (
        <MiniDrawer >
            <Grid container className={classes.root}>
                <Paper className={classes.paper}>
                    <Grid container justify="center" style={{ alignItems: 'center' }} spacing={2}>
                        <Grid item style={{ margin: '10px', padding: '10px' }}>                            {
                            props.loading ?

                                <Skeleton classes={{
                                    wave: classes.wave
                                }}
                                    variant="rect"
                                    animation="wave"
                                    className={classes.image}
                                />
                                :
                                <Grid item xs container className={classes.image} >
                                    {
                                        !props.load ?
                                            <ProfileImage
                                                image={url || Profile}

                                                className={classes.img}
                                                setImageUpload={(image) => props.setImageUpload(image)} />
                                            :
                                            <Skeleton classes={{
                                                wave: classes.wave
                                            }}
                                                variant="rect"
                                                animation="wave"
                                                height={500}
                                                width={300}
                                            />
                                    }
                                </Grid>
                        }
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column">
                                <Grid item style={{ margin: '10px', padding: '10px' }}>
                                    {
                                        props.loading ?

                                            <Skeleton classes={{
                                                wave: classes.wave
                                            }}
                                                variant="rect"
                                                animation="wave"
                                                className={classes.title}
                                            />
                                            :

                                            <TextField
                                                fullWidth
                                                readOnly={true}
                                                label="Email"
                                                value={props.profile && props.profile.email || ''}
                                                InputProps={{
                                                    className: classes.input,

                                                }}
                                                InputLabelProps={{
                                                    className: classes.label,
                                                }}
                                            />
                                    }
                                </Grid>
                                <Grid item style={{ margin: '10px', padding: '10px' }}>
                                    {
                                        props.loading ?

                                            <Skeleton classes={{
                                                wave: classes.wave
                                            }}
                                                variant="rect"
                                                animation="wave"
                                                className={classes.title}
                                            />
                                            :
                                            <TextField
                                                fullWidth
                                                inputProps={{ readOnly: !editDetails }}
                                                label="Name"
                                                value={name}
                                                onChange={e =>
                                                    setName(e.target.value)
                                                }
                                                InputProps={{
                                                    className: classes.input,

                                                }}
                                                InputLabelProps={{
                                                    className: classes.label,
                                                }}
                                            />
                                    }
                                </Grid>
                                <Grid item style={{ margin: '10px', padding: '10px' }}>
                                    {
                                        props.loading ?

                                            <Skeleton classes={{
                                                wave: classes.wave
                                            }}
                                                variant="rect"
                                                animation="wave"
                                                className={classes.title}
                                            />
                                            :
                                            <TextField
                                                fullWidth
                                                inputProps={{ readOnly: !editDetails }}
                                                label="Phone"
                                                value={phone}
                                                onChange={e =>
                                                    setPhone(e.target.value)
                                                }
                                                InputProps={{
                                                    className: classes.input,

                                                }}
                                                InputLabelProps={{
                                                    className: classes.label,
                                                }}
                                            />
                                    }
                                </Grid>
                                <Grid item style={{ margin: '10px', padding: '10px' }}>
                                    {
                                        props.loading ?

                                            <Skeleton classes={{
                                                wave: classes.wave
                                            }}
                                                variant="rect"
                                                animation="wave"
                                                className={classes.title}
                                            />
                                            :
                                            <TextField
                                                fullWidth
                                                inputProps={{ readOnly: !editDetails }}
                                                label="Sex"
                                                value={sex}
                                                onChange={e =>
                                                    setSex(e.target.value)
                                                }
                                                InputProps={{
                                                    className: classes.input,

                                                }}
                                                InputLabelProps={{
                                                    className: classes.label,
                                                }}
                                            />
                                    }
                                </Grid>
                                <Grid item style={{ margin: '10px', padding: '10px' }}>
                                    {
                                        props.loading ?

                                            <Skeleton classes={{
                                                wave: classes.wave
                                            }} variant="rect" animation="wave"
                                                className={classes.title}
                                            />
                                            :
                                            <TextField
                                                fullWidth
                                                inputProps={{ readOnly: !editDetails }}
                                                value={bio}
                                                label="Bio"
                                                onChange={e =>
                                                    setBio(e.target.value)
                                                }
                                                InputProps={{
                                                    className: classes.input,

                                                }}
                                                InputLabelProps={{
                                                    className: classes.label,
                                                }}
                                            />
                                    }

                                </Grid>
                                <Grid item style={{ margin: '10px', padding: '10px' }}>
                                    {
                                        props.loading ?
                                            null
                                            :
                                            (
                                                editDetails ?
                                                    <Button
                                                        variant="contained"
                                                        fullWidth
                                                        onClick={async () => {
                                                            //save editDetail
                                                            //show snackbar
                                                            await props.setUserProfileDetails(
                                                                {
                                                                    name,
                                                                    phone,
                                                                    sex,
                                                                    bio
                                                                }
                                                            )
                                                            setEditDetails(false)

                                                        }}
                                                        style={{
                                                            background: '#1f1f2f',
                                                            color: '#f5f5f5',
                                                            fontWeight: 'bold'
                                                        }}
                                                        startIcon={<SaveIcon />}
                                                    >
                                                        Save
                                             </Button>

                                                    :
                                                    <Button
                                                        variant="contained"
                                                        fullWidth
                                                        onClick={() => {
                                                            setEditDetails(true)
                                                        }}
                                                        style={{
                                                            background: '#c51162',
                                                            color: '#f5f5f5',
                                                            fontWeight: 'bold'
                                                        }}
                                                        startIcon={<EditIcon />}
                                                    >
                                                        Edit Profile
                                        </Button>
                                            )

                                    }
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                </Paper>

            </Grid>
        </MiniDrawer>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.user.loading,
        profile: state.user.profile,
        load: state.user.load
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getUserProfileDetails: () => dispatch(getUserProfileDetails()),
        setImageUpload: (image) => dispatch(setImageUpload(image)),
        setUserProfileDetails: (details) => dispatch(setUserProfileDetails(details))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)