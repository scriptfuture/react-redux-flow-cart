import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

import PriceFormatter from './blocks/price-formatter'

import Preloader from './blocks/preloader'
import Errors from './blocks/errors'


import { getCart, removeProduct } from './../actions/cart'

type Props = {
    getCart: any,
    removeProduct: any,
    cart: Array<Object>,
    isLoad: boolean,
    isError: boolean,
    errors: Array<Object>
    
};

type State = {};

class Cart extends Component<Props, State> { 
 
  constructor() { 
       super();
  }
  
  componentDidMount() {
      
        // получаем актуальные курсы при старте страницы
        this.props.getCart(); 
        
  } 
  
  getCart() {
	  
	  let cart = [];
	  if(typeof this.props.cart !== "undefined" && Array.isArray(this.props.cart)) cart = this.props.cart;

	  
	  return cart.map((obj, index) =>
                  <tr key={index}>
                  <td>{obj.id}</td>
                  <td><img src={obj.img_src} width="100"/></td>
                  <td>
                     <Link className="nav-link" to={'/product/'+obj.id}>{obj.title}</Link>
                  </td>
                  <td>{obj.article_number}</td>  
                  <td>
                      <input className="qty-input form-group" type="number" defaultValue={obj.quantity} disabled="disabled"/>
                  </td>
                  <td><PriceFormatter priceInCoins={obj.price} /></td>
                  <td><PriceFormatter priceInCoins={obj.total_price} /></td>
                  <td><button className="btn btn-danger btn-sm" title="Удалить" onClick={() => this.props.removeProduct(obj.id)}>X</button></td>
                </tr>
      );
  }
  
  getTotalPrice(): number {
      return this.props.cart.reduce((sum, current) => sum + (current.price * current.quantity), 0);
  }
  
  render() {
      
      let total_price = this.getTotalPrice();
	  
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
               {this.getCart()}
                
                <tr>
                  <td colSpan="6" className="sum-text">Стоимость всех товаров:</td>
                  <td colSpan="2" className="sum-num"><PriceFormatter priceInCoins={total_price} /></td>
                </tr>
  
              </tbody>
            </table>
      
           <div className="tbl-button-order">
               {total_price > 0?(<button type="button" className="btn btn-primary">Оформить заказ</button>):
                                (<button type="button" className="btn btn-primary" disabled>Оформить заказ</button>)}
           </div>


          </div>
		);
  }
 
} 

const mapStateToProps = ({ cart, app  }) => ({
    cart: cart.cart,
    isLoad: cart.isLoad,
    isError: app.isError,
    errors: app.errors 
})

const mapDispatchToProps = (dispatch:any) =>
  bindActionCreators(
    {

      getCart,
      removeProduct

    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart)