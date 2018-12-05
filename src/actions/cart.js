import axios from 'axios';


import { SHOW_ERROR } from './app'

// actions
export const ADDPRODUCT = 'cart/ADDPRODUCT'

export const GETCART_REQUESTED = 'cart/GETCART_REQUESTED'
export const GETCART = 'cart/GETCART'

export const GETPRICES_REQUESTED = 'cart/GETPRICES_REQUESTED'
export const GETPRICES = 'cart/GETPRICES'

export const REMOVEPRODUCT_REQUESTED = 'cart/REMOVEPRODUCT_REQUESTED'
export const REMOVEPRODUCT = 'cart/REMOVEPRODUCT'

export const CHANGEQUANTITY = 'cart/CHANGEQUANTITY'

// action creators
export const getCart = () => {
    
    return (dispatch: any) => {
        dispatch({
            type: GETCART_REQUESTED
        });
        
        let cartStr: ?string = localStorage.getItem('cart'), cartArr: Array<Object> = [], cartParams: Array<number> = [];
      
        if(cartStr != null && cartStr !== "") {
              cartArr =  JSON.parse(cartStr);
              
              // какие товары каталога запросить с сервера
              cartParams = cartArr.map((obj) => obj.id);
        } // end if


        axios.get("/api/catalog.json?items=" + cartParams.join(','))
            .then(function(res) {

                if (typeof res.data === "undefined" || typeof res.data.catalog === "undefined") throw {code: 0, message: "Поле 'catalog' не найдено!"};
                
                let cart: Array<Object> = res.data.catalog;
                
                // филтруем массив с сервера на основе списка из localStorage
                cart = cart.filter((obj) => cartParams.some((pid) => obj.id === pid));
                
                // добавляем количество и общую сумму
                cart = cart.map((obj) => { 

                    obj["quantity"] = cartArr.filter((o) => obj.id === o.id)[0].quantity;
                    obj["total_price"] = obj.price * obj.quantity;

                    return obj;
                });

                dispatch({
                    type: GETCART,
                    cart: cart
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

export const getPrices = () => {
    
    return (dispatch: any) => {
        dispatch({
            type: GETPRICES_REQUESTED
        });
        
        let cartStr: ?string = localStorage.getItem('cart'), cartArr: Array<Object> = [], cartParams: Array<number> = [];
      
        if(cartStr != null && cartStr !== "") {
              cartArr =  JSON.parse(cartStr);
              
              // какие товары каталога запросить с сервера
              cartParams = cartArr.map((obj) => obj.id);
        } // end if


        axios.get("/api/prices.json?items=" + cartParams.join(','))
            .then(function(res) {

                if (typeof res.data === "undefined" || typeof res.data.prices === "undefined") throw {code: 0, message: "Поле 'prices' не найдено!"};
                
                let prices: Array<Object> = res.data.prices;
                
                // филтруем массив с сервера на основе списка из localStorage
                prices = prices.filter((obj) => cartParams.some((pid) => obj.id === pid));
                
                // добавляем количество и общую сумму
                prices = prices.map((obj) => { 

                    obj["quantity"] = cartArr.filter((o) => obj.id === o.id)[0].quantity;
                    obj["total_price"] = obj.price * obj.quantity;

                    return obj;
                });

                dispatch({
                    type: GETPRICES,
                    prices: prices
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
         type: ADDPRODUCT
      });


    };
}

export const removeProduct = (removeId: number, ct: Array<Object>) => {
    
    return (dispatch: any) => {

        // удаляем продукт
        let cart: Array<Object> = ct.filter((obj) => obj.id !== removeId);
        
        // сохраняем обнавлённую корзину в localStorage
        let cartArr: Array<Object> = cart.map((obj) => ({ id: obj.id, quantity: obj.quantity }));
        localStorage.setItem('cart', JSON.stringify(cartArr));
    
        dispatch({
            type: REMOVEPRODUCT,
            cart: cart
        });
           
    };
}

export const сhangeQuantity = (id: number, quantity: number, ct: Array<Object>) => {
    
    return (dispatch: any) => {
        
        let cart: Array<Object> = ct.map((obj) => { 
        
            if(obj.id === id) {
                obj.quantity = quantity;
            } // end if


            return obj;
        });
        
        // сохраняем обнавлённую корзину в localStorage
        let cartArr: Array<Object> = cart.map((obj) => ({ id: obj.id, quantity: obj.quantity }));
        localStorage.setItem('cart', JSON.stringify(cartArr));
        
        
        dispatch({
            type: CHANGEQUANTITY,
            cart: cart
        });

    };
}