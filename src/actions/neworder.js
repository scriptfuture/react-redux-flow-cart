import axios from 'axios';

import { SHOW_ERROR } from './app'

// actions
export const NEWORDER_REQUESTED = 'cart/NEWORDER_REQUESTED'
export const NEWORDER = 'cart/NEWORDER'

export const newOrder = (email: string, phone: string, fio:  string, address: string, comment: string, cartLine: string, purchaseChecksum: number) => {
    
    return (dispatch: any) => {
        
       dispatch({
         type: NEWORDER_REQUESTED
      });

      
        axios.post("/api/ok.json", { email, phone, fio, address, comment, cart_line: cartLine, purchase_checksum: purchaseChecksum })
            .then(function(res) {

                // чистим корзину
                localStorage.setItem('cart', null);

                dispatch({
                   type: NEWORDER
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
