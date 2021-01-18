import React, { Component } from 'react'
import UserContext from '../UserContext'

export default class Profile extends Component {
    render() {
        return (
            <div>
                <h1>{this.context.username}</h1>
            </div>
        )
    }
}
Profile.contextType = UserContext;
