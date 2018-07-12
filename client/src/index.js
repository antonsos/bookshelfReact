import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';

//COMPONENTS
import Routes from './routes';
import reducers from './reducers';

const createStoreWith = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

ReactDOM.render(
  <Provider store={createStoreWith(reducers)}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
)