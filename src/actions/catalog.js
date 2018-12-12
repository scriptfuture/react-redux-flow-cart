import axios from 'axios';


import { SHOW_ERROR } from './app'

// actions
export const GETCATALOG_REQUESTED = 'catalog/GETCATALOG_REQUESTED'
export const GETCATALOG = 'catalog/GETCATALOG'

// action creators
export const getCatalog = () => {
    
    return (dispatch: any) => {
        dispatch({
            type: GETCATALOG_REQUESTED
        });


        axios.get("/api/catalog.json")
            .then(function(res) {
				
				let objErr: Object = { code: 0, message: "Поле 'catalog' не найдено!" };

                if (typeof res.data === "undefined" || typeof res.data.catalog === "undefined") throw objErr;

                dispatch({
                    type: GETCATALOG,
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