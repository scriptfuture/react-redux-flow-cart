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

let getTooltipClass = (isShow, quantity, isNew): string => {
    
    if(!isShow) return "hide";
    
    let res: string = "add-to-cart-tooltip";
    
    if(isNew) {
       if(quantity > 1) res = "add-to-cart-tooltip atct-quant"; 
    } else {
       res = "add-to-cart-tooltip atct-max";
    }
    
    return res;
};


const TooltipAddToCart = ({ isShow, quantity, isNew }: Object) => {return (
    <div className={getTooltipClass(isShow, quantity, isNew)}>
        <div className="add-to-cart-tooltip-text">
            {getText(quantity, isNew)}
        </div>
    </div>
)}

export default TooltipAddToCart;
