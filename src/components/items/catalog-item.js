import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import { push } from 'connected-react-router'

import PriceFormatter from './../blocks/price-formatter'
import TooltipAddToCart from './../blocks/tooltip-add-to-cart'

import { addProduct } from './../../actions/cart'

import { limitStr } from './../../utils/'


type Props = {
    prices: Array<Object>,
    id: number, 
    img_src: string, 
    title: string, 
    price: number,
    addProduct: any,
    openProduct: any    
};

type State = {
    showTooltip:boolean,
    currentQuantity: number
};


class CatalogItem extends Component<Props, State> { 

  state: State  = {
      showTooltip: false,
      currentQuantity: 1
  };
  
  constructor() { 
       super();
       
       (this: any).addProductToCart = this.addProductToCart.bind(this);
  }
  
  getTooltipQuantity(): number  {  
        
      return this.props.prices.filter((obj) => obj.id === this.props.id).reduce((sum: number, current: Object) => sum + parseInt(current.quantity), 0);
  } 
  
  isNewProduct(): boolean {
      
      return this.getTooltipQuantity() === this.state.currentQuantity;
  }
  
  addProductToCart(id, price) {
      this.setState({showTooltip: true})
      
      this.props.addProduct(parseInt(id), 1, price);
      
      setTimeout(() => this.setState({showTooltip: false}), 5000);
  }
  
  render():any {
      
      let { id, img_src, title, price, openProduct }: Object = this.props;
      let { showTooltip }: Object = this.state;

      return (<div className="product">
                        <div className="num">№{id}</div>
                        <div className="image"><img src={img_src} height="180" alt={title} onClick={()=> openProduct(id)}/></div>
                        <div className="header">
                           <Link className="nav-link" to={'/product/'+id} title={title}>{limitStr(title, 55, '...')}</Link>
                        </div>
                        <div className="price">
                            <PriceFormatter priceInCoins={price} bntСlass="cbn-title"  ctСlass="cbn-title"/>
                        </div>
                        <div className="add-cart">
                            <TooltipAddToCart 
                                isShow={showTooltip} 
                                quantity={this.getTooltipQuantity()}
                                isNew={this.isNewProduct()}
                                isCatalog={true}
                            />
                            <button type="button" className="btn btn-primary" onClick={() => this.addProductToCart(id, price)}>
                                <i className="fa fa-cart-arrow-down" aria-hidden="true"></i>&nbsp; В корзину
                            </button>
                        </div>
                    </div>);
  }
 
} 

const mapStateToProps = ({ cart  }) => ({
    prices: cart.prices
})

const mapDispatchToProps = (dispatch:any) =>
  bindActionCreators(
    {
      addProduct,
      openProduct: (id: number) => push('/product/'+id)
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CatalogItem)
