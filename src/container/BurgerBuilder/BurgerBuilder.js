import React, { Component } from 'react'
import Burger from '../../components/Burger/burger'


class BurgerBuilder extends   Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }
    }

    render () {
        return (
            <div>
                <Burger ingredients={this.state.ingredients}/>
                <div>ingredients build control</div>
            </div>
        );
    }
}


export default BurgerBuilder;