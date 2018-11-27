import { GETCATALOG_REQUESTED, GETCATALOG } from './../actions/catalog'


const initialState: Object = {
  catalog: [],
  isLoad: false
}

export default (state: Object = initialState, action: Object) => {
	
  switch (action.type) {    
    case GETCATALOG_REQUESTED:
      return {
        ...state,
        catalog: [],
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
