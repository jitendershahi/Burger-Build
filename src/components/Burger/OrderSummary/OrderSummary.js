import React from 'react'

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
            <p>Please continue to checkout?</p>
        </div>
    )
}

export default OrderSummary;