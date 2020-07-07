import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import './assets/mainstyle.css'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize'
import axios from 'axios'
import Header from './header'

class Search extends Component{
    constructor(props){
        super(props);

        this.state={
            searchName:'',
            searchResult:[],
            errormsg:''
        }
        this.getExactUser = this.getExactUser.bind(this);
    }

    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
        let username = e.target.value;
        if(username.length>1){
            axios.get('/api/useraccount/?username='+username)
            .then(response=>{
                this.setState({searchResult: response.data})
            }).catch(error=>{
                console.log(error)
                this.setState({errormsg:'Error retreving friends data'})
            })
        }
    }

    getExactUser(){
        const username = this.state.searchName;
        if(username.length>1){
            axios.get('/api/search/?username='+username)
            .then(response=>{
                console.log(response)
                this.setState({searchResult: response.data})
            }).catch(error=>{
                console.log(error)
                this.setState({errormsg:'Error retreving friends data'})
            })
        }
    }

    addMyFriend(data,datauser){
        let username =localStorage.getItem('username');
        axios({
            method:'post',
            url:'/api/addfrd/post/', 
            data :{
                "accepter_id":data,
                "username":username,
                "accepter_name":datauser,
            },
            headers:{
                'Authorization':'Token dd7dc6546d36009686eb3d4f0229c35e047c0acc'
            }
        })
        .then(response=>{
            console.log(response);
            const data=response.data;
            if(data.already_freind==="accepted"){
                alert('You are Already Friends');
            }
        }).catch(error=>{
            console.log(error)
            this.setState({errormsg:"Can't add friend"})
        })
    }

    componentDidMount(){
        axios.get('/api/loggedin/get/')
        .then(response=>{
            console.log(response)
            if(response.data.login === true){
                localStorage.setItem('loginstatus','true');
            }
        }).catch(error=>{
            console.log(error)
            localStorage.setItem('loginstatus','false');
            this.props.history.push("/");
        })
    }

    render(){
            
        const mtop={
            marginTop: '70px'
        }
        const schlg={
            width: '18%'
        }
        const schinp={
            width: '70%'
        }
        const cen={
            align:'center'
        }
        const { searchName, searchResult, errormsg }= this.state
        return (
            <div>
                <Header/>
                <div className="row">
                    <div className="col s12 l12" style={mtop}>
                        <div className="col l2">
                        </div>
                        <div className="col s12 l8" align="center">
                            <input type="text" className="searchinput" style={schinp} placeholder="Search Your friend" 
                            name="searchName" 
                            value={searchName}
                            onChange={this.changeHandler} />
                            <button className="btn hide-on-med-and-down waves-effect searchiconlg" 
                            style={schlg}
                            onClick={this.getExactUser} >Search<i className="material-icons left">search</i></button>
                            <button className="btn hide-on-large-only waves-effect searchiconmd"
                            onClick={this.getExactUser}><i className="material-icons">search</i></button>
                        </div>
                    </div>
                    <div className="col s12 l12" align="center" style={cen}>
                        <div className="col l2">
                        </div>
                        <div className="col s12 l8">
                            <table align="center">
                                <tbody>
                                {
                                    searchResult.length?
                                    searchResult.map(user=>
                                <tr key={user.id}>
                                    <td>{user.username}</td>
                                    <td><button className="btn waves-effect" onClick={()=>this.addMyFriend(user.id,user.username)}>Add <i className="material-icons right">add</i></button></td>
                                </tr>):null
                                }
                                {
                                    errormsg?
                                <tr>
                                <td className="collection-item avatar">
                                    {errormsg}
                                </td>
                                </tr>:null
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Search;