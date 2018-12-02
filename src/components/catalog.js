import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

import Preloader from './blocks/preloader'
import Errors from './blocks/errors'

import PriceFormatter from './blocks/price-formatter'

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

class Catalog extends Component<Props, State> { 
 
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
                        <div className="price">
                            <PriceFormatter priceInCoins={obj.price} bntСlass="cbn-title"  ctСlass="cbn-title"/>
                        </div>
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

           
            <h1>Каталог товаров</h1>
            <br />
           
            <div className="products">  
               {this.getCatalog()}
               
               <div className="clear"></div>
            </div>


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
)(Catalog)
