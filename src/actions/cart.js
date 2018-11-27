import axios from 'axios';


import { SHOW_ERROR } from './app'

// actions
export const ADDCART = 'cart/ADDCART'
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