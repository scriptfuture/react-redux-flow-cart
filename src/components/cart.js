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
    getExpand: any,
    expand: any,
    cart: Array<Object>,
    isLoad: boolean,
    isError: boolean,
    isExpand: boolean,
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
                      <input 
                         className="qty-input form-group" 
                         type="number" 
                         value={obj.quantity} 
                         onChange={(e) => this.сhangeQuantity(e, obj.id, cart)}/>
                  </td>
                  <td><PriceFormatter priceInCoins={obj.price} /></td>
                  <td><PriceFormatter priceInCoins={parseInt(obj.total_price) * parseInt(obj.quantity)} /></td>
                  <td>
                      <button className="btn btn-danger btn-sm" title="Удалить" onClick={() => this.props.removeProduct(obj.id, cart)}>
                          <i className="fa fa-trash" aria-hidden="true"></i>
                      </button>
                  </td>
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
		   <div className="cart-desktop">
            <Helmet title={"Корзина"} />
           
            <Preloader isShow={this.props.isLoad} />
            <Errors isError={this.props.isError} errors={this.props.errors}/>

           
		    <h1>Корзина</h1>
            <br />

            {this.getCartInfo()}
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col" className="numcol">№</th>
                  <th scope="col">Изображение</th>
                  <th scope="col">Наименование</th>
                  {isExpand?<th scope="col">Артикул</th>:""}
                  {isExpand?<th scope="col" className="weightcol">Вес</th>:""}
                  <th scope="col">
                     <span className="harr-cart" onClick={() => this.props.expand(isExpand)} title={isExpand?"свернуть":"развернуть"}>&harr;</span>
                  </th>
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
  
  getCartListMV() {
	  
	  let cart = [];
	  if(typeof this.props.cart !== "undefined" && Array.isArray(this.props.cart)) cart = this.props.cart;

	  
	  return cart.map((obj, index) =>
                <div className="cart-mv-item" key={index}>
                     <div className="img-container"><img src={obj.img_src} alt={obj.title}/></div>
                     <table className="table">
                      <tbody>
                        <tr>
                          <th scope="row">ID:</th>
                          <td>{obj.id}</td>
                        </tr>
                        <tr>
                          <th scope="row">Название:</th>
                          <td><Link to={'/product/'+obj.id}>{obj.title}</Link></td>
                        </tr>
                        
                        {this.props.isExpand?
                        <tr>
                          <th scope="row">Артикул:</th>
                          <td>{obj.article_number}</td>
                        </tr>:""}  
                        
                       {this.props.isExpand?
                        <tr>
                          <th scope="row">Вес:</th>
                          <td>{obj.weight} кг.</td>
                        </tr>:""} 
                        
                        <tr>
                          <td className="harr-cart-mv" colSpan="2"onClick={() => this.props.expand(this.props.isExpand)} title={this.props.isExpand?"свернуть":"развернуть"}>
                              &uarr;&darr;
                          </td>
                        </tr>

                        <tr>
                          <th scope="row">Количество:</th>
                          <td>
                             <input className="qty-input form-group" type="number" value={obj.quantity} onChange={(e) => this.сhangeQuantity(e, obj.id, cart)}/>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Цена за 1 шт.:</th>
                          <td><PriceFormatter priceInCoins={obj.price} /></td>
                        </tr>
                        <tr>
                          <th scope="row">Общая сумма:</th>
                          <td><PriceFormatter priceInCoins={parseInt(obj.total_price) * parseInt(obj.quantity)} /></td>
                        </tr>
                        <tr className="cart-mv-del">
                          <td colSpan="2">
                             <button className="btn btn-danger" title="Удалить"  onClick={() => this.props.removeProduct(obj.id, cart)}>
                                 <i className="fa fa-trash" aria-hidden="true"></i>&nbsp; удалить
                             </button>
                          </td>
                        </tr>
                      </tbody>
                    </table> 
                </div>
      );
  }
  
  // корзина для мобильной версии
  getCartMV() {
      
      let total_price: number = this.getTotalPrice();
  
	  return (
		   <div className="cart-mv">
            <Helmet title={"Корзина"} />
           
            <Preloader isShow={this.props.isLoad} />
            <Errors isError={this.props.isError} errors={this.props.errors}/>

           
		    <h1>Корзина</h1>
            <br />
            
            
            {this.getCartInfo()}
            <div>
                {this.getCartListMV()}
            </div>
            
           <div className="sum-weight-mv">Суммарный вес: {this.getTotalWeight()} кг.</div>

           <div className="sum-text-mv">Стоимость всех товаров: <span><PriceFormatter priceInCoins={total_price} /></span></div>
      
           <div className="tbl-button-order">
               {total_price > 0?(<button type="button" className="btn btn-primary" onClick={this.props.openNewOrder}>Оформить заказ</button>):
                                (<button type="button" className="btn btn-primary" disabled>Оформить заказ</button>)}
           </div>


          </div>
		);
  }
  
  render() {
      
      let cart = [];
	  if(typeof this.props.cart !== "undefined" && Array.isArray(this.props.cart)) cart = this.props.cart;
   
      return cart.length === 0?this.getEmptyCart():(
         <div>
             {this.getCartMV()}
             {this.getCart()}
         </div>
      );
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