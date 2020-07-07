import React from 'react'
import { NavLink } from 'react-router-dom'

const FriendList = (props) =>(
    <NavLink to={`/chat/${props.accepter_name===props.username?props.requester_name:props.accepter_name}`}>
        <li className="collection-item avatar">
            <i className="material-icons circle blue">person</i>
            <span className="title" style={{color:'#000'}}>{props.accepter_name===props.username?props.requester_name:props.accepter_name}</span>
            <p className="grey-text" style={{color:'#fff'}}>.</p>
            <span className="secondary-content">
                <i className="material-icons">email</i>
            </span>
            <hr/>
        </li>
    </NavLink>
)
export default FriendList;