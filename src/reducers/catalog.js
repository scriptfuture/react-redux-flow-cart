import { GETCATALOG_REQUESTED, GETCATALOG } from './../actions/catalog'


const initialState: Object = {
  catalog: [],
  pagination: {},
  currentPage: 1,
  isLoad: false
}

export default (state: Object = initialState, action: Object) => {
	
  switch (action.type) {    
    case GETCATALOG_REQUESTED:
      return {
        ...state,
        catalog: [],
        pagination: {},
        currentPage: 1, 
        isLoad: true
        
      }

    case GETCATALOG:
      return {
        ...state,
        catalog: action.catalog,
        pagination: action.pagination, 
        currentPage: action.currentPage, 
        isLoad: false
      } 
 

    default:
      return state
  }
}
