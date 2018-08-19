import React, { Component } from 'react'

import classes from './ContactData.css'
import Button from '../../../components/UI/Button/Button'

import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'



class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading:false
    }

    orderHandler = (event) => {
        event.preventDefault()
        console.log(this.props.ingredients)

          this.setState({
              loading:true
          })

          const order = {
              ingredients: this.props.ingredients,
              price: this.props.price,
              customer: {
                  name: 'shanky',
                  address: {
                      street: 'street no 1',
                      pincode: '201001',
                      country: 'India'
                  },
                  email: 'shankysharma@gmail.com'
              },
              deliveryMethod: 'courior'
          }
         
        axios.post('/orders.json',order)
         .then((data) => {
             this.setState({
                 loading:false
             })
             this.props.history.replace('/')
             console.log(data)
         }).catch((err) => {
            this.setState({
                loading:false
            })
             console.log(err)
         })
    }

    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input} type="email" name="email" placeholder="Your Mail" />
                <input className={classes.Input} type="text" name="street" placeholder="Street" />
                <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>
        )
        if(this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>

        )
    }
}


export default ContactData;