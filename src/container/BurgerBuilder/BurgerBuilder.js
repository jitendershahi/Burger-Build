import React, { Component } from 'react'
import Burger from '../../components/Burger/burger'

import BuildControls from '../../components/Burger/BuildControls/BuildControls'

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
    price:4
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
          }
      }

    render () {
        return (
            <div>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                 addingredient={this.addIngredient}
                 removeingredient={this.removeIngredient}/> 
            </div>
        );
    }
}


export default BurgerBuilder;