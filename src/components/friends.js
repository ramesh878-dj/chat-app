import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import './assets/mainstyle.css'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize'
import axios from 'axios'
import Header from './header'
import FriendList from './friendslist'

class Friends extends Component {
    constructor(props){
        super(props);
        this.state={
            userdata:[],
            errormsg:'',
            username:''
        }
    }

    componentWillMount(){
        this.setState({username:localStorage.getItem('username')});
        axios.get('/api/loggedin/get/')
        .then(response=>{
            // console.log(response)
            if(response.data.login === true){
                localStorage.setItem('loginstatus','true');
            }
        }).catch(error=>{
            console.log(error)
            localStorage.setItem('loginstatus','false');
            this.props.history.push("/");
        })

        // axios.get('/api/useraccount/')
        // .then(response=>{
        //     console.log(response)
        //     this.setState({userdata: response.data})
        // }).catch(error=>{
        //     console.log(error)
        //     this.setState({errormsg:'Error retreving friends data'})
        // })

        const username =localStorage.getItem('username');
        axios({
            method:'get',
            url:'/api/friendslist/'+username+'/get/',
            headers:{
                'Authorization':'Token dd7dc6546d36009686eb3d4f0229c35e047c0acc'
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
        
        const { userdata, errormsg, username }= this.state
        return (
            <div>
                <Header/>
                <div className="row">
                    <div className="col s12 l12 topdiv" id="chat-box">  
                        <ul className="collection with-header" style={pad0}>
                            {
                                userdata.length?
                                userdata.map(user=>
                            <FriendList key={user.id} accepter_name={user.accepter_name}
                                                        requester_name={user.requester_name}
                                                        username={username} ></FriendList>):null
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

export default Friends;