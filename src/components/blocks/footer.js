import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


type Props = {
};

type State = {};


class Footer extends Component<Props, State> { 

  state: State  = {};
  

  render() {
      
      return <footer className="page-footer font-small blue pt-4">
                <div className="container-fluid text-center text-md-left">
                  <div className="row">
                    <div className="col-md-12 mt-md-0 mt-3"> 
                         2019 год. Все права защищены
                    </div>
                  </div>
                </div>
		  </footer>;
  }
 
} 

const mapStateToProps = () => ({
})

const mapDispatchToProps = (dispatch:any) =>
  bindActionCreators(
    {

    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer)
