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
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate') 
    localStorage.removeItem('userId')
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
            //   const expiredate = new Date(new Date().getTime() + response.data.expiresIn)
              const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
              localStorage.setItem('token',response.data.idToken)
              localStorage.setItem('expirationDate',expirationDate)
              localStorage.setItem('userId', response.data.localId);
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

export const setAuthRedirectPath = (path) => {
    return {
        type:actionTypes.SET_REDIRECT_PATH_TO,
        path:path  
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(authLogout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(authLogout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};