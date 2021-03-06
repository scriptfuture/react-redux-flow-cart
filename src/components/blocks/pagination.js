import React from 'react'

let getList = (limit: number, currentPage: number, totalPages: number): Array<number> => {
    
    limit--;
    
    let start: number = currentPage - limit/2 > 0? currentPage - limit/2: 1;
    let stop: number = currentPage + limit/2 > totalPages? totalPages: currentPage + limit/2;
    
    if(currentPage - limit/2 <= 0) stop = limit + 1;
    if(currentPage + limit/2 >= totalPages) start = totalPages - limit;
    
    if(totalPages <= limit) {
        start = 1;
        stop = totalPages;
    }
    
    let i: number = start, resArr: Array<number> = [];
    while (i <= stop) {
      resArr.push(i);
      i++;
    }
    
    return resArr;
};


const Pagination = ({ limit, currentPage, totalPages, isReplay, nextPage }: Object) => (
    <ul className="pagination">
        
        {currentPage - limit/2 > 1? 
            <li className="page-item">
                <span className="page-link" onClick={() => nextPage(Math.floor(currentPage - limit/2))}>«</span>
            </li>: (isReplay && totalPages > limit?  
            <li className="page-item">
                <span className="page-link" onClick={() => nextPage(totalPages)}>«</span>
            </li>: "")}
        
        {getList(limit, currentPage, totalPages).map((currentValue: number, index: number) => (
        
            <li className={currentValue === currentPage?"page-item active":"page-item"} key={index} title={'Страница '+currentValue}>
                <span className="page-link" onClick={() => nextPage(currentValue)}>{currentValue}</span>
            </li>
        ))}
        

        {currentPage + limit/2 < totalPages? 
            <li className="page-item">
                <span className="page-link" onClick={() => nextPage(Math.floor(currentPage + limit/2) + 1)}>»</span>
            </li>: (isReplay && totalPages > limit?
            <li className="page-item">
                <span className="page-link" onClick={() => nextPage(1)}>»</span>
            </li>: "")}
        
    </ul>
)

export default Pagination;
