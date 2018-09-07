import React from 'react'

import Burger from '../Burger/burger'
import Button from '../UI/Button/Button'
import classes from './CheckoutSummary.css'

const CheckoutSummary = (props) => {
    const style = {
        width:'100%',
        height:'300px',
        margin:'auto'
    }
    // componentWillUpdate() {

    // }

    return (
        <div className={classes.CheckoutSummary} >
            <h1>We hope it tastes well!</h1>
            <div style={style}>
            <Burger ingredients={props.checkingredients}/>
            </div>
            <Button 
            btnType="Success" clicked={props.continueCheckout}>CONTINUE</Button>
            <Button 
            btnType="Danger" clicked={props.cancelCheckout}>CANCEL</Button>

        </div>
    )
}

export default CheckoutSummary;