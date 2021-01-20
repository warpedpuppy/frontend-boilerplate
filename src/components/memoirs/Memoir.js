import React from 'react';
import './Memoir.css';
export default function Memoir(props) {
    return (
        <div className="memoir">
            <h3>{props.title}</h3>
            <h4>{props.subtitle}</h4>
            <h4>author: {props.user.username}</h4>
            <pre>{props.text}</pre>
            <h4>{props.createdAt}</h4>
            <h4>{props.updatedAt}</h4>
            
        </div>
    )
}
