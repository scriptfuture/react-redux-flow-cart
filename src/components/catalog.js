import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

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

                <ul className="pagination">
                  <li className="page-item disabled">
                    <Link className="page-link" to={'/catalog/1'}>«</Link>
                  </li>
                  <li className="page-item active">
                    <Link className="page-link" to={'/catalog/1'}>1</Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" to={'/catalog/1'}>2</Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" to={'/catalog/1'}>3</Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" to={'/catalog/1'}>4</Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" to={'/catalog/1'}>5</Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" to={'/catalog/1'}>»</Link>
                  </li>
                </ul>
                

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
