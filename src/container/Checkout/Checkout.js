import React, { Component } from 'react'
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary'

import { Route } from 'react-router-dom'
import ContactData from './ContactData/ContactData'

import { connect } from 'react-redux' 

class Checkout extends Component {
//     state = {
//         ingredients:null,
//         price:0
//     }

//     componentWillMount() {
//         console.log(this.props)
//         const query = new URLSearchParams(this.props.location.search)
//         const ingredients = {}
//         let price = 0;
//         for(let param of query.entries()){
//             // ['salad','1']
//             if(param[0] === 'price'){
//                 price = param[1]
//             } else {
//             ingredients[param[0]] = +param[1]
//             }
            
//         }
//         this.setState({ingredients:ingredients,price:price}) 
//    }

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
                checkingredients={this.props.ings}  
                continueCheckout={this.continueCheckoutdata}
                 cancelCheckout={this.cancelCheckoutdata}
                 />
                 <Route path={this.props.match.path + '/contact-data'}
                 component={ContactData}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings:state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);