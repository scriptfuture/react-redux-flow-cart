import React from 'react'

import { Link } from 'react-router-dom'

let getList = (limit: number, currentPage: number, totalPages: number, isReplay: boolean): Array<number> => {
    
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



const Pagination = ({ limit, currentPage, totalPages, isReplay }: Object) => {return(
    <ul className="pagination">
        
        {currentPage - limit/2 > 1? 
            <li className="page-item">
                <Link className="page-link" to={'/catalog/' + Math.floor(currentPage - limit/2)}>«</Link>
            </li>: (isReplay?  
            <li className="page-item">
                <Link className="page-link" to={'/catalog/' + totalPages}>«</Link>
            </li>: "")}
        
        {getList(limit, currentPage, totalPages, isReplay).map((currentValue: number, index: number) => (
        
            <li className={currentValue === currentPage?"page-item active":"page-item"} key={index} title={'Страница '+currentValue}>
                <Link className="page-link" to={'/catalog/'+currentValue}>{currentValue}</Link>
            </li>
        ))}
        

        {currentPage + limit/2 < totalPages? 
            <li className="page-item">
                <Link className="page-link" to={'/catalog/' + (Math.floor(currentPage + limit/2) + 1)}>»</Link>
            </li>: (isReplay?
            <li className="page-item">
                <Link className="page-link" to={'/catalog/1'}>»</Link>
            </li>: "")}
        
    </ul>
)}

export default Pagination;
