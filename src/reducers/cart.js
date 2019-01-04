import { ADDPRODUCT, REMOVEPRODUCT, GETCART_REQUESTED, GETCART, GETPRICES_REQUESTED, GETPRICES, CHANGEQUANTITY, CHANGEEXPAND } from './../actions/cart'


const initialState: Object = {
  cart: [],
  prices: [],
  isExpand: false
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
    
        // добавляем новый товар в корзину в store
		let cartArr: Array<Object> = [...state.prices];
		
        // есть ли уже этот товар в store?
        if(cartArr.some((obj) => obj.id === action.id)) {
              
            cartArr = cartArr.map(function(obj) {
                  
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
      
    case CHANGEEXPAND:
      return {
        ...state,
        isExpand: action.isExpand
      } 

    default:
      return state
  }
}
