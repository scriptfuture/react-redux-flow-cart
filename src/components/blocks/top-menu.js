import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'


import { getTopMenu } from './../../actions/top-menu'

import CartBlock from './cart-block'

type Props = { 
   getTopMenu: any
};

type State = {
};


class TopMenu extends Component<Props, State> { 

  state: State  = {
  };
  
  componentDidMount() {
      
        // получаем меню
        this.props.getTopMenu(); 
        
  }
  
  render():any {
      
      //let { id, img_src, title, price, openProduct }: Object = this.props;
      //let { showTooltip }: Object = this.state;

      return (<nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">Корзина товаров</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
          
            <ul className="navbar-nav mr-auto">
              <li className="nav-item dropdown active">
                <Link className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" to="/">Каталог <span className="caret"></span></Link>
                <ul className="dropdown-menu">
					<li><Link className="dropdown-item" to="/">Все товары</Link></li>
					<li><Link className="dropdown-item" to="/">Новинки</Link></li>
					<li role="separator" className="divider"></li>
					<li className="dropdown-header">Категории</li>
					<li><Link className="dropdown-item" to="/">Категория 1</Link></li>
				    <li><Link className="dropdown-item" to="/">Категория 2</Link></li>
					<li><Link className="dropdown-item" to="/">Категория 3</Link></li>
                  
                  
					<li className="dropdown-submenu">
						<ul className="dropdown-menu">
						   <li><Link className="dropdown-item" to="/">Подкатегория 1</Link></li>
						   <li><Link className="dropdown-item" to="/">Подкатегория 2</Link></li>
						   <li><Link className="dropdown-item" to="/">Подкатегория 3</Link></li>
						</ul>
					</li>
                  
                </ul>
              </li>
			  
              <li className="nav-item">
                <Link className="nav-link" to="/about-us">О проекте</Link>
              </li>
              
              <li className="nav-item">
                 <Link className="nav-link" to="/cart">Корзина</Link>
              </li>
              <li className="nav-item">
                 <Link className="nav-link" to="/neworder">Оформить заказ</Link>
              </li>
            </ul>
            
            <CartBlock />
          </div>
        </div>
        </nav>);
  }
 
} 

const mapStateToProps = ({ cart  }) => ({
    prices: cart.prices
})

const mapDispatchToProps = (dispatch:any) =>
  bindActionCreators(
    {
      getTopMenu
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopMenu)
