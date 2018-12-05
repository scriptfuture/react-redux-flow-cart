import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Preloader from './blocks/preloader'
import Errors from './blocks/errors'

import PriceFormatter from './blocks/price-formatter'

import { getPrices } from './../actions/cart'

import { declOfNum } from './../utils'

type Props = {
};

type State = {
};

class NewOrder extends Component<Props, State> {
 
  constructor() { 
       super();
       
  }
  
  componentDidMount(): void {
     
        // получаем список цен на товары с сервера
        this.props.getPrices();      

  } 
  
  handleChange(event: SyntheticInputEvent<*>): void {
      
     let val: number  = (event.target.value: any);
     let name: string = event.target.name;

     let obj: Object = {};
     obj[name] = val;
      
     this.setState(obj);
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
  
  getCartInfo() {
      let totalQuantity: number = this.getTotalQuantity();
      let totalProductNames: number = this.getTotalProductNames();
      
      return (<p>В корзине <Link to="/cart">{totalQuantity} {declOfNum(totalQuantity,["товар","товара","товаров"])}&nbsp; 
            
               ( {totalProductNames} {declOfNum(totalProductNames,["наименование товаров","наименования товаров","наименований товаров"])} )</Link>,
               
               на общую сумму <b><PriceFormatter priceInCoins={this.getTotalPrice()} /></b> </p>);
  }
  
  render() {
 
	  return (
          <div>
            <Preloader isShow={this.props.isLoad} />
            <Errors isError={this.props.isError} errors={this.props.errors}/>

		    <h1>Оформление заказа</h1>

            <p>Для того чтобы совершить покупку, корректно заполните форму ниже. </p>
            
            {this.getCartInfo()}
             
      
            <div className="alert alert-success hide" role="alert">
              Запись сохранена.
            </div>
            <div className="alert alert-danger hide" role="alert">
              Произошла ошибка!
            </div>
		  
			<form onSubmit="(e) => this.handleSubmit(e, this)" action="#" method="post">
				<div className="form-group">
					<label for="email">Email:*</label><br />
					<input type="text" id="email" name="email" className="form-control"/>
				</div>
				<div className="form-group">
					<label for="phone">Телефон:*</label><br />
					<input type="text" id="phone" name="phone" className="form-control"/>
				</div>
				<div className="form-group">
					<label for="fio">Ф.И.О:*</label><br />
					<input type="text" id="fio" name="fio" className="form-control"/>
				</div>
                
				<div className="form-group">
					<label for="address">Адрес доставки:</label><br />
				    <textarea rows="3" id="address" name="address" className="form-control"></textarea>
				</div>
                
				<div className="form-group">
					<label for="comment">Комментарий к заказу:</label><br />
				    <textarea rows="3" id="comment" name="comment" className="form-control"></textarea>
				</div>
				
			    <p><button type="submit" className="btn btn-primary">Отправить</button></p>
			</form>
      
              
         </div>
		);
  }
 
} 

const mapStateToProps = ({ app, cart  }) => ({
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
)(NewOrder)
