import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Helmet from "react-helmet"

import Preloader from './blocks/preloader'
import Errors from './blocks/errors'

import CatalogItem from './items/catalog-item'


import { getCatalog } from './../actions/catalog'

type Props = {
    getCatalog: any,
    catalog: Array<Object>,
    isLoad: boolean,
    isError: boolean,
    errors: Array<Object>
    
};

type State = {
    tooltipCatalog: Object
};

class Catalog extends Component<Props, State> { 

  state = {
      tooltipCatalog: {} 
  }
  
  componentDidMount() {
      
        // получаем актуальные курсы при старте страницы
        this.props.getCatalog(); 
        
  } 
  
  getCatalog() {
	  
	  let catalog = [];
	  if(typeof this.props.catalog !== "undefined" && Array.isArray(this.props.catalog)) catalog = this.props.catalog;
      
	  
	  return catalog.map((obj, index) => <CatalogItem 
                                             key={index} 
                                             id={obj.id} 
                                             img_src={obj.img_src} 
                                             title={obj.title} 
                                             price={obj.price} />);
  }
  
  render() {
	  
	  return (
		   <div>
            <Helmet title={"Каталог"} />
           
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
