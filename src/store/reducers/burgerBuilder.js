import * as actionTypes from '../actions/actionTypes'

const initialState = {
    ingredients:{
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    price:4,
    error:false
}

const INGREDIENTS_PRICE = {
    salad: 0.7,
    bacon: 1.8,
    cheese: 0.9,
    meat: 1
}

const Reducer = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
        return {
            ...state,
            ingredients:{
                ...state.ingredients,
                [action.ingredientName]:state.ingredients[action.ingredientName] + 1
            },
            price:state.price + INGREDIENTS_PRICE[action.ingredientName]
        }

        case actionTypes.REMOVE_INGREDIENT:
        return {
            ...state,
            ingredients:{
                ...state.ingredients,
                [action.ingredientName]:state.ingredients[action.ingredientName] - 1
            },
            price:state.price - INGREDIENTS_PRICE[action.ingredientName]
        }
       
        case actionTypes.SET_INGREDIENTS:
        return {
            ...state,
            ingredients:action.ingredients,
            error:false
        }

        case actionTypes.FETCH_INGREDIENT_FAILED:
        return {
            ...state,
            error:true
        }

        default:
        return state
    }

};


export default Reducer;