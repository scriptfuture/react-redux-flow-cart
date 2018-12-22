// @flow
import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

import About from './components/about'
import Catalog from './components/catalog'
import Product from './components/product'
import Cart from './components/cart'
import NewOrder from './components/neworder'

import CartBlock from './components/blocks/cart-block'

type Props = {};

type State = {
};

class App extends Component<Props, State> {
    
  state: State  = {
  };
    
    
  getCategories() {
      
  }
    
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
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
        </nav>

       <main role="main" className="container">
            <div className="row">
                <div className="col content">

                    <Route exact path="/" component={Catalog} /> 
                    <Route exact path="/catalog/:page" component={Catalog} /> 
                    <Route exact path="/about-us" component={About} /> 
                    
                    <Route exact path="/product/:id" component={Product} />
                    <Route exact path="/cart" component={Cart} />
                    <Route exact path="/neworder" component={NewOrder} />
                 
                </div>
            </div>

            <br />

        </main>
      </div>
    );
  }
}

export default App;