import React from 'react';
import './Resource.css';

export default function Resource(props) {
    console.log(props)
    return (
        <div className="resource">
            <div>{ props.name }</div>
            <div>{ props.category }</div>
            <div>{ props.description }</div>
            <div>author: { props.user.username }</div>
            <div>created: { props.createdAt }</div>
            <div>updated: { props.updatedAt }</div>
        </div>
    )
}
