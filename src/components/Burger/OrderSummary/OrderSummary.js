import React from 'react'

import Button from '../../UI/Button/Button'

const OrderSummary = (props) => {
    const style = {
        textTransform: 'capitalize'
    }
    
    const orderIngredients = Object.keys(props.ingredients)
     .map((el) => {
         return (
         <li key={el}>
             <span style={style}>{el}</span>: {props.ingredients[el]}
        </li>
        )
     })

    return (
        <div>
            <h3>Your Order</h3>
            <p>A delicious burger with following ingredients:</p>
            <ul>
                {orderIngredients}
            </ul>
            <p><strong>Total Price:{props.price.toFixed()}</strong></p>
            <p>Please continue to checkout?</p>
            <Button clicked={props.ContinueClick} btnType="Success">CONTINUE</Button>
            <Button  clicked={props.CancelClick} btnType="Danger">CANCEL</Button>
        </div>
    )
}

export default OrderSummary;