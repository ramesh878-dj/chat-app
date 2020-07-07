import React, { Component } from 'react';
import { BrowserRouter , Route , Switch } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize'
import Login from './components/login'
import Signup from './components/signup'
import Friends from './components/friends'
import Chat from './components/chat'
import Search from './components/search'
import Logout from './components/logout'
import Requests from './components/requests'
import About from './components/about'

class App extends Component {
  constructor(){
    super();

    this.state = {
      loggedInStatus: "Not_Logged_In",
      user: {}
    }
    this.handleLogin = this.handleLogin.bind(this);
  }

  setLocalData(){
    localStorage.setItem('loginstatus', 'false');
  }

  getLocalData(){
  
  }

  
  handleLogin(data){
    this.setState({
      loggedInStatus:"Logged_IN",
      user:data
    })
    
  }

  render(){
    return (
      <div className="App">
        <BrowserRouter>
        {/* <UserList /> */}
        {/* <Signup/> */}
        {/* <Friends/> */}
        <Switch>
          <Route path="/logout" component={Logout}/>
          <Route path="/chat/:user" exact component={Chat}/>
          <Route path="/requests" component={Requests}/>
          <Route path="/friends" component={Friends}/>
          <Route path="/search" component={Search}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/about" component={About}/>
          <Route path="/login" exact render={props=>(
           <Login {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} /> 
          )}/>
          <Route path="/logout" exact render={props=>(
           <Login {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} /> 
          )}/>
          <Route path="/" exact 
          render={props=>(
           <Login {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} /> 
          )} />
          <Route render={() => <h3>404</h3>} />
        </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
