import axios from 'axios';


import { SHOW_ERROR } from './app'

// actions
export const GETPRODUCT_REQUESTED = 'product/GETPRODUCT_REQUESTED'
export const GETPRODUCT = 'product/GETPRODUCT'

// action creators
export const getProduct = (id: number) => {
    
    return (dispatch: any) => {
        dispatch({
            type: GETPRODUCT_REQUESTED
        });


        axios.get("/api/product.json?id="+id)
            .then(function(res) {

                if (typeof res.data === "undefined" || typeof res.data.product === "undefined") throw {code: 0, message: "Поле 'product' не найдено!"};

                dispatch({
                    type: GETPRODUCT,
                    product: res.data.product
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