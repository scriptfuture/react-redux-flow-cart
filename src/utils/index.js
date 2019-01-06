// Полезные функции

import parser from 'bbcode-to-react';
import { YoutubeTag, BrTag, PTag } from './bbcode-tags'

// проверка на undefined
export const isU = (a: any): boolean => typeof a === "undefined";

// получение монет (копеек)
export const getCoins = (priceInCoins: number): number => { 
    let n: any = parseInt((priceInCoins + "").substr((priceInCoins + "").length - 2));
    return isNaN(n)?0:n; 
};

// получение купюр (рублей)
export const getBN = (priceInCoins: number): number => { 
    let n: any = parseInt((priceInCoins + "").substr(0, (priceInCoins + "").length - 2)) ;
    return isNaN(n)?0:n
};

// склонение числительных
export const declOfNum = (num: number, titles: Array<string>): string => {  
    let cases: Array<number> = [2, 0, 1, 1, 1, 2];  
    return titles[ (num%100>4 && num%100<20)? 2 : cases[(num%10<5)?num%10:5] ];  
};


// преобразование bb-кода
export const bbcodeParse = (str: string): string => {  

    parser.registerTag('youtube', YoutubeTag); // add new tag
    parser.registerTag('br', BrTag); 
    parser.registerTag('p', PTag);
    
    // переносы строк
    str = str.replace(/\[\/br\]/g, '');
    str = str.replace(/\[br\]/g, '[br][/br]');

    return parser.toReact(str);  
};

// функция формирования дерева
// на вход получает массив вида 
// [{id: 1, parent: 0, ...}, {id: 2, parent: 1, ...}, {id: 3, parent: 1, ...}, {id: 4, parent: 2, ...}]
// на выходе формерует дерево вида 
// [{id: 1, parent: 0, children: [{id: 2, parent: 1, children: [{id: 4, parent: 2, children: null, ...}], ...}, {id: 3, parent: 1, children: null, ...}]]
export const getTree = (arr: Array<Object>): Array<Object> => {
    
  let tree: Array<Object> = [];
  let mappedArr: Object = {};
  let arrElem: Object = {};
  let mappedElem: Object = {}; 

  // First map the nodes of the array to an object -> create a hash table.
  for(let i: number = 0, len = arr.length; i < len; i++) {
    arrElem = arr[i];
    mappedArr[arrElem.id] = arrElem;
    mappedArr[arrElem.id]['children'] = [];
  }


  for (var id in mappedArr) {
    if (mappedArr.hasOwnProperty(id)) {
      mappedElem = mappedArr[id];
      // If the element is not at the root level, add it to its parent array of children.
      if (mappedElem.parent) {
        mappedArr[mappedElem['parent']]['children'].push(mappedElem);
      }
      // If the element is at the root level, add it to first level elements array.
      else {
        tree.push(mappedElem);
      }
    }
  }
  return tree;
}

// обрезание строки
export const limitStr = (str: string, n: number, symb: string): string => {
    if (!n && !symb) return str;
    symb = symb || '...';
    if(str.length <= n) symb = "";
    return str.substr(0, n - symb.length) + symb;
}
