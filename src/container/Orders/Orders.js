import React, { Component } from 'react'

import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'



class Orders extends Component {
    state = {
        orders:[],
        loading:true
    }

    componentDidMount() {
        axios.get("/orders.json")
          .then((data) => {
              let fetchOrders = [];
              for(let key in data.data){
                 fetchOrders.push({
                     ...data.data[key],
                     id:key
                    })  
              }
              this.setState({loading:false, orders:fetchOrders})
          }).catch((err) => {
              console.log(err)
              this.setState({loading:false})
          })
    }

    render() {
        let orders = (
            this.state.orders.map(order => {
                console.log(order)
                return <Order key={order.id} price={+order.price} ingredients={order.ingredients}/>
            })
        )

        if(this.state.loading){
            orders = <Spinner />
        }
        return(
            <div>
              { orders }
            </div>
        )
    }
}

export default Orders;