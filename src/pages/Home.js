import React, { Component } from 'react'

import UserContext from '../UserContext';
import LoginRegister from '../components/loginRegister/loginRegister';
export default class Home extends Component {
    render() {
        if(this.context.username) {
            return <h1>home</h1>
        } else {
            return <LoginRegister />    
        }
    }
}
Home.contextType = UserContext;