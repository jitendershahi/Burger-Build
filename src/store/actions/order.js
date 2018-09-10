import * as actionTypes from './actionTypes'

import axios from '../../axios-orders'


export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    }
}


export const purchaseBurgerFail = (error) => {
    return {
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error
     }
}

export const purchaseBurgerStart = () => {
    return {
        type:actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (token, orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json?auth=' + token,orderData)
        .then((response) => {
            console.log("data",response)
            dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            // this.setState({
            //     loading:false
            // })
            // this.props.history.replace('/')
        }).catch((err) => {
            dispatch(purchaseBurgerFail(err))
        //    this.setState({
        //        loading:false
        //    })
        })
    }
}

export const purchaseInit = () => {
    return {
        type:actionTypes.PURCHASE_INIT
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        orders:orders
    }
}

export const fetchOrderFail = (error) => {
    return {
        type:actionTypes.FETCH_ORDERS_FAIL,
        error:error
    }
}

export const fetchOrdersStart = () => {
    return {
        type:actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token) => {
    return dispatch => {
        axios.get("/orders.json?auth=" + token)
          .then((data) => {
              console.log("result",data)
              let fetchOrders = [];
              for(let key in data.data){
                 fetchOrders.push({
                     ...data.data[key],
                     id:key
                    })  
              }
              dispatch(fetchOrderSuccess(fetchOrders))
            //   this.setState({loading:false, orders:fetchOrders})
          }).catch((err) => {
              dispatch(fetchOrderFail(err))
            //   console.log(err)
            //   this.setState({loading:false})
          })
    }
}


