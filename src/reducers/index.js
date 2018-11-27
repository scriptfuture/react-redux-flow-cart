import { combineReducers } from 'redux'

import catalog from './catalog'
import product from './product'

import app from './app'


export default combineReducers({
  catalog,
  product,
  app
})
