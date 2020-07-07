import React, { Component} from 'react';
// import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './assets/login.css'
import axios from 'axios'

class Signup extends Component {
    
    constructor(props){
        super(props)

        this.state = {
            username : '',
            email : '',
            password : '',
            confirmPass: '',
            account_status:''
        }
    }

    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = e => {
        e.preventDefault()
        // console.log(this.state)
        if(this.state.password.length>7){
            if(this.state.password===this.state.confirmPass){
                axios({
                    method : 'post',
                    url : '/api/user/',
                    data: this.state,
                })
                .then(response=>{
                    // console.log(response)
                    if(response.statusText==="Created"){
                        this.setState({ account_status: 'Your Account is Created. Go to Login.'});
                    }
                    else if (response.data.username){
                        this.setState({ account_status: response.data.username});
                    }
                }).catch(error=>{
                    console.log(error)
                });
            }
            else{
                this.setState({ account_status: 'Password mismatch.'});
            }
        }
        else{
            this.setState({ account_status: 'Password must contain 8 charecters.'});
        }
    }
    
    componentDidMount(){
        const checklogin = localStorage.getItem('loginstatus');
        if(checklogin === "true"){
            axios.get('/api/loggedin/get/')
            .then(response=>{
                if(response.data.login === true){
                    localStorage.setItem('loginstatus','true');
                    this.props.history.push("/chat");
                }
            }).catch(error=>{
                console.log(error)
                localStorage.setItem('loginstatus','false');
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
        const fullwidth={
            width:'100%'
        }
        const { username, email, password, confirmPass, account_status} = this.state
    return (
        
        <div style={tag1}>
            <form onSubmit={this.submitHandler}>
            <div className="container">
                <div className="row center">
                    <div className="col s12 m8 l6 push-l3 push-m2">
                        <br/>
                        <h4 className="text-shadow">Create Your Account</h4>
                        <p className="text-shadow">Welcome to new Chat website</p>
                        <p className="text-shadow">{account_status}</p>
                        <div className="input-field">
                            <label rel="text_input" style={white}>Username : </label>
                            <input type="text" className="password_input validate" 
                                name="username"
                                style={white} 
                                value={username}
                                onChange={this.changeHandler} />
                        </div>
                        <div className="input-field">
                            <label rel="email_input" style={white}>Email : </label>
                            <input type="email" className="email_input validate" 
                                name="email"
                                style={white} 
                                value={email}
                                onChange={this.changeHandler} />
                        </div>
                        <div className="input-field">
                            <label rel="email_input" style={white}>Password : </label>
                            <input type="password" className="password_input validate" 
                                name="password"
                                style={white} 
                                value={password}
                                onChange={this.changeHandler} />
                        </div>
                        <div className="input-field">
                            <label rel="email_input" style={white}>Confirm Password : </label>
                            <input type="password" className="password_input validate" 
                                name="confirmPass"
                                style={white} 
                                value={confirmPass}
                                onChange={this.changeHandler} />
                        </div>
                        <div className="row">                    
                            <div className="col s6 left">
                                <span className="text-shadow left"><Link to="login" style={{textDecoration:"underline"}}>Login Account</Link></span>
                            </div>
                            <div className="col s6 right-align">
                                <button type="submit" className="btn waves-effect waves-light right black  z-depth-3" style={fullwidth}>Create</button>
                            </div>
                        </div>
                        <div className="row">
                            <br/>
                            <div className="col s12" align="center" >
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

export default Signup;