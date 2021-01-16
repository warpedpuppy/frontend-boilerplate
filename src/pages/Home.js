import React, { Component } from 'react'
import Register from '../components/loginRegister/Register';
import Login from '../components/loginRegister/Login';
import UserContext from '../UserContext';
export default class Home extends Component {
    render() {
        if(this.context.username) {
            return (<h1>home</h1>)
        } else {
             return (
                    <div>
                        <Login />
                        <Register />
                        
                    </div>
                )
        }
       
    }
}
Home.contextType = UserContext;