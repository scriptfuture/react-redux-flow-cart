import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './store'

import './index.css';
import App from './App';


const root: ?Element = document.getElementById('root');

if (root != null) {
    
    render(
          <Provider store={store}>
            <ConnectedRouter history={history}>
              <div>
                <App />
              </div>
            </ConnectedRouter>
          </Provider>, 
      root);
  
} // end if