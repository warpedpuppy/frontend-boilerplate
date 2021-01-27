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
            <p>{props.username}</p>
            <div>
                <label>subscribed:</label><input type="checkbox" disabled checked={props.subscribed}  />
            </div>
            <img src="https://walthermidcoast.s3.amazonaws.com/qr/IMG_5198.png" className="user-image" alt={`${props.username}`} />
        </div>
    )
}
