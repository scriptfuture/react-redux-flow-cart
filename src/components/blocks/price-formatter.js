import React from 'react'

import { isU, getCoins, getBN } from './../../utils'

const PriceFormatter = ({ 
       priceInCoins, // цена в монетах (для рублей в копейках)
       generalСlass, // основной класс
       isTitlePrice, // есть ли текст "Цена: "
   
       bankNoteTitle, // название купюры
       coinTitle,     // название монеты
       
       // остальные классы
       tpСlass,
       bnСlass,
       bntСlass,
       cnСlass,
       ctСlass
       
   }: Object) => {
       let cn: number = getCoins(priceInCoins);
       
       return (
    <span className={!isU(generalСlass)?generalСlass:""}>
        {isTitlePrice?<span className={!isU(tpСlass)?tpСlass:""}>Цена:&nbsp;</span>:""}
        <span className={!isU(bnСlass)?bnСlass:""}>{getBN(priceInCoins)}</span> 
        <span className={!isU(bntСlass)?bntСlass:""}>{isU(bankNoteTitle)?" руб.":bankNoteTitle}</span> 
        
        {cn > 0?<span className={!isU(cnСlass)?cnСlass:""}> {cn}</span>:""} 
        {cn > 0?<span className={!isU(ctСlass)?ctСlass:""}>{isU(coinTitle)?" коп.":coinTitle}</span>:""} 
    </span>
)}

export default PriceFormatter;