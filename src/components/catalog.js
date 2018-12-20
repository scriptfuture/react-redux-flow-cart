import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Helmet from "react-helmet"

import Preloader from './blocks/preloader'
import Errors from './blocks/errors'

import CatalogItem from './items/catalog-item'
import Pagination from './blocks/pagination'


import { getCatalog } from './../actions/catalog'

type Props = {
    getCatalog: any,
    catalog: Array<Object>,
    pagination: Object,
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
      
        let currentPage: number = parseInt(this.props.match.params.page) || 1;
      
        // получаем актуальные курсы при старте страницы
        this.props.getCatalog(currentPage); 
        
  }
  
  componentWillUpdate(nextProps, nextState) {
      
      //  let currentPage: number = parseInt(this.props.match.params.page) || 1;
      
        // получаем актуальные курсы при старте страницы
      //  this.props.getCatalog(currentPage); 
  }
  
  componentWillU() {
      
        let currentPage: number = parseInt(this.props.match.params.page) || 1;
      
        // получаем актуальные курсы при старте страницы
        this.props.getCatalog(currentPage); 
        
  }
  
  getCatalog() {
	  
	  let catalog = [];
	  if(typeof this.props.catalog !== "undefined" && Array.isArray(this.props.catalog)) catalog = this.props.catalog;
      
	  
	  return catalog.map((obj, index) => <CatalogItem 
                                             key={obj.id} 
                                             id={obj.id} 
                                             img_src={obj.img_src} 
                                             title={obj.title} 
                                             price={obj.price} />);
  }
  
  nextPage() {
      
  }
  
  render() {
      
     let currentPage: number = parseInt(this.props.match.params.page) || 1;
     
     let { pagination, isLoad, isError, errors } = this.props;
	  
	  return (
		   <div>
            <Helmet title={"Каталог"} />
           
            <Preloader isShow={isLoad} />
            
           
            <Errors isError={isError} errors={errors}/>

           
            <h1>Каталог товаров</h1>
            <br />
           
            <div className="products">  
               {this.getCatalog()}
               
               <div className="clear"></div>
            </div>

            <Pagination 
                limit={pagination.limit} 
                currentPage={currentPage} 
                totalPages={pagination.totalPages} 
                isReplay={pagination.isReplay}
                nextPage={this.nextPage}                
            />   
                

          </div>
		);
  }
 
} 

const mapStateToProps = ({ catalog, app  }) => ({
    catalog: catalog.catalog,
    pagination: catalog.pagination,
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
