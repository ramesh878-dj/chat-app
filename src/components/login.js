import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './assets/login.css'
import axios from 'axios'

class Login extends Component{

    constructor(props){
        super(props);

        this.state = {
            username : '',
            password : '',
            errormsg :'',
        }

        this.handleSuccessfullAuth= this.handleSuccessfullAuth.bind(this);
    }

    handleSuccessfullAuth(data){
        this.props.handleLogin(data);
        this.props.history.push("/friends");
    }

    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = e => {
        e.preventDefault()
        console.log(this.state)
        if(this.state.username!="" && this.state.password!=""){
            axios.post('/api/login/', this.state)
            .then(response=>{
                console.log(response)
                if(response.status===200) {
                    localStorage.setItem('loginstatus', 'true');
                    localStorage.setItem('username', response.data.username);
                    localStorage.setItem('token', response.data.token);
                    console.log('set login status after login');
                    this.handleSuccessfullAuth(response.data);
                }
                else{
                    this.setState({errormsg:"Wrong username or password"});
                }
            }).catch(error=>{
                // console.log(error)
                this.setState({errormsg:"Wrong username or password"});
            })
        }
        else{
                this.setState({errormsg:"Please fill username and password"});
        }
    }
    componentDidMount(){
        let data =localStorage.getItem('loginstatus');
        
        if(data=== "true"){
            axios.get('/api/loggedin/get/')
            .then(response=>{
                console.log(response)
                if(response.data.login === true){
                    localStorage.setItem('loginstatus','true');
                    this.props.history.push("/friends");
                }
            }).catch(error=>{
                console.log(error)
                localStorage.setItem('loginstatus','false');
                // this.props.history.push("/");
            })
        }
    }
    render(){
        const tag1= {
            height: '100vh',
            color: '#fff',
            background: 'linear-gradient(45deg, #009688, #4CAF50)'
        }
        const white={
            color: '#fff'
        }
        const pad0={
            padding:'0'
        }
        const fullwidth={
            width:'100%'
        }
        const { username, password, errormsg} = this.state
        return (
            <div style={tag1}>
                <form onSubmit={this.submitHandler}>
                <div className="container" >
                <div className="row center">
                    <div className="col s12 m8 l6 push-l3 push-m2">
                        <br/>
                        <br/>
                        <h4 className="text-shadow">Login Your Account</h4>
                        <p className="text-shadow">Welcome to new Chat website</p>
                        <p className="text-shadow">{errormsg}</p>
                        <div className="row">
                            <div className="input-field">
                                <label rel="text_input" style={white}>Username : </label>
                                <input type="text" className="email_input validate" 
                                    name="username"
                                    style={white} 
                                    value={username}
                                    onChange={this.changeHandler}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field">
                                <label rel="password_input" style={white}>Password : </label>
                                <input type="password" className="password_input validate" 
                                    name="password"
                                    style={white} 
                                    value={password}
                                    onChange={this.changeHandler}/>
                                {/* <div className="">Forgot Password?</div> */}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s6 left" style={pad0}>
                                <span className="text-shadow left"><Link to="signup" style={{textDecoration:"underline"}}>Create Account</Link></span>
                            </div>
                            <div className="col s6 right-align">
                                <button type="submit" className="btn waves-effect waves-light right black  z-depth-3" style={fullwidth}>Login</button>
                            </div>
                        </div>
                        <div className="row">
                            <br/>
                            <div className="col s12" align="center" style={pad0}>
                                <span className="text-shadow">Develeped by <Link to="about" style={{color:"lightblue",textDecoration:"underline"}}><b>Ramesh S</b></Link></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </form>
            </div>
        )
    }
}

export default Login;