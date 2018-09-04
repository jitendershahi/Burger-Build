import React, { Component } from 'react'
import Burger from '../../components/Burger/burger'

import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'

import withErrorHandler from '../../hoc/withErrorHandler'
import Yux from '../../hoc/Yux'

import { connect } from 'react-redux'
import * as actionTypes from '../../store/action'


class BurgerBuilder extends  Component {

    state = {
    purchaseable: false,
    purchasing:false,
    loading:false,
    error:false
    }

    componentDidMount() {
        console.log(this.props)
        // axios.get('https://burger-builder-8bd98.firebaseio.com/ingredients.json')
        // .then((data) => {
        //     console.log(data)
        //     this.setState({ ingredients : data.data});
        // }).catch(error => {
        //     this.setState({ error : true})
        // })
    }

    updatePurchaseable() {
        const sum = Object.keys(this.props.ings)
         .map((el) => {
             return this.props.ings[el]
         }).reduce((sum, el) => {
             return sum + el
         },0)
         
         return  sum > 0
    }

    // addIngredient = (type) => {
    //     let oldCount = this.state.ingredients[type]
    //     let newCount = oldCount + 1
    //     let newIngredients = {
    //         ...this.state.ingredients
    //     }
    //     newIngredients[type] = newCount
    //     const priceAddition = INGREDIENTS_PRICE[type]
    //     let oldPrice = this.state.price
    //     let newPrice = oldPrice + priceAddition
    //     this.setState({
    //         ingredients:newIngredients,
    //         price:newPrice
    //     })
    //     this.updatePurchaseable(newIngredients)
    //   }

    //   removeIngredient = (type) => {
    //       if(this.state.ingredients[type] !== 0) {
    //         let oldCount = this.state.ingredients[type]
    //         let newCount = oldCount - 1
    //         let newIngredients = {
    //             ...this.state.ingredients
    //         }
    //         newIngredients[type] = newCount
    //         const priceDeduction = INGREDIENTS_PRICE[type]
    //         let oldPrice = this.state.price
    //         let newPrice = oldPrice - priceDeduction
    //         this.setState({
    //             ingredients:newIngredients,
    //             price:newPrice
    //         })
    //         this.updatePurchaseable(newIngredients)
    //       }
    //   }

      purchaseBurger = () => {
          this.setState({
            purchasing:true
          })
      }

      hideModal = () => {
          this.setState({
              purchasing:false
          })
      }

      continuePurchasing = () => {
        //   const queryParam = [];
        //   for(let i in this.props.ings){
        //       queryParam.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.props.ings[i]))
        //   }
        //   queryParam.push('price=' + this.props.price)
        //   const queryString = queryParam.join("&")
        //   console.log(queryString)
        //   this.props.history.push({
        //       pathname:'/checkout',
        //       search:'?' + queryString
        //   })
        this.props.history.push('/checkout')
      }

    render () {
        let disableInfo = {
            ...this.props.ings
        }

        for(let key in disableInfo){
            disableInfo[key] = (disableInfo[key] <= 0) // returns true or false to disable
        }

        let orderSummary = null

        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        if(this.props.ings){ 
            burger = (
            <Yux>
            <Burger ingredients={this.props.ings}/>
                <BuildControls
                 addingredient={this.props.onIngredientAdded}
                 removeingredient={this.props.onIngredientRemoved}
                 disable={disableInfo}
                 purchase={this.updatePurchaseable()}
                 price={this.props.price}
                 purch={this.purchaseBurger}/> 
            </Yux>
            );

                orderSummary = <OrderSummary
                ingredients={this.props.ings}
                ContinueClick={this.continuePurchasing}
                CancelClick={this.hideModal} 
                price={this.props.price}/>;
        }

         if(this.state.loading){
            orderSummary = <Spinner />
        }

        return (
            <Yux>
                <Modal show={this.state.purchasing} clickedback={this.hideModal}>
                {orderSummary}
                </Modal>
                { burger }
            </Yux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings:state.ingredients,
        price:state.price
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ign) => dispatch({type:actionTypes.ADD_INGREDIENT, ingredientName:ign}),
        onIngredientRemoved: (ign) => dispatch({type:actionTypes.REMOVE_INGREDIENT, ingredientName:ign})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));