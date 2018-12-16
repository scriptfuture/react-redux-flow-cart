import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import TooltipAddToCart from './blocks/tooltip-add-to-cart'

import Preloader from './blocks/preloader'
import Errors from './blocks/errors'

import PriceFormatter from './blocks/price-formatter'
import Helmet from "react-helmet"

import { getProduct } from './../actions/product'
import { addProduct } from './../actions/cart'

type Props = {
    getProduct: any,
    addProduct: any,
    product: Object,
    prices: Array<Object>,
    isLoad: boolean,
    isError: boolean,
    errors: Array<Object>,
    match: Object 
};

type State = {
    quantity: number,
    id: number,
    showTooltip: boolean
};

class Product extends Component<Props, State> {
 
  constructor() { 
       super();
       
       
       (this: any).state = {
              quantity: 1,
              showTooltip: false 
        };
      
       
       (this: any).addProductToCart = this.addProductToCart.bind(this);

       (this: any).handleChange = this.handleChange.bind(this);
       (this: any).plus = this.plus.bind(this);
       (this: any).minus = this.minus.bind(this);
  }
  
  componentDidMount(): void {
      
     // получаем актуальные курсы при старте страницы
     this.props.getProduct(this.props.match.params.id); 
        
  } 
  
  handleChange(event: SyntheticInputEvent<*>): void {
      
     let val: number  = (event.target.value: any);
     let name: string = event.target.name;
      
     // количество, только положительные целые числа 
     if(name === "quantity")  { 
         val = val > 0?val:this.state.quantity;
     }

     let obj: Object = {};
     obj[name] = val;
      
     this.setState(obj);
  }
  
  plus(): void {
      
     let val: number = this.state.quantity > 0?this.state.quantity + 1:this.state.quantity;
      
      this.setState({ quantity: val });
  }
  
  minus(): void {
      
      let val: number = this.state.quantity > 1?this.state.quantity - 1:this.state.quantity;
      
      this.setState({ quantity: val });
  }
  
  addProductToCart() {
      this.setState({showTooltip: true})
      
      this.props.addProduct(parseInt(this.props.match.params.id), this.state.quantity, this.props.product.price);
      
      setTimeout(() => this.setState({showTooltip: false}), 5000);
  }
  
  getTooltipQuantity(): number  {  

      let id: number = parseInt(this.props.match.params.id);
        
      return this.props.prices.filter((obj) => obj.id === id).reduce((sum: number, current: Object) => sum + parseInt(current.quantity), 0);
  } 
  
  isNewProduct(): boolean {
      
      let quantity: number = this.state.quantity;
      
      return this.getTooltipQuantity() === quantity;
  }
  
  render() {
	  
	  return (
          <div>
            <Helmet title={"Каталог / "+ this.props.product.title} />
          
            <Preloader isShow={this.props.isLoad} />
            
           
            <Errors isError={this.props.isError} errors={this.props.errors}/>

          <div className="container">
              <div className="row page-product">
                <div className="col-sm-4">
                   <div className="page-image"><img src={this.props.product.img_src}  alt={this.props.product.title} /></div>
                </div>
                <div className="col-sm-5">
                
                    <div className="page-num">№{this.props.product.id}</div>
                    <div className="page-header"><h1>{this.props.product.title}</h1></div>
                    
                    <table className="table page-options">
                      <tbody>
                        <tr>
                          <td>Артикул</td>
                          <td>{this.props.product.article_number}</td>
                        </tr>
                        <tr>
                          <td>В наличии</td>
                          <td>{this.props.product.stock_availability} шт.</td>
                        </tr>
                      </tbody>
                    </table>
  
                
                    <div className="page-text">{this.props.product.description}</div>
                </div>
                
                <div className="col-sm-3 col-product">
                

                    <div className="page-price"  title="Цена">
                         <PriceFormatter priceInCoins={this.props.product.price} isTitlePrice={true} tpСlass="item" bntСlass="cbn-title" ctСlass="cbn-title"/>
                    </div>
                    
                    
                    <div className="qty-changer" title="Количество">
                        <button className="qty-change" onClick={this.minus}>-</button>
                        <input className="qty-input form-group" type="number" name="quantity" value={this.state.quantity} onChange={this.handleChange}/>
                        <button className="qty-change" onClick={this.plus}>+</button>
                    </div>
                    
                    <div className="page-add-cart">
                        <TooltipAddToCart 
                            isShow={this.state.showTooltip} 
                            quantity={this.getTooltipQuantity()} 
                            isNew={this.isNewProduct()}
                            isCatalog={false}
                        />
                        <button type="button" className="btn btn-primary btn-lg" onClick={this.addProductToCart} >В корзину</button>
                    </div>
                
                    
                </div>
              </div>
            </div>  
              
              
            </div>
		);
  }
 
} 

const mapStateToProps = ({ product, app, cart  }) => ({
    product: product.product,
    prices: cart.prices,
    isLoad: product.isLoad,
    isError: app.isError,
    errors: app.errors 
})

const mapDispatchToProps = (dispatch:any) =>
  bindActionCreators(
    {

      getProduct,
      addProduct
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product)
