import React, { Component } from 'react'

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import classes from './Auth.css'
import { connect } from 'react-redux'

import * as actions from '../../store/actions/index'

import { Redirect } from 'react-router-dom'

import Spinner from '../../components/UI/Spinner/Spinner'

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
        },
        isSignUp:true

    }

    componentDidMount() {
        if(!this.props.building && this.props.authRedirectPath !== '/'){
            this.props.setRedirectPath()
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
        this.props.initAuth(authForm, this.state.isSignUp)
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp:!prevState.isSignUp
            }
        })
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

        if(this.props.loading){
            form = <Spinner />
        }

        let errorMessage = null
        if(this.props.error){
            errorMessage = <p>{this.props.error.message}</p>
        }

        let redirectTo = null
        if(this.props.isAuthenticate) {
            redirectTo = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {redirectTo}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    { form }
                    <Button btnType="Success" >SUBMIT</Button>
                    <Button clicked={this.switchAuthModeHandler}
                    btnType="Danger">
                    Switch to {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}
                    </Button>
                </form>
            </div>

        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initAuth: (authForm, isSignUp) => dispatch(actions.Auth(authForm, isSignUp)),
        setRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

const mapStateToProps = state => {
    return {
        loading : state.auth.loading,
        error: state.auth.error,
        isAuthenticate: state.auth.token !== null,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (Auth);

