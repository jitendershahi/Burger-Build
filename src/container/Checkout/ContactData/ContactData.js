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
        let formElements = [];
        for(let key in this.state.orderForm){
            formElements.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }
        console.log(formElements)

        let form = (
            <form>
                {formElements.map(el => {
                   return <Input key={el.id} elementType={el.config.elementType}
                     elementConfig={el.config.elementConfig}
                     value={el.config.value}/>
                })}
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

  // state = {
    //     name: '',
    //     email: '',
    //     address: {
    //         street: '',
    //         postalCode: ''
    //     },
    //     loading:false
    // }