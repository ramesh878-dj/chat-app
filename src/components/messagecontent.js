import React from 'react';
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize'
import './assets/mainstyle.css'

const  Message = ({content,sender_name, date}) => {
        const username = localStorage.getItem('username');

        if(sender_name===username){
            return(
                <div className="col s12 l12">
                    <p className="right" style={{width:'80%'}}>
                            <span className="grey darken-3 right spanmsg">
                                {content}<br/>
                            <span className="right">{date.substring(0,19)}</span>
                        </span>
                    </p>
                </div>
            )
        }
        else{
            return(
                <div className="col s12 l12">
                    <p className="left" style={{width:'80%'}}>
                            <span className="grey darken-3 left spanmsg">
                                {content}<br/>
                            <span className="right">{date.substring(0,19)}</span>
                        </span>
                    </p>
                </div>
                )
        }
}

export default Message;