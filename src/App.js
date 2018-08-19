import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'

import Layout from './components/Layout/layout'
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder'
import Checkout from './container/Checkout/Checkout'

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Route path="/checkout" component={Checkout} />
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
