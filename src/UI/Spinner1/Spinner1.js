import React from 'react'
import classes from './Spinner1.module.css'

const Spinner1 = props => {
    return (
        <div className={classes.spinner}>
            <div className={classes.rect1} ></div>
            <div className={classes.rect2} ></div>
            <div className={classes.rect3} ></div>
            <div className={classes.rect4} ></div>
            <div className={classes.rect5} ></div>
        </div>
    )
}

export default Spinner1