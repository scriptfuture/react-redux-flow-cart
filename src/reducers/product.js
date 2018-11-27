import { GETPRODUCT_REQUESTED, GETPRODUCT } from './../actions/product'


const initialState: Object = {
  product: {},
  isLoad: false
}

export default (state: Object = initialState, action: Object) => {
	
  switch (action.type) {    
    case GETPRODUCT_REQUESTED:
      return {
        ...state,
        product: {},
        isLoad: true
        
      }

    case GETPRODUCT:
      return {
        ...state,
        product: action.product,
        isLoad: false
      } 
 

    default:
      return state
  }
}
