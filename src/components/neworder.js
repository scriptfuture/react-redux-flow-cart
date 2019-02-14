import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Helmet from "react-helmet"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import Preloader from './blocks/preloader'
import Errors from './blocks/errors'

import PriceFormatter from './blocks/price-formatter'

import { getPrices } from './../actions/cart'
import { newOrder } from './../actions/neworder'

import { declOfNum, isU, bbcodeParse } from './../utils/'

type Props = {
    getPrices: any,
    newOrder: any,
    prices: Array<Object>,
    isLoad: boolean,
    isError: boolean,
    errors: Array<Object>,
    isSuccess: boolean,
    message: string
};

type State = {
    isSuccess: boolean
};

//const phoneRegExp = /+?(\d?)[\s-()]?(\d{3})[\s-()]?(\d{3})[\s-()]?(\d{2})[\s-()]?(\d{2})/g;
var phone = '+7 (921) 099-34-7757678';

//var phone = '+7 (921) 099-34-7757678';

//var cleanStr = phone.replace(/[\(\) \-\+]+/g, '')

d//ocument.write((val => val)(cleanStr));

d//ocument.write((val => /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(val))(cleanStr));

var cleanStr = phone.replace(/[\(\) \-\+]+/g, '')

document.write((val => val)(cleanStr));

document.write((val => /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(val))(cleanStr));

// схема валидации
const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email('Ошибка в email-адресе!')
    .required('Поле не должно быть пустым!'),
  phone: Yup.string()
    //.matches(phoneRegExp, 'Ошибка в поле "Телефон"!')
     .test('phone-test', 'Ошибка в поле "Телефон"!', val => )
    .required('Поле не должно быть пустым!'),
  fio: Yup.string()
    .min(2, 'Минимум 2 символа!')
    .max(100, 'Максимум 100 символов!')
    .required('Поле не должно быть пустым!'),
});

const Fieldset = ({ name, label, component, ...rest }) => (
    <div className="form-group">
	    <label htmlFor={name}>{label}</label><br />
        <Field type={name} component={component} id={name} name={name} className="form-control" {...rest} />
        <ErrorMessage name={name} component="div" className="field-error" />
	</div>
);


class NewOrder extends Component<Props, State> {
 
  constructor() { 
       super();
       
       (this: any).state = {
            isSuccess: false
       };
       
       (this: any).handleSubmit = this.handleSubmit.bind(this);
       
  }
  
  componentDidMount(): void {
     
        // получаем список цен на товары с сервера
        this.props.getPrices();      

  } 

  
  handleSubmit(values: Object) {
        
        let cartLine: string = this.getCartLine();
        let purchaseChecksum: number = this.getTotalPrice();
        
        let self: any = this;
        
        // отправляем форму
        this.props.newOrder({ ...values, cartLine, purchaseChecksum }, 
           function() {
               
               // меняем состояния компонента локально (через state)
               self.setState({isSuccess: true});
           }
        );
  }
  
  
  getCartLine(): string {
      return this.props.prices.reduce((s: string, current: Object) => s + current.id + ':' + current.quantity + ':' + current.price + ',', '').slice(0, -1);
  }
  
  getTotalPrice(): number {
      return this.props.prices.reduce((sum: number, current: Object) => sum + (parseInt(current.price) * parseInt(current.quantity)), 0);
  }
  
  getTotalProductNames(): number {
      return this.props.prices.length;
  }
  
  getTotalQuantity(): number {
      return this.props.prices.reduce((sum: number, current: Object) => sum + parseInt(current.quantity), 0);
  }
  
  getCartInfo() {
      let totalQuantity: number = this.getTotalQuantity();
      let totalProductNames: number = this.getTotalProductNames();
      
      return (<p>В корзине <Link to="/cart">{totalQuantity} {declOfNum(totalQuantity,["товар","товара","товаров"])}&nbsp; 
            
               ( {totalProductNames} {declOfNum(totalProductNames,["наименование товаров","наименования товаров","наименований товаров"])} )</Link>,
               
               на общую сумму <b><PriceFormatter priceInCoins={this.getTotalPrice()} /></b> </p>);
  }
  
  getForm() {
      
      return (<div>
            <Helmet title={"Оформление заказа"} />
      
            <p>Для того чтобы совершить покупку, корректно заполните форму ниже. </p>
            
            {this.getCartInfo()}
            
              <Formik
                  initialValues={{
                     email: "",
                     phone: "",
                     fio:  "",
                     address: "",
                     comment: "",
                  }}
                  validationSchema={SignUpSchema}
                  onSubmit={this.handleSubmit}
                >
                  {({ isValid,  handleReset }) => (
                    <Form>
                       <Fieldset
                           name="email"
                           label="Email:*"
                           type="email"
                           component="input"
                       />
                            
                       <Fieldset
                           name="phone"
                           label="Телефон:*"
                           type="text"
                           component="input"
                       />

                       <Fieldset
                           name="fio"
                           label="Ф.И.О:*"
                           type="text"
                           component="input"
                       />
                            
                       <Fieldset
                           name="address"
                           label="Адрес доставки:"
                           component="textarea"
                       />
                            
                       <Fieldset
                           name="comment"
                           label="Комментарий к заказу:"
                           component="textarea"
                       />
           
                       <p>
                          <button 
                              type="submit" 
                              disabled={!isValid}
                              className="btn btn-primary"
                          >
                              Отправить
                          </button>
                          
                              &nbsp;&nbsp; 
                          
                          {                         
                          <button
                              type="reset"
                              className="btn btn-link"
                              onClick={handleReset}
                          >
                            Очистить
                          </button>
                          }
                          
                       </p>
                            
                    </Form>
                  )}
              </Formik>

         </div>);
  }
  
  getMessage() {
      
      const message: string = !isU(this.props.message)?this.props.message:"";
      
      return (<div>

          {bbcodeParse(message)}
          
          <Link to={'/'}>Продолжить</Link> покупки.
      </div>);
  }

  render() {
      
 
	  return (
          <div>
            <Preloader isShow={this.props.isLoad} />
            <Errors isError={this.props.isError} errors={this.props.errors}/>
           
		    <h1>Оформление заказа</h1>

            <br />
            {this.state.isSuccess?this.getMessage():this.getForm()}
              
         </div>
		);
  }
 
} 

const mapStateToProps = ({ app, cart, neworder  }) => ({
    prices: cart.prices,
    
    message: neworder.message,
    isSuccess: neworder.isSuccess,
    isLoad: neworder.isLoad,
    
    isError: app.isError,
    errors: app.errors 
})

const mapDispatchToProps = (dispatch:any) =>
  bindActionCreators(
    {

      getPrices,
      newOrder
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewOrder)
