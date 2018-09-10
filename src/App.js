import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'

import Layout from './components/Layout/layout'
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder'
import Checkout from './container/Checkout/Checkout'
import Orders from './container/Orders/Orders'
import Logout from './container/Auth/Logout/Logout'

import Auth from './container/Auth/Auth'

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          {/* <Route  render={() => {return (
            <h1>page not found</h1>
          )}} /> */}

         {/* <BurgerBuilder/>
         <Checkout /> */}
        </Layout>
      </div>
    );
  }
}

export default App;
