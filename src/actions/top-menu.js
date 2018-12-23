import axios from 'axios';


import { SHOW_ERROR, HIDE_ERROR } from './app'

// actions
export const GETTOPMENU_REQUESTED = 'topmenu/GETTOPMENU_REQUESTED'
export const GETTOPMENU = 'topmenu/GETTOPMENU'

// action creators
export const getTopMenu = (currentPage: number) => {
    
    return (dispatch: any) => {
        dispatch({
            type: GETTOPMENU_REQUESTED
        });

        axios.get("/api/topmenu.json")
            .then(function(res) {
				
				let objErr: Object = { code: 0, message: "Поле 'menu' не найдено!" };

                if (typeof res.data === "undefined" || typeof res.data.menu === "undefined") throw objErr;
                
                dispatch({
                    type: HIDE_ERROR
                });

                dispatch({
                    type: GETTOPMENU,
                    menu: res.data.menu
                });
            })
            .catch(function(e) {
                
                dispatch({
                    type: GETTOPMENU,
                    menu: []
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