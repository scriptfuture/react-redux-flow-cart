import axios from 'axios';


import { SHOW_ERROR, HIDE_ERROR } from './app'

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

				let objErr: Object = { code: 0, message: "Поле 'product' не найдено!" };

                if (typeof res.data === "undefined" || typeof res.data.product === "undefined") throw objErr;
                
                dispatch({
                    type: HIDE_ERROR
                });

                dispatch({
                    type: GETPRODUCT,
                    product: res.data.product
                });
            })
            .catch(function(e) {
                
                dispatch({
                    type: GETPRODUCT,
                    product: {}
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