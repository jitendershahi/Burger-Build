import React, { Component } from 'react'

import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'

import withErrorHandler from '../../hoc/withErrorHandler'

import * as actions from '../../store/actions/order'
import { connect } from 'react-redux'



class Orders extends Component {
    // state = {
    //     orders:[],
    //     loading:true
    // }

    componentDidMount() {
        this.props.onFetchOrders(this.props.token)
        // axios.get("/orders.json")
        //   .then((data) => {
        //       let fetchOrders = [];
        //       for(let key in data.data){
        //          fetchOrders.push({
        //              ...data.data[key],
        //              id:key
        //             })  
        //       }
        //       this.setState({loading:false, orders:fetchOrders})x
        //   }).catch((err) => {
        //       console.log(err)
        //       this.setState({loading:false})
        //   })
    }

    render() {
        let orders = (
            this.props.orders.map(order => {
                console.log(order.ingredients)
                return <Order key={order.id} price={+order.price} ingredients={order.ingredients}/>
            })
        )

        if(this.props.loading){
            orders = <Spinner />
        }
        return(
            <div>
              { orders }
            </div>
        ) 
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
    }
}

const mapStateToProps = state => {
    return {
        orders:state.order.orders,
        loading:state.order.loading,
        token:state.auth.token
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(Orders, axios));