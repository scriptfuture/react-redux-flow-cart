import React from 'react'

import { bbcodeParse } from './../utils/'

let test_bb = "[i]тест i[/i]  [b]тест b[/b] [u]тест u[/u] [h1]тест h1[/h1] [h2]тест h2[/h2] [h3]тест h3[/h3] [h4]тест h4[/h4]";  
    test_bb += "[h4]тест h4[/h4] [h5]тест h5[/h5] [h5]тест h5[/h5] [h6]тест h6[/h6] [color=#FF0000]text color[/color] [size=9]text size[/size]";
    test_bb += "[img width=200]/img/product.jpg[/img][br] [youtube width=400]https://www.youtube.com/embed/KeDyN2MYdk8[/youtube]";
    test_bb += "[p][email=info@example.com]email: info@example.com[/email][/p] [p][url=https://www.example.com] link www.example.com[/url][/p]";
    
const About = () => (
  <div>
    <h1>О проекте</h1>
    <p>Корзина товаров на React + Redux + Flow.</p>
    <div>
    <h5>Тест BB-кодов</h5>
    {bbcodeParse(test_bb)}
    </div>
  </div>
)

export default About
