import React, { Component } from 'react'

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import classes from './Auth.css'
import { connect } from 'react-redux'

import * as actions from '../../store/actions/index'

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail:true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength:6
                },
                valid: false,
                touched: false
            }
        }

    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        let newFormControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({  controls : newFormControls})
    }

    submitHandler= (event) => {
        let authForm = {
            email:this.state.controls.email,
            password:this.state.controls.password
        }
        event.preventDefault()
        this.props.initAuth(authForm)
    }

    render() {
        let formElements = [];
        for(let key in this.state.controls){
            formElements.push({
                id:key,
                config:this.state.controls[key]
            })
        }

        let form = formElements.map((el) => {
            return <Input key={el.id} elementType={el.config.elementType}
            elementConfig={el.config.elementConfig}
            value={el.config.value}
            clicked={(event) => this.inputChangedHandler(event, el.id)}
            inValid={!el.config.valid}
            shouldValidate={el.config.validation}
            touched = {el.config.touched} />
        })

        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    { form }
                    <Button btnType="Success" >SUBMIT</Button>
                </form>
            </div>

        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initAuth: (authForm) => dispatch(actions.Auth(authForm))
    }
}

export default connect(null,mapDispatchToProps) (Auth);

