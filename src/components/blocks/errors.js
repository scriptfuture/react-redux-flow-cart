import React, { Component } from 'react'

type Props = {
    errors: Array<Object>,
    isError: boolean
    
};

type State = {
    httpErrors: Object
};


export class Errors extends Component<Props, State> { 

  state: State  = {
    httpErrors: {
            "e400" : "Bad Request («плохой, неверный запрос»)!",
            "e401" : "Unauthorized («не авторизован (не представился)»)!",
            "e402" : "Payment Required («необходима оплата»)!",
            "e403" : "Forbidden («доступ запрещён»)!",
            "e404" : "Page not found («страница не найдена»)!",
            "e405" : "Method Not Allowed («метод не поддерживается»)!",
            "e406" : "Not Acceptable («неприемлемо»)!",
            "e407" : "Proxy Authentication Required («необходима аутентификация прокси»)!",
            "e408" : "Request Timeout («истекло время ожидания»)!",
            "e409" : "Conflict («конфликт»)!",
            "e410" : "Gone («удалён»)!",
            "e500" : "Internal Server Error («внутренняя ошибка сервера»)!",
            "e501" : "Not Implemented («не реализовано»)!",
            "e502" : "Bad Gateway («плохой, ошибочный шлюз»)!",
            "e503" : "Service Unavailable («сервис недоступен»)!",
            "e504" : "Gateway Timeout («шлюз не отвечает»)!",
            "e505" : "HTTP Version Not Supported («версия HTTP не поддерживается»)!",
            "e506" : "Variant Also Negotiates («вариант тоже проводит согласование»)!",
            "e507" : "Insufficient Storage («переполнение хранилища»)!",
            "e508" : "Loop Detected («обнаружено бесконечное перенаправление»)!",
            "e509" : "Bandwidth Limit Exceeded («исчерпана пропускная ширина канала»)!",
            "e510" : "Not Extended («не расширено»)!",
            "e511" : "Network Authentication Required («требуется сетевая аутентификация»)!",
            "e520" : "Unknown Error («неизвестная ошибка»)!",
            "e521" : "Web Server Is Down («веб-сервер не работает»)!",
            "e522" : "Connection Timed Out («соединение не отвечает»)!",
            "e523" : "Origin Is Unreachable («источник недоступен»)!",
            "e524" : "A Timeout Occurred («время ожидания истекло»)!",
            "e525" : "SSL Handshake Failed («квитирование SSL не удалось»)!",
            "e526" : "Invalid SSL Certificate («недействительный сертификат SSL»)!"
    }
  };

  getErrors():any {
      
      let errors: Array<Object> = [{code:0, text:"test error!"}];
      
      if(typeof this.props.errors !== "undefined") errors = this.props.errors;
      
      return errors.map(function (err: Object, index: number):any {
          
         if(typeof err.code !== "undefined" && err.code !== 0 && typeof this.state.httpErrors["e" + err.code] !== "undefined") {
              return (<div key={index}>{this.state.httpErrors["e" + err.code]}</div>);   
         } 
          
        return (<div key={index}>{err.text}</div>)
         
      });

      
  }

  
  render():any {
	
	  if(this.props.isError) {
          
          return (
                <div className="alert alert-danger errors" role="alert">
                    {this.getErrors()}
                </div>
            );
      } // end if 
        
      return (<div></div>);
  }
 
} 
