import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

import { Preloader } from './blocks/preloader'
import { Errors } from './blocks/errors'


import { getCatalog } from './../actions/catalog'

type Props = {
    getCatalog: any,
    catalog: Array<Object>,
    isLoad: boolean,
    isError: boolean,
    errors: Array<Object>
    
};

type State = {};

class Catalog extends Component<Props, State> { 
 
  constructor() { 
       super();
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
                        <div className="price">{obj.price} руб. 35 коп.</div>
                        <div className="add-cart"><button type="button" className="btn btn-primary">В корзину</button></div>
                    </div> 
      );
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

      getCatalog

    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Catalog)
