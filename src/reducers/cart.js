import { GETCATALOG_REQUESTED, GETCATALOG } from './../actions/cart'


const initialState: Object = {
  cart: [],
  isLoad: false
}

export default (state: Object = initialState, action: Object) => {
	
  switch (action.type) {    
    case GETCATALOG_REQUESTED:
      return {
        ...state,
        cart: [],
        isLoad: true
        
      }

    case GETCATALOG:
      return {
        ...state,
        catalog: action.catalog,
        isLoad: false
      } 
 

    default:
      return state
  }
}
