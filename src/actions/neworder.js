import axios from 'axios';

import { SHOW_ERROR, HIDE_ERROR } from './app'

// actions
export const NEWORDER_REQUESTED = 'neworder/NEWORDER_REQUESTED'
export const NEWORDER = 'neworder/NEWORDER'

export const newOrder = (form: Object, callback: any) => {
    
    return (dispatch: any) => {
        
        dispatch({
           type: NEWORDER_REQUESTED
        });
        
        console.log(form);

        // на реальном api заменить на axios.post   
        axios.get("/api/neworder_ok.json", form)
            .then(function(res) {
				
				let objErr: Object = { code: 0, message: "Поле 'message' не найдено!" };
                
                if (typeof res.data === "undefined" || typeof res.data.message === "undefined") throw objErr;
                
                let message: string = res.data.message;

                // чистим корзину
                localStorage.removeItem('cart');

                dispatch({
                    type: HIDE_ERROR
                });
                
                dispatch({
                   type: NEWORDER,
                   message: message
                });
                
                callback();
            })
            .catch(function(e) {
                
                dispatch({
                   type: NEWORDER,
                   message: ""
                });

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
