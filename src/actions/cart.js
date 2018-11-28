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
        
      let cartStr = localStorage.getItem('cart'), cartArr = [];
      
      
      if(cartStr !== null && cartStr !== "") {

          cartArr =  JSON.parse(cartStr);
          
          cartArr = cartArr.filter((obj) => !(obj.id === id && obj.quantity === quantity))
       
      }  else {

          cartArr.push({"id": id, "quantity": quantity});
          
      } // end if
      
      localStorage.setItem('cart', JSON.stringify(cartArr));
      
      dispatch({
            type: ADDPRODUCT,
            cart: cartArr
      });


    };
}