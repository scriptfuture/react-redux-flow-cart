import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

import Preloader from './blocks/preloader'
import Errors from './blocks/errors'


import { getCatalog } from './../actions/catalog'
import { addProduct } from './../actions/cart'

type Props = {
    getCatalog: any,
    addProduct: any,
    catalog: Array<Object>,
    isLoad: boolean,
    isError: boolean,
    errors: Array<Object>
    
};

type State = {};

class Cart extends Component<Props, State> { 
 
  constructor() { 
       super();
       
       (this: any).addProductToCart = this.addProductToCart.bind(this);
  }
  
  componentDidMount() {
      
        // получаем актуальные курсы при старте страницы
        this.props.getCatalog(); 
        
  } 
  
  getCatalog() {
	  
	  let catalog = [];
	  if(typeof this.props.catalog !== "undefined" && Array.isArray(this.props.catalog)) catalog = this.props.catalog;

	  
	  return catalog.map((obj, index) =>
                    <div className="product" key={index}>
                        <div className="num">№{obj.id}</div>
                        <div className="image"><img src={obj.img_src} height="180"/></div>
                        <div className="header">
                           <Link className="nav-link" to={'/product/'+obj.id}>{obj.title}</Link>
                        </div>
                        <div className="price">{obj.price} руб. 35 коп.</div>
                        <div className="add-cart"><button type="button" className="btn btn-primary" onClick={() => this.addProductToCart(obj.id)}>В корзину</button></div>
                    </div> 
      );
  }
  
  addProductToCart(id) {
      this.props.addProduct(parseInt(id), 1);
  }

  
  render() {
	  
	  return (
		   <div>
            <Preloader isShow={this.props.isLoad} />
            
           
            <Errors isError={this.props.isError} errors={this.props.errors}/>

           
		    <h1>Корзина</h1>
            <br />

            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col" className="numcol">№</th>
                  <th scope="col">Изображение</th>
                  <th scope="col">Наименование</th>
                  <th scope="col">Артикул</th>
                  <th scope="col">Количество</th>
                  <th scope="col" className="sum1col">Цена за 1 шт.</th>
                  <th scope="col" className="sumcol">Общая сумма</th>
                   <th scope="col" className="delcol">&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td><img src="img/product1.jpg" width="100"/></td>
                  <td><a href="product.html">Деревянный конструктор'Изба' (тестовый товар 1)</a></td>
                  <td>32432-234</td>  
                  <td>
                      <input className="qty-input form-group" type="number" value="1"/>
                  </td>
                  <td>570</td>
                  <td>340 руб.</td>
                  <td><button className="btn btn-danger btn-sm" title="Удалить">X</button></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td><img src="img/product1.jpg" width="100"/></td>
                  <td><a href="product.html">Деревянный конструктор'Изба' (тестовый товар 2)</a></td>
                  <td>32432-234</td>
                  <td>
                      <input className="qty-input form-group" type="number" value="1"/>
                  </td>
                  <td>570</td>
                  <td>120 руб.</td>
                  <td><button className="btn btn-danger btn-sm" title="Удалить">X</button></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td><img src="img/product1.jpg" width="100"/></td>
                  <td><a href="product.html">Деревянный конструктор'Изба' (тестовый товар 3)</a></td>
                  <td>32432-234</td>
                  <td>
                      <input className="qty-input form-group" type="number" value="1"/>
                  </td>
                  <td>570</td>
                  <td>250 руб.</td>
                  <td><button className="btn btn-danger btn-sm" title="Удалить">X</button></td>
                </tr>
                
                <tr>
                  <td colspan="6" className="sum-text">Стоимость всех товаров:</td>
                  <td colspan="2" className="sum-num">830 руб.</td>
                </tr>
  
              </tbody>
            </table>
      
      
           <div className="tbl-button-order"><button type="button" className="btn btn-primary">Оформить заказ</button></div>


          </div>
		);
  }
 
} 

const mapStateToProps = ({ catalog, app  }) => ({
    catalog: catalog.catalog,
    isLoad: catalog.isLoad,
    isError: app.isError,
    errors: app.errors 
})

const mapDispatchToProps = (dispatch:any) =>
  bindActionCreators(
    {

      getCatalog,
      addProduct

    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart)