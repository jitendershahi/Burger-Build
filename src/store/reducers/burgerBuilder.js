import * as actionTypes from '../actions/actionTypes'

const initialState = {
    ingredients:null,
    price:4,
    error:false,
    building:false
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
            price:state.price + INGREDIENTS_PRICE[action.ingredientName],
            building:true
        }

        case actionTypes.REMOVE_INGREDIENT:
        return {
            ...state,
            ingredients:{
                ...state.ingredients,
                [action.ingredientName]:state.ingredients[action.ingredientName] - 1
            },
            price:state.price - INGREDIENTS_PRICE[action.ingredientName],
            building:true
        }
       
        case actionTypes.SET_INGREDIENTS:
        console.log("action.ingredients",action.ingredients)
        return {
            ...state,
            ingredients:{
                salad:action.ingredients.salad,
                bacon:action.ingredients.bacon,
                cheese:action.ingredients.cheese,
                meat:action.ingredients.meat
            },
            price:4,   
            error:false,
            building:false
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