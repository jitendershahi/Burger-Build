import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import burgerBuilderReducer from './store/reducers/burgerBuilder'

import { BrowserRouter } from 'react-router-dom'

const store = createStore(burgerBuilderReducer,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const appRoute = (
  <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </Provider>
);

ReactDOM.render(appRoute, document.getElementById('root'));
registerServiceWorker();
