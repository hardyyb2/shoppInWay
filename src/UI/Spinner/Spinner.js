import React from 'react'
import classes from './Spinner.module.css'
import { Grid } from '@material-ui/core'

const Spinner = () => {
  return (<>
    <Grid item className={classes.loader}></Grid>
    <Grid item style={{ margin: '20px -45px', zIndex: 99 }}>
      Loading...
                        </Grid>
  </>)
}
export default Spinner
