import axios from 'axios';


import { SHOW_ERROR } from './app'

// actions
export const ADDPRODUCT = 'cart/ADDPRODUCT'

export const GETCART_REQUESTED = 'cart/GETCART_REQUESTED'
export const GETCART = 'cart/GETCART'

// action creators
export const getCart = (items: Array <number>) => {
    
    return (dispatch: any) => {
        dispatch({
            type: GETCART_REQUESTED
        });


        axios.get("/api/catalog.json")
            .then(function(res) {

                if (typeof res.data === "undefined" || typeof res.data.catalog === "undefined") throw {code: 0, message: "Поле 'catalog' не найдено!"};

                dispatch({
                    type: GETCART,
                    catalog: res.data.catalog
                });
            })
            .catch(function(e) {
                
                console.log(e);

                dispatch({
                    type: SHOW_ERROR,
                    errors: [{
                        code: e.code,
                        text: e.message
                    }]
                });
            })
    };
}

export const addProduct = (id: number, quantity: number) => {
    
    return (dispatch: any) => {
        
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
      
      dispatch({
            type: ADDPRODUCT,
            cart: cartArr
      });


    };
}