import { SHOW_ERROR } from './app'

// actions
export const NEWORDER_REQUESTED = 'cart/NEWORDER_REQUESTED'
export const NEWORDER = 'cart/NEWORDER'

export const newOrder = (email: string, phone: string, fio:  string, address: string, comment: string) => {
    
    return (dispatch: any) => {
        
       dispatch({
         type: NEWORDER_REQUESTED
      });
      
      /*
        
      let cartStr: ?string = localStorage.getItem('cart'), cartArr: Array<Object> = [];
      
      
      if(cartStr == null || cartStr === "") {
          cartArr.push({"id": id, "quantity": quantity});
      }  else {
          
          cartArr =  JSON.parse(cartStr);

          // есть ли уже этот товар в локальном хранилище
          if(cartArr.some((obj) => obj.id === id)) {
              
              cartArr = cartArr.map(function(obj) {
                  
                  if(obj.id === id) {
                      obj.quantity = obj.quantity + quantity;
                  }
                  
                  return obj;
              });
              
          } else {
              cartArr.push({"id": id, "quantity": quantity});
          } // end if
          
      } // end if

      
      localStorage.setItem('cart', JSON.stringify(cartArr));
      */
      
      dispatch({
         type: NEWORDER
      });


    };
}
