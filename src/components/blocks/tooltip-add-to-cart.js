import React from 'react'

import './tooltip-add-to-cart.css'

import { declOfNum } from './../../utils/'


let getText = (quantity: number, isNew: boolean): string => {
    
    let res: string = "Товар добавлен в корзину!";
    
    if(isNew) {
       if(quantity > 1) res = "В корзину добавлено "+quantity+" "+declOfNum(quantity, ["экземпляр","экземпляра","экземпляров"])+" этого товара."; 
    } else {
       res = "Товар добавлен в корзину ещё раз! В корзине "+quantity+" "+declOfNum(quantity, ["экземпляр","экземпляра","экземпляров"])+" этого товара.";
    }
    
    return res;
};

let getTooltipClass = (isShow: boolean, quantity: number, isNew: boolean, isCatalog: boolean): string => {
    
    if(!isShow) return "hide";
    
    let sub1 = "";
    let sub2 = " atct-max";
    
    if(isCatalog) {
        sub1 = " atct-cat";
        sub2 = " atct-max-cat";
    }
    
    let res: string = "add-to-cart-tooltip" + sub1;
    
    if(isNew) {
       if(quantity > 1) res = "add-to-cart-tooltip atct-quant"; 
    } else {
       res = "add-to-cart-tooltip" + sub2;
    }
    
    return res;
};


const TooltipAddToCart = ({ isShow, quantity, isNew, isCatalog}: Object) =>  (
    <div className={getTooltipClass(isShow, quantity, isNew, isCatalog)}>
        <div className="add-to-cart-tooltip-text">
            {getText(quantity, isNew)}
        </div>
    </div>
)

export default TooltipAddToCart;
