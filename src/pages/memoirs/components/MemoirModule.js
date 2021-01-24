import React from 'react'
import './MemoirModule.css'
export default function MemoirModule(props) {
    return (
        <div className="memoir-module" onClick={ (e) => props.goToMemoir(e, props._id)}>
            <div>{props.title}</div>
            <div>{props.user.username}</div>
            <div>{ props.updatedAt ? props.updatedAt : props.createdAt }</div>
        </div>
    )
}
