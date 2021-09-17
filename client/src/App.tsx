import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyRouter from './kebab/routes/router';
class App extends Component{
  
  render(){
    return(
      <div>
       <MyRouter></MyRouter>
      </div>
    );
  }
}
export default App;
