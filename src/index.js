import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Reducer from './store/reducer'

import { BrowserRouter } from 'react-router-dom'

const store = createStore(Reducer)

const appRoute = (
  <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </Provider>
);

ReactDOM.render(appRoute, document.getElementById('root'));
registerServiceWorker();
