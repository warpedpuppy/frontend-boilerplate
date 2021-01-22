import React, { useState } from 'react';
import './Resource.css';
import Moment from 'react-moment';
export default function Resource(props) {
    let date = new Date(props.updatedAt);
    let formatDate =  <Moment format="MMM DD, YYYY">{date}</Moment>;
    const [expanded, setExpanded] = useState(false);
    function returnEmoji (str) {
        if (str === 'medical') {
            return <i>&#129500;</i>
        } else if (str === 'legal') {
            return <i>&#129500;</i>
        } else if (str === 'art') {
            return <i>&#129425;</i>
        } else {
            return <i>&#129412;</i>
        }
    }
        
    
    return (
        <div className={`resource ${props.category}`}>
            <div> { returnEmoji(props.category) }{ props.category }</div>
            <div className="resource-header">
                <h2>{ props.name }</h2>
              
            </div>
            <div>
                { props.description }
            </div>
            <div className="expand-button" onClick={() => setExpanded(!expanded)}>expand</div>
            <div className={ expanded ? `resource-expand-hook` : `resource-contract resource-expand-hook`}>
                <ul>
                    <li><a href={ props.webSite } rel="noreferrer" target="_blank">visit web site</a></li>
                    <li>{ props.phone }</li>
                    <li>{ props.email }</li>
                </ul>
            
                <div className="resource-footer">
                    <div>posted by: { props.user.username },  { props.updatedAt ?  formatDate : props.createdAt }</div>
                </div>
            </div>
        </div>
    )
}
