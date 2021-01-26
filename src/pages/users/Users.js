import React, { Component } from 'react'
import Config from '../../config';
import UserModule from './components/UserModule';
import './Users.css';
export default class Memoirs extends Component {
    state = {
        users: []
    }
    componentDidMount = async () => {
        let token = localStorage.getItem('token');
        let result = await fetch(`${Config.API_URL}/users/`, {
            headers: {
                'authorization': `bearer ${token}`
              }

        })
        let resultJson = result.ok ? await result.json() : {};
        this.setState({users: resultJson.users})

    }


    render() {
        
        return (
            <div className="general-page-layout">
                <h1>Users</h1>
                <div className="users-grid">
                {
                    this.state.users.map( (user, index) => <UserModule key={index} {...user} /> )
                }
                </div>
            </div>
        )
    }
}
