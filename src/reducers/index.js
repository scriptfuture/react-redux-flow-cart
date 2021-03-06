import { combineReducers } from 'redux'

import catalog from './catalog'
import product from './product'
import cart from './cart'
import neworder from './neworder'
import topmenu from './top-menu'

import app from './app'


export default combineReducers({
  catalog,
  product,
  cart,
  neworder,
  topmenu,
  app
})
