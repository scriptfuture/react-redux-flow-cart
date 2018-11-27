import { SHOW_ERROR, HIDE_ERROR } from './../actions/app'


const initialState: Object = {
  isLoad: false,
  isError: false,
  errors: []
}

export default (state: Object = initialState, action: Object) => {
	
  switch (action.type) {
    case SHOW_ERROR:
      return {
        ...state,
        errors: action.errors,
		isError: true,
        isLoad: false
        
      }

    case HIDE_ERROR:
      return {
        ...state,
        errors: [],
		isError: false,
        isLoad: false
      }

    default:
      return state
  }
}