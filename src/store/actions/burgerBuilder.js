import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'


export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName:name
    }
}

export const removeIngredient = (name) => {
    return {
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName:name
    }
}

export const setIngrdients = (ingredients) => {
    return {
        type:actionTypes.SET_INGREDIENTS,
        ingredients:ingredients
    }
}

export const fetchingIngredientsFailed = () => {
    return {
        type:actionTypes.FETCH_INGREDIENT_FAILED
    }
}

export const initIngrdients = () => {
    return dispatch => {
         axios.get('https://burger-builder-8bd98.firebaseio.com/ingredients.json')
        .then((data) => {
            console.log(data)
            // this.setState({ ingredients : data.data});
            dispatch(setIngrdients(data.data)) 
        }).catch(error => {
            // this.setState({ error : true})
            dispatch(fetchingIngredientsFailed())
        })
    }
}