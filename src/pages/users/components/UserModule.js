import React from 'react';
import { useHistory } from 'react-router-dom';
import './UserModule.css';
export default function UserModule(props) {
    let history = useHistory();
    function goToUserPage () {
        history.push(`/users/${props.id}`)
    }
    return (
        <div className="user-module" onClick={goToUserPage}>
            {props.username}
        </div>
    )
}
