import React from 'react'

import './tooltip-add-to-cart.css'


const TooltipAddToCart = ({ isShow }: Object) => {return (
    <div className={isShow?"add-to-cart-tooltip":"hide"}>
        <div className="add-to-cart-tooltip-text">
           Товар добавлен в корзину!
        </div>
    </div>
)}

export default TooltipAddToCart;
