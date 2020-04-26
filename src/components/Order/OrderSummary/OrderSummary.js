import React from 'react'
import { Grid, Paper } from '@material-ui/core'

const OrderSummary = props => {

    return (
        <Grid container>
            <Paper elevate={6}>
                <Grid container>
                    <Grid container direction="row">
                        <Grid container item xs >
                            Name
                        </Grid>
                        <Grid container item xs >
                            personName
                        </Grid>
                    </Grid>

                    <Grid container direction="row">
                        <Grid container item xs >
                            Name
                        </Grid>
                        <Grid container item xs >
                            personName
                        </Grid>
                    </Grid>

                    <Grid container direction="row">
                        <Grid container item xs >
                            Name
                        </Grid>
                        <Grid container item xs >
                            personName
                        </Grid>
                    </Grid>

                    <Grid container direction="row">
                        <Grid container item xs >
                            Name
                        </Grid>
                        <Grid container item xs >
                            personName
                        </Grid>
                    </Grid>

                    <Grid container>table</Grid>
                    <Grid container>pay wuth</Grid>
                    <Grid container>
                        pay button
                    </Grid>

                </Grid>
            </Paper>
        </Grid>
    )

}

export default OrderSummary