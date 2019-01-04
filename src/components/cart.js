import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import { push } from 'connected-react-router'

import Helmet from "react-helmet"

import PriceFormatter from './blocks/price-formatter'

import Preloader from './blocks/preloader'
import Errors from './blocks/errors'

import { declOfNum } from './../utils/'
import { getCart, removeProduct, сhangeQuantity, expand, getExpand } from './../actions/cart'

type Props = {
    openNewOrder: any,
    getCart: any,
    removeProduct: any,
    сhangeQuantity: any,
    cart: Array<Object>,
    isLoad: boolean,
    isError: boolean,
    errors: Array<Object>
    
};

type State = {};

class Cart extends Component<Props, State> { 
 
  constructor() { 
       super();
       

       (this: any).сhangeQuantity = this.сhangeQuantity.bind(this);
  }
  
  componentDidMount() {
      
        // получаем список товаров с сервера
        this.props.getCart(); 
        
        // текущие состояние экспандера таблицы
        this.props.getExpand(this.props.isExpand);
        
  } 
  
  сhangeQuantity(event: SyntheticInputEvent<*>, id: number, cart: Array<Object>): void {
      
     let val: number  = (event.target.value: any);

     // количество, только положительные целые числа 
     val = val > 0?val:1;

     this.props.сhangeQuantity(id, val, cart);
  }
  
  getCartList() {
	  
	  let cart = [];
	  if(typeof this.props.cart !== "undefined" && Array.isArray(this.props.cart)) cart = this.props.cart;

	  
	  return cart.map((obj, index) =>
                  <tr key={index}>
                  <td>{obj.id}</td>
                  <td><img src={obj.img_src} width="100" alt={obj.title} /></td>
                  <td>
                     <Link to={'/product/'+obj.id}>{obj.title}</Link>
                  </td>
                  
                  {this.props.isExpand?<td>{obj.article_number}</td>:""}  
                  {this.props.isExpand?<td>{obj.weight} кг.</td>:""} 
                  
                  <td>&nbsp;</td>  
                  <td>
                      <input className="qty-input form-group" type="number" value={obj.quantity} onChange={(e) => this.сhangeQuantity(e, obj.id, cart)}/>
                  </td>
                  <td><PriceFormatter priceInCoins={obj.price} /></td>
                  <td><PriceFormatter priceInCoins={parseInt(obj.total_price) * parseInt(obj.quantity)} /></td>
                  <td><button className="btn btn-danger btn-sm" title="Удалить" onClick={() => this.props.removeProduct(obj.id, cart)}>X</button></td>
                </tr>
      );
  }
  
  getTotalPrice(): number {
      return this.props.cart.reduce((sum: number, current: Object) => sum + (parseInt(current.price) * parseInt(current.quantity)), 0);
  }
  
  getTotalProductNames(): number {
      return this.props.cart.length;
  }
  
  getTotalQuantity(): number {
      return this.props.cart.reduce((sum: number, current: Object) => sum + parseInt(current.quantity), 0);
  }
  
  getTotalWeight(): number {
      return this.props.cart.reduce((sum: number, current: Object) => sum + parseFloat(current.weight), 0);
  }
  
  getCartInfo() {
      let totalQuantity: number = this.getTotalQuantity();
      let totalProductNames: number = this.getTotalProductNames();
      
      return (<div className="cart-info">
                 В корзине {totalQuantity} {declOfNum(totalQuantity,["товар","товара","товаров"])}&nbsp; 
                 
                 ( {totalProductNames} {declOfNum(totalProductNames,["наименование товара","наименования товаров","наименований товаров"])} )
                 
              </div>);
  }
  
  getCart() {
      
      let total_price: number = this.getTotalPrice();
      let isExpand: boolean = this.props.isExpand;
  
	  return (
		   <div>
            <Helmet title={"Корзина"} />
           
            <Preloader isShow={this.props.isLoad} />
            <Errors isError={this.props.isError} errors={this.props.errors}/>

           
		    <h1>Корзина</h1>
            <br />

            {this.getCartInfo()}
            <table className="table table-hover cart-table">
              <thead>
                <tr>
                  <th scope="col" className="numcol">№</th>
                  <th scope="col">Изображение</th>
                  <th scope="col">Наименование</th>
                  {isExpand?<th scope="col">Артикул</th>:""}
                  {isExpand?<th scope="col" className="weightcol">Вес</th>:""}
                  <th scope="col"><span className="harr-cart" onClick={() => this.props.expand(isExpand)}>&harr;</span></th>
                  <th scope="col">Количество</th>
                  <th scope="col" className="sum1col">Цена за 1 шт.</th>
                  <th scope="col" className="sumcol">Общая сумма</th>
                  <th scope="col" className="delcol">&nbsp;</th>
                </tr>
              </thead>
              <tbody>
               {this.getCartList()}
                
                
                {isExpand?(
                    <tr>
                      <td colSpan="4" className="sum-text-weight">Суммарный вес:</td>
                      <td className="sum-num-weight sum-border-weight">{this.getTotalWeight()} кг.</td>
                      <td colSpan="3" className="sum-text">Стоимость всех товаров:</td>
                      <td colSpan="2" className="sum-num"><PriceFormatter priceInCoins={total_price} /></td>
                    </tr>
                ):(
                    <tr>
                      <td colSpan="4" className="sum-text-weight sum-border-weight">Суммарный вес:&nbsp; <span className="sum-num-weight">27.34 кг.</span></td>
                      <td colSpan="2" className="sum-text">Стоимость всех товаров:</td>
                      <td colSpan="2" className="sum-num"><PriceFormatter priceInCoins={total_price} /></td>
                    </tr>
                )}
                
              </tbody>
            </table>
      
           <div className="tbl-button-order">
               {total_price > 0?(<button type="button" className="btn btn-primary" onClick={this.props.openNewOrder}>Оформить заказ</button>):
                                (<button type="button" className="btn btn-primary" disabled>Оформить заказ</button>)}
           </div>


          </div>
		);
  }
  
  getEmptyCart() {
      
	  return (
		   <div>
            <Helmet title={"Корзина"} />

		    <h1>Корзина</h1>
            <br />

            <h6>Корзина пуста!</h6>


          </div>
		);
  }
  
  render() {
      
      let cart = [];
	  if(typeof this.props.cart !== "undefined" && Array.isArray(this.props.cart)) cart = this.props.cart;

	  return cart.length === 0?this.getEmptyCart():this.getCart();
  }
 
} 

const mapStateToProps = ({ cart, app  }) => ({
    cart: cart.cart,
    isLoad: cart.isLoad,
    isExpand: cart.isExpand,
    isError: app.isError,
    errors: app.errors 
})

const mapDispatchToProps = (dispatch:any) =>
  bindActionCreators(
    {

      getCart,
      removeProduct,
      сhangeQuantity,
      openNewOrder:  () => push('/neworder'),
      expand,
      getExpand

    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart)