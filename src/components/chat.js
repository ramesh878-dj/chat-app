import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize'
import Header from './header'
import './assets/mainstyle.css'
import axios from 'axios'
import Message from './messagecontent'
// import SocketApp from './socket'


class Chat extends Component {
    
    constructor(props){
        super(props);
        this.state={
            messages:[],
            reciver_name:'new user'
        };
    }
    
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: 'smooth', });
    }
    componentDidUpdate(){
        this.scrollToBottom();
    }
    componentDidMount(){
        const friend_name = this.props.match.params.user;
        const token = localStorage.getItem('token');

        console.log(friend_name);
        const roomName = 'new';

        // const socketPath = 'ws://dochatservice.herokuapp.com/ws/chating/'+roomName+'/';

        const chatSocket = new WebSocket(
            '/ws/chating/new'
        );

        chatSocket.onopen = (e) => {
            console.log('opened');
            chatSocket.send(JSON.stringify({'command':'fetch_messages', 'username': localStorage.getItem('username'),'friend_name':friend_name}));
        };
        // main parts for message
        
        chatSocket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            console.log(data);
            let update_messages = [...this.state.messages];
            
            // this.setState(previousState => ({
            //     messages:[...previousState.messages, data]
            // }));
                        
            if(data['command']==='messages'){
                for(var i=0;i<data.messages.length;i++){
                    update_messages.push(data.messages[i]);
                }
            }
            else{
                update_messages.push(data.messages);
            }
            
            this.setState({messages: update_messages})
            console.log(this.state.messages);
        };
        
        document.querySelector('#chat-message-input').focus();
        document.querySelector('#chat-message-input').onkeyup = function(e) {
            if (e.keyCode === 13) {  // enter, return
                document.querySelector('#chat-message-submit').click();
            }
        };

        document.querySelector('#chat-message-submit').onclick = function(e) {
            const messageInputDom = document.querySelector('#chat-message-input');
            const message = messageInputDom.value;
            chatSocket.send(JSON.stringify({
                'message': message,
                'command': 'new_message',
                'from': localStorage.getItem('username'),
                'friend_name':friend_name,
                'token':token
            }));
            messageInputDom.value = '';
        };

        
        chatSocket.onclose = function(e) {
            console.error('Chat socket closed unexpectedly');
        }

        // main part end

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
        
        this.scrollToBottom();
    }

    // funstions for message
    createmessageTag(data){
        console.log(data);
    }

    // fetchMessages(){
    //     chatSocket.send(JSON.stringify({'command':'fetch_messages'}));
    // }

    render(){
    
    const chin={
        width: '70%',
        border:'1px solid #828d92',
        borderRadius:'50px'
    }
    const { messages } = this.state
    return (
        <div>
            <Header/>
            
            <div className="row white">
            <div className="col s12 l12 topdiv" id="chat-box">
                {
                    messages.length?
                    messages.map(message=>
                        <Message key={message.id} sender_name={message.sender_name} date={message.timestamp} content={message.content} />
                    ):null
                }
                <div style={{clear:'both'}} ref={(el)=>(this.messagesEnd=el)}>.</div>
                </div>                
                <div className="col s12 l12 padmar">
                    <div align="center">
                        <input type="text" className="chatinputbox white" id="chat-message-input" style={chin}/>
                        <button className="btn chatsend" id="chat-message-submit">send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
}

export default Chat;