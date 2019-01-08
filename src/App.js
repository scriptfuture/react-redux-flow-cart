// @flow
import React from 'react'
import { Route } from 'react-router-dom'

import About from './components/about'
import Catalog from './components/catalog'
import Product from './components/product'
import Cart from './components/cart'
import NewOrder from './components/neworder'

import TopMenu from './components/blocks/top-menu'
import Footer from './components/blocks/footer'


const App = () => (
     <div className="app-wrapper">
       <TopMenu />

       <div className="mf-wrapper">
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
            </main>
            <Footer />
        </div>
        
    </div>
)

export default App;