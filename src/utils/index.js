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