import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getPrices } from './../../actions/cart'
import PriceFormatter from './price-formatter'
import { declOfNum } from './../../utils/'

type Props = {
    getPrices: any,
    prices: Array<Object>,
    isLoad: boolean,
    isError: boolean,
    errors: Array<Object>
};

type State = {};


class CartBlock extends Component<Props, State> { 

  state: State  = {};
  
  componentDidMount(): void {
     
        // получаем список цен на товары с сервера
        if(this.props.prices.length === 0) this.props.getPrices();
  } 
  
  getTotalPrice(): number {
      return this.props.prices.reduce((sum: number, current: Object) => sum + (parseInt(current.price) * parseInt(current.quantity)), 0);
  }
  
  getTotalProductNames(): number {
      return this.props.prices.length;
  }
  
  getTotalQuantity(): number {
      return this.props.prices.reduce((sum: number, current: Object) => sum + parseInt(current.quantity), 0);
  }
  
  getCartInfoString() {
      let totalQuantity: number = this.getTotalQuantity();
      let totalProductNames: number = this.getTotalProductNames();
      
      return "В корзине: " + (totalQuantity+" "+declOfNum(totalQuantity, ["товар","товара","товаров"]) + " ( " + totalProductNames +" "+
               declOfNum(totalProductNames, ["наименование товара","наименования товаров","наименований товаров"]) + " )");
  }
  
  getCartBlock() {
	  if(this.props.isLoad && !this.props.isError) return(<span className="navbar-text">загрузка корзины...</span>);
      if(this.props.isError) return(<span className="navbar-text">Ошибка загрузки корзины!</span>);
        
      return (<span className="navbar-text cart-block" title={this.getCartInfoString()}>
                    <Link to="/cart"><i className="fa fa-shopping-cart" aria-hidden="true"></i>
 &nbsp; <b>{this.getTotalQuantity()}</b> шт. &nbsp;–&nbsp;  
                  
                   <b><PriceFormatter priceInCoins={this.getTotalPrice()} /></b></Link>
              </span>);
  }
  
  getEmptyCartBlock() {
      return (<span className="navbar-text">Корзина пуста</span>);
  }
  
  render() {
      
      return this.props.prices.length === 0?this.getEmptyCartBlock():this.getCartBlock();
  }
 
} 

const mapStateToProps = ({ cart, app  }) => ({
    prices: cart.prices,
    isLoad: cart.isLoad,
    isError: app.isError,
    errors: app.errors 
})

const mapDispatchToProps = (dispatch:any) =>
  bindActionCreators(
    {

      getPrices

    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartBlock)
