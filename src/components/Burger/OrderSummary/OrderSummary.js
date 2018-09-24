import React,{ Component } from 'react'

import Button from '../../UI/Button/Button'

class OrderSummary extends Component {

    componentWillUpdate() {
        console.log("componentWillUpdate",this.props)
    }
    
    render() {
        const style = {
            textTransform: 'capitalize' 
        }
        
        const orderIngredients = Object.keys(this.props.ingredients)
         .map((el) => {
             return (
             <li key={el}>
                 <span style={style}>{el}</span>: {this.props.ingredients[el]}
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
            <p><strong>Total Price:{this.props.price.toFixed()}</strong></p>
            <p>Please continue to checkout?</p>
            <Button clicked={this.props.ContinueClick} btnType="Success">CONTINUE</Button>
            <Button  clicked={this.props.CancelClick} btnType="Danger">CANCEL</Button>
        </div>
        )
    }
}

export default OrderSummary;