import React, { Component } from 'react'
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary'

import { Route, Redirect } from 'react-router-dom'
import ContactData from './ContactData/ContactData'

import { connect } from 'react-redux' 

// import * as orderActionCreator from '../../store/actions/order'

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
    
    // componentDidMount () {
    //     this.props.purchaseinit()
    // }


    cancelCheckoutdata = () => {
        this.props.history.goBack()
    }

    continueCheckoutdata = () => {
        this.props.history.replace('/checkout/contact-data')
    }
    
    render() {
        let summary = <Redirect to="/" />

        if(this.props.ings){
            let purchaseRedirect = this.props.purchase ? <Redirect to="/" /> : null

            summary = (
                <div>
                    { purchaseRedirect }
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
        
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings:state.burgerBuilder.ingredients,
        purchase:state.order.purchased
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         purchaseinit: () => dispatch(orderActionCreator.purchaseInit())
//     }
// }

export default connect(mapStateToProps)(Checkout);