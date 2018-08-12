import React, { Component } from 'react'
import Burger from '../../components/Burger/burger'

import BuildControls from '../../components/Burger/BuildControls/BuildControls'


class BurgerBuilder extends  Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }
    }

    addIngredient = (type) => {
        let oldCount = this.state.ingredients[type]
        let newCount = oldCount + 1
        let newIngredients = {
            ...this.state.ingredients
        }
        newIngredients[type] = newCount
        this.setState({
            ingredients:newIngredients
        })
      }

    render () {
        return (
            <div>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls addingredient={this.addIngredient}/> 
            </div>
        );
    }
}


export default BurgerBuilder;