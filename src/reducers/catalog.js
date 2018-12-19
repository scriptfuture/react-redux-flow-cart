import { GETCATALOG_REQUESTED, GETCATALOG } from './../actions/catalog'


const initialState: Object = {
  catalog: [],
  pagination: {},
  isLoad: false
}

export default (state: Object = initialState, action: Object) => {
	
  switch (action.type) {    
    case GETCATALOG_REQUESTED:
      return {
        ...state,
        catalog: [],
        pagination: {},
        isLoad: true
        
      }

    case GETCATALOG:
      return {
        ...state,
        catalog: action.catalog,
        pagination: action.pagination, 
        isLoad: false
      } 
 

    default:
      return state
  }
}
