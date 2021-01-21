import React from 'react';
import './Resource.css';
import Moment from 'react-moment';

export default function Resource(props) {
    let date = new Date(props.updatedAt);
    let formatDate =  <Moment format="MMM DD, YYYY">{date}</Moment>;
    
    return (
        <div className={`resource ${props.category}`}>
            <div> { props.category }&#129500;</div>
            <div className="resource-header">
                <h2>{ props.name }</h2>
              
            </div>
            <div>
                <div>
                    { props.description }
                </div>
                <ul>
                    <li><a href={ props.webSite } rel="noreferrer" target="_blank">visit web site</a></li>
                    <li>{ props.phone }</li>
                    <li>{ props.email }</li>
                </ul>
            </div>
            <div className="resource-footer">
                <div>posted by: { props.user.username },  { props.updatedAt ?  formatDate : props.createdAt }</div>
            </div>
        </div>
    )
}
