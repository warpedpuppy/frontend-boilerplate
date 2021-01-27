import React, { Component } from 'react'
import Config from '../../config';
import UserModule from './components/UserModule';
import './Users.css';
import Form from 'react-bootstrap/Form';
import UserContext from '../../UserContext';

export default class Memoirs extends Component {
    state = {
        users: [], 
        filtered: []
    }
    componentDidMount = async () => {
        let token = localStorage.getItem('token');
        let result = await fetch(`${Config.API_URL}/users/`, {
            headers: {
                'authorization': `bearer ${token}`
              }

        })
        let resultJson = result.ok ? await result.json() : {};
        this.setState({users: resultJson.users, filtered: resultJson.users})

    }
    onChangeHandler = (e) => {
        let searchTerm = e.target.value;
        if ( searchTerm ) {
            this.setState({filtered: this.state.users.filter( user => user.username.toLowerCase().includes(searchTerm.toLowerCase())) });
        } else {
            this.setState({filtered: this.state.users });
        }
        
    }

    render() {
        const { filtered } = this.state;
        const { subscriptions } = this.context;
 
        return (
            <div className="general-page-layout users-page">
                <h1>Users</h1>
                <Form className="resources-input-form">
                    <Form.Group controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="search" onInput={this.onChangeHandler} />
                    </Form.Group>
                </Form>
                <div className="users-grid">
                {
                   
                    filtered.map( (user, index) => {
                     user.subscribed = subscriptions ? subscriptions.includes(user.id) : false;
                    return <UserModule key={index} {...user} /> })
                }
                </div>
            </div>
        )
    }
}
Memoirs.contextType = UserContext;