import { ADDPRODUCT, REMOVEPRODUCT, GETCART_REQUESTED, GETCART, GETPRICES_REQUESTED, GETPRICES, CHANGEQUANTITY } from './../actions/cart'


const initialState: Object = {
  cart: [],
  prices: []
}

export default (state: Object = initialState, action: Object) => {
	
  switch (action.type) {    
    case GETCART_REQUESTED:
      return {
        ...state,
        cart: [],
        prices: [],
        isLoad: true
        
      }

    case GETCART:
      return {
        ...state,
        cart: action.cart,
        prices: action.cart.map(({ id, price, quantity }) => ({ id, price, quantity })),
        isLoad: false
      } 
      
    case GETPRICES_REQUESTED:
      return {
        ...state,
        prices: [],
        isLoad: true
        
      }

    case GETPRICES:
      return {
        ...state,
        prices: action.prices,
        isLoad: false
      } 
      
      
    case ADDPRODUCT:
    
        let cartArr: Array<Object> = [];
    
        // есть ли уже этот товар в хранилище
        if(state.prices.some((obj) => obj.id === action.id)) {
              
            cartArr = state.prices.map(function(obj) {
                  
                if(obj.id === action.id) {
                    obj.quantity = parseInt(obj.quantity) + parseInt(action.quantity);
                    obj.price = parseInt(action.price);
                }
                  
                return obj;
            });
              
        } else {
           cartArr.push({ id: action.id, quantity: parseInt(action.quantity), price: parseInt(action.price) });
        } // end if
  
    
      return {
        ...state,
        prices: cartArr
      } 
      
    case REMOVEPRODUCT:
      return {
        ...state,
        cart: action.cart,
        prices: action.cart.map(({ id, price, quantity }) => ({ id, price, quantity }))
      } 
      
    case CHANGEQUANTITY:
      return {
        ...state,
        cart: action.cart,
        prices: action.cart.map(({ id, price, quantity }) => ({ id, price, quantity }))
      } 
 

    default:
      return state
  }
}
