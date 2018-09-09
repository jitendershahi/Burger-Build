import * as actionTypes from './actionTypes'

import axios from 'axios'

export const authStart = () => {
    return {
        type:actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type:actionTypes.AUTH_SUCCESS,
        authData:authData
    }
}

export const authFail = (error) => {
    return {
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const authLogout = () => {
    return {
        type:actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeOut = (tokenExpireTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout())
        }, tokenExpireTime * 1000);
    }
}

export const Auth = (authForm, isSignUp) => {
    console.log(authForm)
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email : authForm.email.value,
            password: authForm.password.value,
            returnSecureToken: true
        }

        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB3ng3Q6MFU1LGPSFdMsBlpQTjJbiegwoA'
        if(!isSignUp){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB3ng3Q6MFU1LGPSFdMsBlpQTjJbiegwoA'
        }
        axios.post(url, authData)
          .then(response => {
              console.log(response)
              dispatch(authSuccess(response.data))
              dispatch(checkAuthTimeOut(response.data.expiresIn))
          })
          .catch(err => {
              console.log(err.response.data.error)
              dispatch(authFail(err.response.data.error))
          })
    }
}