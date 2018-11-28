import { ADDPRODUCT, GETCART_REQUESTED, GETCART } from './../actions/cart'


const initialState: Object = {
  cart: [],
  isLoad: false
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
        ...state,
        cart: action.cart,
        isLoad: false
      } 
 

    default:
      return state
  }
}
