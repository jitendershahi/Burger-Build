import React, { Component } from 'react'
import Burger from '../../components/Burger/burger'

import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'

const INGREDIENTS_PRICE = {
    salad: 0.7,
    bacon: 1.8,
    cheese: 0.9,
    meat: 1
}

class BurgerBuilder extends  Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
    price:4,
    purchaseable: false,
    purchasing:false,
    loading:false
    }

    updatePurchaseable(ingredients) {
        const sum = Object.keys(ingredients)
         .map((el) => {
             return ingredients[el]
         }).reduce((sum, el) => {
             return sum + el
         },0)
         this.setState({
             purchaseable: (sum > 0)
         })
    }

    addIngredient = (type) => {
        let oldCount = this.state.ingredients[type]
        let newCount = oldCount + 1
        let newIngredients = {
            ...this.state.ingredients
        }
        newIngredients[type] = newCount
        const priceAddition = INGREDIENTS_PRICE[type]
        let oldPrice = this.state.price
        let newPrice = oldPrice + priceAddition
        this.setState({
            ingredients:newIngredients,
            price:newPrice
        })
        this.updatePurchaseable(newIngredients)
      }

      removeIngredient = (type) => {
          if(this.state.ingredients[type] !== 0) {
            let oldCount = this.state.ingredients[type]
            let newCount = oldCount - 1
            let newIngredients = {
                ...this.state.ingredients
            }
            newIngredients[type] = newCount
            const priceDeduction = INGREDIENTS_PRICE[type]
            let oldPrice = this.state.price
            let newPrice = oldPrice - priceDeduction
            this.setState({
                ingredients:newIngredients,
                price:newPrice
            })
            this.updatePurchaseable(newIngredients)
          }
      }

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
          this.setState({
              loading:true
          })

          const order = {
              ingredients: this.state.ingredients,
              price: this.state.price,
              customer: {
                  name: 'shanky',
                  address: {
                      street: 'street no 1',
                      pincode: '201001',
                      country: 'India'
                  },
                  email: 'shankysharma@gmail.com'
              },
              deliveryMethod: 'courior'
          }
         
        axios.post('/orders.json',order)
         .then((data) => {
             this.setState({
                 loading:false,
                 purchasing:false
             })
             console.log(data)
         }).catch((err) => {
            this.setState({
                loading:false,
                purchasing:false
            })
             console.log(err)
         })
      }

    render () {
        let disableInfo = {
            ...this.state.ingredients
        }

        for(let key in disableInfo){
            disableInfo[key] = (disableInfo[key] <= 0) // returns true or false to disable
        }

        let orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        ContinueClick={this.continuePurchasing}
        CancelClick={this.hideModal} 
        price={this.state.price}/>;


        if(this.state.loading){
            orderSummary = <Spinner />
        }

        return (
            <div>
                <Modal show={this.state.purchasing} clickedback={this.hideModal}>
                {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                 addingredient={this.addIngredient}
                 removeingredient={this.removeIngredient}
                 disable={disableInfo}
                 purchase={this.state.purchaseable}
                 price={this.state.price}
                 purch={this.purchaseBurger}/> 
            </div>
        );
    }
}


export default BurgerBuilder;