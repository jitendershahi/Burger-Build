import React, { Component } from 'react';
import './App.css';
import { Route, withRouter, Redirect } from 'react-router-dom'

import Layout from './components/Layout/layout'
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder'
import Checkout from './container/Checkout/Checkout'
import Orders from './container/Orders/Orders'
import Logout from './container/Auth/Logout/Logout'

import Auth from './container/Auth/Auth'

import { connect } from 'react-redux'
import * as actions from './store/actions/index'

class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignup()
  }

  render() {

    let routes = ( 
    <Layout>
      <Route path="/auth" component={Auth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/"/>
    </Layout>
    )

    if(this.props.isAuthenticate){
      routes = (<Layout>
      <Route path="/checkout" component={Checkout} />
      <Route path="/orders" component={Orders} />
      <Route path="/logout" component={Logout} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/"/>

      </Layout>)
    }

    return (
      <div>
        {routes}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticate:state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup:() => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
