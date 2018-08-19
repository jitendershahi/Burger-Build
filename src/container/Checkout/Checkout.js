import React, { Component } from 'react'
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary'

class Checkout extends Component {
    state = {
        ingredients: {
            salad:0,
            meat:0,
            cheese:0,
            bacon:0
        }
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {}
        for(let param of query.entries()){
            // ['salad','1']
            ingredients[param[0]] = +param[1]
        }
        this.setState({ingredients:ingredients}) 
   }

    cancelCheckoutdata = () => {
        this.props.history.goBack()
    }

    continueCheckoutdata = () => {
        this.props.history.replace('/checkout/contact-data')
    }
    
    render() {
        return (
            <div>
                <CheckoutSummary 
                checkingredients={this.state.ingredients} 
                continueCheckout={this.continueCheckoutdata}
                cancelCheckout={this.cancelCheckoutdata}
                />
            </div>
        )
    }
}

export default Checkout;