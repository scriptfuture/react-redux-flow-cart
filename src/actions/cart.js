import axios from 'axios';


import { SHOW_ERROR, HIDE_ERROR } from './app'

// actions
export const ADDPRODUCT = 'cart/ADDPRODUCT'

export const GETCART_REQUESTED = 'cart/GETCART_REQUESTED'
export const GETCART = 'cart/GETCART'

export const GETPRICES_REQUESTED = 'cart/GETPRICES_REQUESTED'
export const GETPRICES = 'cart/GETPRICES'

export const REMOVEPRODUCT_REQUESTED = 'cart/REMOVEPRODUCT_REQUESTED'
export const REMOVEPRODUCT = 'cart/REMOVEPRODUCT'

export const CHANGEQUANTITY = 'cart/CHANGEQUANTITY'

export const CHANGEEXPAND = 'cart/CHANGEEXPAND'

// action creators
export const getCart = () => {
    
    return (dispatch: any) => {
        dispatch({
            type: GETCART_REQUESTED
        });
        
        let cartStr: ?string = localStorage.getItem('cart'), cartArr: Array<Object> = [], cartParams: Array<number> = [];
      
        if(cartStr !== null && cartStr !== "") {
            
              let json: string = ((cartStr: any): string);
              cartArr =  JSON.parse(json);
              
              // какие товары каталога запросить с сервера
              cartParams = cartArr.map((obj) => obj.id);
        } // end if


        axios.get("/api/catalog.json?items=" + cartParams.join(','))
            .then(function(res) {
				
				let objErr: Object = { code: 0, message: "Поле 'catalog' не найдено!" };

                if (typeof res.data === "undefined" || typeof res.data.catalog === "undefined") throw objErr;
                
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
                    type: HIDE_ERROR
                });

                dispatch({
                    type: GETCART,
                    cart: cart
                });
            })
            .catch(function(e) {
                
                dispatch({
                    type: GETCART,
                    cart: []
                });

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
				
				let objErr: Object = { code: 0, message: "Поле 'prices' не найдено!" };

                if (typeof res.data === "undefined" || typeof res.data.prices === "undefined") throw objErr;
                
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
                    type: HIDE_ERROR
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

export const addProduct = (id: number, quantity: number, price: number) => {
    
    return (dispatch: any) => {
        
      let cartStr: ?string = localStorage.getItem('cart'), cartArr: Array<Object> = [];
      
      
      if(cartStr == null || cartStr === "") {
          cartArr.push({ id, quantity });
      }  else {
          
          cartArr =  JSON.parse(cartStr);

          // есть ли уже этот товар в локальном хранилище
          if(cartArr.some((obj) => obj.id === id)) {
              
              cartArr = cartArr.map(function(obj) {
                  
                  if(obj.id === id) {
                      obj.quantity = parseInt(obj.quantity) + parseInt(quantity);
                  }
                  
                  return obj;
              });
              
          } else {
              cartArr.push({ id, quantity });
          } // end if
          
      } // end if

      
      localStorage.setItem('cart', JSON.stringify(cartArr));
      
      dispatch({
         type: ADDPRODUCT,
         id, 
         quantity, 
         price
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

export const сhangeQuantity = (id: number, qty: number, ct: Array<Object>) => {
    
    // количество, только положительные целые числа или 0
    let quantity: number  = qty > 0?qty:0;

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

export const expand = (isExpand: boolean) => {
    
    return (dispatch: any) => {

      let isExpandStr: ?string = localStorage.getItem('is_expand');
      
      
      if(isExpandStr == null || isExpandStr === "") {
          
           localStorage.setItem('is_expand', isExpand?"True":"False");
           
            dispatch({
                type: CHANGEEXPAND,
                isExpand: !isExpand
            });
            
      }  else {
          
           localStorage.setItem('is_expand', isExpandStr === "True"?"False":"True");  
           
            dispatch({
                type: CHANGEEXPAND,
                isExpand: isExpandStr === "True"?false:true
            });
      } // end if
      
      
    };
}

export const getExpand = (isExpand: boolean) => {
    
    return (dispatch: any) => {

      let isExpandStr: ?string = localStorage.getItem('is_expand');
      
      
      if(isExpandStr == null || isExpandStr === "") {
          
           localStorage.setItem('is_expand', isExpand?"True":"False");
            
      }  else {
           
            dispatch({
                type: CHANGEEXPAND,
                isExpand: isExpandStr === "True"?true:false
            });
      } // end if
      
      
    };
}