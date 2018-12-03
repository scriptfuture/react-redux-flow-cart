import { ADDPRODUCT, REMOVEPRODUCT, GETCART_REQUESTED, GETCART, CHANGEQUANTITY } from './../actions/cart'


const initialState: Object = {
  cart: []
}

export default (state: Object = initialState, action: Object) => {
	
  switch (action.type) {    
    case GETCART_REQUESTED:
      return {
        ...state,
        cart: [],
        isLoad: true
        
      }

    case GETCART:
      return {
        ...state,
        cart: action.cart,
        isLoad: false
      } 
      
      
    case ADDPRODUCT:
      return {
        ...state
      } 
      
    case REMOVEPRODUCT:
      return {
        ...state,
        cart: action.cart
      } 
      
    case CHANGEQUANTITY:
      return {
        ...state,
        cart: action.cart
      } 
 

    default:
      return state
  }
}
