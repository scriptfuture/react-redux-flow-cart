import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Preloader } from './blocks/preloader'
import { Errors } from './blocks/errors'

import { getProduct } from './../actions/product'

type Props = {
    getProduct: any,
    product: Object,
    isLoad: boolean,
    isError: boolean,
    errors: Array<Object>
    
};

type State = {
    quantity: number
};

class Product extends Component<Props, State> { 

  state: State = {
      quantity: 1
  }
 
  constructor() { 
       super();
       
       (this: any).handleChange = this.handleChange.bind(this);
       (this: any).plus = this.plus.bind(this);
       (this: any).minus = this.minus.bind(this);
  }
  
  componentDidMount(): void {
      
        // получаем актуальные курсы при старте страницы
        this.props.getProduct(1); 
        
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
      alert("test");
  }
  
  render() {
	  
	  return (
          <div>
            <Preloader isShow={this.props.isLoad} />
            
           
            <Errors isError={this.props.isError} errors={this.props.errors}/>

          <div className="container">
              <div className="row page-product">
                <div className="col-sm-4">
                   <div className="page-image"><img src={this.props.product.img_src} /></div>
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
                

                    <div className="page-price"  title="Цена"><span className="item">Цена:&nbsp; </span>{this.props.product.price} <span>руб.</span> 35 <span>коп.</span></div>
                    
                    
                    <div className="qty-changer" title="Количество">
                        <button className="qty-change" onClick={this.minus}>-</button>
                        <input className="qty-input form-group" type="number" name="quantity" value={this.state.quantity} onChange={this.handleChange}/>
                        <button className="qty-change" onClick={this.plus}>+</button>
                    </div>
                    
                    <div className="page-add-cart"><button type="button" className="btn btn-primary btn-lg" onClick={this.addProductToCart}>В корзину</button></div>
                
                    
                </div>
              </div>
            </div>  
              
              
            </div>
		);
  }
 
} 

const mapStateToProps = ({ product, app  }) => ({
    product: product.product,
    isLoad: product.isLoad,
    isError: app.isError,
    errors: app.errors 
})

const mapDispatchToProps = (dispatch:any) =>
  bindActionCreators(
    {

      getProduct

    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product)
