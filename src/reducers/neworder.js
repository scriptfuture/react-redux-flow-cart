import { NEWORDER_REQUESTED, NEWORDER } from './../actions/neworder'


const initialState: Object = {
  message: ""
}

export default (state: Object = initialState, action: Object) => {
	
  switch (action.type) {    
    case NEWORDER_REQUESTED:
      return {
        ...state,
        form: {},
        isLoad: true
      }

    case NEWORDER:
      return {
        ...state,
        message: action.message,
        isSuccess: true,
        isLoad: false
      } 
      
    default:
      return state
  }
}
