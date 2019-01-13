import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

import { getTree } from './../../utils/'

import { getTopMenu } from './../../actions/top-menu'

import CartBlock from './cart-block'

type Props = { 
   getTopMenu: any,
   menu: Array<Object>
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
  
  getDropdownMenuItem(obj: Object, c: any) {
      if(obj.url === "{subtitle}") return(<li key={obj.id} className="dropdown-header">{obj.name}</li>);
      if(obj.url === "{separator}") return(<li role="separator" className="divider"></li>);
      
      return c;
  }
  
  // остальные уровни меню (бесконечный уровень вложенности)
  getDropdownMenuNextLevel(children: Array<Object>) {
      return(<ul className="dropdown-menu">
                  {children.map((obj) => obj.children.length > 1?this.getDropdownMenuItem(obj,
                        <li className="dropdown-submenu" key={obj.id}>
                            <Link to={obj.url} className="dropdown-item">{obj.name}</Link>
                            {this.getDropdownMenuNextLevel(obj.children)} 
                        </li>
                  ):this.getDropdownMenuItem(obj,
                        <li  key={obj.id}>
                            <Link className="dropdown-item" to={obj.url}>{obj.name}</Link>
                        </li>
                  ))}
             </ul>);
  }
  
  getDropdownMenu(children: Array<Object>) {
      return(<ul className="dropdown-menu">
                  {children.map((obj) => obj.children.length > 1?this.getDropdownMenuItem(obj,
                        <li className="dropdown-submenu" key={obj.id}>
                            <Link to={obj.url} className="dropdown-item">{obj.name}</Link>
                            {this.getDropdownMenuNextLevel(obj.children)}         
                        </li>
                  ):this.getDropdownMenuItem(obj,
                        <li  key={obj.id}>
                            <Link className="dropdown-item" to={obj.url}>{obj.name}</Link>
                        </li>
                  ))}
             </ul>);
  }
  
  getMenuTree() {
      let { menu }: Object = this.props;
      
      let topMenu: Array<Object> = getTree(menu);

      return topMenu.map((obj) => obj.children.length > 1?(
             <li className="nav-item dropdown active" key={obj.id}>
                <Link className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" to={obj.url}>{obj.name} <span className="caret"></span></Link>
                 {this.getDropdownMenu(obj.children)}
             </li>
      ):(
             <li className="nav-item" key={obj.id}>
                <Link className="nav-link" to={obj.url}>{obj.name}</Link>
             </li>
      ));
  }
  
  render():any {

      return (<nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">Корзина товаров</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
          
              <ul className="navbar-nav mr-auto">
                  {this.getMenuTree()}
              </ul>
              <CartBlock />
          </div>
        </div>
        </nav>);
  }
 
} 

const mapStateToProps = ({ topmenu  }) => ({
    menu: topmenu.menu
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
