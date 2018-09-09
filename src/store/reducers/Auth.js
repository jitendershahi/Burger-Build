import * as actionTypes from '../actions/actionTypes'

const initialState = {
    token:null,
    userId:null,
    error:null,
    loading:null
}


const authReducer = (state=initialState, action) => {
    
    switch(action.type) {
        case actionTypes.AUTH_START:
        return {
            ...state,
            loading:true,
            error:null
        }

        case actionTypes.AUTH_SUCCESS:
        console.log(action.authData)
        return {
            ...state,
            token: action.authData.idToken,
            userId:action.authData.localId,
            error:null,
            loading:false
        }

        case actionTypes.AUTH_FAIL:
        return {
            ...state,
            error:action.error,
            loading:false
        }

        case actionTypes.AUTH_LOGOUT:
        return {
            ...state,
            token:null,
            userId:null
        }


        default:
        return state
    }
}

export default authReducer;