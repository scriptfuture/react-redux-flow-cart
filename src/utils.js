// Полезные функции

// проверка на undefined
export const isU = (a: any): boolean => typeof a === "undefined";

export const getCoins = (priceInCoins: number): number => { 
    let n: any = parseInt((priceInCoins + "").substr((priceInCoins + "").length - 2));
    return isNaN(n)?0:n; 
};
export const getBN = (priceInCoins: number): number => { 
    let n: any = parseInt((priceInCoins + "").substr(0, (priceInCoins + "").length - 2)) ;
    return isNaN(n)?0:n
};