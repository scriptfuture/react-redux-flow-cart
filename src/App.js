// @flow
import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'


import About from './components/about'
import Catalog from './components/catalog'
import Product from './components/product'

type Props = {};

let y:number = 9;

type State = {
};

class App extends Component<Props, State> {
    
  state: State  = {
  };
    
  constructor() {
      super();
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
              <li className="nav-item active">
                <Link className="nav-link" to="/">Товары <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about-us">О проекте</Link>
              </li>
              
              <li className="nav-item">
                <a className="nav-link" href="cart.html">Корзина</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="neworder.html">Оформить заказ</a>
              </li>
            </ul>
            
          </div>
        </div>
        </nav>

       <main role="main" className="container">
            <div className="row">
                <div className="col content">

                    <Route exact path="/" component={Catalog} /> 
                    <Route exact path="/about-us" component={About} /> 
                    
                    <Route exact path="/product/:id" component={Product} />
                 
                </div>
            </div>

            <br />

        </main>
      </div>
    );
  }
}

export default App;