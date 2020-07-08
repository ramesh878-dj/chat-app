import React, { Component } from 'react';
import './assets/mainstyle.css'
import './assets/icon.css'
import 'materialize-css/dist/js/materialize'
import axios from 'axios'

class About extends Component {
    constructor(props){
        super(props);
        this.state={
            totlikes:0,
        }
    }
    submitHandler = e => {
        axios.post('/api/givelike/post/', this.state)
        .then(response=>{
            console.log(response)
            this.setState({totlikes:response.data[0].likeCount});
        }).catch(error=>{
            console.log(error)
        })
    }
    componentDidMount(){
        axios.get('/api/givelike/get/')
        .then(response=>{
            console.log(response)
            this.setState({totlikes:response.data[0].likeCount});
        }).catch(error=>{
            console.log(error)
        })
    }
    render(){
    const tag1= {
        height: '100vh',
        color: '#fff',
        background: 'linear-gradient(45deg, #009688, #4CAF50)'
    }
    const { totlikes } = this.state
    return (
        <div style={tag1}>
            <div className="container" style={{height: "100vh"}}>
                <div className="row center">
                    <div className="col s12 m8 l6 push-l3 push-m2" style={{transform: "translate(-50%,-50%)",position: "fixed",left: "50%",top: "40%",width: "350px",height: "350px"}}>
                        <div className="card">
                            <div className="card-image" style={{borderRadius: "50%"}}>
                                <img src="ramesh.jpg" />
                                <b className="halfway-fab btn-floating darkred pulse" onClick={this.submitHandler}>
                                    <i className="material-icons left">favorite</i>
                                </b>
                            </div>
                            <div style={{color: "#000"}}>
                                <b>Give your like to support.</b>
                                <br/>
                                <b>Total likes</b> <h6 style={{color:"red"}}><b>{totlikes}</b></h6>
                                <b>Design and developed by Ramesh</b>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    }
}

export default About;