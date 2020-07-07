import React, { Component } from 'react';
import axios from 'axios'

class Logout extends Component {
    
    logout() {
        axios.post('/api/logout/')
        .then(response=>{
            console.log(response)
            localStorage.setItem('loginstatus', 'false');
            this.props.history.push("/login");
        }).catch(error=>{
            console.log(error)
        })
    }
    componentDidMount(){
        this.logout();
    }
    render(){
        return(
            <div>
                
            </div>
        )
    }
}
export default Logout;