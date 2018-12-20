import React from 'react'

import { push } from 'connected-react-router'

let getList = (limit: number, currentPage: number, totalPages: number): Array<number> => {
    
    limit--;
    
    let start: number = currentPage - limit/2 > 0? currentPage - limit/2: 1;
    let stop: number = currentPage + limit/2 > totalPages? totalPages: currentPage + limit/2;
    
    let i: number = start, resArr: Array<number> = [];
    while (i <= stop) {
      resArr.push(i);
      i++;
    }
    
    console.log("start: "+start);
    console.log("stop: "+stop);
  
    return resArr;
};


let handler = (e: any): any => {
    e.stopPropagation();
    e.stopImmediatePropagation()
    
    let link: string = e.target.href;
    
    console.log(link);
  //  push(link);
};


const Pagination = ({ limit, currentPage, totalPages, isReplay, nextPage }: Object) => {return(
    <ul className="pagination">
        
        {currentPage - limit/2 > 1? 
            <li className="page-item">
                <a className="page-link" href={'/catalog/' + Math.floor(currentPage - limit/2)} onClick={handler}>«</a>
            </li>: (isReplay?  
            <li className="page-item">
                <a className="page-link" href={'/catalog/' + totalPages} onClick={handler}>«</a>
            </li>: "")}
        
        {getList(limit, currentPage, totalPages).map((currentValue: number, index: number) => (
        
            <li className={currentValue === currentPage?"page-item active":"page-item"} key={index} title={'Страница '+currentValue}>
                <a className="page-link" href={'/catalog/'+currentValue} onClick={handler}>{currentValue}</a>
            </li>
        ))}
        

        {currentPage + limit/2 < totalPages? 
            <li className="page-item">
                <a className="page-link" href={'/catalog/' + (Math.floor(currentPage + limit/2) + 1)} onClick={handler}>»</a>
            </li>: (isReplay?
            <li className="page-item">
                <a className="page-link" href={'/catalog/1'} onClick={handler}>»</a>
            </li>: "")}
        
    </ul>
)}

export default Pagination;
