import React, { Component } from 'react'

import classes from './ContactData.css'
import Button from '../../../components/UI/Button/Button'

import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'

import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux'

import * as orderActionCreator from '../../../store/actions/order'

import withErrorHandler from '../../../hoc/withErrorHandler'




class ContactData extends Component {
    state = {
        orderForm: {
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Street'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            zipCode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Zipcode'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:6
                },
                valid:false,
                touched:false
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your Email'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                   options:[
                       {value:'fastest', displayValue:'Fastest'},
                       {value:'cheapest', displayValue:'Cheapest'},
                   ]
                },
                value:'cheapest',
                validation:{},
                valid:true
            }
        },
        isFormValid:false
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if(!rules) {
            return true;
        }

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid
    }

    formdata = (event, id) => {
        const formOrderData = { ...this.state.orderForm}

        const updateOrderForm = { ...formOrderData[id] }
        updateOrderForm.value = event.target.value
        updateOrderForm.valid = this.checkValidity(updateOrderForm.value, updateOrderForm.validation)
        updateOrderForm.touched = true
        formOrderData[id] = updateOrderForm

        let formIsValid = true;
        for (let inputIdentifier in formOrderData) {
            formIsValid = formOrderData[inputIdentifier].valid && formIsValid;
        }

        this.setState({ orderForm: formOrderData, isFormValid:formIsValid})
    }

    orderHandler = (event) => {
        event.preventDefault()
        //   this.setState({
        //       loading:true
        //   })

          let orderData = {}
          for(let key in this.state.orderForm){
              orderData[key] = this.state.orderForm[key].value
          }
          const order = {
              ingredients: this.props.ingredients,
              price: this.props.price,
              orderForm:orderData
          }

          this.props.onOrderBurger(this.props.token ,order)


         
        // axios.post('/orders.json',order)
        //  .then((data) => {
        //      this.setState({
        //          loading:false
        //      })
        //      this.props.history.replace('/')
        //  }).catch((err) => {
        //     this.setState({
        //         loading:false
        //     })
        //  })
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
                     clicked={(event) => this.formdata(event, el.id)}
                     inValid={!el.config.valid}
                     shouldValidate={el.config.validation}
                     touched = {el.config.touched} />
                })}
                <Button disabled={!this.state.isFormValid} btnType="Success" >ORDER</Button>
                </form>
        )
        if(this.props.loading) {
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

const mapToStateProps = state => {
    return {
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.price,
        loading:state.order.loading,
        token:state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger:(token, orderData) => dispatch(orderActionCreator.purchaseBurger(token, orderData))
    }
}


export default connect(mapToStateProps, mapDispatchToProps)(withErrorHandler(ContactData,axios));

 