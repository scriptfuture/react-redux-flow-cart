import { GETTOPMENU_REQUESTED, GETTOPMENU } from './../actions/top-menu'


const initialState: Object = {
  menu: [],
  isLoad: false
}

export default (state: Object = initialState, action: Object) => {
	
  switch (action.type) {    
    case GETTOPMENU_REQUESTED:
      return {
        ...state,
        menu: [],
        isLoad: true
        
      }

    case GETTOPMENU:
      return {
        ...state,
        menu: action.menu,
        isLoad: false
      } 
 

    default:
      return state
  }
}