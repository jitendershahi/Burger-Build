import React, { Component } from 'react'

import classes from './ContactData.css'
import Button from '../../../components/UI/Button/Button'

import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'

import Input from '../../../components/UI/Input/Input'



class ContactData extends Component {
    state = {
        orderForm: {
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:''
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Street'
                },
                value:''
            },
            zipCode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Zipcode'
                },
                value:''
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:''
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your Email'
                },
                value:''
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                   options:[
                       {value:'fastest', displayValue:'Fastest'},
                       {value:'cheapest', displayValue:'Cheapest'},
                   ]
                },
                value:''
            }
        },
        loading:false
    }

    formdata = (event, id) => {
        console.log(event.target.value)
        var formOrderData = this.state.orderForm

        var updateOrderForm = { ...formOrderData[id] }
        updateOrderForm.value = event.target.value
        formOrderData[id] = updateOrderForm
        this.setState({ orderForm: formOrderData})
    }

    orderHandler = (event) => {
        event.preventDefault()
          this.setState({
              loading:true
          })

          let orderData = {}
          for(let key in this.state.orderForm){
              orderData[key] = this.state.orderForm[key].value
          }
          const order = {
              ingredients: this.props.ingredients,
              price: this.props.price,
              orderForm:orderData
          }

          console.log(order)

         
        axios.post('/orders.json',order)
         .then((data) => {
             this.setState({
                 loading:false
             })
             this.props.history.replace('/')
         }).catch((err) => {
            this.setState({
                loading:false
            })
         })
    }

    

    render() {
        let formElements = [];
        for(let key in this.state.orderForm){
            formElements.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElements.map(el => {
                   return <Input key={el.id} elementType={el.config.elementType}
                     elementConfig={el.config.elementConfig}
                     value={el.config.value}
                     clicked={(event) => this.formdata(event, el.id)}/>
                })}
                <Button btnType="Success" >ORDER</Button>
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

  // state = {
    //     name: '',
    //     email: '',
    //     address: {
    //         street: '',
    //         postalCode: ''
    //     },
    //     loading:false
    // }