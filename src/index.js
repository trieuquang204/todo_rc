import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {createStore} from 'redux';
import myReducers from './reducers/index';
import { Provider } from 'react-redux';
const store = createStore(myReducers)

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
serviceWorker.unregister();
