import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import './assets/mainstyle.css'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize'
import axios from 'axios'
import Header from './header'

class Requests extends Component {
    constructor(props){
        super(props);
        this.state={
            userdata:[],
            errormsg:''
        }
    }

    componentWillMount(){
        axios.get('/api/loggedin/get/')
        .then(response=>{
            if(response.data.login === true){
                localStorage.setItem('loginstatus','true');
            }
        }).catch(error=>{
            console.log(error)
            localStorage.setItem('loginstatus','false');
            this.props.history.push("/");
        })

        const username =localStorage.getItem('username');
        const token =localStorage.getItem('token');
        axios({
            method:'get',
            url:'/api/requestslist/'+username+'/get/',
            headers:{
                'Authorization':'Token '+token
            }
        })
        .then(response=>{
            // console.log(response)
            this.setState({userdata: response.data})
        }).catch(error=>{
            console.log(error)
            this.setState({errormsg:'Error retreving friends data'})
        })
        
    }

    acceptRequest(friendname){
        const username =localStorage.getItem('username');
        const token =localStorage.getItem('token');
        axios({
            method:'post',
            url:'/api/accept/post/',
            data:{
                "friendname":friendname,
                "username":username
            },
            headers:{
                'Authorization':'Token '+token
            }
        })
        .then(response=>{
            // console.log(response)
            this.setState({userdata: response.data})
        }).catch(error=>{
            console.log(error)
            this.setState({errormsg:'Error retreving friends data'})
        })
    }
    
    render(){
        const pad0={
            padding:'0'
        }
        const username_style={
            fontSize:'1.2em',
        }
        const { userdata, errormsg }= this.state
        return (
            <div>
                <Header/>
                <div className="row">
                    <div className="col s12 l12 topdiv" id="chat-box">  
                        <ul className="collection with-header" style={pad0}>
                            {
                                userdata.length?
                                userdata.map(user=>
                            <li className="collection-item " key={user.id}>
                                
                                <span className="title" style={username_style}>{user.requester_name}</span>
                                
                                <span className="secondary-content">
                                    <button className="btn waves-effect" onClick={()=>this.acceptRequest(user.requester_name)}>Accept <i className="material-icons right">add</i></button>
                                    &nbsp;<button className="btn waves-effect" onClick={()=>this.addMyFriend(user.id,user.username)}>Decline <i className="material-icons right">delete</i></button>
                                </span>
                                <br/>
                                <br/>
                            </li>):<li className="collection-item" align="center">No New Request</li>
                            }
                            {
                                errormsg?
                            <li className="collection-item avatar">
                                {errormsg}
                            </li>:null
                            }
                        </ul>
                    
                    </div>
                </div>            
            </div>
        )
    }
}

export default Requests;