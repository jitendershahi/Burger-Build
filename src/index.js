import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

import burgerBuilderReducer from './store/reducers/burgerBuilder'
import orderReducer from './store/reducers/order'
import authReducer from './store/reducers/Auth'

import thunk from 'redux-thunk'

import { BrowserRouter } from 'react-router-dom'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  burgerBuilder:burgerBuilderReducer,
  order:orderReducer,
  auth:authReducer
})

const store = createStore(rootReducer,  composeEnhancers(
  applyMiddleware(thunk)
))

const appRoute = (
  <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </Provider>
);

ReactDOM.render(appRoute, document.getElementById('root'));
registerServiceWorker();
