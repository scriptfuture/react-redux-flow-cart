import axios from 'axios';

import { SHOW_ERROR } from './app'

// actions
export const NEWORDER_REQUESTED = 'neworder/NEWORDER_REQUESTED'
export const NEWORDER = 'neworder/NEWORDER'

export const newOrder = (form: Object, callback: any) => {
    
    return (dispatch: any) => {
        
        dispatch({
           type: NEWORDER_REQUESTED
        });

        // на реальном api заменить на axios.post   
        axios.get("/api/neworder_ok.json", form)
            .then(function(res) {
                
                if (typeof res.data === "undefined" || typeof res.data.message === "undefined") throw {code: 0, message: "Поле 'message' не найдено!"};
                
                let message: string = res.data.message;

                // чистим корзину
                localStorage.removeItem('cart');

                dispatch({
                   type: NEWORDER,
                   message: message
                });
                
                callback();
            })
            .catch(function(e) {

                // показываем ошибку
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
