import axios from 'axios';


import { SHOW_ERROR, HIDE_ERROR } from './app'

// actions
export const GETCATALOG_REQUESTED = 'catalog/GETCATALOG_REQUESTED'
export const GETCATALOG = 'catalog/GETCATALOG'

// action creators
export const getCatalog = (currentPage: number) => {
    
    return (dispatch: any) => {
        dispatch({
            type: GETCATALOG_REQUESTED
        });

        // test file /api/catalog"+currentPage+".json
        axios.get("/api/catalog1.json?page="+currentPage)
            .then(function(res) {
				
				let objErr: Object = { code: 0, message: "Поле 'catalog' не найдено!" };
                let objErr2: Object = { code: 0, message: "Поле 'pagination' не найдено!" };

                if (typeof res.data === "undefined" || typeof res.data.catalog === "undefined") throw objErr;
                if (typeof res.data === "undefined" || typeof res.data.pagination === "undefined") throw objErr2;
                
                dispatch({
                    type: HIDE_ERROR
                });

                dispatch({
                    type: GETCATALOG,
                    catalog: res.data.catalog,
                    pagination: res.data.pagination,
                    currentPage: currentPage
                });
            })
            .catch(function(e) {
                
                dispatch({
                    type: GETCATALOG,
                    catalog: [],
                    pagination: {},
                    currentPage: 1
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