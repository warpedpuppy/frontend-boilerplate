import React, { Component } from 'react'
import Config from '../config';
import User from '../components/users/User';
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
            <div>
                <h1>Users</h1>
                {
                    this.state.users.map( (user, index) => <User key={index} {...user} /> )
                }
            </div>
        )
    }
}
